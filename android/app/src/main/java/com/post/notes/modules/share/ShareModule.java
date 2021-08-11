package com.post.notes.modules.share;


import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.post.notes.modules.share.module_actions.types.ShareJSActionTypes;
import com.post.notes.modules.share.module_actions_executor.ShareJSActionsExecutor;

import java.util.HashMap;
import java.util.Map;

public class ShareModule extends ReactContextBaseJavaModule {
    private ReactApplicationContext mContext;
    private ShareJSActionsExecutor mActionsExecutor;

    public ShareModule(@Nullable ReactApplicationContext reactContext) {
        super(reactContext);

        mContext = reactContext;
        mActionsExecutor = new ShareJSActionsExecutor();
    }

    @NonNull
    @Override
    public String getName() {
        return "Share";
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();

        WritableMap actionTypesConstants = new WritableNativeMap();
        actionTypesConstants.putString(ShareJSActionTypes.CHECK_SERVICE_AVAILABILITY, ShareJSActionTypes.CHECK_SERVICE_AVAILABILITY);
        actionTypesConstants.putString(ShareJSActionTypes.SEND_SMS_MESSAGE, ShareJSActionTypes.SEND_SMS_MESSAGE);
        actionTypesConstants.putString(ShareJSActionTypes.SEND_TELEGRAM_MESSAGE, ShareJSActionTypes.SEND_TELEGRAM_MESSAGE);
        actionTypesConstants.putString(ShareJSActionTypes.SEND_WHATS_APP_MESSAGE, ShareJSActionTypes.SEND_WHATS_APP_MESSAGE);

        constants.put("actionTypes", actionTypesConstants);

        return constants;
    }

    @ReactMethod
    public void execute(ReadableMap action, Promise result) {
        mActionsExecutor.execute(mContext, action, result);
    }
}
