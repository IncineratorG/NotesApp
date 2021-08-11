package com.post.notes.common.data.hybrid_objects.category;


import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.post.notes.modules.modules_common.data_types.hybrid_object.HybridObject;

import org.json.JSONException;
import org.json.JSONObject;

public class Category implements HybridObject {
    private final String CATEGORY_ID_FIELD = "id";
    private final String COLOR_FIELD = "color";
    private final String NAME_FIELD = "name";
    private final String ORDER_POS_FIELD = "orderPos";
    private final String IS_DEFAULT_FIELD = "isDefault";
    private final String TRANSLATION_MARK_FIELD = "translation_mark";

    private boolean mIsEmpty;
    private boolean mInitializedFromReadableMap;
    private boolean mInitializedFromStringifiedObject;

    private WritableMap mWritableMap;
    private JSONObject mJSONObject;

    public Category(ReadableMap readableMap) {
        if (readableMap == null) {
            mIsEmpty = true;
            return;
        }

        mWritableMap = new WritableNativeMap();
        mWritableMap.merge(readableMap);

        mInitializedFromReadableMap = true;
        mIsEmpty = false;
    }

    public Category(String stringifiedObject) {
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
                mWritableMap.putDouble(CATEGORY_ID_FIELD, mJSONObject.getLong(CATEGORY_ID_FIELD));
                mWritableMap.putString(COLOR_FIELD, mJSONObject.getString(COLOR_FIELD));
                mWritableMap.putString(NAME_FIELD, mJSONObject.getString(NAME_FIELD));
                mWritableMap.putDouble(ORDER_POS_FIELD, mJSONObject.getLong(ORDER_POS_FIELD));
                mWritableMap.putBoolean(IS_DEFAULT_FIELD, mJSONObject.getBoolean(IS_DEFAULT_FIELD));

                if (mJSONObject.has(TRANSLATION_MARK_FIELD)) {
                    mWritableMap.putString(TRANSLATION_MARK_FIELD, mJSONObject.getString(TRANSLATION_MARK_FIELD));
                } else {
                    mWritableMap.putNull(TRANSLATION_MARK_FIELD);
                }
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
                mJSONObject.put(CATEGORY_ID_FIELD, mWritableMap.getDouble(CATEGORY_ID_FIELD));
                mJSONObject.put(COLOR_FIELD, mWritableMap.getString(COLOR_FIELD));
                mJSONObject.put(NAME_FIELD, mWritableMap.getString(NAME_FIELD));
                mJSONObject.put(ORDER_POS_FIELD, mWritableMap.getDouble(ORDER_POS_FIELD));
                mJSONObject.put(IS_DEFAULT_FIELD, mWritableMap.getBoolean(IS_DEFAULT_FIELD));

                if (mWritableMap.hasKey(TRANSLATION_MARK_FIELD)) {
                    String translationMark = mWritableMap.getString(TRANSLATION_MARK_FIELD);
                    if (translationMark != null && !translationMark.isEmpty()) {
                        mJSONObject.put(TRANSLATION_MARK_FIELD, translationMark);
                    }
                }
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

    public long id() {
        long id = -1;
        if (mInitializedFromReadableMap) {
            id = (long) mWritableMap.getDouble(CATEGORY_ID_FIELD);
        } else if (mInitializedFromStringifiedObject) {
            try {
                id = mJSONObject.getLong(CATEGORY_ID_FIELD);
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }

        return id;
    }

    public String color() {
        String color = "";
        if (mInitializedFromReadableMap) {
            color = mWritableMap.getString(COLOR_FIELD);
        } else if (mInitializedFromStringifiedObject) {
            try {
                color = mJSONObject.getString(COLOR_FIELD);
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }

        return color;
    }

    public String name() {
        String name = "";
        if (mInitializedFromReadableMap) {
            name = mWritableMap.getString(NAME_FIELD);
        } else if (mInitializedFromStringifiedObject) {
            try {
                name = mJSONObject.getString(NAME_FIELD);
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }

        return name;
    }

    public long orderPos() {
        long orderPos = -1;
        if (mInitializedFromReadableMap) {
            orderPos = (long) mWritableMap.getDouble(ORDER_POS_FIELD);
        } else if (mInitializedFromStringifiedObject) {
            try {
                orderPos = mJSONObject.getLong(ORDER_POS_FIELD);
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }

        return orderPos;
    }

    public boolean isDefault() {
        boolean isDefault = false;
        if (mInitializedFromReadableMap) {
            isDefault = mWritableMap.getBoolean(IS_DEFAULT_FIELD);
        } else if (mInitializedFromStringifiedObject) {
            try {
                isDefault = mJSONObject.getBoolean(IS_DEFAULT_FIELD);
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }

        return isDefault;
    }

    public String translationMark() {
        String translationMark = "";
        if (mInitializedFromReadableMap) {
            translationMark = mWritableMap.getString(TRANSLATION_MARK_FIELD);
            if (translationMark == null) {
                translationMark = "";
            }
        } else if (mInitializedFromStringifiedObject) {
            try {
                if (mJSONObject.has(TRANSLATION_MARK_FIELD)) {
                    translationMark = mJSONObject.getString(TRANSLATION_MARK_FIELD);
                }
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }

        return translationMark;
    }
}
