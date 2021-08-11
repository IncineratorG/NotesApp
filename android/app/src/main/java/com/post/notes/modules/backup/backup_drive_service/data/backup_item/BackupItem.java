package com.post.notes.modules.backup.backup_drive_service.data.backup_item;


import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.post.notes.modules.modules_common.data_types.hybrid_object.HybridObject;

public class BackupItem implements HybridObject {
    private String mTimestamp;
    private String mBackupNote;
    private String mSizeInBytes;
    private String mDriveId;
    private boolean mIsEmpty;

    public BackupItem() {
        mIsEmpty = true;
    }

    public BackupItem(String timestamp, String backupNote, String sizeInBytes, String driveId) {
        mTimestamp = timestamp;
        mBackupNote = backupNote;
        mSizeInBytes = sizeInBytes;
        mDriveId = driveId;
        mIsEmpty = false;
    }

    public String timestamp() {
        return mTimestamp;
    }

    public String backupNote() {
        return mBackupNote;
    }

    public String sizeInBytes() {
        return mSizeInBytes;
    }

    public String driveId() {
        return mDriveId;
    }

    @Override
    public WritableMap toWritableMap() {
        WritableMap writableMap = new WritableNativeMap();

        writableMap.putDouble("timestamp", Long.parseLong(mTimestamp));
        writableMap.putString("note", mBackupNote);
        writableMap.putString("sizeInBytes", mSizeInBytes);
        writableMap.putString("driveId", mDriveId);

        return writableMap;
    }

    @Override
    public WritableArray toWritableArray() {
        return null;
    }

    @Override
    public String stringify() {
        return null;
    }

    @Override
    public boolean isEmpty() {
        return mIsEmpty;
    }
}
