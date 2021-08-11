package com.post.notes.modules.backup.backup_drive_service.callbacks.remove_backup;


import com.post.notes.modules.modules_common.data.error.ModuleError;

public interface RemoveBackupErrorCallback {
    void onError(ModuleError error);
}
