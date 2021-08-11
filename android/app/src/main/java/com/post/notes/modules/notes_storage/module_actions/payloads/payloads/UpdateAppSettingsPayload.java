package com.post.notes.modules.notes_storage.module_actions.payloads.payloads;


import com.facebook.react.bridge.ReadableMap;
import com.post.notes.modules.modules_common.data_types.js_payload.JSPayload;

public class UpdateAppSettingsPayload implements JSPayload {
    private final String STRINGIFIED_APP_SETTINGS_FIELD = "stringifiedAppSettings";

    private boolean mIsValid;
    private String mStringifiedAppSettings;

    public UpdateAppSettingsPayload(ReadableMap readableMap) {
        if (readableMap == null) {
            return;
        }

        mStringifiedAppSettings = readableMap.getString(STRINGIFIED_APP_SETTINGS_FIELD);
        if (mStringifiedAppSettings == null) {
            return;
        }

        mIsValid = true;
    }

    @Override
    public boolean isValid() {
        return mIsValid;
    }

    public String stringifiedAppSettings() {
        return mStringifiedAppSettings;
    }
}
