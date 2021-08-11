package com.post.notes.modules.notes_storage.module_actions.payloads.payloads;


import com.facebook.react.bridge.ReadableMap;
import com.post.notes.modules.modules_common.data_types.js_payload.JSPayload;

public class RemoveNoteImagePayload implements JSPayload {
    private final String NOTE_ID_FIELD = "noteId";
    private final String NOTE_IMAGE_ID_FIELD = "imageId";

    private String mNoteId;
    private String mImageId;

    public RemoveNoteImagePayload(ReadableMap readableMap) {
        if (readableMap == null) {
            return;
        }

        long noteId = (long) readableMap.getDouble(NOTE_ID_FIELD);
        if (noteId < 0 ) {
            return;
        }
        mNoteId = String.valueOf(noteId);

        String imageId = readableMap.getString(NOTE_IMAGE_ID_FIELD);
        if (imageId == null) {
            return;
        }

        mImageId = imageId;
    }

    @Override
    public boolean isValid() {
        if (mImageId == null || mNoteId == null) {
            return false;
        }

        return !mImageId.isEmpty() && !mNoteId.isEmpty();
    }

    public String noteId() {
        return mNoteId;
    }

    public String imageId() {
        return mImageId;
    }
}
