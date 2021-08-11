package com.post.notes.modules.notes_storage.module_actions.payloads.payloads;


import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.post.notes.modules.modules_common.data_types.js_payload.JSPayload;

import java.util.ArrayList;
import java.util.List;

public class RemoveMultipleNotesPayload implements JSPayload {
    private final String NOTE_IDS_FIELD = "idsArray";

    private String[] mNoteIds;

    public RemoveMultipleNotesPayload(ReadableMap readableMap) {
        if (readableMap == null) {
            return;
        }

        ReadableArray idsArray = readableMap.getArray(NOTE_IDS_FIELD);
        if (idsArray == null) {
            return;
        }

        List<String> noteIds = new ArrayList<>();
        for (int i = 0; i < idsArray.size(); ++i) {
            long id = (long) idsArray.getDouble(i);
            noteIds.add(String.valueOf(id));
        }
        mNoteIds = noteIds.toArray(new String[0]);
    }

    @Override
    public boolean isValid() {
        return mNoteIds != null;
    }

    public String[] noteIds() {
        return mNoteIds;
    }
}
