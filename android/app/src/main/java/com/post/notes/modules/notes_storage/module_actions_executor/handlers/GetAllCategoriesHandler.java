package com.post.notes.modules.notes_storage.module_actions_executor.handlers;


import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;
import com.post.notes.common.app_storages.AppStorages;
import com.post.notes.modules.modules_common.data_types.js_action_handler.JSActionHandler;

public class GetAllCategoriesHandler implements JSActionHandler {
    public GetAllCategoriesHandler() {

    }

    @Override
    public void handle(ReactApplicationContext context, ReadableMap action, Promise result) {
        String stringifiedCategoriesList = AppStorages.get().notesStorage().getStringifiedCategoriesList(context);
        result.resolve(stringifiedCategoriesList);
    }
}
