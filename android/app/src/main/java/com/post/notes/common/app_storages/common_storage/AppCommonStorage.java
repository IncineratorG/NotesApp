package com.post.notes.common.app_storages.common_storage;


import android.content.Context;
import android.util.Log;

import com.post.notes.common.app_storages.helper.AppStoragesHelper;
import com.tencent.mmkv.MMKV;

public class AppCommonStorage {
    private final String COMMON_DATA_STORAGE_MMKV_ID = "commonDataStorageMMKVID";

    public AppCommonStorage() {

    }

    public boolean save(Context context, String key, String value) {
        MMKV mmkv = AppStoragesHelper.mmkvWithID(context, COMMON_DATA_STORAGE_MMKV_ID);
        if (mmkv == null) {
            Log.d("tag", "AppCommonStorage->save()->MMKV_IS_NULL");
            return false;
        }

        return mmkv.encode(key, value);
    }

    public String get(Context context, String key) {
        MMKV mmkv = AppStoragesHelper.mmkvWithID(context, COMMON_DATA_STORAGE_MMKV_ID);
        if (mmkv == null) {
            Log.d("tag", "AppCommonStorage->get()->MMKV_IS_NULL");
            return null;
        }

        return mmkv.decodeString(key);
    }

    public boolean remove(Context context, String key) {
        MMKV mmkv = AppStoragesHelper.mmkvWithID(context, COMMON_DATA_STORAGE_MMKV_ID);
        if (mmkv == null) {
            Log.d("tag", "AppCommonStorage->remove()->MMKV_IS_NULL");
            return false;
        }

        mmkv.removeValueForKey(key);
        return true;
    }
}
