package com.post.notes.modules.backup.module_actions_executor;


import android.app.Activity;
import android.content.Intent;
import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;
import com.post.notes.modules.backup.module_actions.types.BackupJSActionTypes;
import com.post.notes.modules.backup.module_actions_executor.handlers.CancelAllBackupTasksHandler;
import com.post.notes.modules.backup.module_actions_executor.handlers.CreateBackupHandler;
import com.post.notes.modules.backup.module_actions_executor.handlers.GetBackupsListHandler;
import com.post.notes.modules.backup.module_actions_executor.handlers.GetNoteImagesSizeInBytesHandler;
import com.post.notes.modules.backup.module_actions_executor.handlers.LogInHandler;
import com.post.notes.modules.backup.module_actions_executor.handlers.LogOutHandler;
import com.post.notes.modules.backup.module_actions_executor.handlers.RemoveBackupHandler;
import com.post.notes.modules.backup.module_actions_executor.handlers.RestoreFromBackupHandler;
import com.post.notes.modules.backup.module_errors.BackupErrors;
import com.post.notes.modules.modules_common.data.error.ModuleError;
import com.post.notes.modules.modules_common.data_types.activity_result_callback.ActivityResultCallback;
import com.post.notes.modules.modules_common.data_types.activity_result_callback.ModuleActivityResultCallbacks;
import com.post.notes.modules.modules_common.data_types.js_action_handler.JSActionHandler;
import com.post.notes.modules.modules_common.data_types.js_actions_executor.JSActionsExecutor;

import java.util.HashMap;
import java.util.Map;

public class BackupJSActionsExecutor implements JSActionsExecutor {
    private static final String ACTION_TYPE = "type";
    private Map<String, JSActionHandler> mHandlers;
    private ModuleActivityResultCallbacks mActivityResultCallbacks;

    public BackupJSActionsExecutor() {
        mActivityResultCallbacks = new ModuleActivityResultCallbacks();

        mHandlers = new HashMap<>();
        mHandlers.put(BackupJSActionTypes.LOG_IN, new LogInHandler(mActivityResultCallbacks));
        mHandlers.put(BackupJSActionTypes.LOG_OUT, new LogOutHandler());
        mHandlers.put(BackupJSActionTypes.CREATE_BACKUP, new CreateBackupHandler());
        mHandlers.put(BackupJSActionTypes.CANCEL_ALL_BACKUP_TASKS, new CancelAllBackupTasksHandler());
        mHandlers.put(BackupJSActionTypes.GET_NOTES_IMAGES_SIZE_IN_BYTES, new GetNoteImagesSizeInBytesHandler());
        mHandlers.put(BackupJSActionTypes.GET_BACKUPS_LIST, new GetBackupsListHandler());
        mHandlers.put(BackupJSActionTypes.REMOVE_BACKUP, new RemoveBackupHandler());
        mHandlers.put(BackupJSActionTypes.RESTORE_FROM_BACKUP, new RestoreFromBackupHandler());
    }

    @Override
    public void execute(ReactApplicationContext context, ReadableMap action, Promise result) {
        if (action == null) {
            ModuleError error = BackupErrors.badAction();
            result.reject(error.code(), error.message());
            return;
        }

        final String type = action.getString(ACTION_TYPE);
        if (type == null) {
            ModuleError error = BackupErrors.badActionType();
            result.reject(error.code(), error.message());
            return;
        }

        JSActionHandler actionHandler = mHandlers.get(type);
        if (actionHandler != null) {
            actionHandler.handle(context, action, result);
        } else {
            ModuleError error = BackupErrors.unknownActionType();
            result.reject(error.code(), error.message());
        }
    }

    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
        ActivityResultCallback callback = mActivityResultCallbacks.getAndRemove(requestCode);
        if (callback != null) {
            callback.handle(activity, requestCode, resultCode, data);
        } else {
            Log.d(
                    "tag",
                    "BackupJSActionsExecutor->onActivityResult()->NO_SUCH_CALLBACKS: " + String.valueOf(requestCode)
            );
        }
    }
}
