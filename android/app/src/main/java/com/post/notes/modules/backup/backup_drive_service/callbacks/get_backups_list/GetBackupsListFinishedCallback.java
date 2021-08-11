package com.post.notes.modules.backup.backup_drive_service.callbacks.get_backups_list;


import com.post.notes.modules.backup.backup_drive_service.data.backup_items_list.BackupItemsList;

import java.util.List;

public interface GetBackupsListFinishedCallback {
    void onFinished(BackupItemsList list);
}
