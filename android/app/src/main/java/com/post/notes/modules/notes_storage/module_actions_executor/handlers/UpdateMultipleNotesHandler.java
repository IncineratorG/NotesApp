package com.post.notes.modules.notes_storage.module_actions_executor.handlers;


import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;
import com.post.notes.common.app_storages.AppStorages;
import com.post.notes.modules.modules_common.data.error.ModuleError;
import com.post.notes.modules.modules_common.data_types.js_action_handler.JSActionHandler;
import com.post.notes.modules.notes_storage.module_actions.payloads.NotesStorageJSActionsPayloads;
import com.post.notes.modules.notes_storage.module_actions.payloads.payloads.UpdateMultipleNotesPayload;
import com.post.notes.modules.notes_storage.module_errors.NotesStorageErrors;

public class UpdateMultipleNotesHandler implements JSActionHandler {
    private final String ACTION_PAYLOAD = "payload";

    public UpdateMultipleNotesHandler() {

    }

    @Override
    public void handle(ReactApplicationContext context, ReadableMap action, Promise result) {
        ReadableMap payloadMap = action.getMap(ACTION_PAYLOAD);
        if (payloadMap == null) {
            ModuleError error = NotesStorageErrors.badPayload();
            result.reject(error.code(), error.message());
            return;
        }

        UpdateMultipleNotesPayload payload = NotesStorageJSActionsPayloads
                .updateMultipleNotesPayload(payloadMap);
        if (!payload.isValid()) {
            ModuleError error = NotesStorageErrors.badPayload();
            result.reject(error.code(), error.message());
            return;
        }

        boolean updateResult = AppStorages.get().notesStorage().updateMultipleNotes(context, payload.notesList());
        result.resolve(updateResult);

//        boolean updatedSuccessful = NotesStorage.get(mContext).updateMultipleNotes(payload.notesList());
//        result.resolve(updatedSuccessful);
    }
}
