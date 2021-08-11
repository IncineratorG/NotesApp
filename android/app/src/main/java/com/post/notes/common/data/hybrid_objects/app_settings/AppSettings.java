package com.post.notes.common.data.hybrid_objects.app_settings;


import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.post.notes.modules.modules_common.data_types.hybrid_object.HybridObject;

import org.json.JSONException;
import org.json.JSONObject;

public class AppSettings implements HybridObject {
    private final String NOTES_SETTINGS_FIELD = "notes";
    private final String NOTE_TEXT_DEFAULT_SIZE_FIELD = "noteTextDefaultSize";
    private final String MOVE_CHECKED_LIST_ITEMS_TO_BOTTOM = "moveCheckedToBottom";
    private final String OTHER_SETTINGS_FIELD = "other";
    private final String TRASH_SETTINGS_FIELD = "trash";
    private final String AUTO_TRASH_CLEARING_FIELD = "automaticCleaning";

    private boolean mIsEmpty;
    private boolean mInitializedFromReadableMap;
    private boolean mInitializedFromStringifiedObject;

    private WritableMap mWritableMap;
    private JSONObject mJSONObject;

    public AppSettings(ReadableMap readableMap) {
        if (readableMap == null) {
            mIsEmpty = true;
            return;
        }

        mWritableMap = new WritableNativeMap();
        mWritableMap.merge(readableMap);

        mInitializedFromReadableMap = true;
        mIsEmpty = false;
    }

    public AppSettings(String stringifiedObject) {
        if (stringifiedObject == null || stringifiedObject.isEmpty()) {
            mIsEmpty = true;
            return;
        }

        try {
            mJSONObject = new JSONObject(stringifiedObject);

            mInitializedFromStringifiedObject = true;
            mIsEmpty = false;
        } catch (JSONException e) {
            e.printStackTrace();
            mIsEmpty = true;
        }
    }

    @Override
    public WritableMap toWritableMap() {
        if (mIsEmpty) {
            return null;
        }

        if (mInitializedFromReadableMap) {
            return mWritableMap;
        }

        if (mInitializedFromStringifiedObject) {
            if (mWritableMap != null) {
                return mWritableMap;
            }

            mWritableMap = new WritableNativeMap();
            try {
                WritableMap notesSettingsMap = new WritableNativeMap();
                notesSettingsMap.putString(
                        NOTE_TEXT_DEFAULT_SIZE_FIELD,
                        mJSONObject
                                .getJSONObject(NOTES_SETTINGS_FIELD)
                                .getString(NOTE_TEXT_DEFAULT_SIZE_FIELD)
                );
                notesSettingsMap.putBoolean(
                        MOVE_CHECKED_LIST_ITEMS_TO_BOTTOM,
                        mJSONObject
                                .getJSONObject(NOTES_SETTINGS_FIELD)
                                .getBoolean(MOVE_CHECKED_LIST_ITEMS_TO_BOTTOM)
                );

                mWritableMap.putMap(NOTES_SETTINGS_FIELD, notesSettingsMap);

                WritableMap otherSettingsMap = new WritableNativeMap();

                WritableMap trashSettingsMap = new WritableNativeMap();
                trashSettingsMap.putBoolean(
                        AUTO_TRASH_CLEARING_FIELD,
                        mJSONObject
                                .getJSONObject(OTHER_SETTINGS_FIELD)
                                .getJSONObject(TRASH_SETTINGS_FIELD)
                                .getBoolean(AUTO_TRASH_CLEARING_FIELD)
                );

                otherSettingsMap.putMap(TRASH_SETTINGS_FIELD, trashSettingsMap);

                mWritableMap.putMap(OTHER_SETTINGS_FIELD, otherSettingsMap);
            } catch (JSONException e) {
                e.printStackTrace();
                mWritableMap = null;
            }

            return mWritableMap;
        }

        return null;
    }

    @Override
    public WritableArray toWritableArray() {
        return new WritableNativeArray();
    }

    @Override
    public String stringify() {
        if (mIsEmpty) {
            return "";
        }

        if (mInitializedFromStringifiedObject) {
            return mJSONObject.toString();
        }

        if (mInitializedFromReadableMap) {
            if (mJSONObject != null) {
                return mJSONObject.toString();
            }

            mJSONObject = new JSONObject();
            try {
                JSONObject notesSettingsObject = new JSONObject();
                notesSettingsObject.put(
                        NOTE_TEXT_DEFAULT_SIZE_FIELD,
                        mWritableMap
                                .getMap(NOTES_SETTINGS_FIELD)
                                .getString(NOTE_TEXT_DEFAULT_SIZE_FIELD)
                );
                notesSettingsObject.put(
                        MOVE_CHECKED_LIST_ITEMS_TO_BOTTOM,
                        mWritableMap
                                .getMap(NOTES_SETTINGS_FIELD)
                                .getBoolean(MOVE_CHECKED_LIST_ITEMS_TO_BOTTOM)
                );

                mJSONObject.put(NOTES_SETTINGS_FIELD, notesSettingsObject);

                JSONObject otherSettingsObject = new JSONObject();

                JSONObject trashSettingsObject = new JSONObject();
                trashSettingsObject.put(
                        AUTO_TRASH_CLEARING_FIELD,
                        mWritableMap
                                .getMap(OTHER_SETTINGS_FIELD)
                                .getMap(TRASH_SETTINGS_FIELD)
                                .getBoolean(AUTO_TRASH_CLEARING_FIELD)
                );

                otherSettingsObject.put(TRASH_SETTINGS_FIELD, trashSettingsObject);

                mJSONObject.put(OTHER_SETTINGS_FIELD, otherSettingsObject);
            } catch (JSONException e) {
                e.printStackTrace();
                mJSONObject = null;
            }

            if (mJSONObject != null) {
                return mJSONObject.toString();
            } else {
                return "";
            }
        }

        return "";
    }

    @Override
    public boolean isEmpty() {
        return mIsEmpty;
    }

    public String noteTextDefaultSize() {
        String noteTextDefaultSize = "";
        if (mInitializedFromReadableMap) {
            noteTextDefaultSize = mWritableMap.getMap(NOTES_SETTINGS_FIELD).getString(NOTE_TEXT_DEFAULT_SIZE_FIELD);
        } else if (mInitializedFromStringifiedObject) {
            try {
                noteTextDefaultSize = mJSONObject.getJSONObject(NOTES_SETTINGS_FIELD).getString(NOTE_TEXT_DEFAULT_SIZE_FIELD);
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }

        return noteTextDefaultSize;
    }

    public boolean moveCheckedListItemsToBottom() {
        boolean moveCheckedListItemsToBottom = false;
        if (mInitializedFromReadableMap) {
            moveCheckedListItemsToBottom = mWritableMap.getMap(NOTES_SETTINGS_FIELD).getBoolean(MOVE_CHECKED_LIST_ITEMS_TO_BOTTOM);
        } else if (mInitializedFromStringifiedObject) {
            try {
                moveCheckedListItemsToBottom = mJSONObject.getJSONObject(NOTES_SETTINGS_FIELD).getBoolean(MOVE_CHECKED_LIST_ITEMS_TO_BOTTOM);
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }

        return moveCheckedListItemsToBottom;
    }

    public boolean autoTrashClearing() {
        boolean autoTrashClearing = false;
        if (mInitializedFromReadableMap) {
            autoTrashClearing = mWritableMap.getMap(OTHER_SETTINGS_FIELD).getMap(TRASH_SETTINGS_FIELD).getBoolean(AUTO_TRASH_CLEARING_FIELD);
        } else if (mInitializedFromStringifiedObject) {
            try {
                autoTrashClearing = mJSONObject.getJSONObject(OTHER_SETTINGS_FIELD).getJSONObject(TRASH_SETTINGS_FIELD).getBoolean(AUTO_TRASH_CLEARING_FIELD);
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }

        return autoTrashClearing;
    }
}
