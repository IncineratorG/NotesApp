package com.post.notes.modules.backup.module_actions.payloads.payloads;


import com.facebook.react.bridge.ReadableMap;
import com.post.notes.modules.modules_common.data_types.js_payload.JSPayload;

public class RestoreFromBackupPayload implements JSPayload {
    private final String BACKUP_DRIVE_ID_FIELD = "backupDriveId";

    private String mBackupDriveId;

    public RestoreFromBackupPayload(ReadableMap readableMap) {
        if (readableMap == null) {
            return;
        }

        mBackupDriveId = readableMap.getString(BACKUP_DRIVE_ID_FIELD);
    }

    @Override
    public boolean isValid() {
        return mBackupDriveId != null;
    }

    public String backupDriveId() {
        return mBackupDriveId;
    }
}
