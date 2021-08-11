package com.post.notes.modules.share.module_actions_executor;


import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;
import com.post.notes.modules.modules_common.data.error.ModuleError;
import com.post.notes.modules.modules_common.data_types.js_action_handler.JSActionHandler;
import com.post.notes.modules.modules_common.data_types.js_actions_executor.JSActionsExecutor;
import com.post.notes.modules.share.module_actions.types.ShareJSActionTypes;
import com.post.notes.modules.share.module_actions_executor.handlers.CheckShareServiceAvailabilityHandler;
import com.post.notes.modules.share.module_actions_executor.handlers.SendSmsMessageHandler;
import com.post.notes.modules.share.module_actions_executor.handlers.SendTelegramMessageHandler;
import com.post.notes.modules.share.module_actions_executor.handlers.SendWhatsAppMessageHandler;
import com.post.notes.modules.share.module_errors.ShareErrors;

import java.util.HashMap;
import java.util.Map;

public class ShareJSActionsExecutor implements JSActionsExecutor {
    private static final String ACTION_TYPE = "type";
    private Map<String, JSActionHandler> mHandlers;

    public ShareJSActionsExecutor() {
        mHandlers = new HashMap<>();
        mHandlers.put(ShareJSActionTypes.CHECK_SERVICE_AVAILABILITY, new CheckShareServiceAvailabilityHandler());
        mHandlers.put(ShareJSActionTypes.SEND_SMS_MESSAGE, new SendSmsMessageHandler());
        mHandlers.put(ShareJSActionTypes.SEND_WHATS_APP_MESSAGE, new SendWhatsAppMessageHandler());
        mHandlers.put(ShareJSActionTypes.SEND_TELEGRAM_MESSAGE, new SendTelegramMessageHandler());
    }

    @Override
    public void execute(ReactApplicationContext context, ReadableMap action, Promise result) {
        if (action == null) {
            ModuleError error = ShareErrors.badAction();
            result.reject(error.code(), error.message());
            return;
        }

        final String type = action.getString(ACTION_TYPE);
        if (type == null) {
            ModuleError error = ShareErrors.badActionType();
            result.reject(error.code(), error.message());
            return;
        }

        JSActionHandler actionHandler = mHandlers.get(type);
        if (actionHandler != null) {
            actionHandler.handle(context, action, result);
        } else {
            ModuleError error = ShareErrors.unknownActionType();
            result.reject(error.code(), error.message());
        }
    }
}
