package com.post.notes.common.app_storages;


import com.post.notes.common.app_storages.common_storage.AppCommonStorage;
import com.post.notes.common.app_storages.notes_storage.AppNotesStorage;
import com.post.notes.common.app_storages.widget_storage.AppWidgetStorage;

public class AppStorages {
    private static AppStorages sInstance;

    private AppWidgetStorage mWidgetStorage;
    private AppCommonStorage mCommonStorage;
    private AppNotesStorage mNotesStorage;

    private AppStorages() {
        mWidgetStorage = new AppWidgetStorage();
        mCommonStorage = new AppCommonStorage();
        mNotesStorage = new AppNotesStorage();
    }

    public static synchronized AppStorages get() {
        if (sInstance == null) {
            sInstance = new AppStorages();
        }

        return sInstance;
    }

    public AppWidgetStorage widgetStorage() {
        if (mWidgetStorage == null) {
            mWidgetStorage = new AppWidgetStorage();
        }

        return mWidgetStorage;
    }

    public AppCommonStorage commonStorage() {
        if (mCommonStorage == null) {
            mCommonStorage = new AppCommonStorage();
        }

        return mCommonStorage;
    }

    public AppNotesStorage notesStorage() {
        if (mNotesStorage == null) {
            mNotesStorage = new AppNotesStorage();
        }

        return mNotesStorage;
    }
}
