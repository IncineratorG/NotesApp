package com.post.notes.modules.notes_storage.module_actions_executor.handlers;


import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;
import com.post.notes.common.app_storages.AppStorages;
import com.post.notes.modules.modules_common.data.error.ModuleError;
import com.post.notes.modules.modules_common.data_types.js_action_handler.JSActionHandler;
import com.post.notes.modules.notes_storage.module_actions.payloads.NotesStorageJSActionsPayloads;
import com.post.notes.modules.notes_storage.module_actions.payloads.payloads.GetNoteImagePayload;
import com.post.notes.modules.notes_storage.module_errors.NotesStorageErrors;

public class GetNoteImageHandler implements JSActionHandler {
    private final String ACTION_PAYLOAD = "payload";

    @Override
    public void handle(ReactApplicationContext context, ReadableMap action, Promise result) {
        ReadableMap payloadMap = action.getMap(ACTION_PAYLOAD);
        if (payloadMap == null) {
            ModuleError error = NotesStorageErrors.badPayload();
            result.reject(error.code(), error.message());
            return;
        }

        GetNoteImagePayload payload = NotesStorageJSActionsPayloads
                .getNoteImagePayload(payloadMap);
        if (!payload.isValid()) {
            ModuleError error = NotesStorageErrors.badPayload();
            result.reject(error.code(), error.message());
            return;
        }

        String base64ImageString = AppStorages.get().notesStorage().getNoteImage(context, payload.noteId(), payload.imageId());
        result.resolve(base64ImageString);
    }
}
