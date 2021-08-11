package com.post.notes.modules.backup.backup_drive_service.callbacks.restore_from_backup;


import com.post.notes.modules.modules_common.data.error.ModuleError;

public interface RestoreFromBackupErrorCallback {
    void onError(ModuleError error);
}
