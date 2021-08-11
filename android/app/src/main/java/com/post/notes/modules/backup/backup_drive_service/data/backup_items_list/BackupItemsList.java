package com.post.notes.modules.backup.backup_drive_service.data.backup_items_list;


import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.post.notes.modules.backup.backup_drive_service.data.backup_item.BackupItem;
import com.post.notes.modules.modules_common.data_types.hybrid_object.HybridObject;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class BackupItemsList implements HybridObject {
    public static final String ARRAY_OBJECT_KEY = "backupItemsArray";
    private List<BackupItem> mBackupItemsList;

    public BackupItemsList() {
        mBackupItemsList = new ArrayList<>();
    }

    public void add(BackupItem backupItem) {
        mBackupItemsList.add(backupItem);
    }

    public BackupItem get(int index) {
        if (index < 0 || index >= mBackupItemsList.size()) {
            return null;
        }

        return mBackupItemsList.get(index);
    }

    public int size() {
        return mBackupItemsList.size();
    }

    public void sort() {
        Collections.sort(
                mBackupItemsList,
                (i1, i2) -> {
                    Long i1Timestamp = Long.parseLong(i1.timestamp());
                    Long i2Timestamp = Long.parseLong(i2.timestamp());

                    return i2Timestamp.compareTo(i1Timestamp);
                }
        );
    }

    @Override
    public WritableMap toWritableMap() {
        WritableMap writableMap = new WritableNativeMap();
        writableMap.putArray(ARRAY_OBJECT_KEY, toWritableArray());

        return writableMap;
    }

    @Override
    public WritableArray toWritableArray() {
        WritableArray backupItemsList = new WritableNativeArray();
        for (BackupItem backupItem : mBackupItemsList) {
            backupItemsList.pushMap(backupItem.toWritableMap());
        }

        return backupItemsList;
    }

    @Override
    public String stringify() {
        return null;
    }

    @Override
    public boolean isEmpty() {
        return false;
    }
}
