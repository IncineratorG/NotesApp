package com.post.notes.modules.share.module_actions_executor.handlers;


import android.content.Context;
import android.content.pm.PackageManager;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.post.notes.modules.modules_common.data_types.js_action_handler.JSActionHandler;

import java.util.HashMap;
import java.util.Map;

public class CheckShareServiceAvailabilityHandler implements JSActionHandler {
    private static final String SMS = "sms";
    private static final String WHATS_APP = "whatsApp";
    private static final String TELEGRAM = "telegram";

    private static final String WHATS_APP_URI = "com.whatsapp";
    private static final String TELEGRAM_URI = "org.telegram.messenger";

    private static final String RESULT_FIELD = "RESULT";
    private static final String ERROR_FIELD = "ERROR";

    public CheckShareServiceAvailabilityHandler() {

    }

    @Override
    public void handle(ReactApplicationContext context, ReadableMap action, Promise result) {
        Map<String, Boolean> hasWhatsAppData = hasApp(context, WHATS_APP_URI);
        Map<String, Boolean> hasTelegramData = hasApp(context, TELEGRAM_URI);

        boolean smsAvailable = true;
        boolean whatsAppAvailable = false;
        if (hasWhatsAppData.containsKey(RESULT_FIELD)) {
            whatsAppAvailable = hasWhatsAppData.get(RESULT_FIELD);
        }
        boolean telegramAvailable = false;
        if (hasTelegramData.containsKey(RESULT_FIELD)) {
            telegramAvailable = hasTelegramData.get(RESULT_FIELD);
        }

        WritableMap resultMap = new WritableNativeMap();
        resultMap.putBoolean(SMS, smsAvailable);
        resultMap.putBoolean(WHATS_APP, whatsAppAvailable);
        resultMap.putBoolean(TELEGRAM, telegramAvailable);

        result.resolve(resultMap);
    }

    private Map<String, Boolean> hasApp(ReactApplicationContext context, String appUri) {
        Map<String, Boolean> resultMap = new HashMap<>(2);
        resultMap.put(RESULT_FIELD, false);
        resultMap.put(ERROR_FIELD, false);

        PackageManager packageManager = context.getPackageManager();

        try {
            packageManager.getPackageInfo(appUri, PackageManager.GET_ACTIVITIES);
            resultMap.put(RESULT_FIELD, true);
        } catch (PackageManager.NameNotFoundException ignored) {}

        return resultMap;
    }
}
