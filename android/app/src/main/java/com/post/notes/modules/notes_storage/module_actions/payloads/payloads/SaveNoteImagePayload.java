package com.post.notes.modules.notes_storage.module_actions.payloads.payloads;


import com.facebook.react.bridge.ReadableMap;
import com.post.notes.modules.modules_common.data_types.js_payload.JSPayload;

public class SaveNoteImagePayload implements JSPayload {
    private final String NOTE_ID_FIELD = "noteId";
    private final String NOTE_IMAGE_FIELD = "imageBase64String";

    private String mNoteId;
    private String mNoteImageBase64String;

    public SaveNoteImagePayload(ReadableMap readableMap) {
        if (readableMap == null) {
            return;
        }

        long noteId = (long) readableMap.getDouble(NOTE_ID_FIELD);
        if (noteId < 0 ) {
            return;
        }
        mNoteId = String.valueOf(noteId);

        String noteImageBase64String = readableMap.getString(NOTE_IMAGE_FIELD);
        if (noteImageBase64String == null) {
            return;
        }

        mNoteImageBase64String = noteImageBase64String;
    }

    @Override
    public boolean isValid() {
        if (mNoteImageBase64String == null || mNoteId == null) {
            return false;
        }

        return !mNoteImageBase64String.isEmpty() && !mNoteId.isEmpty();
    }

    public String noteId() {
        return mNoteId;
    }

    public String imageBase64String() {
        return mNoteImageBase64String;
    }
}
