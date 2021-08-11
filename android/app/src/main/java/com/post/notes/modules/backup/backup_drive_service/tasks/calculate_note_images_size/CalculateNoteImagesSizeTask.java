package com.post.notes.modules.backup.backup_drive_service.tasks.calculate_note_images_size;


import android.content.Context;
import android.util.Log;

import com.post.notes.common.app_storages.AppStorages;
import com.post.notes.common.app_storages.notes_storage.AppNotesStorage;
import com.post.notes.common.autonomous_task.AutonomousTask;
import com.post.notes.common.data.hybrid_objects.note.Note;
import com.post.notes.common.data.hybrid_objects.notes_list.NotesList;
import com.post.notes.common.task_runner.TaskRunner;
import com.post.notes.modules.backup.backup_drive_service.callbacks.calculate_note_images_size.CalculateNoteImagesSizeCallback;

import java.util.List;

public class CalculateNoteImagesSizeTask extends AutonomousTask<Object, Object, Object> {
    private CalculateNoteImagesSizeCallback mCallback;
    private double mSizeInBytes = 0.0;

    public CalculateNoteImagesSizeTask(CalculateNoteImagesSizeCallback callback) {
        mSizeInBytes = 0.0;
        mCallback = callback;
    }

    @Override
    public void runOnRunner(TaskRunner runner, Object... params) {
        if (params == null || params.length < 1) {
            Log.d("tag", "CalculateNoteImagesSizeTask->NOT_ENOUGH_PARAMS");
            return;
        }

        Context context = (Context) params[0];
        if (context == null) {
            Log.d("tag", "CalculateNoteImagesSizeTask->BAD_CONTEXT");
            return;
        }

        runner.run(this, context);
    }

    @Override
    protected Object doInBackground(Object... objects) {
        Context context = (Context) objects[0];

        mSizeInBytes = 0.0;

        AppNotesStorage notesStorage = AppStorages.get().notesStorage();

        NotesList notes = notesStorage.getNotesList(context);
        List<Note> allNoteList = notes.notesList();

        for (int i = 0; i < allNoteList.size(); ++i) {
            if (isCancelled()) {
                break;
            }

            Note note = allNoteList.get(i);
            if (!note.deleted()) {
                if (note.images().size() > 0) {
                    String noteId = String.valueOf(note.id());
                    for (int j = 0; j < note.images().size(); ++j) {
                        if (isCancelled()) {
                            break;
                        }

                        String imageId = note.images().get(j);
                        String image = notesStorage.getNoteImage(context, noteId, imageId);
                        if (image != null) {
                            mSizeInBytes = mSizeInBytes + image.getBytes().length;
                        }
                    }
                }
            }
        }

        return null;
    }

    @Override
    protected void onPostExecute(Object o) {
        mCallback.onResult(mSizeInBytes, false);
    }

    @Override
    protected void onCancelled() {
        mCallback.onResult(0.0, true);
    }
}
