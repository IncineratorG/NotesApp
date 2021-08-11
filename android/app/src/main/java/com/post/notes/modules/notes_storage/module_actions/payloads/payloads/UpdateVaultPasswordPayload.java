package com.post.notes.modules.notes_storage.module_actions.payloads.payloads;


import com.facebook.react.bridge.ReadableMap;
import com.post.notes.modules.modules_common.data_types.js_payload.JSPayload;

public class UpdateVaultPasswordPayload implements JSPayload {
    private final String VAULT_PASSWORD_FIELD_FIELD = "password";

    private String mPassword;

    public UpdateVaultPasswordPayload(ReadableMap readableMap) {
        if (readableMap == null) {
            return;
        }

        mPassword = readableMap.getString(VAULT_PASSWORD_FIELD_FIELD);
    }

    @Override
    public boolean isValid() {
        return true;
    }

    public String password() {
        return mPassword;
    }
}
