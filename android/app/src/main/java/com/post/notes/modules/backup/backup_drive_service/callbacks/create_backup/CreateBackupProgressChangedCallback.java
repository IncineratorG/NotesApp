package com.post.notes.modules.backup.backup_drive_service.callbacks.create_backup;


import com.post.notes.modules.backup.backup_drive_service.data.task_progress.BackupTaskProgress;

public interface CreateBackupProgressChangedCallback {
    void onChanged(BackupTaskProgress progress);
}
