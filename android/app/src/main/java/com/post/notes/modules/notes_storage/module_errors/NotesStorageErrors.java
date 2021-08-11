package com.post.notes.modules.notes_storage.module_errors;


import com.post.notes.modules.modules_common.data.error.ModuleError;

public class NotesStorageErrors {
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
}
