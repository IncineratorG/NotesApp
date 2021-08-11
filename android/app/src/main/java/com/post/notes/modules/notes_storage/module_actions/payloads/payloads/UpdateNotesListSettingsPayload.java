package com.post.notes.modules.notes_storage.module_actions.payloads.payloads;


import com.facebook.react.bridge.ReadableMap;
import com.post.notes.modules.modules_common.data_types.js_payload.JSPayload;
import com.post.notes.common.data.hybrid_objects.notes_list_settings.NotesListSettings;

public class UpdateNotesListSettingsPayload implements JSPayload {
    private NotesListSettings mNotesListSettings;

    public UpdateNotesListSettingsPayload(ReadableMap readableMap) {
        mNotesListSettings = new NotesListSettings(readableMap);
    }

    @Override
    public boolean isValid() {
        return !mNotesListSettings.isEmpty();
    }

    public NotesListSettings notesListSettings() {
        return mNotesListSettings;
    }
}
