package com.post.notes.modules.share.module_actions_executor.handlers;


import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;
import com.post.notes.modules.modules_common.data.error.ModuleError;
import com.post.notes.modules.modules_common.data_types.js_action_handler.JSActionHandler;
import com.post.notes.modules.share.module_actions.payloads.ShareJSActionsPayloads;
import com.post.notes.modules.share.module_actions.payloads.payloads.SendSmsMessagePayload;
import com.post.notes.modules.share.module_errors.ShareErrors;

public class SendSmsMessageHandler implements JSActionHandler {
    private final String ACTION_PAYLOAD = "payload";

    public SendSmsMessageHandler() {

    }

    @Override
    public void handle(ReactApplicationContext context, ReadableMap action, Promise result) {
        Activity currentActivity = context.getCurrentActivity();

        if (currentActivity == null) {
            ModuleError error = ShareErrors.badCurrentActivity();
            result.reject(error.code(), error.message());
            return;
        }

        ReadableMap payloadMap = action.getMap(ACTION_PAYLOAD);
        if (payloadMap == null) {
            ModuleError error = ShareErrors.badPayload();
            result.reject(error.code(), error.message());
            return;
        }

        SendSmsMessagePayload payload = ShareJSActionsPayloads
                .sendSmsMessagePayload(payloadMap);
        if (!payload.isValid()) {
            ModuleError error = ShareErrors.badPayload();
            result.reject(error.code(), error.message());
            return;
        }

        PackageManager packageManager = currentActivity.getPackageManager();

        Intent intent = new Intent(Intent.ACTION_SENDTO);
        intent.setData(Uri.parse("smsto:"));
        intent.putExtra("sms_body", payload.messageText());
        if (intent.resolveActivity(packageManager) == null) {
            ModuleError error = ShareErrors.unableToResolveActivity();
            result.reject(error.code(), error.message());
            return;
        }

        currentActivity.startActivity(intent);

        result.resolve(true);
    }
}
