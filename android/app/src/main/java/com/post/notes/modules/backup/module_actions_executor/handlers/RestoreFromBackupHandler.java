package com.post.notes.modules.backup.module_actions_executor.handlers;


import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.post.notes.modules.backup.backup_drive_service.BackupDriveService;
import com.post.notes.modules.backup.backup_drive_service.callbacks.restore_from_backup.RestoreFromBackupCancelledCallback;
import com.post.notes.modules.backup.backup_drive_service.callbacks.restore_from_backup.RestoreFromBackupErrorCallback;
import com.post.notes.modules.backup.backup_drive_service.callbacks.restore_from_backup.RestoreFromBackupFinishedCallback;
import com.post.notes.modules.backup.backup_drive_service.callbacks.restore_from_backup.RestoreFromBackupProgressChangedCallback;
import com.post.notes.modules.backup.module_actions.payloads.BackupJSActionPayloads;
import com.post.notes.modules.backup.module_actions.payloads.payloads.RestoreFromBackupPayload;
import com.post.notes.modules.backup.module_errors.BackupErrors;
import com.post.notes.modules.backup.module_events.payloads.BackupEventsJSPayloads;
import com.post.notes.modules.backup.module_events.types.BackupEventTypes;
import com.post.notes.modules.modules_common.data.error.ModuleError;
import com.post.notes.modules.modules_common.data_types.js_action_handler.JSActionHandler;

public class RestoreFromBackupHandler implements JSActionHandler {
    private final String ACTION_PAYLOAD = "payload";

    public RestoreFromBackupHandler() {

    }

    @Override
    public void handle(ReactApplicationContext context, ReadableMap action, Promise result) {
        ReadableMap payloadMap = action.getMap(ACTION_PAYLOAD);
        if (payloadMap == null) {
            ModuleError error = BackupErrors.badPayload();
            result.reject(error.code(), error.message());
            return;
        }

        RestoreFromBackupPayload payload = BackupJSActionPayloads
                .restoreFromBackupPayload(payloadMap);
        if (!payload.isValid()) {
            ModuleError error = BackupErrors.badPayload();
            result.reject(error.code(), error.message());
            return;
        }

        RestoreFromBackupProgressChangedCallback progressChangedCallback = progress -> {
            Log.d("tag", "RestoreFromBackupHandler->RESTORE_PROGRESS_CHANGED: " + progress.stageDescription());

            context
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit(
                            BackupEventTypes.RESTORE_FROM_BACKUP_PROGRESS_CHANGED,
                            BackupEventsJSPayloads.restoreFromBackupProgressChangedEventPayload(progress)
                    );
        };
        RestoreFromBackupFinishedCallback finishedCallback = () -> {
            Log.d("tag", "RestoreFromBackupHandler->RESTORE_FINISHED");

            context
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit(
                            BackupEventTypes.RESTORE_FROM_BACKUP_FINISHED,
                            BackupEventsJSPayloads.restoreFromBackupFinishedEventPayload()
                    );
        };
        RestoreFromBackupCancelledCallback cancelledCallback = () -> {
            Log.d("tag", "RestoreFromBackupHandler->RESTORE_CANCELLED");

            context
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit(
                            BackupEventTypes.RESTORE_FROM_BACKUP_CANCELLED,
                            BackupEventsJSPayloads.restoreFromBackupCancelledEventPayload()
                    );
        };
        RestoreFromBackupErrorCallback errorCallback = error -> {
            Log.d("tag", "RestoreFromBackupHandler->RESTORE_ERROR: " + error.code() + " - " + error.message());

            context
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit(
                            BackupEventTypes.RESTORE_FROM_BACKUP_ERROR,
                            BackupEventsJSPayloads.restoreFromBackupErrorEventPayload(error)
                    );
        };

        BackupDriveService.get().restoreFromBackup(
                context,
                payload.backupDriveId(),
                progressChangedCallback,
                finishedCallback,
                cancelledCallback,
                errorCallback
        );

        result.resolve(true);
    }
}
