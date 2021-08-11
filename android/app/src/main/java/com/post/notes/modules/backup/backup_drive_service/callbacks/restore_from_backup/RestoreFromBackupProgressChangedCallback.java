package com.post.notes.modules.backup.backup_drive_service.callbacks.restore_from_backup;


import com.post.notes.modules.backup.backup_drive_service.data.task_progress.BackupTaskProgress;

public interface RestoreFromBackupProgressChangedCallback {
    void onChanged(BackupTaskProgress progress);
}
