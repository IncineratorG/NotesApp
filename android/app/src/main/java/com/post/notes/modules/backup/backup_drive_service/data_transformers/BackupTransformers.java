package com.post.notes.modules.backup.backup_drive_service.data_transformers;


import com.post.notes.modules.backup.backup_drive_service.data_transformers.app_settings.AppSettingsTransformer;
import com.post.notes.modules.backup.backup_drive_service.data_transformers.categories.CategoriesTransformer;
import com.post.notes.modules.backup.backup_drive_service.data_transformers.images.ImagesTransformer;
import com.post.notes.modules.backup.backup_drive_service.data_transformers.not_images.NotImagesDataTransformer;
import com.post.notes.modules.backup.backup_drive_service.data_transformers.notes.NotesTransformer;
import com.post.notes.modules.backup.backup_drive_service.data_transformers.notes_list_settings.NotesListSettingsTransformer;

public class BackupTransformers {
    public static ImagesTransformer imagesTransformer() {
        return new ImagesTransformer();
    }

    public static NotImagesDataTransformer notImagesDataTransformer() {
        return new NotImagesDataTransformer();
    }
}
