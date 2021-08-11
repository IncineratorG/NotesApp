package com.post.notes.modules.mmkv_storage.module_actions.payloads;


import com.facebook.react.bridge.ReadableMap;
import com.post.notes.modules.mmkv_storage.module_actions.payloads.payloads.GetStringifiedObjectPayload;
import com.post.notes.modules.mmkv_storage.module_actions.payloads.payloads.RemoveStringifiedObjectPayload;
import com.post.notes.modules.mmkv_storage.module_actions.payloads.payloads.SaveStringifiedObjectPayload;

public class MMKVStorageJSActionPayloads {
    public static SaveStringifiedObjectPayload saveStringifiedObjectPayload(ReadableMap payloadMap) {
        return new SaveStringifiedObjectPayload(payloadMap);
    }

    public static GetStringifiedObjectPayload getStringifiedObjectPayload(ReadableMap payloadMap) {
        return new GetStringifiedObjectPayload(payloadMap);
    }

    public static RemoveStringifiedObjectPayload removeStringifiedObjectPayload(ReadableMap payloadMap) {
        return new RemoveStringifiedObjectPayload(payloadMap);
    }
}
