package com.post.notes.modules.share.module_actions.payloads.payloads;


import com.facebook.react.bridge.ReadableMap;
import com.post.notes.modules.modules_common.data_types.js_payload.JSPayload;

public class SendTelegramMessagePayload implements JSPayload {
    private String TEXT_FIELD = "text";
    private boolean mIsValid;
    private String mMessageText;

    public SendTelegramMessagePayload(ReadableMap readableMap) {
        mMessageText = readableMap.getString(TEXT_FIELD);
        if (mMessageText == null) {
            mIsValid = false;
            return;
        }

        mIsValid = true;
    }

    @Override
    public boolean isValid() {
        return mIsValid;
    }

    public String messageText() {
        return mMessageText;
    }
}
