package com.post.notes.modules.backup.backup_drive_service.data.data_transformer;


public class CreateBackupResult {
    private double mBackupSizeInBytes;
    private boolean mSuccessful;

    public CreateBackupResult() {
        mBackupSizeInBytes = 0.0;
        mSuccessful = false;
    }

    public void setBackupSizeInBytes(double sizeInBytes) {
        mBackupSizeInBytes = sizeInBytes;
    }

    public void setSuccessful(boolean successful) {
        mSuccessful = successful;
    }

    public double backupSizeInBytes() {
        return mBackupSizeInBytes;
    }

    public boolean successful() {
        return mSuccessful;
    }
}
