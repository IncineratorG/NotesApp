package com.post.notes.common.app_storages.helper;


import android.content.Context;

import com.tencent.mmkv.MMKV;

public class AppStoragesHelper {
    public static MMKV mmkvWithID(Context context, String id) {
        MMKV mmkv = null;
        try {
            mmkv = MMKV.mmkvWithID(id);
        } catch (IllegalStateException e) {
            MMKV.initialize(context);
            mmkv = MMKV.mmkvWithID(id);
        }

        return mmkv;
    }
}
