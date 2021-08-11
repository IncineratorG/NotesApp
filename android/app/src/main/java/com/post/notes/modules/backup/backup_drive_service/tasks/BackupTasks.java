package com.post.notes.modules.backup.backup_drive_service.tasks;


import android.content.Context;

import com.google.api.services.drive.Drive;
import com.post.notes.modules.backup.backup_drive_service.callbacks.calculate_note_images_size.CalculateNoteImagesSizeCallback;
import com.post.notes.modules.backup.backup_drive_service.callbacks.create_backup.CreateBackupCancelledCallback;
import com.post.notes.modules.backup.backup_drive_service.callbacks.create_backup.CreateBackupErrorCallback;
import com.post.notes.modules.backup.backup_drive_service.callbacks.create_backup.CreateBackupFinishedCallback;
import com.post.notes.modules.backup.backup_drive_service.callbacks.create_backup.CreateBackupProgressChangedCallback;
import com.post.notes.modules.backup.backup_drive_service.callbacks.get_backups_list.GetBackupsListCancelledCallback;
import com.post.notes.modules.backup.backup_drive_service.callbacks.get_backups_list.GetBackupsListErrorCallback;
import com.post.notes.modules.backup.backup_drive_service.callbacks.get_backups_list.GetBackupsListFinishedCallback;
import com.post.notes.modules.backup.backup_drive_service.callbacks.remove_backup.RemoveBackupErrorCallback;
import com.post.notes.modules.backup.backup_drive_service.callbacks.remove_backup.RemoveBackupFinishedCallback;
import com.post.notes.modules.backup.backup_drive_service.callbacks.restore_from_backup.RestoreFromBackupCancelledCallback;
import com.post.notes.modules.backup.backup_drive_service.callbacks.restore_from_backup.RestoreFromBackupErrorCallback;
import com.post.notes.modules.backup.backup_drive_service.callbacks.restore_from_backup.RestoreFromBackupFinishedCallback;
import com.post.notes.modules.backup.backup_drive_service.callbacks.restore_from_backup.RestoreFromBackupProgressChangedCallback;
import com.post.notes.modules.backup.backup_drive_service.tasks.calculate_note_images_size.CalculateNoteImagesSizeTask;
import com.post.notes.modules.backup.backup_drive_service.tasks.create_backup.CreateBackupTask;
import com.post.notes.modules.backup.backup_drive_service.tasks.get_backups_list.GetBackupsListTask;
import com.post.notes.modules.backup.backup_drive_service.tasks.remove_backup.RemoveBackupTask;
import com.post.notes.modules.backup.backup_drive_service.tasks.restore_from_backup.RestoreFromBackupTask;
import com.post.notes.modules.backup.backup_drive_service.tasks.stop_all_active_tasks.StopAllActiveTasksTask;

public class BackupTasks {
    public static void runStopAllActiveTasksTask() {
        new StopAllActiveTasksTask().runOnRunner(BackupTaskRunner.get());
    }

    public static void runGetBackupsListTask(Drive driveService,
                                             GetBackupsListFinishedCallback finishedCallback,
                                             GetBackupsListCancelledCallback cancelledCallback,
                                             GetBackupsListErrorCallback errorCallback) {
        new GetBackupsListTask(
                driveService,
                finishedCallback,
                cancelledCallback,
                errorCallback
        ).runOnRunner(BackupTaskRunner.get());
    }

    public static void runCalculateNoteImagesSizeTask(Context context,
                                                      CalculateNoteImagesSizeCallback callback) {
        new CalculateNoteImagesSizeTask(callback)
                .runOnRunner(BackupTaskRunner.get(), context);
    }

    public static void runCreateBackupTask(Context context,
                                           String backupNote,
                                           boolean needSaveImages,
                                           Drive driveService,
                                           CreateBackupProgressChangedCallback progressChangedCallback,
                                           CreateBackupFinishedCallback finishedCallback,
                                           CreateBackupCancelledCallback cancelledCallback,
                                           CreateBackupErrorCallback errorCallback) {
        new CreateBackupTask(
                backupNote,
                needSaveImages,
                driveService,
                progressChangedCallback,
                finishedCallback,
                cancelledCallback,
                errorCallback
        ).runOnRunner(BackupTaskRunner.get(), context);
    }

    public static void runRemoveBackupTask(String backupDriveId,
                                           Drive driveService,
                                           RemoveBackupFinishedCallback finishedCallback,
                                           RemoveBackupErrorCallback errorCallback) {
        new RemoveBackupTask(
                backupDriveId,
                driveService,
                finishedCallback,
                errorCallback
        ).runOnRunner(BackupTaskRunner.get());
    }

    public static void runRestoreFromBackupTask(Context context,
                                                String backupDriveId,
                                                Drive driveService,
                                                RestoreFromBackupProgressChangedCallback progressChangedCallback,
                                                RestoreFromBackupFinishedCallback finishedCallback,
                                                RestoreFromBackupCancelledCallback cancelledCallback,
                                                RestoreFromBackupErrorCallback errorCallback) {
        new RestoreFromBackupTask(
                driveService,
                backupDriveId,
                progressChangedCallback,
                finishedCallback,
                cancelledCallback,
                errorCallback
        ).runOnRunner(BackupTaskRunner.get(), context);
    }
}
