package com.post.notes.modules.backup.module_errors;


import com.post.notes.modules.modules_common.data.error.ModuleError;

public class BackupErrors {


    public static ModuleError badAction() {
        return new ModuleError("1", "BAD_ACTION");
    }

    public static ModuleError badActionType() {
        return new ModuleError("2", "BAD_ACTION_TYPE");
    }

    public static ModuleError unknownActionType() {
        return new ModuleError("3", "UNKNOWN_ACTION_TYPE");
    }

    public static ModuleError badPayload() {
        return new ModuleError("4", "BAD_PAYLOAD");
    }

    public static ModuleError badCurrentActivity() {
        return new ModuleError("5", "BAD_CURRENT_ACTIVITY");
    }

    public static ModuleError unableToResolveActivity() {
        return new ModuleError("6", "UNABLE_TO_RESOLVE_ACTIVITY");
    }

    public static ModuleError driveServiceNotInitialized() {
        return new ModuleError("7", "DRIVE_SERVICE_NOT_INITIALIZED");
    }

    public static ModuleError badContext() {
        return new ModuleError("8", "BAD_CONTEXT");
    }

    public static ModuleError badBackupRootFolderId() {
        return new ModuleError("9", "BAD_BACKUP_ROOT_FOLDER_ID");
    }

    public static ModuleError unableToCreateNotesBackup() {
        return new ModuleError("10", "UNABLE_TO_CREATE_NOTES_BACKUP");
    }

    public static ModuleError unableToCreateImagesBackup() {
        return new ModuleError("11", "UNABLE_TO_CREATE_IMAGES_BACKUP");
    }

    public static ModuleError unableToRestoreNotesBackup() {
        return new ModuleError("12", "UNABLE_TO_RESTORE_NOTES_BACKUP");
    }

    public static ModuleError unableToRestoreImagesBackup() {
        return new ModuleError("13", "UNABLE_TO_RESTORE_IMAGES_BACKUP");
    }
}
