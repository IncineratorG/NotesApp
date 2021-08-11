package com.post.notes.modules.notes_storage.module_actions_executor.handlers;


import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;
import com.post.notes.common.app_storages.AppStorages;
import com.post.notes.modules.modules_common.data_types.js_action_handler.JSActionHandler;
import com.post.notes.common.data.hybrid_objects.notes_list_settings.NotesListSettings;

public class GetNotesListSettingsHandler implements JSActionHandler {
    public GetNotesListSettingsHandler() {

    }

    @Override
    public void handle(ReactApplicationContext context, ReadableMap action, Promise result) {
        NotesListSettings notesListSettings = AppStorages.get().notesStorage().getNotesListSettings(context);
        if (notesListSettings == null) {
            String nullString = null;
            notesListSettings = new NotesListSettings(nullString);
        }
        result.resolve(notesListSettings.toWritableMap());
    }
}
