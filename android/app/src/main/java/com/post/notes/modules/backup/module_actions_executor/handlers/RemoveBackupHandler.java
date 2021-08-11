package com.post.notes.modules.backup.module_actions_executor.handlers;


import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.post.notes.modules.backup.backup_drive_service.BackupDriveService;
import com.post.notes.modules.backup.backup_drive_service.callbacks.remove_backup.RemoveBackupErrorCallback;
import com.post.notes.modules.backup.backup_drive_service.callbacks.remove_backup.RemoveBackupFinishedCallback;
import com.post.notes.modules.backup.module_actions.payloads.BackupJSActionPayloads;
import com.post.notes.modules.backup.module_actions.payloads.payloads.RemoveBackupPayload;
import com.post.notes.modules.backup.module_errors.BackupErrors;
import com.post.notes.modules.backup.module_events.payloads.BackupEventsJSPayloads;
import com.post.notes.modules.backup.module_events.types.BackupEventTypes;
import com.post.notes.modules.modules_common.data.error.ModuleError;
import com.post.notes.modules.modules_common.data_types.js_action_handler.JSActionHandler;

public class RemoveBackupHandler implements JSActionHandler {
    private final String ACTION_PAYLOAD = "payload";

    @Override
    public void handle(ReactApplicationContext context, ReadableMap action, Promise result) {
        ReadableMap payloadMap = action.getMap(ACTION_PAYLOAD);
        if (payloadMap == null) {
            ModuleError error = BackupErrors.badPayload();
            result.reject(error.code(), error.message());
            return;
        }

        RemoveBackupPayload payload = BackupJSActionPayloads
                .removeBackupPayload(payloadMap);
        if (!payload.isValid()) {
            ModuleError error = BackupErrors.badPayload();
            result.reject(error.code(), error.message());
            return;
        }

        RemoveBackupFinishedCallback finishedCallback = () -> {
            context
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit(
                            BackupEventTypes.REMOVE_BACKUP_FINISHED,
                            BackupEventsJSPayloads.removeBackupFinishedEventPayload());
        };

        RemoveBackupErrorCallback errorCallback = error -> {
            context
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit(
                            BackupEventTypes.REMOVE_BACKUP_ERROR,
                            BackupEventsJSPayloads.removeBackupErrorEventPayload(error));
        };

        BackupDriveService.get().removeBackup(
                payload.backupDriveId(),
                finishedCallback,
                errorCallback
        );

        result.resolve(true);
    }
}
