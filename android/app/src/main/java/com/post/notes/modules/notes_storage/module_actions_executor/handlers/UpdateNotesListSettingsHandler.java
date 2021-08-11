package com.post.notes.modules.notes_storage.module_actions_executor.handlers;


import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;
import com.post.notes.common.app_storages.AppStorages;
import com.post.notes.modules.modules_common.data.error.ModuleError;
import com.post.notes.modules.modules_common.data_types.js_action_handler.JSActionHandler;
import com.post.notes.modules.notes_storage.module_actions.payloads.NotesStorageJSActionsPayloads;
import com.post.notes.modules.notes_storage.module_actions.payloads.payloads.UpdateNotesListSettingsPayload;
import com.post.notes.modules.notes_storage.module_errors.NotesStorageErrors;

public class UpdateNotesListSettingsHandler implements JSActionHandler {
    private final String ACTION_PAYLOAD = "payload";

    public UpdateNotesListSettingsHandler() {

    }

    @Override
    public void handle(ReactApplicationContext context, ReadableMap action, Promise result) {
        ReadableMap payloadMap = action.getMap(ACTION_PAYLOAD);
        if (payloadMap == null) {
            ModuleError error = NotesStorageErrors.badPayload();
            result.reject(error.code(), error.message());
            return;
        }

        UpdateNotesListSettingsPayload payload = NotesStorageJSActionsPayloads
                .updateNotesListSettingsPayload(payloadMap);
        if (!payload.isValid()) {
            ModuleError error = NotesStorageErrors.badPayload();
            result.reject(error.code(), error.message());
            return;
        }

        boolean saveResult = AppStorages.get().notesStorage().saveNotesListSettings(context, payload.notesListSettings());
        result.resolve(saveResult);

//        boolean savedSuccessful = NotesStorage.get(mContext).saveNotesListSettings(payload.notesListSettings());
//        result.resolve(savedSuccessful);
    }
}
