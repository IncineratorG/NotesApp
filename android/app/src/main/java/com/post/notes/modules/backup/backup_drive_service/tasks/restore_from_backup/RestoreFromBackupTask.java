package com.post.notes.modules.backup.backup_drive_service.tasks.restore_from_backup;


import android.content.Context;
import android.util.Log;

import com.google.api.services.drive.Drive;
import com.post.notes.common.app_storages.AppStorages;
import com.post.notes.common.app_storages.notes_storage.AppNotesStorage;
import com.post.notes.common.autonomous_task.AutonomousTask;
import com.post.notes.common.data.hybrid_objects.note.Note;
import com.post.notes.common.task_runner.TaskRunner;
import com.post.notes.modules.backup.backup_drive_service.callbacks.restore_from_backup.RestoreFromBackupCancelledCallback;
import com.post.notes.modules.backup.backup_drive_service.callbacks.restore_from_backup.RestoreFromBackupErrorCallback;
import com.post.notes.modules.backup.backup_drive_service.callbacks.restore_from_backup.RestoreFromBackupFinishedCallback;
import com.post.notes.modules.backup.backup_drive_service.callbacks.restore_from_backup.RestoreFromBackupProgressChangedCallback;
import com.post.notes.modules.backup.backup_drive_service.data.data_transformer.RestoreFromBackupResult;
import com.post.notes.modules.backup.backup_drive_service.data.task_progress.BackupTaskProgress;
import com.post.notes.modules.backup.backup_drive_service.data_transformers.BackupTransformers;
import com.post.notes.modules.backup.backup_drive_service.data_transformers.images.ImagesTransformer;
import com.post.notes.modules.backup.backup_drive_service.data_transformers.images.backup_image_info.BackupImageInfo;
import com.post.notes.modules.backup.backup_drive_service.data_transformers.not_images.NotImagesDataTransformer;
import com.post.notes.modules.backup.module_errors.BackupErrors;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class RestoreFromBackupTask extends AutonomousTask<Object, Object, Object> {
    public static final String PREPARING_BACKUP_DATA_STAGE = "PREPARING_BACKUP_DATA_STAGE";
    public static final String RESTORING_APP_SETTINGS_STAGE = "RESTORING_APP_SETTINGS_STAGE";
    public static final String RESTORING_NOTES_TEXT_STAGE = "RESTORING_NOTES_TEXT_STAGE";
    public static final String RESTORING_NOTES_IMAGES_STAGE = "RESTORING_NOTES_IMAGES_STAGE";
    public static final String FINISHING_STAGE = "FINISHING_STAGE";

    private Drive mDriveService;
    private String mBackupDriveId;
    private RestoreFromBackupProgressChangedCallback mProgressChangedCallback;
    private RestoreFromBackupFinishedCallback mFinishedCallback;
    private RestoreFromBackupCancelledCallback mCancelledCallback;
    private RestoreFromBackupErrorCallback mErrorCallback;
    private boolean mWasError;

    public RestoreFromBackupTask(Drive driveService,
                                 String backupDriveId,
                                 RestoreFromBackupProgressChangedCallback progressChangedCallback,
                                 RestoreFromBackupFinishedCallback finishedCallback,
                                 RestoreFromBackupCancelledCallback cancelledCallback,
                                 RestoreFromBackupErrorCallback errorCallback) {
        mDriveService = driveService;
        mBackupDriveId = backupDriveId;

        mProgressChangedCallback = progressChangedCallback;
        mFinishedCallback = finishedCallback;
        mCancelledCallback = cancelledCallback;
        mErrorCallback = errorCallback;

        mWasError = false;
    }

    @Override
    public void runOnRunner(TaskRunner runner, Object... params) {
        if (params == null || params.length <= 0) {
            mWasError = true;
            mErrorCallback.onError(BackupErrors.badContext());
            return;
        }

        Context context = (Context) params[0];
        if (context == null) {
            mWasError = true;
            mErrorCallback.onError(BackupErrors.badContext());
            return;
        }

        runner.run(this, context);
    }

    @Override
    protected Object doInBackground(Object... objects) {
        mWasError = false;

        publishProgress(new BackupTaskProgress(PREPARING_BACKUP_DATA_STAGE));

        Context context = (Context) objects[0];

        if (isCancelled()) {
            return null;
        }

        // Восстанавливаем текстовые данные (настройки, текст заметок).
        NotImagesDataTransformer notImagesDataTransformer = BackupTransformers.notImagesDataTransformer();
        RestoreFromBackupResult result = notImagesDataTransformer.fromGoogleDriveBackup(
                this,
                context,
                mDriveService,
                mBackupDriveId
        );
        if (isCancelled()) {
            return null;
        } else if (!result.successful()) {
            mWasError = true;
            mErrorCallback.onError(BackupErrors.unableToRestoreNotesBackup());
            return null;
        }

        // Восстанавливаем изображения.
        ImagesTransformer imagesTransformer = BackupTransformers.imagesTransformer();
        result = imagesTransformer.fromGoogleDriveBackup(
                this,
                context,
                mDriveService,
                mBackupDriveId
        );
        if (isCancelled()) {
            return null;
        } else if (!result.successful()) {
            mWasError = true;
            mErrorCallback.onError(BackupErrors.unableToRestoreImagesBackup());
            return null;
        }

        publishProgress(new BackupTaskProgress(FINISHING_STAGE));

        // Получаем ID восстановленных изображений.
        Set<String> restoredImageIdsSet = new HashSet<>();
        List<BackupImageInfo> restoredImagesInfo = result.restoredImagesInfo();
        for (int i = 0; i < restoredImagesInfo.size(); ++i) {
            BackupImageInfo restoredImageInfo = restoredImagesInfo.get(i);
            restoredImageIdsSet.add(restoredImageInfo.imageId());
        }

        AppNotesStorage notesStorage = AppStorages.get().notesStorage();

        // Получаем ID изображений из восстановленных заметок
        Map<Long, List<String>> noteImageIdsToRemoveMap = new HashMap<>();
        List<Note> notesList = notesStorage.getNotesList(context).notesList();
        for (int i = 0; i < notesList.size(); ++i) {
            Note note = notesList.get(i);
            List<String> noteImageIds = note.images();
            List<String> imageIdsToRemoveList = new ArrayList<>();
            for (int j = 0; j < noteImageIds.size(); ++j) {
                String imageId = noteImageIds.get(j);
                if (!restoredImageIdsSet.contains(imageId)) {
                    imageIdsToRemoveList.add(imageId);
                }
            }

            if (imageIdsToRemoveList.size() > 0) {
                noteImageIdsToRemoveMap.put(note.id(), imageIdsToRemoveList);
            }
        }

        if (noteImageIdsToRemoveMap.size() <= 0) {
            return null;
        }

        // Удаляем из заметок ID изображений, которые в них не должны
        // содержаться  (так как их небыло в резервной копии).
        for (int i = 0; i < notesList.size(); ++i) {
            Note note = notesList.get(i);

            if (noteImageIdsToRemoveMap.containsKey(note.id())) {
                List<String> noteImagesIds = note.images();
                @SuppressWarnings("ConstantConditions")
                Set<String> imagesIdsToRemove = new HashSet<>(noteImageIdsToRemoveMap.get(note.id()));

                List<String> finalNoteImagesIds = new ArrayList<>();
                for (int j = 0; j < noteImagesIds.size(); ++j) {
                    String imageId = noteImagesIds.get(j);
                    if (!imagesIdsToRemove.contains(imageId)) {
                        finalNoteImagesIds.add(imageId);
                    }
                }

                note.setImages(finalNoteImagesIds);
                notesStorage.updateNote(context, note);
            }
        }

        return null;
    }

    @Override
    protected void onPostExecute(Object o) {
        if (!mWasError) {
            mFinishedCallback.onFinished();
        }
    }

    @Override
    protected void onProgressUpdate(Object... values) {
        if (values == null || values.length <= 0) {
            return;
        }

        BackupTaskProgress progress = (BackupTaskProgress) values[0];
        mProgressChangedCallback.onChanged(progress);
    }

    @Override
    protected void onCancelled() {
        mCancelledCallback.onCancelled();
    }
}
