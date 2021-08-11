package com.post.notes.modules.backup.backup_drive_service.callbacks.get_backups_list;


import com.post.notes.modules.modules_common.data.error.ModuleError;

public interface GetBackupsListErrorCallback {
    void onError(ModuleError error);
}
