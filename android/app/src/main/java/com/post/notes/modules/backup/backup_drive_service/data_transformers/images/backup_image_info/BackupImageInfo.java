package com.post.notes.modules.backup.backup_drive_service.data_transformers.images.backup_image_info;


public class BackupImageInfo {
    private String mNoteId;
    private String mImageId;
    private String mImageDriveId;

    public BackupImageInfo(String noteId, String imageId, String imageDriveId) {
        mNoteId = noteId;
        mImageId = imageId;
        mImageDriveId = imageDriveId;
    }

    public String noteId() {
        return mNoteId;
    }

    public String imageId() {
        return mImageId;
    }

    public String imageDriveId() {
        return mImageDriveId;
    }
}
