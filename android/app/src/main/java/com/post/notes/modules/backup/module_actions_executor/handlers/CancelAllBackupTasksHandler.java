package com.post.notes.modules.backup.module_actions_executor.handlers;


import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;
import com.post.notes.modules.backup.backup_drive_service.tasks.BackupTasks;
import com.post.notes.modules.modules_common.data_types.js_action_handler.JSActionHandler;

public class CancelAllBackupTasksHandler implements JSActionHandler {
    @Override
    public void handle(ReactApplicationContext context, ReadableMap action, Promise result) {
        Log.d("tag", "CancelAllBackupTasksHandler->handle()");

        BackupTasks.runStopAllActiveTasksTask();
//        BackupTasks.stopAllActiveTasksTask().runOnRunner(BackupTaskRunner.get());
//        BackupTaskRunner.get().stopCurrentTask();

        result.resolve(true);
    }
}
