package com.post.notes.modules.notes_storage.module_actions_executor.handlers;


import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;
import com.post.notes.common.app_storages.AppStorages;
import com.post.notes.modules.modules_common.data_types.js_action_handler.JSActionHandler;

public class GetAppSettingsHandler implements JSActionHandler {
    public GetAppSettingsHandler() {

    }

    @Override
    public void handle(ReactApplicationContext context, ReadableMap action, Promise result) {
        String stringifiedAppSettings = AppStorages.get().notesStorage().getStringifiedAppSettings(context);
        result.resolve(stringifiedAppSettings);
    }
}
