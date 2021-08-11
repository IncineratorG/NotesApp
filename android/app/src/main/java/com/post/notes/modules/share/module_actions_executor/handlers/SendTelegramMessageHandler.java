package com.post.notes.modules.share.module_actions_executor.handlers;


import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;
import com.post.notes.modules.modules_common.data.error.ModuleError;
import com.post.notes.modules.modules_common.data_types.js_action_handler.JSActionHandler;
import com.post.notes.modules.share.module_actions.payloads.ShareJSActionsPayloads;
import com.post.notes.modules.share.module_actions.payloads.payloads.SendTelegramMessagePayload;
import com.post.notes.modules.share.module_errors.ShareErrors;

public class SendTelegramMessageHandler implements JSActionHandler {
    private final String ACTION_PAYLOAD = "payload";
    private static final String TELEGRAM_URI = "org.telegram.messenger";

    public SendTelegramMessageHandler() {

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

        SendTelegramMessagePayload payload = ShareJSActionsPayloads
                .sendTelegramMessagePayload(payloadMap);
        if (!payload.isValid()) {
            ModuleError error = ShareErrors.badPayload();
            result.reject(error.code(), error.message());
            return;
        }

        PackageManager packageManager = currentActivity.getPackageManager();

        Intent intent = new Intent(Intent.ACTION_SEND);
        intent.setType("text/plain");
        intent.setPackage(TELEGRAM_URI);
        intent.putExtra(Intent.EXTRA_TEXT, payload.messageText());
        if (intent.resolveActivity(packageManager) == null) {
            ModuleError error = ShareErrors.unableToResolveActivity();
            result.reject(error.code(), error.message());
            return;
        }

        currentActivity.startActivity(intent);

        result.resolve(true);
    }
}
