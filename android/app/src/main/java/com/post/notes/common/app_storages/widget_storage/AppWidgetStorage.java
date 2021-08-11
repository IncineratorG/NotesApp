package com.post.notes.common.app_storages.widget_storage;


import android.content.Context;
import android.util.Log;

import com.post.notes.common.app_storages.helper.AppStoragesHelper;
import com.post.notes.widget.data.widget_model_info.WidgetModelInfo;
import com.tencent.mmkv.MMKV;

public class AppWidgetStorage {
    private final String WIDGET_DATA_STORAGE_MMKV_ID = "widgetDataStorageMMKVID";

    public AppWidgetStorage() {

    }

    public boolean setWidgetModelInfo(Context context, WidgetModelInfo modelInfo) {
        MMKV mmkv = AppStoragesHelper.mmkvWithID(context, WIDGET_DATA_STORAGE_MMKV_ID);
        if (mmkv == null) {
            Log.d("tag", "AppWidgetStorage->setWidgetModelInfo()->MMKV_IS_NULL");
            return false;
        }

        return mmkv.encode(String.valueOf(modelInfo.widgetId()), modelInfo.stringify());
    }

    public WidgetModelInfo getWidgetModelInfo(Context context, int widgetId) {
        MMKV mmkv = AppStoragesHelper.mmkvWithID(context, WIDGET_DATA_STORAGE_MMKV_ID);
        if (mmkv == null) {
            Log.d("tag", "AppWidgetStorage->getWidgetModelInfo()->MMKV_IS_NULL");
            return null;
        }

        return new WidgetModelInfo(mmkv.decodeString(String.valueOf(widgetId)));
    }

    public boolean removeWidgetModelInfo(Context context, int widgetId) {
        MMKV mmkv = AppStoragesHelper.mmkvWithID(context, WIDGET_DATA_STORAGE_MMKV_ID);
        if (mmkv == null) {
            Log.d("tag", "AppWidgetStorage->removeWidgetModelInfo()->MMKV_IS_NULL");
            return false;
        }

        mmkv.removeValueForKey(String.valueOf(widgetId));
        return true;
    }
}
