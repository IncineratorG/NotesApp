package com.post.notes.modules.mmkv_storage;


import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.post.notes.modules.mmkv_storage.module_actions.types.MMKVStorageJSActionTypes;
import com.post.notes.modules.mmkv_storage.module_actions_executor.MMKVStorageJSActionsExecutor;

import java.util.HashMap;
import java.util.Map;

public class MMKVStorageModule extends ReactContextBaseJavaModule {
    private ReactApplicationContext mContext;
    private MMKVStorageJSActionsExecutor mActionsExecutor;

    public MMKVStorageModule(@Nullable ReactApplicationContext reactContext) {
        super(reactContext);

        mContext = reactContext;
        mActionsExecutor = new MMKVStorageJSActionsExecutor();
    }

    @NonNull
    @Override
    public String getName() {
        return "MMKVStorage";
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();

        WritableMap actionTypesConstants = new WritableNativeMap();
        actionTypesConstants.putString(MMKVStorageJSActionTypes.SAVE_STRINGIFIED_OBJECT, MMKVStorageJSActionTypes.SAVE_STRINGIFIED_OBJECT);
        actionTypesConstants.putString(MMKVStorageJSActionTypes.GET_STRINGIFIED_OBJECT, MMKVStorageJSActionTypes.GET_STRINGIFIED_OBJECT);
        actionTypesConstants.putString(MMKVStorageJSActionTypes.REMOVE_STRINGIFIED_OBJECT, MMKVStorageJSActionTypes.REMOVE_STRINGIFIED_OBJECT);

        constants.put("actionTypes", actionTypesConstants);

        return constants;
    }

    @ReactMethod
    public void execute(ReadableMap action, Promise result) {
        mActionsExecutor.execute(mContext, action, result);
    }
}
