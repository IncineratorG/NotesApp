package com.post.notes.modules.mmkv_storage.module_actions.payloads.payloads;


import com.facebook.react.bridge.ReadableMap;
import com.post.notes.modules.modules_common.data_types.js_payload.JSPayload;

public class GetStringifiedObjectPayload implements JSPayload {
    private final String KEY_FIELD = "key";
    private boolean mIsValid;
    private String mKey;

    public GetStringifiedObjectPayload(ReadableMap readableMap) {
        mKey = readableMap.getString(KEY_FIELD);

        if (mKey == null) {
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
}
