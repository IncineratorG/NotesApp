package com.post.notes.modules.backup.backup_drive_service.callbacks.create_backup;


import com.post.notes.modules.modules_common.data.error.ModuleError;

public interface CreateBackupErrorCallback {
    void onError(ModuleError error);
}
