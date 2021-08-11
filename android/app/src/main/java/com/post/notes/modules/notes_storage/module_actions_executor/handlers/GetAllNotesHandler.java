package com.post.notes.modules.notes_storage.module_actions_executor.handlers;


import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;
import com.post.notes.common.app_storages.AppStorages;
import com.post.notes.common.data.hybrid_objects.notes_list.NotesList;
import com.post.notes.modules.modules_common.data_types.js_action_handler.JSActionHandler;

public class GetAllNotesHandler implements JSActionHandler {
    public GetAllNotesHandler() {

    }

    @Override
    public void handle(ReactApplicationContext context, ReadableMap action, Promise result) {
        NotesList notesList = AppStorages.get().notesStorage().getNotesList(context);
        result.resolve(notesList.toWritableArray());
    }
}
