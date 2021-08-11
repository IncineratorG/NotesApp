package com.post.notes.modules.mmkv_storage.module_actions.payloads.payloads;


import com.facebook.react.bridge.ReadableMap;
import com.post.notes.modules.modules_common.data_types.js_payload.JSPayload;

public class SaveStringifiedObjectPayload implements JSPayload {
    private final String KEY_FIELD = "key";
    private final String OBJECT_FIELD = "stringifiedObject";
    private boolean mIsValid;
    private String mKey;
    private String mObject;

    public SaveStringifiedObjectPayload(ReadableMap readableMap) {
        mKey = readableMap.getString(KEY_FIELD);
        mObject = readableMap.getString(OBJECT_FIELD);

        if (mKey == null || mObject == null) {
            mIsValid = false;
            return;
        }

        mIsValid = true;
    }

    @Override
    public boolean isValid() {
        return mIsValid;
    }

    public String key() {
        return mKey;
    }

    public String object() {
        return mObject;
    }
}
