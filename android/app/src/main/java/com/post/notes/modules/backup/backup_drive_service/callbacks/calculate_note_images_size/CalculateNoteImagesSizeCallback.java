package com.post.notes.modules.backup.backup_drive_service.callbacks.calculate_note_images_size;


public interface CalculateNoteImagesSizeCallback {
    void onResult(double sizeInBytes, boolean cancelled);
}
