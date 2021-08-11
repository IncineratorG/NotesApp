package com.post.notes.modules.backup.module_actions.payloads.payloads;


import com.facebook.react.bridge.ReadableMap;
import com.post.notes.modules.modules_common.data_types.js_payload.JSPayload;

public class CreateBackupPayload implements JSPayload {
    private final String BACKUP_NOTE_FIELD = "note";
    private final String NEED_SAVE_IMAGES_FIELD = "needSaveImages";

    private String mBackupNote;
    private boolean mNeedSaveImages;

    public CreateBackupPayload(ReadableMap readableMap) {
        if (readableMap == null) {
            return;
        }

        mBackupNote = readableMap.getString(BACKUP_NOTE_FIELD);
        mNeedSaveImages = readableMap.getBoolean(NEED_SAVE_IMAGES_FIELD);
    }

    @Override
    public boolean isValid() {
        return mBackupNote != null;
    }

    public String backupNote() {
        return mBackupNote;
    }

    public boolean needSaveImages() {
        return mNeedSaveImages;
    }
}
