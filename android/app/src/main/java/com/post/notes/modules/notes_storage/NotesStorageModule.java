package com.post.notes.modules.notes_storage;


import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.post.notes.modules.notes_storage.module_actions.types.NotesStorageJSActionTypes;
import com.post.notes.modules.notes_storage.module_actions_executor.NotesStorageJSActionsExecutor;

import java.util.HashMap;
import java.util.Map;

public class NotesStorageModule extends ReactContextBaseJavaModule {
    private ReactApplicationContext mContext;
    private NotesStorageJSActionsExecutor mActionsExecutor;

    public NotesStorageModule(@Nullable ReactApplicationContext reactContext) {
        super(reactContext);

        mContext = reactContext;
        mActionsExecutor = new NotesStorageJSActionsExecutor();
    }

    @NonNull
    @Override
    public String getName() {
        return "NotesStorage";
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();

        WritableMap actionTypesConstants = new WritableNativeMap();
        actionTypesConstants.putString(NotesStorageJSActionTypes.GET_CORE_APP_DATA, NotesStorageJSActionTypes.GET_CORE_APP_DATA);
        actionTypesConstants.putString(NotesStorageJSActionTypes.GET_NOTES_LIST_SETTINGS, NotesStorageJSActionTypes.GET_NOTES_LIST_SETTINGS);
        actionTypesConstants.putString(NotesStorageJSActionTypes.UPDATE_NOTES_LIST_SETTINGS, NotesStorageJSActionTypes.UPDATE_NOTES_LIST_SETTINGS);
        actionTypesConstants.putString(NotesStorageJSActionTypes.GET_ALL_NOTES, NotesStorageJSActionTypes.GET_ALL_NOTES);
        actionTypesConstants.putString(NotesStorageJSActionTypes.GET_NOTE, NotesStorageJSActionTypes.GET_NOTE);
        actionTypesConstants.putString(NotesStorageJSActionTypes.UPDATE_NOTE, NotesStorageJSActionTypes.UPDATE_NOTE);
        actionTypesConstants.putString(NotesStorageJSActionTypes.UPDATE_MULTIPLE_NOTES, NotesStorageJSActionTypes.UPDATE_MULTIPLE_NOTES);
        actionTypesConstants.putString(NotesStorageJSActionTypes.REMOVE_NOTE, NotesStorageJSActionTypes.REMOVE_NOTE);
        actionTypesConstants.putString(NotesStorageJSActionTypes.REMOVE_MULTIPLE_NOTES, NotesStorageJSActionTypes.REMOVE_MULTIPLE_NOTES);
        actionTypesConstants.putString(NotesStorageJSActionTypes.SAVE_NOTE_IMAGE, NotesStorageJSActionTypes.SAVE_NOTE_IMAGE);
        actionTypesConstants.putString(NotesStorageJSActionTypes.GET_NOTE_IMAGE, NotesStorageJSActionTypes.GET_NOTE_IMAGE);
        actionTypesConstants.putString(NotesStorageJSActionTypes.REMOVE_NOTE_IMAGE, NotesStorageJSActionTypes.REMOVE_NOTE_IMAGE);
        actionTypesConstants.putString(NotesStorageJSActionTypes.GET_ALL_CATEGORIES, NotesStorageJSActionTypes.GET_ALL_CATEGORIES);
        actionTypesConstants.putString(NotesStorageJSActionTypes.UPDATE_CATEGORIES_LIST, NotesStorageJSActionTypes.UPDATE_CATEGORIES_LIST);
        actionTypesConstants.putString(NotesStorageJSActionTypes.GET_APP_SETTINGS, NotesStorageJSActionTypes.GET_APP_SETTINGS);
        actionTypesConstants.putString(NotesStorageJSActionTypes.UPDATE_APP_SETTINGS, NotesStorageJSActionTypes.UPDATE_APP_SETTINGS);
        actionTypesConstants.putString(NotesStorageJSActionTypes.GET_VAULT_PASSWORD, NotesStorageJSActionTypes.GET_VAULT_PASSWORD);
//        actionTypesConstants.putString(NotesStorageJSActionTypes.GET_VAULT_NOTES_IDS, NotesStorageJSActionTypes.GET_VAULT_NOTES_IDS);
        actionTypesConstants.putString(NotesStorageJSActionTypes.UPDATE_VAULT_PASSWORD, NotesStorageJSActionTypes.UPDATE_VAULT_PASSWORD);
//        actionTypesConstants.putString(NotesStorageJSActionTypes.UPDATE_VAULT_NOTES_IDS, NotesStorageJSActionTypes.UPDATE_VAULT_NOTES_IDS);

        constants.put("actionTypes", actionTypesConstants);

        return constants;
    }

    @ReactMethod
    public void execute(ReadableMap action, Promise result) {
        mActionsExecutor.execute(mContext, action, result);
    }
}
