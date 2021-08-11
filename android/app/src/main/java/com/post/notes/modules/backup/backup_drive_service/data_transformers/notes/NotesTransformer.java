package com.post.notes.modules.backup.backup_drive_service.data_transformers.notes;


import android.content.Context;
import android.util.Log;

import com.google.api.client.http.ByteArrayContent;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.model.File;
import com.post.notes.common.app_storages.AppStorages;
import com.post.notes.common.app_storages.notes_storage.AppNotesStorage;
import com.post.notes.common.data.hybrid_objects.note.Note;
import com.post.notes.common.data.hybrid_objects.notes_list.NotesList;
import com.post.notes.common.task.Task;
import com.post.notes.modules.backup.backup_drive_service.BackupDriveService;
import com.post.notes.modules.backup.backup_drive_service.data.data_transformer.BackupDataTransformer;
import com.post.notes.modules.backup.backup_drive_service.data.data_transformer.CreateBackupResult;
import com.post.notes.modules.backup.backup_drive_service.data.task_progress.BackupTaskProgress;
import com.post.notes.modules.backup.backup_drive_service.helpers.BackupDriveServiceHelper;
import com.post.notes.modules.backup.backup_drive_service.tasks.create_backup.CreateBackupTask;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Collections;
import java.util.List;

public class NotesTransformer implements BackupDataTransformer {
    public NotesTransformer() {

    }

    @SuppressWarnings("rawtypes")
    public CreateBackupResult toGoogleDriveBackup(Task task,
                                                  Context context,
                                                  Drive driveService,
                                                  String backupRootFolderId) {
        double backupSize = 0.0;

        if (task.isTaskCancelled()) {
            return new CreateBackupResult();
        }

        task.publishTaskProgress(new BackupTaskProgress(CreateBackupTask.SAVING_NOTES_TEXT_STAGE));

        AppNotesStorage notesStorage = AppStorages.get().notesStorage();

        NotesList notesList = notesStorage.getNotesList(context);
        List<Note> notes = notesList.notesList();

        String notesFolderId = BackupDriveServiceHelper.createFolder(
                driveService,
                BackupDriveService.NOTES_FOLDER_NAME,
                backupRootFolderId
        );

        int notesCounter = 0;
        for (int i = 0; i < notes.size(); ++i) {
            Note note = notes.get(i);
            if (!note.deleted()) {
                Log.d("tag", "NotesTransformer->toGoogleDriveBackup()->SAVING_NOTE: " + String.valueOf(++notesCounter));

                String stringifiedNote = note.stringify();
                backupSize = backupSize + stringifiedNote.getBytes().length;

                File file = null;
                try {
                    File fileMetadata = new File();
                    fileMetadata.setName(String.valueOf(i));
                    fileMetadata.setParents(Collections.singletonList(notesFolderId));
                    fileMetadata.setMimeType("text/xml");

                    byte[] dataBytes = stringifiedNote.getBytes(StandardCharsets.UTF_8);

                    file = driveService.files().create(fileMetadata, new ByteArrayContent("", dataBytes))
                            .setFields("id")
                            .execute();
                } catch (IOException e) {
                    Log.d("tag", "NotesTransformer->toGoogleDriveBackup()->ERROR: " + e.toString());
                    return new CreateBackupResult();
                }
            }
        }

        CreateBackupResult result = new CreateBackupResult();
        result.setBackupSizeInBytes(backupSize);
        result.setSuccessful(true);

        return result;
    }

    public void fromGoogleDriveBackup() {

    }
}
