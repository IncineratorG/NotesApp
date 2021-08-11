package com.post.notes.modules.mmkv_storage.module_actions_executor;


import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;
import com.post.notes.common.app_storages.AppStorages;
import com.post.notes.modules.mmkv_storage.module_actions.payloads.MMKVStorageJSActionPayloads;
import com.post.notes.modules.mmkv_storage.module_actions.payloads.payloads.GetStringifiedObjectPayload;
import com.post.notes.modules.mmkv_storage.module_actions.payloads.payloads.RemoveStringifiedObjectPayload;
import com.post.notes.modules.mmkv_storage.module_actions.payloads.payloads.SaveStringifiedObjectPayload;
import com.post.notes.modules.mmkv_storage.module_actions.types.MMKVStorageJSActionTypes;
import com.post.notes.modules.mmkv_storage.module_errors.MMKVStorageErrors;
import com.post.notes.modules.modules_common.data.error.ModuleError;
import com.post.notes.modules.modules_common.data_types.js_actions_executor.JSActionsExecutor;

public class MMKVStorageJSActionsExecutor implements JSActionsExecutor {
    private static final String ACTION_TYPE = "type";
    private static final String ACTION_PAYLOAD = "payload";

    public MMKVStorageJSActionsExecutor() {

    }

    @Override
    public void execute(ReactApplicationContext context, ReadableMap action, Promise result) {
        if (action == null) {
            ModuleError error = MMKVStorageErrors.badAction();
            result.reject(error.code(), error.message());
            return;
        }

        final String type = action.getString(ACTION_TYPE);
        if (type == null) {
            ModuleError error = MMKVStorageErrors.badActionType();
            result.reject(error.code(), error.message());
            return;
        }

        switch (type) {
            case (MMKVStorageJSActionTypes.SAVE_STRINGIFIED_OBJECT): {
                ReadableMap payloadMap = action.getMap(ACTION_PAYLOAD);
                if (payloadMap == null) {
                    ModuleError error = MMKVStorageErrors.badPayload();
                    result.reject(error.code(), error.message());
                    return;
                }

                SaveStringifiedObjectPayload payload = MMKVStorageJSActionPayloads
                        .saveStringifiedObjectPayload(payloadMap);
                if (!payload.isValid()) {
                    ModuleError error = MMKVStorageErrors.badPayload();
                    result.reject(error.code(), error.message());
                    return;
                }

                boolean saveResult = AppStorages.get().commonStorage().save(context, payload.key(), payload.object());
                result.resolve(saveResult);
//                result.resolve(
//                        LocalStorage
//                                .get(mContext)
//                                .save(
//                                        payload.key(),
//                                        payload.object()
//                                )
//                );
                break;
            }

            case (MMKVStorageJSActionTypes.GET_STRINGIFIED_OBJECT): {
                ReadableMap payloadMap = action.getMap(ACTION_PAYLOAD);
                if (payloadMap == null) {
                    ModuleError error = MMKVStorageErrors.badPayload();
                    result.reject(error.code(), error.message());
                    return;
                }

                GetStringifiedObjectPayload payload = MMKVStorageJSActionPayloads
                        .getStringifiedObjectPayload(payloadMap);
                if (!payload.isValid()) {
                    ModuleError error = MMKVStorageErrors.badPayload();
                    result.reject(error.code(), error.message());
                    return;
                }

                String stringifiedObject = AppStorages.get().commonStorage().get(context, payload.key());
                result.resolve(stringifiedObject);
//                result.resolve(LocalStorage.get(mContext).get(payload.key()));
                break;
            }

            case (MMKVStorageJSActionTypes.REMOVE_STRINGIFIED_OBJECT): {
                ReadableMap payloadMap = action.getMap(ACTION_PAYLOAD);
                if (payloadMap == null) {
                    ModuleError error = MMKVStorageErrors.badPayload();
                    result.reject(error.code(), error.message());
                    return;
                }

                RemoveStringifiedObjectPayload payload = MMKVStorageJSActionPayloads
                        .removeStringifiedObjectPayload(payloadMap);
                if (!payload.isValid()) {
                    ModuleError error = MMKVStorageErrors.badPayload();
                    result.reject(error.code(), error.message());
                    return;
                }

                boolean removeResult = AppStorages.get().commonStorage().remove(context, payload.key());
                result.resolve(removeResult);
                break;
            }

            default: {
                ModuleError error = MMKVStorageErrors.unknownActionType();
                result.reject(error.code(), error.message());
            }
        }
    }
}
