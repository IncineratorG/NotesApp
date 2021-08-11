package com.post.notes.modules.backup.backup_drive_service.data.data_transformer;


import com.post.notes.modules.backup.backup_drive_service.data_transformers.images.backup_image_info.BackupImageInfo;

import java.util.ArrayList;
import java.util.List;

public class RestoreFromBackupResult {
    private List<BackupImageInfo> mRestoredImagesInfo;
    private boolean mSuccessful;

    public RestoreFromBackupResult() {
        mSuccessful = false;
        mRestoredImagesInfo = new ArrayList<>();
    }

    public void setSuccessful(boolean successful) {
        mSuccessful = successful;
    }

    public void setRestoredImagesInfo(List<BackupImageInfo> restoredImagesInfo) {
        mRestoredImagesInfo = restoredImagesInfo;
    }

    public boolean successful() {
        return mSuccessful;
    }

    public List<BackupImageInfo> restoredImagesInfo() {
        return mRestoredImagesInfo;
    }
}
