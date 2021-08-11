package com.post.notes.modules.backup.backup_drive_service.tasks.create_backup;


import android.content.Context;
import android.util.Log;

import com.google.api.services.drive.Drive;
import com.google.api.services.drive.model.File;
import com.post.notes.common.autonomous_task.AutonomousTask;
import com.post.notes.common.task_runner.TaskRunner;
import com.post.notes.modules.backup.backup_drive_service.BackupDriveService;
import com.post.notes.modules.backup.backup_drive_service.callbacks.create_backup.CreateBackupCancelledCallback;
import com.post.notes.modules.backup.backup_drive_service.callbacks.create_backup.CreateBackupErrorCallback;
import com.post.notes.modules.backup.backup_drive_service.callbacks.create_backup.CreateBackupFinishedCallback;
import com.post.notes.modules.backup.backup_drive_service.callbacks.create_backup.CreateBackupProgressChangedCallback;
import com.post.notes.modules.backup.backup_drive_service.data.data_transformer.CreateBackupResult;
import com.post.notes.modules.backup.backup_drive_service.data.task_progress.BackupTaskProgress;
import com.post.notes.modules.backup.backup_drive_service.data_transformers.BackupTransformers;
import com.post.notes.modules.backup.backup_drive_service.data_transformers.images.ImagesTransformer;
import com.post.notes.modules.backup.backup_drive_service.data_transformers.not_images.NotImagesDataTransformer;
import com.post.notes.modules.backup.backup_drive_service.helpers.BackupDriveServiceHelper;
import com.post.notes.modules.backup.module_errors.BackupErrors;

import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;

public class CreateBackupTask extends AutonomousTask<Object, Object, Object> {
    public static final String PREPARING_DATA_STAGE = "PREPARING_DATA_STAGE";
    public static final String SAVING_APP_SETTINGS_STAGE = "SAVING_APP_SETTINGS_STAGE";
    public static final String SAVING_NOTES_TEXT_STAGE = "SAVING_NOTES_TEXT_STAGE";
    public static final String SAVING_NOTES_IMAGES_STAGE = "SAVING_NOTES_IMAGES_STAGE";

    private String mBackupNote;
    private boolean mNeedSaveImages;
    private Drive mDriveService;
    private CreateBackupProgressChangedCallback mProgressChangedCallback;
    private CreateBackupFinishedCallback mFinishedCallback;
    private CreateBackupCancelledCallback mCancelledCallback;
    private CreateBackupErrorCallback mErrorCallback;
    private double mTotalBackupSize;
    private boolean mWasError;

    public CreateBackupTask(String backupNote,
                            boolean needSaveImages,
                            Drive driveService,
                            CreateBackupProgressChangedCallback progressChangedCallback,
                            CreateBackupFinishedCallback finishedCallback,
                            CreateBackupCancelledCallback cancelledCallback,
                            CreateBackupErrorCallback errorCallback) {
        mBackupNote = backupNote;
        mNeedSaveImages = needSaveImages;
        mDriveService = driveService;

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
        mTotalBackupSize = 0.0;

        publishProgress(new BackupTaskProgress(PREPARING_DATA_STAGE));

        Context context = (Context) objects[0];

        String rootFolderId = BackupDriveServiceHelper.getRootFolderId(mDriveService);
        if (isCancelled()) {
            return null;
        }

        if (rootFolderId == null) {
            rootFolderId = BackupDriveServiceHelper.createFolder(
                    mDriveService,
                    BackupDriveService.DRIVE_ROOT_FOLDER_NAME,
                    null
            );
        }
        if (isCancelled()) {
            return null;
        }
        if (rootFolderId == null) {
            mWasError = true;
            mErrorCallback.onError(BackupErrors.driveServiceNotInitialized());
            return null;
        }

        String backupFolderName = BackupDriveService.BACKUP_TEMPORARY_FOLDER_NAME;
        Log.d("tag", "CreateBackupTask->BACKUP_FOLDER_NAME: " + backupFolderName);

        String backupRootFolderId = BackupDriveServiceHelper.createFolder(
                mDriveService,
                backupFolderName,
                rootFolderId
        );
        if (backupRootFolderId == null) {
            mWasError = true;
            mErrorCallback.onError(BackupErrors.badBackupRootFolderId());
            return null;
        }

        if (isCancelled()) {
            BackupDriveServiceHelper.removeFolder(mDriveService, backupRootFolderId);
            return null;
        }

        NotImagesDataTransformer notImagesTransformer = BackupTransformers.notImagesDataTransformer();
        CreateBackupResult result = notImagesTransformer.toGoogleDriveBackup(
                this,
                context,
                mDriveService,
                backupRootFolderId
        );
        mTotalBackupSize = result.backupSizeInBytes();
        if (isCancelled()) {
            BackupDriveServiceHelper.removeFolder(mDriveService, backupRootFolderId);
            return null;
        } else if (!result.successful()) {
            mWasError = true;
            BackupDriveServiceHelper.removeFolder(mDriveService, backupRootFolderId);
            mErrorCallback.onError(BackupErrors.unableToCreateNotesBackup());
            return null;
        }

        if (mNeedSaveImages) {
            ImagesTransformer imagesTransformer = BackupTransformers.imagesTransformer();
            result = imagesTransformer.toGoogleDriveBackup(
                    this,
                    context,
                    mDriveService,
                    backupRootFolderId
            );
            mTotalBackupSize = mTotalBackupSize + result.backupSizeInBytes();
            if (isCancelled()) {
                BackupDriveServiceHelper.removeFolder(mDriveService, backupRootFolderId);
                return null;
            } else if (!result.successful()) {
                mWasError = true;
                BackupDriveServiceHelper.removeFolder(mDriveService, backupRootFolderId);
                mErrorCallback.onError(BackupErrors.unableToCreateImagesBackup());
                return null;
            }
        }

        long sizeInBytes = (long) mTotalBackupSize;
        updateBackupFolderName(backupRootFolderId, String.valueOf(sizeInBytes));

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

    private void updateBackupFolderName(String backupRootFolderId, String backupSize) {
        if (mDriveService == null) {
            Log.d("tag", "CreateBackupTask->updateBackupFolderName()->BAD_DRIVE_SERVICE");
            return;
        }

        String folderName = BackupDriveService.generateBackupFolderName(mBackupNote, backupSize);

        try {
            File fileMetadata = new File();
            fileMetadata.setName(folderName);

            mDriveService.files().update(backupRootFolderId, fileMetadata).execute();
        } catch (IOException e) {
            Log.d("tag", e.toString());
        }
    }

    private static double round(double value, int places) {
        if (places < 0) throw new IllegalArgumentException();

        BigDecimal bd = BigDecimal.valueOf(value);
        bd = bd.setScale(places, RoundingMode.HALF_UP);
        return bd.doubleValue();
    }

//    private boolean saveAppSettings(Context context, String backupFolderId) {
//        if (isCancelled()) {
//            return false;
//        }
//
//        publishProgress(new BackupTaskProgress(SAVING_APP_SETTINGS_STAGE));
//
//        String appSettings = AppStorages.get().notesStorage().getStringifiedAppSettings(context);
//        mTotalBackupSize = mTotalBackupSize + appSettings.getBytes().length;
////        Log.d("tag", "CreateBackupTask->saveAppSettings()->APP_SETTINGS: " + appSettings);
//
//        String appSettingsFolderId = createFolder(BackupDriveService.APP_SETTINGS_FOLDER_NAME, backupFolderId);
//
//        File file = null;
//        try {
//            File fileMetadata = new File();
//            fileMetadata.setName(BackupDriveService.APP_SETTINGS_FILE_NAME);
//            fileMetadata.setParents(Collections.singletonList(appSettingsFolderId));
//            fileMetadata.setMimeType("text/xml");
//
//            byte[] dataBytes = appSettings.getBytes(StandardCharsets.UTF_8);
//
//            file = mDriveService.files().create(fileMetadata, new ByteArrayContent("", dataBytes))
//                    .setFields("id")
//                    .execute();
//        } catch (IOException e) {
//            Log.d("tag", "CreateBackupTask->saveAppSettings()->ERROR: " + e.toString());
//            return false;
//        }
//
//        return true;
//    }

//    private boolean saveNotesListSettings(Context context, String backupFolderId) {
//        if (isCancelled()) {
//            return false;
//        }
//
//        publishProgress(new BackupTaskProgress(SAVING_APP_SETTINGS_STAGE));
//
//        NotesListSettings notesListSettings = AppStorages.get().notesStorage().getNotesListSettings(context);
//        String stringifiedNotesListSettings = notesListSettings.stringify();
//        mTotalBackupSize = mTotalBackupSize + stringifiedNotesListSettings.getBytes().length;
////        Log.d("tag", "CreateBackupTask->saveNotesListSettings()->NOTES_LIST_SETTINGS: " + stringifiedNotesListSettings);
//
//        String notesListSettingsFolderId = createFolder(BackupDriveService.NOTES_LIST_SETTINGS_FOLDER_NAME, backupFolderId);
//
//        File file = null;
//        try {
//            File fileMetadata = new File();
//            fileMetadata.setName(BackupDriveService.NOTES_LIST_SETTINGS_FILE_NAME);
//            fileMetadata.setParents(Collections.singletonList(notesListSettingsFolderId));
//            fileMetadata.setMimeType("text/xml");
//
//            byte[] dataBytes = stringifiedNotesListSettings.getBytes(StandardCharsets.UTF_8);
//
//            file = mDriveService.files().create(fileMetadata, new ByteArrayContent("", dataBytes))
//                    .setFields("id")
//                    .execute();
//        } catch (IOException e) {
//            Log.d("tag", "CreateBackupTask->saveNotesListSettings()->ERROR: " + e.toString());
//            return false;
//        }
//
//        return true;
//    }

//    private boolean saveCategories(Context context, String backupFolderId) {
//        if (isCancelled()) {
//            return false;
//        }
//
//        publishProgress(new BackupTaskProgress(SAVING_APP_SETTINGS_STAGE));
//
//        AppNotesStorage notesStorage = AppStorages.get().notesStorage();
//
//        String categoriesList = notesStorage.getStringifiedCategoriesList(context);
//        mTotalBackupSize = mTotalBackupSize + categoriesList.getBytes().length;
//
//        String categoriesFolderId = createFolder(BackupDriveService.CATEGORIES_FOLDER_NAME, backupFolderId);
//
//        File file = null;
//        try {
//            File fileMetadata = new File();
//            fileMetadata.setName(BackupDriveService.CATEGORIES_FILE_NAME);
//            fileMetadata.setParents(Collections.singletonList(categoriesFolderId));
//            fileMetadata.setMimeType("text/xml");
//
//            byte[] dataBytes = categoriesList.getBytes(StandardCharsets.UTF_8);
//
//            file = mDriveService.files().create(fileMetadata, new ByteArrayContent("", dataBytes))
//                    .setFields("id")
//                    .execute();
//        } catch (IOException e) {
//            Log.d("tag", "CreateBackupTask->saveCategories()->ERROR: " + e.toString());
//            return false;
//        }
//
//        return true;
//    }

//    private boolean saveNotes(Context context, String backupFolderId) {
//        if (isCancelled()) {
//            return false;
//        }
//
//        publishProgress(new BackupTaskProgress(SAVING_NOTES_TEXT_STAGE));
//
//        AppNotesStorage notesStorage = AppStorages.get().notesStorage();
//
//        NotesList notesList = notesStorage.getNotesList(context);
//        List<Note> notes = notesList.notesList();
//
//        Log.d("tag", "CreateBackupTask->saveNotes()->NOTES_COUNT: " + notes.size());
//
//        String notesFolderId = createFolder(BackupDriveService.NOTES_FOLDER_NAME, backupFolderId);
//
//        int notesCounter = 0;
//        for (int i = 0; i < notes.size(); ++i) {
//            Note note = notes.get(i);
//            if (!note.deleted()) {
//                Log.d("tag", "CreateBackupTask->saveNotes()->SAVING_NOTE: " + String.valueOf(++notesCounter));
//
//                String stringifiedNote = note.stringify();
//                mTotalBackupSize = mTotalBackupSize + stringifiedNote.getBytes().length;
//
//                File file = null;
//                try {
//                    File fileMetadata = new File();
//                    fileMetadata.setName(String.valueOf(i));
//                    fileMetadata.setParents(Collections.singletonList(notesFolderId));
//                    fileMetadata.setMimeType("text/xml");
//
//                    byte[] dataBytes = stringifiedNote.getBytes(StandardCharsets.UTF_8);
//
//                    file = mDriveService.files().create(fileMetadata, new ByteArrayContent("", dataBytes))
//                            .setFields("id")
//                            .execute();
//                } catch (IOException e) {
//                    Log.d("tag", "CreateBackupTask->saveNotes()->ERROR: " + e.toString());
//                    return false;
//                }
//            }
//        }
//
//        return true;
//    }

//    private boolean saveNotesImages(Context context, String backupFolderId) {
//        if (isCancelled()) {
//            return false;
//        }
//
//        publishProgress(new BackupTaskProgress(SAVING_NOTES_IMAGES_STAGE));
//
//        AppNotesStorage notesStorage = AppStorages.get().notesStorage();
//
//        NotesList notesList = notesStorage.getNotesList(context);
//        List<Note> notes = notesList.notesList();
//
//        String imagesFolderId = createFolder(BackupDriveService.IMAGES_FOLDER_NAME, backupFolderId);
//
//        int totalImagesCount = 0;
//        for (int i = 0; i < notes.size(); ++i) {
//            Note note = notes.get(i);
//            if (!note.deleted()) {
//                totalImagesCount = totalImagesCount + note.images().size();
//            }
//        }
//
//        int imagesCounter = 0;
//        for (int i = 0; i < notes.size(); ++i) {
//            Note note = notes.get(i);
//            if (!note.deleted()) {
//                List<String> imagesIds = note.images();
//                String noteId = null;
//                if (imagesIds.size() > 0) {
//                    noteId = String.valueOf(note.id());
//                }
//
//                for (int j = 0; j < imagesIds.size(); ++j) {
//                    if (isCancelled()) {
//                        return false;
//                    }
//
//                    Log.d("tag", "CreateBackupTask->saveNotesImages()->SAVING_IMAGE: " + String.valueOf(++imagesCounter));
//
//                    publishProgress(new BackupTaskProgress(SAVING_NOTES_IMAGES_STAGE, imagesCounter, totalImagesCount));
//
//                    String imageId = imagesIds.get(j);
//
//                    String imageData = notesStorage.getNoteImage(context, noteId, imageId);
//                    mTotalBackupSize = mTotalBackupSize + imageData.getBytes().length;
//
//                    File file = null;
//                    try {
//                        File fileMetadata = new File();
//                        fileMetadata.setName(String.valueOf(i));
//                        fileMetadata.setParents(Collections.singletonList(imagesFolderId));
//                        fileMetadata.setMimeType("text/xml");
//
//                        byte[] dataBytes = imageData.getBytes(StandardCharsets.UTF_8);
//
//                        file = mDriveService.files().create(fileMetadata, new ByteArrayContent("", dataBytes))
//                                .setFields("id")
//                                .execute();
//                    } catch (IOException e) {
//                        Log.d("tag", "CreateBackupTask->saveNotesImages()->ERROR: " + e.toString());
//                        return false;
//                    }
//                }
//            }
//        }
//
//        return true;
//    }

//    private String getRootFolderId() {
//        String rootFolderName = BackupDriveService.DRIVE_ROOT_FOLDER_NAME;
//        String rootFolderId = null;
//
//        if (mDriveService == null) {
//            Log.d("tag", "CreateBackupTask->getRootFolderId()->BAD_DRIVE_SERVICE");
//            return null;
//        }
//
//        try {
//            FileList files = mDriveService.files().list()
//                    .setSpaces("appDataFolder")
//                    .setFields("nextPageToken, files(id, name)")
//                    .setPageSize(1000)
//                    .setQ("mimeType='application/vnd.google-apps.folder' and name='" + rootFolderName + "'")
//                    .execute();
//
//            for (File file : files.getFiles()) {
//                if (file.getName().equals(rootFolderName)) {
//                    rootFolderId = file.getId();
//                    break;
//                }
//            }
//        } catch (IOException e) {
//            Log.d("tag", "GetBackupDataTask.getRootFolderId()->IOEXCEPTION");
//            return null;
//        }
//
//        return rootFolderId;
//    }

//    private String createFolder(String folderName, String rootFolderId) {
//        if (folderName == null) {
//            Log.d("tag", "CreateBackupTask->createFolder()->BAD_FOLDER_NAME");
//            return null;
//        }
//
//        String folderId = null;
//
//        if (mDriveService == null) {
//            Log.d("tag", "CreateBackupTask->createFolder()->BAD_DRIVE_SERVICE");
//            return null;
//        }
//
//        try {
//            File fileMetadata = new File();
//            fileMetadata.setName(folderName);
//            if (rootFolderId == null) {
//                fileMetadata.setParents(Collections.singletonList("appDataFolder"));
//            } else {
//                fileMetadata.setParents(Collections.singletonList(rootFolderId));
//            }
//            fileMetadata.setMimeType("application/vnd.google-apps.folder");
//
//            File file = mDriveService.files().create(fileMetadata)
//                    .setFields("id")
//                    .execute();
//
//            folderId = file.getId();
//        } catch (IOException e) {
//            Log.d("tag", e.toString());
//        }
//
//        return folderId;
//    }

//    private void removeFolder(String folderId) {
//        try {
//            mDriveService.files().delete(folderId).execute();
//        } catch (IOException e) {
//            Log.d("tag", "CreateBackupTask->removeFolder()->IOEXCEPTION: " + e.getMessage());
//        }
//    }
}


//package com.post.notes.modules.backup.backup_drive_service.tasks.create_backup;
//
//
//import android.content.Context;
//import android.util.Log;
//
//import com.google.api.client.http.ByteArrayContent;
//import com.google.api.services.drive.Drive;
//import com.google.api.services.drive.model.File;
//import com.google.api.services.drive.model.FileList;
//import com.post.notes.common.app_storages.AppStorages;
//import com.post.notes.common.app_storages.notes_storage.AppNotesStorage;
//import com.post.notes.common.autonomous_task.AutonomousTask;
//import com.post.notes.common.data.hybrid_objects.note.Note;
//import com.post.notes.common.data.hybrid_objects.notes_list.NotesList;
//import com.post.notes.common.data.hybrid_objects.notes_list_settings.NotesListSettings;
//import com.post.notes.common.task_runner.TaskRunner;
//import com.post.notes.modules.backup.backup_drive_service.BackupDriveService;
//import com.post.notes.modules.backup.backup_drive_service.callbacks.create_backup.CreateBackupTaskCancelledCallback;
//import com.post.notes.modules.backup.backup_drive_service.callbacks.create_backup.CreateBackupTaskErrorCallback;
//import com.post.notes.modules.backup.backup_drive_service.callbacks.create_backup.CreateBackupTaskFinishedCallback;
//import com.post.notes.modules.backup.backup_drive_service.callbacks.create_backup.CreateBackupTaskProgressChangedCallback;
//import com.post.notes.modules.backup.backup_drive_service.data.task_progress.BackupTaskProgress;
//import com.post.notes.modules.backup.module_errors.BackupErrors;
//
//import java.io.ByteArrayOutputStream;
//import java.io.IOException;
//import java.nio.charset.StandardCharsets;
//import java.util.Collections;
//import java.util.List;
//
//public class CreateBackupTask extends AutonomousTask<Object, Object, Object> {
//    public static final String PREPARING_DATA_STAGE = "PREPARING_DATA_STAGE";
//    public static final String SAVING_APP_SETTINGS_STAGE = "SAVING_APP_SETTINGS_STAGE";
//    public static final String SAVING_NOTES_TEXT_STAGE = "SAVING_NOTES_TEXT_STAGE";
//    public static final String SAVING_NOTES_IMAGES_STAGE = "SAVING_NOTES_IMAGES_STAGE";
//
//    private String mBackupNote;
//    private boolean mNeedSaveImages;
//    private Drive mDriveService;
//    private CreateBackupTaskProgressChangedCallback mProgressChangedCallback;
//    private CreateBackupTaskFinishedCallback mFinishedCallback;
//    private CreateBackupTaskCancelledCallback mCancelledCallback;
//    private CreateBackupTaskErrorCallback mErrorCallback;
//    private boolean mWasError;
//
//    public CreateBackupTask(String backupNote,
//                            boolean needSaveImages,
//                            Drive driveService,
//                            CreateBackupTaskProgressChangedCallback progressChangedCallback,
//                            CreateBackupTaskFinishedCallback finishedCallback,
//                            CreateBackupTaskCancelledCallback cancelledCallback,
//                            CreateBackupTaskErrorCallback errorCallback) {
//        mBackupNote = backupNote;
//        mNeedSaveImages = needSaveImages;
//        mDriveService = driveService;
//
//        mProgressChangedCallback = progressChangedCallback;
//        mFinishedCallback = finishedCallback;
//        mCancelledCallback = cancelledCallback;
//        mErrorCallback = errorCallback;
//
//        mWasError = false;
//    }
//
//    @Override
//    public void runOnRunner(TaskRunner runner, Object... params) {
//        if (params == null || params.length <= 0) {
//            mWasError = true;
//            mErrorCallback.onError(BackupErrors.badContext());
//            return;
//        }
//
//        Context context = (Context) params[0];
//        if (context == null) {
//            mWasError = true;
//            mErrorCallback.onError(BackupErrors.badContext());
//            return;
//        }
//
//        runner.run(this, context);
//    }
//
////    @Override
////    protected Object doInBackground(Object... objects) {
////        mWasError = false;
////
////        publishProgress(new BackupTaskProgress(PREPARING_DATA_STAGE));
////
////        for (int i = 0; i < 7; ++i) {
////            if (isCancelled()) {
////                break;
////            }
////
////            if (i == 1) {
////                publishProgress(new BackupTaskProgress(SAVING_APP_SETTINGS_STAGE));
////            } else if (i == 2) {
////                publishProgress(new BackupTaskProgress(SAVING_NOTES_TEXT_STAGE));
////            } else if (i > 2) {
////                publishProgress(new BackupTaskProgress(SAVING_NOTES_IMAGES_STAGE, i - 2, 7 - 2));
////            }
////
////            Log.d("tag", "CREATING_BACKUP: " + i);
////            try {
////                Thread.sleep(800);
////            } catch (InterruptedException e) {
////                e.printStackTrace();
////            }
////        }
////
////        return null;
////    }
//    @Override
//    protected Object doInBackground(Object... objects) {
//        mWasError = false;
//
//        publishProgress(new BackupTaskProgress(PREPARING_DATA_STAGE));
//
//        Context context = (Context) objects[0];
//
//        String rootFolderId = getRootFolderId();
//        if (isCancelled()) {
//            return null;
//        }
//
//        if (rootFolderId == null) {
//            rootFolderId = createFolder(BackupDriveService.DRIVE_ROOT_FOLDER_NAME, null);
//        }
//        if (isCancelled()) {
//            return null;
//        }
//        if (rootFolderId == null) {
//            mWasError = true;
//            mErrorCallback.onError(BackupErrors.driveServiceNotInitialized());
//            return null;
//        }
//
//        // ===
//        AppNotesStorage notesStorage = AppStorages.get().notesStorage();
//
//        String stringifiedAppSettings = notesStorage.getStringifiedAppSettings(context);
//        if (stringifiedAppSettings == null) {
//            Log.d("tag", "CreateBackupTask->APP_SETTINGS_IS_NULL");
//        }
//
//        if (isCancelled()) {
//            return null;
//        }
//
//        NotesListSettings notesListSettings = notesStorage.getNotesListSettings(context);
//        if (notesListSettings == null || notesListSettings.isEmpty()) {
//            Log.d("tag", "CreateBackupTask->NOTES_LIST_SETTINGS_IS_EMPTY");
//        }
//
//        if (isCancelled()) {
//            return null;
//        }
//
//        String stringifiedCategoriesList = notesStorage.getStringifiedCategoriesList(context);
//        if (stringifiedCategoriesList == null) {
//            Log.d("tag", "CreateBackupTask->CATEGORIES_LIST_IS_NULL");
//        }
//
//        if (isCancelled()) {
//            return null;
//        }
//
//        NotesList notesList = notesStorage.getNotesList(context);
//        if (notesList == null || notesList.isEmpty()) {
//            Log.d("tag", "CreateBackupTask->NOTES_LIST_IS_EMPTY");
//        }
//
//        if (isCancelled()) {
//            return null;
//        }
//
//        // =====
//
//        // =====
//        String backupFolderName = BackupDriveService.generateBackupFolderName(mBackupNote);
//        Log.d("tag", "CreateBackupTask->BACKUP_FOLDER_NAME: " + backupFolderName);
//
//        String backupRootFolderId = createFolder(backupFolderName, rootFolderId);
//        if (backupRootFolderId == null) {
//            mWasError = true;
//            mErrorCallback.onError(BackupErrors.badBackupRootFolderId());
//            return null;
//        }
//
//        if (isCancelled()) {
//            removeFolder(backupRootFolderId);
//            return null;
//        }
//
//        boolean appSettingsSaved = saveAppSettings(context, backupRootFolderId);
//        if (isCancelled()) {
//            removeFolder(backupRootFolderId);
//            return null;
//        }
//
//        boolean notesListSettingsSaved = saveNotesListSettings(context, backupRootFolderId);
//        if (isCancelled()) {
//            removeFolder(backupRootFolderId);
//            return null;
//        }
//
//        boolean categoriesSaved = saveCategories(context, backupRootFolderId);
//        if (isCancelled()) {
//            removeFolder(backupRootFolderId);
//            return null;
//        }
//
//        boolean notesSaved = saveNotes(context, backupRootFolderId);
//        if (isCancelled()) {
//            removeFolder(backupRootFolderId);
//            return null;
//        }
//
//        boolean imagesSaved = false;
//        if (mNeedSaveImages) {
//            imagesSaved = saveNotesImages(context, backupRootFolderId);
//            if (isCancelled()) {
//                removeFolder(backupRootFolderId);
//                return null;
//            }
//        }
//
//        return null;
//    }
//
//    @Override
//    protected void onPostExecute(Object o) {
//        if (!mWasError) {
//            mFinishedCallback.onFinished();
//        }
//    }
//
//    @Override
//    protected void onProgressUpdate(Object... values) {
//        if (values == null || values.length <= 0) {
//            return;
//        }
//
//        BackupTaskProgress progress = (BackupTaskProgress) values[0];
//        mProgressChangedCallback.onChanged(progress);
//    }
//
//    @Override
//    protected void onCancelled() {
//        mCancelledCallback.onCancelled();
//    }
//
//    private boolean saveAppSettings(Context context, String backupFolderId) {
//        if (isCancelled()) {
//            return false;
//        }
//
//        publishProgress(new BackupTaskProgress(SAVING_APP_SETTINGS_STAGE));
//
//        String appSettings = AppStorages.get().notesStorage().getStringifiedAppSettings(context);
//        Log.d("tag", "CreateBackupTask->saveAppSettings()->APP_SETTINGS: " + appSettings);
//
//        String appSettingsFolderId = createFolder(BackupDriveService.APP_SETTINGS_FOLDER_NAME, backupFolderId);
//
//        File file = null;
//        try {
//            File fileMetadata = new File();
//            fileMetadata.setName(BackupDriveService.APP_SETTINGS_FILE_NAME);
//            fileMetadata.setParents(Collections.singletonList(appSettingsFolderId));
//            fileMetadata.setMimeType("text/xml");
//
//            byte[] dataBytes = appSettings.getBytes(StandardCharsets.UTF_8);
//
//            file = mDriveService.files().create(fileMetadata, new ByteArrayContent("", dataBytes))
//                    .setFields("id")
//                    .execute();
//        } catch (IOException e) {
//            Log.d("tag", "CreateBackupTask->saveAppSettings()->ERROR: " + e.toString());
//            return false;
//        }
//
//        return true;
//    }
//
//    private boolean saveNotesListSettings(Context context, String backupFolderId) {
//        if (isCancelled()) {
//            return false;
//        }
//
//        publishProgress(new BackupTaskProgress(SAVING_APP_SETTINGS_STAGE));
//
//        NotesListSettings notesListSettings = AppStorages.get().notesStorage().getNotesListSettings(context);
//        String stringifiedNotesListSettings = notesListSettings.stringify();
//        Log.d("tag", "CreateBackupTask->saveNotesListSettings()->NOTES_LIST_SETTINGS: " + stringifiedNotesListSettings);
//
//        String notesListSettingsFolderId = createFolder(BackupDriveService.NOTES_LIST_SETTINGS_FOLDER_NAME, backupFolderId);
//
//        File file = null;
//        try {
//            File fileMetadata = new File();
//            fileMetadata.setName(BackupDriveService.NOTES_LIST_SETTINGS_FILE_NAME);
//            fileMetadata.setParents(Collections.singletonList(notesListSettingsFolderId));
//            fileMetadata.setMimeType("text/xml");
//
//            byte[] dataBytes = stringifiedNotesListSettings.getBytes(StandardCharsets.UTF_8);
//
//            file = mDriveService.files().create(fileMetadata, new ByteArrayContent("", dataBytes))
//                    .setFields("id")
//                    .execute();
//        } catch (IOException e) {
//            Log.d("tag", "CreateBackupTask->saveNotesListSettings()->ERROR: " + e.toString());
//            return false;
//        }
//
//        return true;
//    }
//
//    private boolean saveCategories(Context context, String backupFolderId) {
//        if (isCancelled()) {
//            return false;
//        }
//
//        publishProgress(new BackupTaskProgress(SAVING_APP_SETTINGS_STAGE));
//
//        AppNotesStorage notesStorage = AppStorages.get().notesStorage();
//
//        String categoriesList = notesStorage.getStringifiedCategoriesList(context);
//
//        String categoriesFolderId = createFolder(BackupDriveService.CATEGORIES_FOLDER_NAME, backupFolderId);
//
//        File file = null;
//        try {
//            File fileMetadata = new File();
//            fileMetadata.setName(BackupDriveService.CATEGORIES_FILE_NAME);
//            fileMetadata.setParents(Collections.singletonList(categoriesFolderId));
//            fileMetadata.setMimeType("text/xml");
//
//            byte[] dataBytes = categoriesList.getBytes(StandardCharsets.UTF_8);
//
//            file = mDriveService.files().create(fileMetadata, new ByteArrayContent("", dataBytes))
//                    .setFields("id")
//                    .execute();
//        } catch (IOException e) {
//            Log.d("tag", "CreateBackupTask->saveCategories()->ERROR: " + e.toString());
//            return false;
//        }
//
//        return true;
//    }
//
//    private boolean saveNotes(Context context, String backupFolderId) {
//        if (isCancelled()) {
//            return false;
//        }
//
//        publishProgress(new BackupTaskProgress(SAVING_NOTES_TEXT_STAGE));
//
//        AppNotesStorage notesStorage = AppStorages.get().notesStorage();
//
//        NotesList notesList = notesStorage.getNotesList(context);
//        List<Note> notes = notesList.notesList();
//
//        Log.d("tag", "CreateBackupTask->saveNotes()->NOTES_COUNT: " + notes.size());
//
//        String notesFolderId = createFolder(BackupDriveService.NOTES_FOLDER_NAME, backupFolderId);
//
//        int notesCounter = 0;
//        for (int i = 0; i < notes.size(); ++i) {
//            Note note = notes.get(i);
//            if (!note.deleted()) {
//                Log.d("tag", "CreateBackupTask->saveNotes()->SAVING_NOTE: " + String.valueOf(++notesCounter));
//
//                String stringifiedNote = note.stringify();
//
//                File file = null;
//                try {
//                    File fileMetadata = new File();
//                    fileMetadata.setName(String.valueOf(i));
//                    fileMetadata.setParents(Collections.singletonList(notesFolderId));
//                    fileMetadata.setMimeType("text/xml");
//
//                    byte[] dataBytes = stringifiedNote.getBytes(StandardCharsets.UTF_8);
//
//                    file = mDriveService.files().create(fileMetadata, new ByteArrayContent("", dataBytes))
//                            .setFields("id")
//                            .execute();
//                } catch (IOException e) {
//                    Log.d("tag", "CreateBackupTask->saveNotes()->ERROR: " + e.toString());
//                    return false;
//                }
//            }
//        }
//
//        return true;
//    }
//
//    private boolean saveNotesImages(Context context, String backupFolderId) {
//        if (isCancelled()) {
//            return false;
//        }
//
//        publishProgress(new BackupTaskProgress(SAVING_NOTES_IMAGES_STAGE));
//
//        AppNotesStorage notesStorage = AppStorages.get().notesStorage();
//
//        NotesList notesList = notesStorage.getNotesList(context);
//        List<Note> notes = notesList.notesList();
//
//        String imagesFolderId = createFolder(BackupDriveService.IMAGES_FOLDER_NAME, backupFolderId);
//
//        int totalImagesCount = 0;
//        for (int i = 0; i < notes.size(); ++i) {
//            Note note = notes.get(i);
//            if (!note.deleted()) {
//                totalImagesCount = totalImagesCount + note.images().size();
//            }
//        }
//
//        int imagesCounter = 0;
//        for (int i = 0; i < notes.size(); ++i) {
//            Note note = notes.get(i);
//            if (!note.deleted()) {
//                List<String> imagesIds = note.images();
//                String noteId = null;
//                if (imagesIds.size() > 0) {
//                    noteId = String.valueOf(note.id());
//                }
//
//                for (int j = 0; j < imagesIds.size(); ++j) {
//                    if (isCancelled()) {
//                        return false;
//                    }
//
//                    Log.d("tag", "CreateBackupTask->saveNotesImages()->SAVING_IMAGE: " + String.valueOf(++imagesCounter));
//
//                    publishProgress(new BackupTaskProgress(SAVING_NOTES_IMAGES_STAGE, imagesCounter, totalImagesCount));
//
//                    String imageId = imagesIds.get(j);
//
//                    String imageData = notesStorage.getNoteImage(context, noteId, imageId);
//
//                    File file = null;
//                    try {
//                        File fileMetadata = new File();
//                        fileMetadata.setName(String.valueOf(i));
//                        fileMetadata.setParents(Collections.singletonList(imagesFolderId));
//                        fileMetadata.setMimeType("text/xml");
//
//                        byte[] dataBytes = imageData.getBytes(StandardCharsets.UTF_8);
//
//                        file = mDriveService.files().create(fileMetadata, new ByteArrayContent("", dataBytes))
//                                .setFields("id")
//                                .execute();
//                    } catch (IOException e) {
//                        Log.d("tag", "CreateBackupTask->saveNotesImages()->ERROR: " + e.toString());
//                        return false;
//                    }
//                }
//            }
//        }
//
//        return true;
//    }
//
//    private String getRootFolderId() {
//        String rootFolderName = BackupDriveService.DRIVE_ROOT_FOLDER_NAME;
//        String rootFolderId = null;
//
//        if (mDriveService == null) {
//            Log.d("tag", "CreateBackupTask->getRootFolderId()->BAD_DRIVE_SERVICE");
//            return null;
//        }
//
//        try {
//            FileList files = mDriveService.files().list()
//                    .setSpaces("appDataFolder")
//                    .setFields("nextPageToken, files(id, name)")
//                    .setPageSize(1000)
//                    .setQ("mimeType='application/vnd.google-apps.folder' and name='" + rootFolderName + "'")
//                    .execute();
//
//            for (File file : files.getFiles()) {
//                if (file.getName().equals(rootFolderName)) {
//                    rootFolderId = file.getId();
//                    break;
//                }
//            }
//        } catch (IOException e) {
//            Log.d("tag", "GetBackupDataTask.getRootFolderId()->IOEXCEPTION");
//            return null;
//        }
//
//        return rootFolderId;
//    }
//
//    private String createFolder_V2(String folderName, List<String> parentFolderIds) {
//        if (folderName == null) {
//            Log.d("tag", "CreateBackupTask->createFolder()->BAD_FOLDER_NAME");
//            return null;
//        }
//
//        String folderId = null;
//
//        if (mDriveService == null) {
//            Log.d("tag", "CreateBackupTask->createFolder()->BAD_DRIVE_SERVICE");
//            return null;
//        }
//
//        try {
//            File fileMetadata = new File();
//            fileMetadata.setName(folderName);
//            if (parentFolderIds == null) {
//                fileMetadata.setParents(Collections.singletonList("appDataFolder"));
//            } else {
//                fileMetadata.setParents(parentFolderIds);
//            }
//            fileMetadata.setMimeType("application/vnd.google-apps.folder");
//
//            File file = mDriveService.files().create(fileMetadata)
//                    .setFields("id")
//                    .execute();
//
//            folderId = file.getId();
//        } catch (IOException e) {
//            Log.d("tag", e.toString());
//        }
//
//        return folderId;
//    }
//
//    private String createFolder(String folderName, String rootFolderId) {
//        if (folderName == null) {
//            Log.d("tag", "CreateBackupTask->createFolder()->BAD_FOLDER_NAME");
//            return null;
//        }
//
//        String folderId = null;
//
//        if (mDriveService == null) {
//            Log.d("tag", "CreateBackupTask->createFolder()->BAD_DRIVE_SERVICE");
//            return null;
//        }
//
//        try {
//            File fileMetadata = new File();
//            fileMetadata.setName(folderName);
//            if (rootFolderId == null) {
//                fileMetadata.setParents(Collections.singletonList("appDataFolder"));
//            } else {
//                fileMetadata.setParents(Collections.singletonList(rootFolderId));
//            }
//            fileMetadata.setMimeType("application/vnd.google-apps.folder");
//
//            File file = mDriveService.files().create(fileMetadata)
//                    .setFields("id")
//                    .execute();
//
//            folderId = file.getId();
//        } catch (IOException e) {
//            Log.d("tag", e.toString());
//        }
//
//        return folderId;
//    }
//
//    private void removeFolder(String folderId) {
//        try {
//            mDriveService.files().delete(folderId).execute();
//        } catch (IOException e) {
//            Log.d("tag", "CreateBackupTask->removeFolder()->IOEXCEPTION: " + e.getMessage());
//        }
//    }
//
////    private boolean saveAppSettings(Context context, String backupFolderId) {
////        String appSettings = AppStorages.get().notesStorage().getStringifiedAppSettings(context);
////        Log.d("tag", "APP_SETTINGS: " + appSettings);
////
////        String testFolderId = createFolder("TEST_FOLDER", backupFolderId);
////        Log.d("tag", "TEST_FOLDER_ID: " + testFolderId);
////
////        File file = null;
////        try {
////            File fileMetadata = new File();
////            fileMetadata.setName(BackupDriveService.APP_SETTINGS_FILE_NAME);
////            fileMetadata.setParents(Collections.singletonList(testFolderId));
////            fileMetadata.setMimeType("text/xml");
////
////            byte[] dataBytes = appSettings.getBytes(StandardCharsets.UTF_8);
////
////            file = mDriveService.files().create(fileMetadata, new ByteArrayContent("", dataBytes))
////                    .setFields("id")
////                    .execute();
////        } catch (IOException e) {
////            Log.d("tag", "CreateBackupTask->saveAppSettings()->ERROR: " + e.toString());
////            return false;
////        }
////
////        // ===
////        FileList files = null;
////
////        try {
////            files = mDriveService.files().list()
////                    .setSpaces("appDataFolder")
////                    .setFields("nextPageToken, files(id, name)")
////                    .setQ("mimeType='text/xml' and '" + testFolderId + "' in parents")
////                    .setPageSize(1000)
////                    .execute();
////        } catch (IOException e) {
////            Log.d("tag", "RestoreDataBaseFromBackupTask->getBackupContent()->IOEXCEPTION: " + e.getMessage());
////            return false;
////        }
////
////        for (File f : files.getFiles()) {
////            Log.d("tag", "SAVE_FILE: " + f.getName());
////
////            if (f.getName().equalsIgnoreCase(BackupDriveService.APP_SETTINGS_FILE_NAME)) {
////                ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
////                try {
////                    mDriveService.files().get(file.getId()).executeMediaAndDownloadTo(outputStream);
////
////                    String appSettingsOnDrive = outputStream.toString(StandardCharsets.UTF_8.name());
////                    Log.d("tag", "===> SAVED_APP_SETTINGS: " + appSettingsOnDrive + " <===");
////                } catch (IOException e) {
////                    e.printStackTrace();
////                }
////            }
//////            try {
//////                mDriveService.files().get(file.getId()).executeMediaAndDownloadTo(outputStream);
//////            } catch (IOException e) {
//////                e.printStackTrace();
//////            }
////        }
////        // ===
////
//////        FileList files = null;
//////
//////        try {
//////            files = mDriveService.files().list()
//////                    .setSpaces("appDataFolder")
//////                    .setFields("nextPageToken, files(id, name)")
//////                    .setQ("mimeType='application/vnd.google-apps.folder' and '" + backupFolderId + "' in parents")
//////                    .setPageSize(1000)
//////                    .execute();
//////        } catch (IOException e) {
//////            Log.d("tag", "RestoreDataBaseFromBackupTask->getBackupContent()->IOEXCEPTION: " + e.getMessage());
//////            return false;
//////        }
//////
//////        Log.d("tag", "FILES_SIZE: " + files.getFiles().size());
//////
//////        for (File f : files.getFiles()) {
//////            Log.d("tag", "CREATED_FILE_NAME: " + f.getName());
//////        }
////
////
//////        File file = null;
//////        try {
//////            File fileMetadata = new File();
//////            fileMetadata.setName(BackupDriveService.APP_SETTINGS_FILE_NAME);
//////            fileMetadata.setParents(Collections.singletonList(backupFolderId));
//////            fileMetadata.setMimeType("text/xml");
//////
//////            byte[] dataBytes = appSettings.getBytes(StandardCharsets.UTF_8);
//////
//////            file = mDriveService.files().create(fileMetadata, new ByteArrayContent("", dataBytes))
//////                    .setFields("id")
//////                    .execute();
//////        } catch (IOException e) {
//////            Log.d("tag", "CreateBackupTask->saveAppSettings()->ERROR: " + e.toString());
//////            return false;
//////        }
//////
//////        // ===
//////        FileList files = null;
//////
//////        try {
//////            files = mDriveService.files().list()
//////                    .setSpaces("appDataFolder")
//////                    .setFields("nextPageToken, files(id, name)")
//////                    .setQ("mimeType='text/xml' and '" + backupFolderId + "' in parents")
//////                    .setPageSize(1000)
//////                    .execute();
//////        } catch (IOException e) {
//////            Log.d("tag", "RestoreDataBaseFromBackupTask->getBackupContent()->IOEXCEPTION: " + e.getMessage());
//////            return false;
//////        }
//////
//////        for (File f : files.getFiles()) {
//////            Log.d("tag", "SAVE_FILE: " + f.getName());
//////
//////            if (f.getName().equalsIgnoreCase(BackupDriveService.APP_SETTINGS_FILE_NAME)) {
//////                ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
//////                try {
//////                    mDriveService.files().get(file.getId()).executeMediaAndDownloadTo(outputStream);
//////
//////                    String appSettingsOnDrive = outputStream.toString(StandardCharsets.UTF_8.name());
//////                    Log.d("tag", "===> SAVED_APP_SETTINGS: " + appSettingsOnDrive + " <===");
//////                } catch (IOException e) {
//////                    e.printStackTrace();
//////                }
//////            }
////////            try {
////////                mDriveService.files().get(file.getId()).executeMediaAndDownloadTo(outputStream);
////////            } catch (IOException e) {
////////                e.printStackTrace();
////////            }
//////        }
////        // ===
////
////
////        return true;
////    }
////    private boolean saveAppSettings(Context context, String backupFolderId) {
////        String appSettings = AppStorages.get().notesStorage().getStringifiedAppSettings(context);
////        Log.d("tag", "APP_SETTINGS: " + appSettings);
////
////        File file = null;
////        try {
////            File fileMetadata = new File();
////            fileMetadata.setName(BackupDriveService.APP_SETTINGS_FILE_NAME);
////            fileMetadata.setParents(Collections.singletonList(backupFolderId));
////            fileMetadata.setMimeType("text/xml");
////
////            byte[] dataBytes = appSettings.getBytes(StandardCharsets.UTF_8);
////
////            file = mDriveService.files().create(fileMetadata, new ByteArrayContent("", dataBytes))
////                    .setFields("id")
////                    .execute();
////        } catch (IOException e) {
////            Log.d("tag", "CreateBackupTask->saveAppSettings()->ERROR: " + e.toString());
////            return false;
////        }
////
////        // ===
////        FileList files = null;
////
////        try {
////            files = mDriveService.files().list()
////                    .setSpaces("appDataFolder")
////                    .setFields("nextPageToken, files(id, name)")
////                    .setQ("mimeType='text/xml' and '" + backupFolderId + "' in parents")
////                    .setPageSize(1000)
////                    .execute();
////        } catch (IOException e) {
////            Log.d("tag", "RestoreDataBaseFromBackupTask->getBackupContent()->IOEXCEPTION: " + e.getMessage());
////            return false;
////        }
////
////        for (File f : files.getFiles()) {
////            Log.d("tag", "SAVE_FILE: " + f.getName());
////
////            if (f.getName().equalsIgnoreCase(BackupDriveService.APP_SETTINGS_FILE_NAME)) {
////                ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
////                try {
////                    mDriveService.files().get(file.getId()).executeMediaAndDownloadTo(outputStream);
////
////                    String appSettingsOnDrive = outputStream.toString(StandardCharsets.UTF_8.name());
////                    Log.d("tag", "===> SAVED_APP_SETTINGS: " + appSettingsOnDrive + " <===");
////                } catch (IOException e) {
////                    e.printStackTrace();
////                }
////            }
//////            try {
//////                mDriveService.files().get(file.getId()).executeMediaAndDownloadTo(outputStream);
//////            } catch (IOException e) {
//////                e.printStackTrace();
//////            }
////        }
////        // ===
////
////
////        return true;
////    }
//
//    private void getAppSettings(String backupFolderId) {
//        Log.d("tag", "CreateBackupTask->getAppSettings()");
//
//        FileList files = null;
//        try {
//            files = mDriveService.files().list()
//                    .setSpaces("appDataFolder")
//                    .setFields("nextPageToken, files(id, name)")
//                    .setQ("mimeType='application/vnd.google-apps.folder' and '" + backupFolderId + "' in parents")
//                    .setPageSize(1000)
//                    .execute();
//        } catch (IOException e) {
//            Log.d("tag", "CreateBackupTask->getAppSettings()->IOEXCEPTION: " + e.getMessage());
//            return;
//        }
//
//        Log.d("tag", "CreateBackupTask->getAppSettings()->FOLDER_FILES_SIZE: " + files.getFiles().size());
//
//        String appSettingsFolderId = null;
//        for (File file : files.getFiles()) {
//            Log.d("tag", "CreateBackupTask->getAppSettings()->FOLDER_NAME: " + file.getName());
//
//            if (file.getName().equalsIgnoreCase(BackupDriveService.APP_SETTINGS_FOLDER_NAME)) {
//                appSettingsFolderId = file.getId();
//                break;
//            }
//        }
//
//        if (appSettingsFolderId == null) {
//            Log.d("tag", "CreateBackupTask->getAppSettings()->BAD_APP_SETTINGS_FOLDER_ID");
//            return;
//        }
//
//        Log.d("tag", "CreateBackupTask->getAppSettings()->APP_SETTINGS_FOLDER_ID: " + appSettingsFolderId);
//
//        files = null;
//        try {
//            files = mDriveService.files().list()
//                    .setSpaces("appDataFolder")
//                    .setFields("nextPageToken, files(id, name)")
//                    .setQ("mimeType='text/xml' and '" + appSettingsFolderId + "' in parents")
//                    .setPageSize(1000)
//                    .execute();
//        } catch (IOException e) {
//            Log.d("tag", "CreateBackupTask->getAppSettings()->IOEXCEPTION: " + e.getMessage());
//            return;
//        }
//
//        Log.d("tag", "CreateBackupTask->getAppSettings()->FILES_FILES_SIZE: " + files.getFiles().size());
//
//        for (File file : files.getFiles()) {
//            Log.d("tag", "CreateBackupTask->getAppSettings()->FILE_NAME: " + file.getName());
//
//            if (file.getName().equalsIgnoreCase(BackupDriveService.APP_SETTINGS_FILE_NAME)) {
//                ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
//                try {
//                    mDriveService.files().get(file.getId()).executeMediaAndDownloadTo(outputStream);
//
//                    String appSettingsOnDrive = outputStream.toString(StandardCharsets.UTF_8.name());
//                    Log.d("tag", "===>CreateBackupTask->getAppSettings()->SAVED_APP_SETTINGS: " + appSettingsOnDrive + " <===");
//                } catch (IOException e) {
//                    e.printStackTrace();
//                }
//            }
//        }
//    }
//}
