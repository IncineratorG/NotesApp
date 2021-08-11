package com.post.notes.modules.backup.module_actions_executor.handlers;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.google.android.gms.auth.api.signin.GoogleSignInClient;
import com.post.notes.modules.backup.backup_drive_service.BackupDriveService;
import com.post.notes.modules.backup.backup_drive_service.callbacks.log_out.OnLogOutFailure;
import com.post.notes.modules.backup.backup_drive_service.callbacks.log_out.OnLogOutSuccessful;
import com.post.notes.modules.backup.module_events.payloads.BackupEventsJSPayloads;
import com.post.notes.modules.backup.module_events.types.BackupEventTypes;
import com.post.notes.modules.modules_common.data_types.js_action_handler.JSActionHandler;

public class LogOutHandler implements JSActionHandler {
    @Override
    public void handle(ReactApplicationContext context, ReadableMap action, Promise result) {
        BackupDriveService.get().logOut(
                () -> {
                    context
                            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                            .emit(
                                    BackupEventTypes.LOG_OUT_RESULT,
                                    BackupEventsJSPayloads.logoutResultEventPayload(true, ""));
                },
                (e) -> {
                    context
                            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                            .emit(
                                    BackupEventTypes.LOG_OUT_RESULT,
                                    BackupEventsJSPayloads.logoutResultEventPayload(false, e.toString()));
                }
        );

//        GoogleSignInClient client = BackupDriveService.get().getGoogleSignInClient();
//        if (client == null) {
//            result.resolve(false);
//            context
//                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
//                    .emit(
//                            BackupEventTypes.LOG_OUT_RESULT,
//                            BackupEventsJSPayloads.logoutResultEventPayload(true, ""));
//            return;
//        }
//
//        client.signOut()
//                .addOnCompleteListener(task -> context
//                        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
//                        .emit(
//                            BackupEventTypes.LOG_OUT_RESULT,
//                            BackupEventsJSPayloads.logoutResultEventPayload(true, "")))
//                .addOnFailureListener(e -> context
//                        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
//                        .emit(
//                                BackupEventTypes.LOG_OUT_RESULT,
//                                BackupEventsJSPayloads.logoutResultEventPayload(false, e.toString())));

        result.resolve(true);
    }
}
