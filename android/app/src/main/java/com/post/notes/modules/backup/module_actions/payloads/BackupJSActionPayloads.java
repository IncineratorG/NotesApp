package com.post.notes.modules.backup.module_actions.payloads;


import com.facebook.react.bridge.ReadableMap;
import com.post.notes.modules.backup.module_actions.payloads.payloads.CreateBackupPayload;
import com.post.notes.modules.backup.module_actions.payloads.payloads.RemoveBackupPayload;
import com.post.notes.modules.backup.module_actions.payloads.payloads.RestoreFromBackupPayload;

public class BackupJSActionPayloads {
    public static CreateBackupPayload createBackupPayload(ReadableMap payloadMap) {
        return new CreateBackupPayload(payloadMap);
    }

    public static RemoveBackupPayload removeBackupPayload(ReadableMap payloadMap) {
        return new RemoveBackupPayload(payloadMap);
    }

    public static RestoreFromBackupPayload restoreFromBackupPayload(ReadableMap payloadMap) {
        return new RestoreFromBackupPayload(payloadMap);
    }
}
