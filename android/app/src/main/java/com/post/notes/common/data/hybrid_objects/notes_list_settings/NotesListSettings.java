package com.post.notes.common.data.hybrid_objects.notes_list_settings;


import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.post.notes.modules.modules_common.data_types.hybrid_object.HybridObject;

import org.json.JSONException;
import org.json.JSONObject;

public class NotesListSettings implements HybridObject {
    private final String SORT_TYPE_FIELD = "sortType";
    private final String USE_COMPACT_VIEW_FIELD = "useCompactView";
    private final String GROUP_BY_CATEGORIES_FIELD = "groupByCategories";
    private final String SELECTED_CATEGORY_ID = "selectedCategoryId";

    private boolean mIsEmpty;
    private boolean mInitializedFromReadableMap;
    private boolean mInitializedFromStringifiedObject;

    private WritableMap mWritableMap;
    private JSONObject mJSONObject;

    public NotesListSettings(ReadableMap readableMap) {
        if (readableMap == null) {
            mIsEmpty = true;
            return;
        }

        mWritableMap = new WritableNativeMap();
        mWritableMap.merge(readableMap);

        mInitializedFromReadableMap = true;
        mIsEmpty = false;
    }

    public NotesListSettings(String stringifiedObject) {
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
                mWritableMap.putString(SORT_TYPE_FIELD, mJSONObject.getString(SORT_TYPE_FIELD));
                mWritableMap.putBoolean(USE_COMPACT_VIEW_FIELD, mJSONObject.getBoolean(USE_COMPACT_VIEW_FIELD));
                mWritableMap.putBoolean(GROUP_BY_CATEGORIES_FIELD, mJSONObject.getBoolean(GROUP_BY_CATEGORIES_FIELD));
                mWritableMap.putDouble(SELECTED_CATEGORY_ID, mJSONObject.getLong(SELECTED_CATEGORY_ID));
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
                mJSONObject.put(SORT_TYPE_FIELD, mWritableMap.getString(SORT_TYPE_FIELD));
                mJSONObject.put(USE_COMPACT_VIEW_FIELD, mWritableMap.getBoolean(USE_COMPACT_VIEW_FIELD));
                mJSONObject.put(GROUP_BY_CATEGORIES_FIELD, mWritableMap.getBoolean(GROUP_BY_CATEGORIES_FIELD));
                mJSONObject.put(SELECTED_CATEGORY_ID, mWritableMap.getDouble(SELECTED_CATEGORY_ID));
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

    public String sortType() {
        String sortType = "";
        if (mInitializedFromReadableMap) {
            sortType = mWritableMap.getString(SORT_TYPE_FIELD);
        } else if (mInitializedFromStringifiedObject) {
            try {
                sortType = mJSONObject.getString(SORT_TYPE_FIELD);
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }

        return sortType;
    }

    public boolean useCompactView() {
        boolean useCompactView = false;
        if (mInitializedFromReadableMap) {
            useCompactView = mWritableMap.getBoolean(USE_COMPACT_VIEW_FIELD);
        } else if (mInitializedFromStringifiedObject) {
            try {
                useCompactView = mJSONObject.getBoolean(USE_COMPACT_VIEW_FIELD);
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }

        return useCompactView;
    }

    public boolean groupByCategories() {
        boolean groupByCategories = false;
        if (mInitializedFromReadableMap) {
            groupByCategories = mWritableMap.getBoolean(GROUP_BY_CATEGORIES_FIELD);
        } else if (mInitializedFromStringifiedObject) {
            try {
                groupByCategories = mJSONObject.getBoolean(GROUP_BY_CATEGORIES_FIELD);
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }

        return groupByCategories;
    }

    public long selectedCategoryId() {
        long selectedCategoryId = -1;
        if (mInitializedFromReadableMap) {
            selectedCategoryId = (long) mWritableMap.getDouble(SELECTED_CATEGORY_ID);
        } else if (mInitializedFromStringifiedObject) {
            try {
                selectedCategoryId = mJSONObject.getLong(SELECTED_CATEGORY_ID);
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }

        return selectedCategoryId;
    }
}

//package com.notes.modules.modules_common.data.hybrid_objects.notes_list_settings;
//
//
//import com.facebook.react.bridge.ReadableMap;
//import com.facebook.react.bridge.WritableMap;
//import com.facebook.react.bridge.WritableNativeMap;
//import com.notes.modules.modules_common.data_types.hybrid_object.HybridObject;
//
//import org.json.JSONException;
//import org.json.JSONObject;
//
//public class NotesListSettings implements HybridObject {
//    private final String SORT_TYPE_FIELD = "sortType";
//    private final String USE_COMPACT_VIEW_FIELD = "useCompactView";
//    private final String GROUP_BY_CATEGORIES_FIELD = "groupByCategories";
//
//    private boolean mIsValid;
//    private boolean mIsWritableMapValid;
//    private boolean mIsJSONObjectValid;
//
//    private WritableMap mWritableMap;
//    private JSONObject mJSONObject;
//
//    private String mSortType;
//    private boolean mUseCompactView;
//    private boolean mGroupByCategories;
//
//    public NotesListSettings(ReadableMap readableMap) {
//        if (readableMap == null) {
//            return;
//        }
//
//        mSortType = readableMap.getString(SORT_TYPE_FIELD);
//        mUseCompactView = readableMap.getBoolean(USE_COMPACT_VIEW_FIELD);
//        mGroupByCategories = readableMap.getBoolean(GROUP_BY_CATEGORIES_FIELD);
//
//        if (mSortType == null) {
//            mIsValid = false;
//            return;
//        }
//
//        mJSONObject = new JSONObject();
//        try {
//            mJSONObject.put(SORT_TYPE_FIELD, mSortType);
//            mJSONObject.put(USE_COMPACT_VIEW_FIELD, mUseCompactView);
//            mJSONObject.put(GROUP_BY_CATEGORIES_FIELD, mGroupByCategories);
//
//            mIsJSONObjectValid = true;
//        } catch (JSONException e) {
//            e.printStackTrace();
//            mJSONObject = null;
//            mIsJSONObjectValid = false;
//        }
//
//        mWritableMap = new WritableNativeMap();
//        mWritableMap.putString(SORT_TYPE_FIELD, mSortType);
//        mWritableMap.putBoolean(USE_COMPACT_VIEW_FIELD, mUseCompactView);
//        mWritableMap.putBoolean(GROUP_BY_CATEGORIES_FIELD, mGroupByCategories);
//
//        mIsWritableMapValid = true;
//
//        mIsValid = mIsJSONObjectValid && mIsWritableMapValid;
//    }
//
//    public NotesListSettings(String stringifiedObject) {
//        if (stringifiedObject == null) {
//            return;
//        }
//
//        try {
//            mJSONObject = new JSONObject(stringifiedObject);
//
//            mSortType = mJSONObject.getString(SORT_TYPE_FIELD);
//            mUseCompactView = mJSONObject.getBoolean(USE_COMPACT_VIEW_FIELD);
//            mGroupByCategories = mJSONObject.getBoolean(GROUP_BY_CATEGORIES_FIELD);
//
//            mIsJSONObjectValid = true;
//        } catch (JSONException e) {
//            e.printStackTrace();
//            return;
//        }
//
//        mWritableMap = new WritableNativeMap();
//        mWritableMap.putString(SORT_TYPE_FIELD, mSortType);
//        mWritableMap.putBoolean(USE_COMPACT_VIEW_FIELD, mUseCompactView);
//        mWritableMap.putBoolean(GROUP_BY_CATEGORIES_FIELD, mGroupByCategories);
//
//        mIsWritableMapValid = true;
//
//        mIsValid = mIsJSONObjectValid && mIsWritableMapValid;
//    }
//
//    @Override
//    public WritableMap toWritableMap() {
//        return mWritableMap;
//    }
//
//    @Override
//    public JSONObject toJSONObject() {
//        return mJSONObject;
//    }
//
//    @Override
//    public boolean isEmpty() {
//        return mIsValid;
//    }
//
//    public String sortType() {
//        return mSortType;
//    }
//
//    public boolean useCompactView() {
//        return mUseCompactView;
//    }
//
//    public boolean groupByCategories() {
//        return mGroupByCategories;
//    }
//}
