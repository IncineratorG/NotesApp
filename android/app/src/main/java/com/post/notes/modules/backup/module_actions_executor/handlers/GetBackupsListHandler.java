package com.post.notes.modules.backup.module_actions_executor.handlers;


import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.post.notes.modules.backup.backup_drive_service.BackupDriveService;
import com.post.notes.modules.backup.backup_drive_service.callbacks.get_backups_list.GetBackupsListCancelledCallback;
import com.post.notes.modules.backup.backup_drive_service.callbacks.get_backups_list.GetBackupsListErrorCallback;
import com.post.notes.modules.backup.backup_drive_service.callbacks.get_backups_list.GetBackupsListFinishedCallback;
import com.post.notes.modules.backup.backup_drive_service.data.backup_items_list.BackupItemsList;
import com.post.notes.modules.backup.module_events.payloads.BackupEventsJSPayloads;
import com.post.notes.modules.backup.module_events.types.BackupEventTypes;
import com.post.notes.modules.modules_common.data_types.js_action_handler.JSActionHandler;

public class GetBackupsListHandler implements JSActionHandler {
    @Override
    public void handle(ReactApplicationContext context, ReadableMap action, Promise result) {
        Log.d("tag", "GetBackupsListHandler->handle()");

        GetBackupsListFinishedCallback finishedCallback = list -> {
            Log.d("tag", "GetBackupsListHandler->finishedCallback");

            context
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit(
                            BackupEventTypes.GET_BACKUPS_LIST_RESULT,
                            BackupEventsJSPayloads.getBackupsListResultEventPayload(list)
                    );
        };

        GetBackupsListCancelledCallback cancelledCallback = () -> {
            Log.d("tag", "GetBackupsListHandler->cancelledCallback");

            context
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit(
                            BackupEventTypes.GET_BACKUPS_LIST_RESULT,
                            BackupEventsJSPayloads.getBackupsListResultEventPayload(new BackupItemsList())
                    );
        };

        GetBackupsListErrorCallback errorCallback = error -> {
            Log.d("tag", "GetBackupsListHandler->errorCallback");

            context
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit(
                            BackupEventTypes.GET_BACKUPS_LIST_RESULT,
                            BackupEventsJSPayloads.getBackupsListResultEventPayload(new BackupItemsList())
                    );
        };

        BackupDriveService.get().getBackupsList(
                finishedCallback,
                cancelledCallback,
                errorCallback
        );

        result.resolve(true);
    }
}
