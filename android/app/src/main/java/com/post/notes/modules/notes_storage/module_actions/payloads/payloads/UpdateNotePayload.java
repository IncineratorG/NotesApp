package com.post.notes.modules.notes_storage.module_actions.payloads.payloads;


import com.facebook.react.bridge.ReadableMap;
import com.post.notes.common.data.hybrid_objects.note.Note;
import com.post.notes.modules.modules_common.data_types.js_payload.JSPayload;

public class UpdateNotePayload implements JSPayload {
    private final String NOTE_PAYLOAD_FIELD = "note";

    private Note mNote;

    public UpdateNotePayload(ReadableMap readableMap) {
        if (readableMap == null) {
            return;
        }

        ReadableMap noteMap = readableMap.getMap(NOTE_PAYLOAD_FIELD);
        if (noteMap == null) {
            return;
        }

        mNote = new Note(noteMap);
    }

    @Override
    public boolean isValid() {
        if (mNote == null) {
            return false;
        }

        return !mNote.isEmpty();
    }

    public Note note() {
        return mNote;
    }
}
