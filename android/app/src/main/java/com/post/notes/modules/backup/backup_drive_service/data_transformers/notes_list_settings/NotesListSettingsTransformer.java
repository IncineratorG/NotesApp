package com.post.notes.modules.backup.backup_drive_service.data_transformers.notes_list_settings;


import android.content.Context;
import android.util.Log;

import com.google.api.client.http.ByteArrayContent;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.model.File;
import com.post.notes.common.app_storages.AppStorages;
import com.post.notes.common.data.hybrid_objects.notes_list_settings.NotesListSettings;
import com.post.notes.common.task.Task;
import com.post.notes.modules.backup.backup_drive_service.BackupDriveService;
import com.post.notes.modules.backup.backup_drive_service.data.data_transformer.BackupDataTransformer;
import com.post.notes.modules.backup.backup_drive_service.data.data_transformer.CreateBackupResult;
import com.post.notes.modules.backup.backup_drive_service.data.task_progress.BackupTaskProgress;
import com.post.notes.modules.backup.backup_drive_service.helpers.BackupDriveServiceHelper;
import com.post.notes.modules.backup.backup_drive_service.tasks.create_backup.CreateBackupTask;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Collections;

public class NotesListSettingsTransformer implements BackupDataTransformer {
    public NotesListSettingsTransformer() {

    }

    @SuppressWarnings("rawtypes")
    public CreateBackupResult toGoogleDriveBackup(Task task,
                                                  Context context,
                                                  Drive driveService,
                                                  String backupRootFolderId) {
        double backupSize = 0.0;

        if (task.isTaskCancelled()) {
            return new CreateBackupResult();
        }

        task.publishTaskProgress(new BackupTaskProgress(CreateBackupTask.SAVING_APP_SETTINGS_STAGE));

        NotesListSettings notesListSettings = AppStorages.get().notesStorage().getNotesListSettings(context);
        String stringifiedNotesListSettings = notesListSettings.stringify();
        backupSize = stringifiedNotesListSettings.getBytes().length;

        String notesListSettingsFolderId = BackupDriveServiceHelper.createFolder(
                driveService,
                BackupDriveService.NOTES_LIST_SETTINGS_FOLDER_NAME,
                backupRootFolderId
        );

        File file = null;
        try {
            File fileMetadata = new File();
            fileMetadata.setName(BackupDriveService.NOTES_LIST_SETTINGS_FILE_NAME);
            fileMetadata.setParents(Collections.singletonList(notesListSettingsFolderId));
            fileMetadata.setMimeType("text/xml");

            byte[] dataBytes = stringifiedNotesListSettings.getBytes(StandardCharsets.UTF_8);

            file = driveService.files().create(fileMetadata, new ByteArrayContent("", dataBytes))
                    .setFields("id")
                    .execute();
        } catch (IOException e) {
            Log.d("tag", "NotesListSettingsTransformer->toGoogleDriveBackup()->ERROR: " + e.toString());
            return new CreateBackupResult();
        }

        CreateBackupResult result = new CreateBackupResult();
        result.setBackupSizeInBytes(backupSize);
        result.setSuccessful(true);

        return result;
    }

    public void fromGoogleDriveBackup() {

    }
}
