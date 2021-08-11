package com.post.notes.modules.notes_storage.module_actions.payloads.payloads;


import com.facebook.react.bridge.ReadableMap;
import com.post.notes.modules.modules_common.data_types.js_payload.JSPayload;

public class RemoveNotePayload implements JSPayload {
    private final String NOTE_ID_FIELD = "id";

    private String mNoteId;

    public RemoveNotePayload(ReadableMap readableMap) {
        if (readableMap == null) {
            return;
        }

        long noteId = (long) readableMap.getDouble(NOTE_ID_FIELD);
        mNoteId = String.valueOf(noteId);
    }

    @Override
    public boolean isValid() {
        if (mNoteId == null) {
            return false;
        } else {
            return !mNoteId.isEmpty();
        }
    }

    public String noteId() {
        return mNoteId;
    }
}
