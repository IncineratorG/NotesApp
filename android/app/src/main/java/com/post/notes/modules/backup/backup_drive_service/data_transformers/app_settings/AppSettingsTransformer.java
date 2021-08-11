package com.post.notes.modules.backup.backup_drive_service.data_transformers.app_settings;


import android.content.Context;
import android.util.Log;

import com.google.api.client.http.ByteArrayContent;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.model.File;
import com.post.notes.common.app_storages.AppStorages;
import com.post.notes.common.task.Task;
import com.post.notes.modules.backup.backup_drive_service.BackupDriveService;
import com.post.notes.modules.backup.backup_drive_service.data.task_progress.BackupTaskProgress;
import com.post.notes.modules.backup.backup_drive_service.data.data_transformer.BackupDataTransformer;
import com.post.notes.modules.backup.backup_drive_service.data.data_transformer.CreateBackupResult;
import com.post.notes.modules.backup.backup_drive_service.helpers.BackupDriveServiceHelper;
import com.post.notes.modules.backup.backup_drive_service.tasks.create_backup.CreateBackupTask;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Collections;

public class AppSettingsTransformer implements BackupDataTransformer {
    public AppSettingsTransformer() {

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

        String appSettings = AppStorages.get().notesStorage().getStringifiedAppSettings(context);
        backupSize = appSettings.getBytes().length;

        String appSettingsFolderId = BackupDriveServiceHelper.createFolder(
                driveService,
                BackupDriveService.APP_SETTINGS_FOLDER_NAME,
                backupRootFolderId
        );

        File file = null;
        try {
            File fileMetadata = new File();
            fileMetadata.setName(BackupDriveService.APP_SETTINGS_FILE_NAME);
            fileMetadata.setParents(Collections.singletonList(appSettingsFolderId));
            fileMetadata.setMimeType("text/xml");

            byte[] dataBytes = appSettings.getBytes(StandardCharsets.UTF_8);

            file = driveService.files().create(fileMetadata, new ByteArrayContent("", dataBytes))
                    .setFields("id")
                    .execute();
        } catch (IOException e) {
            Log.d("tag", "AppSettingsTransformer->toGoogleDriveBackup()->ERROR: " + e.toString());
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
