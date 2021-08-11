package com.post.notes.modules.share.module_errors;


import com.post.notes.modules.modules_common.data.error.ModuleError;

public class ShareErrors {
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
}
