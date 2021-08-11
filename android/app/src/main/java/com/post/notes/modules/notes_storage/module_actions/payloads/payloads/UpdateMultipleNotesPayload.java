package com.post.notes.modules.notes_storage.module_actions.payloads.payloads;


import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.post.notes.common.data.hybrid_objects.note.Note;
import com.post.notes.modules.modules_common.data_types.js_payload.JSPayload;

import java.util.ArrayList;
import java.util.List;

public class UpdateMultipleNotesPayload implements JSPayload {
    private final String NOTES_LIST_PAYLOAD_FIELD = "notesList";

    private List<Note> mNotesList;

    public UpdateMultipleNotesPayload(ReadableMap readableMap) {
        if (readableMap == null) {
            return;
        }

        ReadableArray notesArray = readableMap.getArray(NOTES_LIST_PAYLOAD_FIELD);
        if (notesArray == null) {
            return;
        }

        mNotesList = new ArrayList<>();
        for (int i = 0; i < notesArray.size(); ++i) {
            ReadableMap noteMap = notesArray.getMap(i);
            mNotesList.add(new Note(noteMap));
        }
    }

    @Override
    public boolean isValid() {
        return mNotesList != null;
    }

    public List<Note> notesList() {
        return mNotesList;
    }
}
