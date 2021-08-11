package com.post.notes.modules.backup;


import android.app.Activity;
import android.content.Intent;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.post.notes.modules.backup.backup_drive_service.data.task_progress.BackupTaskProgress;
import com.post.notes.modules.backup.backup_drive_service.tasks.create_backup.CreateBackupTask;
import com.post.notes.modules.backup.backup_drive_service.tasks.restore_from_backup.RestoreFromBackupTask;
import com.post.notes.modules.backup.module_actions.types.BackupJSActionTypes;
import com.post.notes.modules.backup.module_actions_executor.BackupJSActionsExecutor;
import com.post.notes.modules.backup.module_events.types.BackupEventTypes;

import java.util.HashMap;
import java.util.Map;

public class BackupModule extends ReactContextBaseJavaModule implements ActivityEventListener {
    private ReactApplicationContext mContext;
    private BackupJSActionsExecutor mActionsExecutor;

    public BackupModule(@Nullable ReactApplicationContext reactContext) {
        super(reactContext);

        mContext = reactContext;
        if (mContext != null) {
            mContext.addActivityEventListener(this);
        }

        mActionsExecutor = new BackupJSActionsExecutor();
    }

    @NonNull
    @Override
    public String getName() {
        return "Backup";
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();

        WritableMap actionTypes = new WritableNativeMap();
        actionTypes.putString(BackupJSActionTypes.LOG_IN, BackupJSActionTypes.LOG_IN);
        actionTypes.putString(BackupJSActionTypes.LOG_OUT, BackupJSActionTypes.LOG_OUT);
        actionTypes.putString(BackupJSActionTypes.CREATE_BACKUP, BackupJSActionTypes.CREATE_BACKUP);
        actionTypes.putString(BackupJSActionTypes.CANCEL_ALL_BACKUP_TASKS, BackupJSActionTypes.CANCEL_ALL_BACKUP_TASKS);
        actionTypes.putString(BackupJSActionTypes.GET_NOTES_IMAGES_SIZE_IN_BYTES, BackupJSActionTypes.GET_NOTES_IMAGES_SIZE_IN_BYTES);
        actionTypes.putString(BackupJSActionTypes.GET_BACKUPS_LIST, BackupJSActionTypes.GET_BACKUPS_LIST);
        actionTypes.putString(BackupJSActionTypes.REMOVE_BACKUP, BackupJSActionTypes.REMOVE_BACKUP);
        actionTypes.putString(BackupJSActionTypes.RESTORE_FROM_BACKUP, BackupJSActionTypes.RESTORE_FROM_BACKUP);

        WritableMap eventTypes = new WritableNativeMap();
        eventTypes.putString(BackupEventTypes.LOG_IN_RESULT, BackupEventTypes.LOG_IN_RESULT);
        eventTypes.putString(BackupEventTypes.LOG_OUT_RESULT, BackupEventTypes.LOG_OUT_RESULT);
        eventTypes.putString(BackupEventTypes.CREATE_BACKUP_PROGRESS_CHANGED, BackupEventTypes.CREATE_BACKUP_PROGRESS_CHANGED);
        eventTypes.putString(BackupEventTypes.CREATE_BACKUP_FINISHED, BackupEventTypes.CREATE_BACKUP_FINISHED);
        eventTypes.putString(BackupEventTypes.CREATE_BACKUP_CANCELLED, BackupEventTypes.CREATE_BACKUP_CANCELLED);
        eventTypes.putString(BackupEventTypes.CREATE_BACKUP_ERROR, BackupEventTypes.CREATE_BACKUP_ERROR);
        eventTypes.putString(BackupEventTypes.GET_NOTES_IMAGES_SIZE_IN_BYTES_RESULT, BackupEventTypes.GET_NOTES_IMAGES_SIZE_IN_BYTES_RESULT);
        eventTypes.putString(BackupEventTypes.GET_BACKUPS_LIST_RESULT, BackupEventTypes.GET_BACKUPS_LIST_RESULT);
        eventTypes.putString(BackupEventTypes.GET_BACKUPS_LIST_ERROR, BackupEventTypes.GET_BACKUPS_LIST_ERROR);
        eventTypes.putString(BackupEventTypes.REMOVE_BACKUP_FINISHED, BackupEventTypes.REMOVE_BACKUP_FINISHED);
        eventTypes.putString(BackupEventTypes.REMOVE_BACKUP_ERROR, BackupEventTypes.REMOVE_BACKUP_ERROR);
        eventTypes.putString(BackupEventTypes.RESTORE_FROM_BACKUP_PROGRESS_CHANGED, BackupEventTypes.RESTORE_FROM_BACKUP_PROGRESS_CHANGED);
        eventTypes.putString(BackupEventTypes.RESTORE_FROM_BACKUP_FINISHED, BackupEventTypes.RESTORE_FROM_BACKUP_FINISHED);
        eventTypes.putString(BackupEventTypes.RESTORE_FROM_BACKUP_CANCELLED, BackupEventTypes.RESTORE_FROM_BACKUP_CANCELLED);
        eventTypes.putString(BackupEventTypes.RESTORE_FROM_BACKUP_ERROR, BackupEventTypes.RESTORE_FROM_BACKUP_ERROR);

        WritableMap taskProgressTypes = new WritableNativeMap();
        taskProgressTypes.putString(BackupTaskProgress.TYPE_SIMPLE, BackupTaskProgress.TYPE_SIMPLE);
        taskProgressTypes.putString(BackupTaskProgress.TYPE_COMPLEX, BackupTaskProgress.TYPE_COMPLEX);

        WritableMap createBackupTaskStagesTypes = new WritableNativeMap();
        createBackupTaskStagesTypes.putString(CreateBackupTask.PREPARING_DATA_STAGE, CreateBackupTask.PREPARING_DATA_STAGE);
        createBackupTaskStagesTypes.putString(CreateBackupTask.SAVING_APP_SETTINGS_STAGE, CreateBackupTask.SAVING_APP_SETTINGS_STAGE);
        createBackupTaskStagesTypes.putString(CreateBackupTask.SAVING_NOTES_TEXT_STAGE, CreateBackupTask.SAVING_NOTES_TEXT_STAGE);
        createBackupTaskStagesTypes.putString(CreateBackupTask.SAVING_NOTES_IMAGES_STAGE, CreateBackupTask.SAVING_NOTES_IMAGES_STAGE);

        WritableMap restoreFromBackupTaskStageTypes = new WritableNativeMap();
        restoreFromBackupTaskStageTypes.putString(RestoreFromBackupTask.PREPARING_BACKUP_DATA_STAGE, RestoreFromBackupTask.PREPARING_BACKUP_DATA_STAGE);
        restoreFromBackupTaskStageTypes.putString(RestoreFromBackupTask.RESTORING_APP_SETTINGS_STAGE, RestoreFromBackupTask.RESTORING_APP_SETTINGS_STAGE);
        restoreFromBackupTaskStageTypes.putString(RestoreFromBackupTask.RESTORING_NOTES_TEXT_STAGE, RestoreFromBackupTask.RESTORING_NOTES_TEXT_STAGE);
        restoreFromBackupTaskStageTypes.putString(RestoreFromBackupTask.RESTORING_NOTES_IMAGES_STAGE, RestoreFromBackupTask.RESTORING_NOTES_IMAGES_STAGE);
        restoreFromBackupTaskStageTypes.putString(RestoreFromBackupTask.FINISHING_STAGE, RestoreFromBackupTask.FINISHING_STAGE);

        constants.put("actionTypes", actionTypes);
        constants.put("eventTypes", eventTypes);
        constants.put("taskProgressTypes", taskProgressTypes);
        constants.put("createBackupTaskStagesTypes", createBackupTaskStagesTypes);
        constants.put("restoreFromBackupTaskStageTypes", restoreFromBackupTaskStageTypes);

        return constants;
    }

    @ReactMethod
    public void execute(ReadableMap action, Promise result) {
        mActionsExecutor.execute(mContext, action, result);
    }

    @Override
    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
        mActionsExecutor.onActivityResult(activity, requestCode, resultCode, data);
    }

    @Override
    public void onNewIntent(Intent intent) {
        Log.d("tag", "BackupModule->onNewIntent()");
    }
}
