package com.post.notes.modules.backup.module_events.payloads;


import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.post.notes.modules.backup.backup_drive_service.data.backup_items_list.BackupItemsList;
import com.post.notes.modules.backup.backup_drive_service.data.task_progress.BackupTaskProgress;
import com.post.notes.modules.modules_common.data.error.ModuleError;

public class BackupEventsJSPayloads {
    public static WritableMap loginResultEventPayload(boolean successful, String email, String error) {
        WritableMap jsPayload = new WritableNativeMap();
        jsPayload.putBoolean("successful", successful);
        jsPayload.putString("email", email);
        jsPayload.putString("error", error);
        return jsPayload;
    }

    public static WritableMap logoutResultEventPayload(boolean successful, String error) {
        WritableMap jsPayload = new WritableNativeMap();
        jsPayload.putBoolean("successful", successful);
        jsPayload.putString("error", error);
        return jsPayload;
    }

    public static WritableMap getNotesImagesSizeInBytesResultEventPayload(double sizeInBytes) {
        WritableMap jsPayload = new WritableNativeMap();
        jsPayload.putDouble("notesImagesSizeInBytes", sizeInBytes);
        return jsPayload;
    }

    public static WritableMap createBackupProgressChangedEventPayload(BackupTaskProgress progress) {
        return progress.toWritableMap();
    }

    public static WritableMap createBackupFinishedEventPayload() {
        return new WritableNativeMap();
    }

    public static WritableMap createBackupCancelledEventPayload() {
        return new WritableNativeMap();
    }

    public static WritableMap createBackupErrorEventPayload(ModuleError error) {
        WritableMap jsPayload = new WritableNativeMap();
        jsPayload.putString("code", error.code());
        jsPayload.putString("message", error.message());
        return jsPayload;
    }

    public static WritableArray getBackupsListResultEventPayload(BackupItemsList backupItemsList) {
        return backupItemsList.toWritableArray();
    }

    public static WritableMap getBackupsListErrorEventPayload(ModuleError error) {
        WritableMap jsPayload = new WritableNativeMap();
        jsPayload.putString("code", error.code());
        jsPayload.putString("message", error.message());
        return jsPayload;
    }

    public static WritableMap removeBackupFinishedEventPayload() {
        return new WritableNativeMap();
    }

    public static WritableMap removeBackupErrorEventPayload(ModuleError error) {
        WritableMap jsPayload = new WritableNativeMap();
        jsPayload.putString("code", error.code());
        jsPayload.putString("message", error.message());
        return jsPayload;
    }

    public static WritableMap restoreFromBackupProgressChangedEventPayload(BackupTaskProgress progress) {
        return progress.toWritableMap();
    }

    public static WritableMap restoreFromBackupFinishedEventPayload() {
        return new WritableNativeMap();
    }

    public static WritableMap restoreFromBackupCancelledEventPayload() {
        return new WritableNativeMap();
    }

    public static WritableMap restoreFromBackupErrorEventPayload(ModuleError error) {
        WritableMap jsPayload = new WritableNativeMap();
        jsPayload.putString("code", error.code());
        jsPayload.putString("message", error.message());
        return jsPayload;
    }
}
