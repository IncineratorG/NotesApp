package com.post.notes.modules.backup.backup_drive_service.data.task_progress;


import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.post.notes.modules.modules_common.data_types.hybrid_object.HybridObject;

public class BackupTaskProgress implements HybridObject {
    public static final String TYPE_SIMPLE = "SIMPLE";
    public static final String TYPE_COMPLEX = "COMPLEX";

    private String mProgressStageType;
    private String mProgressStageDescription;
    private long mCurrentProgressItem;
    private long mTotalProgressItems;

    public BackupTaskProgress(String progressStageDescription) {
        mProgressStageType = TYPE_SIMPLE;
        mProgressStageDescription = progressStageDescription;
        mCurrentProgressItem = -1;
        mTotalProgressItems = -1;
    }

    public BackupTaskProgress(String progressStageDescription,
                              long currentProgressItem,
                              long totalProgressItems) {
        mProgressStageType = TYPE_COMPLEX;
        mProgressStageDescription = progressStageDescription;
        mCurrentProgressItem = currentProgressItem;
        mTotalProgressItems = totalProgressItems;
    }

    public BackupTaskProgress(BackupTaskProgress other) {
        mProgressStageType = other.mProgressStageType;
        mProgressStageDescription = other.mProgressStageDescription;
        mCurrentProgressItem = other.mCurrentProgressItem;
        mTotalProgressItems = other.mTotalProgressItems;
    }

    public String stageType() {
        return mProgressStageType;
    }

    public String stageDescription() {
        return mProgressStageDescription;
    }

    public long currentProgressItem() {
        return mCurrentProgressItem;
    }

    public long totalProgressItems() {
        return mTotalProgressItems;
    }

    @Override
    public WritableMap toWritableMap() {
        WritableMap jsPayload = new WritableNativeMap();
        jsPayload.putString("stageType", mProgressStageType);
        jsPayload.putString("stageDescription", mProgressStageDescription);
        jsPayload.putString("currentProgressItem", String.valueOf(mCurrentProgressItem));
        jsPayload.putString("totalProgressItems", String.valueOf(mTotalProgressItems));
        return jsPayload;
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
        return false;
    }
}
