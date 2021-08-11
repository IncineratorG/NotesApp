package com.post.notes.common.data.hybrid_objects.note;


import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.post.notes.modules.modules_common.data_types.hybrid_object.HybridObject;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class Note implements HybridObject {
    private final String NOTE_ID_FIELD = "id";
    private final String TITLE_FIELD = "title";
    private final String IS_LIST_FIELD = "isList";
    private final String NOTE_TEXT_FIELD = "noteText";
    private final String TEXT_SIZE_FIELD = "textSize";
    private final String MOVE_CHECKED_TO_BOTTOM_FIELD = "moveCheckedToBottom";
    private final String CATEGORY_FIELD = "category";
    private final String CATEGORY_ID_FIELD = "id";
    private final String REMINDER_FIELD = "reminder";
    private final String REMINDER_ID_FIELD = "id";
    private final String REMINDER_SELECTED__DATE_IN_MILLISECONDS_FIELD = "selectedDateInMilliseconds";
    private final String REMINDER_REPEAT_OPTION_FIELD = "repeatOption";
    private final String IMAGES_FIELD = "images";
    private final String DELETED_FIELD = "deleted";
    private final String VAULTED_DATE_TIMESTAMP_FIELD = "vaultedDateTimestamp";
    private final String DELETE_DATE_TIMESTAMP_FIELD = "deleteDateTimestamp";
    private final String CREATION_DATE_TIMESTAMP_FIELD = "creationDateTimestamp";
    private final String UPDATE_DATE_TIMESTAMP_FIELD = "updateDateTimestamp";
    private final String ORDER_POS_FIELD = "orderPos";

    private boolean mIsEmpty;
    private boolean mInitializedFromReadableMap;
    private boolean mInitializedFromStringifiedObject;

    private WritableMap mWritableMap;
    private JSONObject mJSONObject;

    public Note(ReadableMap readableMap) {
        if (readableMap == null) {
            mIsEmpty = true;
            return;
        }

        mWritableMap = new WritableNativeMap();
        mWritableMap.merge(readableMap);
        if (!mWritableMap.hasKey(VAULTED_DATE_TIMESTAMP_FIELD)) {
            mWritableMap.putDouble(VAULTED_DATE_TIMESTAMP_FIELD, -1);
        }

        mInitializedFromReadableMap = true;
        mIsEmpty = false;
    }

    public Note(String stringifiedObject) {
        if (stringifiedObject == null || stringifiedObject.isEmpty()) {
            mIsEmpty = true;
            return;
        }

        try {
            mJSONObject = new JSONObject(stringifiedObject);
            if (!mJSONObject.has(VAULTED_DATE_TIMESTAMP_FIELD)) {
                mJSONObject.put(VAULTED_DATE_TIMESTAMP_FIELD, -1);
            }

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
                mWritableMap.putDouble(NOTE_ID_FIELD, mJSONObject.getLong(NOTE_ID_FIELD));
                mWritableMap.putString(TITLE_FIELD, mJSONObject.getString(TITLE_FIELD));
                mWritableMap.putBoolean(IS_LIST_FIELD, mJSONObject.getBoolean(IS_LIST_FIELD));
                mWritableMap.putString(NOTE_TEXT_FIELD, mJSONObject.getString(NOTE_TEXT_FIELD));
                mWritableMap.putString(TEXT_SIZE_FIELD, mJSONObject.getString(TEXT_SIZE_FIELD));
                mWritableMap.putBoolean(MOVE_CHECKED_TO_BOTTOM_FIELD, mJSONObject.getBoolean(MOVE_CHECKED_TO_BOTTOM_FIELD));

                WritableMap categoryMap = new WritableNativeMap();
                categoryMap.putDouble(CATEGORY_ID_FIELD, mJSONObject.getJSONObject(CATEGORY_FIELD).getLong(CATEGORY_ID_FIELD));

                mWritableMap.putMap(CATEGORY_FIELD, categoryMap);

                WritableMap reminderMap = new WritableNativeMap();
                reminderMap.putDouble(REMINDER_ID_FIELD, mJSONObject.getJSONObject(REMINDER_FIELD).getLong(REMINDER_ID_FIELD));
                reminderMap.putDouble(REMINDER_SELECTED__DATE_IN_MILLISECONDS_FIELD, mJSONObject.getJSONObject(REMINDER_FIELD).getLong(REMINDER_SELECTED__DATE_IN_MILLISECONDS_FIELD));
                reminderMap.putString(REMINDER_REPEAT_OPTION_FIELD, mJSONObject.getJSONObject(REMINDER_FIELD).getString(REMINDER_REPEAT_OPTION_FIELD));

                mWritableMap.putMap(REMINDER_FIELD, reminderMap);

                WritableArray imagesArray = new WritableNativeArray();
                JSONArray imagesJsonArray = mJSONObject.getJSONArray(IMAGES_FIELD);
                for (int i = 0; i < imagesJsonArray.length(); ++i) {
                    imagesArray.pushString(imagesJsonArray.getString(i));
                }

                mWritableMap.putArray(IMAGES_FIELD, imagesArray);
                mWritableMap.putBoolean(DELETED_FIELD, mJSONObject.getBoolean(DELETED_FIELD));
                mWritableMap.putDouble(VAULTED_DATE_TIMESTAMP_FIELD, mJSONObject.getLong(VAULTED_DATE_TIMESTAMP_FIELD));
                mWritableMap.putDouble(DELETE_DATE_TIMESTAMP_FIELD, mJSONObject.getLong(DELETE_DATE_TIMESTAMP_FIELD));
                mWritableMap.putDouble(CREATION_DATE_TIMESTAMP_FIELD, mJSONObject.getLong(CREATION_DATE_TIMESTAMP_FIELD));
                mWritableMap.putDouble(UPDATE_DATE_TIMESTAMP_FIELD, mJSONObject.getLong(UPDATE_DATE_TIMESTAMP_FIELD));
                mWritableMap.putDouble(ORDER_POS_FIELD, mJSONObject.getLong(ORDER_POS_FIELD));
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
                mJSONObject.put(NOTE_ID_FIELD, mWritableMap.getDouble(NOTE_ID_FIELD));
                mJSONObject.put(TITLE_FIELD, mWritableMap.getString(TITLE_FIELD));
                mJSONObject.put(IS_LIST_FIELD, mWritableMap.getBoolean(IS_LIST_FIELD));
                mJSONObject.put(NOTE_TEXT_FIELD, mWritableMap.getString(NOTE_TEXT_FIELD));
                mJSONObject.put(TEXT_SIZE_FIELD, mWritableMap.getString(TEXT_SIZE_FIELD));
                mJSONObject.put(MOVE_CHECKED_TO_BOTTOM_FIELD, mWritableMap.getBoolean(MOVE_CHECKED_TO_BOTTOM_FIELD));

                JSONObject categoryObject = new JSONObject();
                categoryObject.put(CATEGORY_ID_FIELD, mWritableMap.getMap(CATEGORY_FIELD).getDouble(CATEGORY_ID_FIELD));

                mJSONObject.put(CATEGORY_FIELD, categoryObject);

                JSONObject reminderObject = new JSONObject();
                reminderObject.put(REMINDER_ID_FIELD, mWritableMap.getMap(REMINDER_FIELD).getDouble(REMINDER_ID_FIELD));
                reminderObject.put(REMINDER_SELECTED__DATE_IN_MILLISECONDS_FIELD, mWritableMap.getMap(REMINDER_FIELD).getDouble(REMINDER_SELECTED__DATE_IN_MILLISECONDS_FIELD));
                reminderObject.put(REMINDER_REPEAT_OPTION_FIELD, mWritableMap.getMap(REMINDER_FIELD).getString(REMINDER_REPEAT_OPTION_FIELD));

                mJSONObject.put(REMINDER_FIELD, reminderObject);

                JSONArray imagesJsonArray = new JSONArray();
                ReadableArray imagesReadableArray = mWritableMap.getArray(IMAGES_FIELD);
                if (imagesReadableArray != null) {
                    for (int i = 0; i < imagesReadableArray.size(); ++i) {
                        imagesJsonArray.put(i, imagesReadableArray.getString(i));
                    }
                }

                mJSONObject.put(IMAGES_FIELD, imagesJsonArray);
                mJSONObject.put(DELETED_FIELD, mWritableMap.getBoolean(DELETED_FIELD));
                mJSONObject.put(VAULTED_DATE_TIMESTAMP_FIELD, mWritableMap.getDouble(VAULTED_DATE_TIMESTAMP_FIELD));
                mJSONObject.put(DELETE_DATE_TIMESTAMP_FIELD, mWritableMap.getDouble(DELETE_DATE_TIMESTAMP_FIELD));
                mJSONObject.put(CREATION_DATE_TIMESTAMP_FIELD, mWritableMap.getDouble(CREATION_DATE_TIMESTAMP_FIELD));
                mJSONObject.put(UPDATE_DATE_TIMESTAMP_FIELD, mWritableMap.getDouble(UPDATE_DATE_TIMESTAMP_FIELD));
                mJSONObject.put(ORDER_POS_FIELD, mWritableMap.getDouble(ORDER_POS_FIELD));
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
            id = (long) mWritableMap.getDouble(NOTE_ID_FIELD);
        } else if (mInitializedFromStringifiedObject) {
            try {
                id = mJSONObject.getLong(NOTE_ID_FIELD);
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }

        return id;
    }

    public String title() {
        String title = "";
        if (mInitializedFromReadableMap) {
            title = mWritableMap.getString(TITLE_FIELD);
        } else if (mInitializedFromStringifiedObject) {
            try {
                title = mJSONObject.getString(TITLE_FIELD);
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }

        return title;
    }

    public boolean isList() {
        boolean isList = false;
        if (mInitializedFromReadableMap) {
            isList = mWritableMap.getBoolean(IS_LIST_FIELD);
        } else if (mInitializedFromStringifiedObject) {
            try {
                isList = mJSONObject.getBoolean(IS_LIST_FIELD);
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }

        return isList;
    }

    public String noteText() {
        String noteText = "";
        if (mInitializedFromReadableMap) {
            noteText = mWritableMap.getString(NOTE_TEXT_FIELD);
        } else if (mInitializedFromStringifiedObject) {
            try {
                noteText = mJSONObject.getString(NOTE_TEXT_FIELD);
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }

        return noteText;
    }

    public void setNoteText(String text) {
        if (mWritableMap != null) {
            mWritableMap.putString(NOTE_TEXT_FIELD, text);
        }
        if (mJSONObject != null) {
            try {
                mJSONObject.put(NOTE_TEXT_FIELD, text);
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }
    }

    public String textSize() {
        String textSize = "";
        if (mInitializedFromReadableMap) {
            textSize = mWritableMap.getString(TEXT_SIZE_FIELD);
        } else if (mInitializedFromStringifiedObject) {
            try {
                textSize = mJSONObject.getString(TEXT_SIZE_FIELD);
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }

        return textSize;
    }

    public boolean moveCheckedToBottom() {
        boolean moveCheckedToBottom = false;
        if (mInitializedFromReadableMap) {
            moveCheckedToBottom = mWritableMap.getBoolean(MOVE_CHECKED_TO_BOTTOM_FIELD);
        } else if (mInitializedFromStringifiedObject) {
            try {
                moveCheckedToBottom = mJSONObject.getBoolean(MOVE_CHECKED_TO_BOTTOM_FIELD);
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }

        return moveCheckedToBottom;
    }

    public long categoryId() {
        long categoryId = -1;
        if (mInitializedFromReadableMap) {
            categoryId = (long) mWritableMap.getMap(CATEGORY_FIELD).getDouble(CATEGORY_ID_FIELD);
        } else if (mInitializedFromStringifiedObject) {
            try {
                categoryId = mJSONObject.getJSONObject(CATEGORY_FIELD).getLong(CATEGORY_ID_FIELD);
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }

        return categoryId;
    }

    public long reminderId() {
        long reminderId = -1;
        if (mInitializedFromReadableMap) {
            reminderId = (long) mWritableMap
                    .getMap(REMINDER_FIELD)
                    .getDouble(REMINDER_ID_FIELD);
        } else if (mInitializedFromStringifiedObject) {
            try {
                reminderId = mJSONObject
                        .getJSONObject(REMINDER_FIELD)
                        .getLong(REMINDER_ID_FIELD);
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }

        return reminderId;
    }

    public long reminderSelectedDateInMilliseconds() {
        long reminderSelectedDateInMilliseconds = -1;
        if (mInitializedFromReadableMap) {
            reminderSelectedDateInMilliseconds = (long) mWritableMap
                    .getMap(REMINDER_FIELD)
                    .getDouble(REMINDER_SELECTED__DATE_IN_MILLISECONDS_FIELD);
        } else if (mInitializedFromStringifiedObject) {
            try {
                reminderSelectedDateInMilliseconds = mJSONObject
                        .getJSONObject(REMINDER_FIELD)
                        .getLong(REMINDER_SELECTED__DATE_IN_MILLISECONDS_FIELD);
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }

        return reminderSelectedDateInMilliseconds;
    }

    public String reminderRepeatOption() {
        String reminderRepeatOption = "";
        if (mInitializedFromReadableMap) {
            reminderRepeatOption = mWritableMap
                    .getMap(REMINDER_FIELD)
                    .getString(REMINDER_REPEAT_OPTION_FIELD);
        } else if (mInitializedFromStringifiedObject) {
            try {
                reminderRepeatOption = mJSONObject
                        .getJSONObject(REMINDER_FIELD)
                        .getString(REMINDER_REPEAT_OPTION_FIELD);
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }

        return reminderRepeatOption;
    }

    public List<String> images() {
        List<String> images = new ArrayList<>();
        if (mInitializedFromReadableMap) {
//            images = mWritableMap.getArray(IMAGES_FIELD).toArrayList();
            ReadableArray imagesArray = mWritableMap.getArray(IMAGES_FIELD);
            if (imagesArray != null) {
                for (int i = 0; i < imagesArray.size(); ++i) {
                    images.add(imagesArray.getString(i));
                }
            }
        } else if (mInitializedFromStringifiedObject) {
            try {
                JSONArray imagesJsonArray = mJSONObject.getJSONArray(IMAGES_FIELD);
                for (int i = 0; i < imagesJsonArray.length(); ++i) {
                    images.add(imagesJsonArray.getString(i));
                }
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }

        return images;
    }

    public void setImages(List<String> images) {
        if (mWritableMap != null && mJSONObject != null) {
            WritableArray imagesArray = new WritableNativeArray();
            JSONArray imagesJsonArray = new JSONArray();

            try {
                for (int i = 0; i < images.size(); ++i) {
                    String imageId = images.get(i);
                    imagesArray.pushString(imageId);
                    imagesJsonArray.put(i, imageId);
                }

                mWritableMap.putArray(IMAGES_FIELD, imagesArray);
                mJSONObject.put(IMAGES_FIELD, imagesJsonArray);
            } catch (JSONException e) {
                e.printStackTrace();
            }
        } else if (mWritableMap != null) {
            WritableArray imagesArray = new WritableNativeArray();
            for (int i = 0; i < images.size(); ++i) {
                imagesArray.pushString(images.get(i));
            }
            mWritableMap.putArray(IMAGES_FIELD, imagesArray);
        } else if (mJSONObject != null) {
            try {
                JSONArray imagesJsonArray = new JSONArray();
                for (int i = 0; i < images.size(); ++i) {
                    imagesJsonArray.put(i, images.get(i));
                }
                mJSONObject.put(IMAGES_FIELD, imagesJsonArray);
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }
    }

    public boolean deleted() {
        boolean deleted = false;
        if (mInitializedFromReadableMap) {
            deleted = mWritableMap.getBoolean(DELETED_FIELD);
        } else if (mInitializedFromStringifiedObject) {
            try {
                deleted = mJSONObject.getBoolean(DELETED_FIELD);
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }

        return deleted;
    }

    public long deleteDateTimestamp() {
        long deleteDateTimestamp = -1;
        if (mInitializedFromReadableMap) {
            deleteDateTimestamp = (long) mWritableMap.getDouble(DELETE_DATE_TIMESTAMP_FIELD);
        } else if (mInitializedFromStringifiedObject) {
            try {
                deleteDateTimestamp = mJSONObject.getLong(DELETE_DATE_TIMESTAMP_FIELD);
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }

        return deleteDateTimestamp;
    }

    public long vaultedDateTimestamp() {
        long deleteDateTimestamp = -1;
        if (mInitializedFromReadableMap) {
            deleteDateTimestamp = (long) mWritableMap.getDouble(VAULTED_DATE_TIMESTAMP_FIELD);
        } else if (mInitializedFromStringifiedObject) {
            try {
                deleteDateTimestamp = mJSONObject.getLong(VAULTED_DATE_TIMESTAMP_FIELD);
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }

        return deleteDateTimestamp;
    }

    public long creationDateTimestamp() {
        long creationDateTimestamp = -1;
        if (mInitializedFromReadableMap) {
            creationDateTimestamp = (long) mWritableMap.getDouble(CREATION_DATE_TIMESTAMP_FIELD);
        } else if (mInitializedFromStringifiedObject) {
            try {
                creationDateTimestamp = mJSONObject.getLong(CREATION_DATE_TIMESTAMP_FIELD);
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }

        return creationDateTimestamp;
    }

    public long updateDateTimestamp() {
        long updateDateTimestamp = -1;
        if (mInitializedFromReadableMap) {
            updateDateTimestamp = (long) mWritableMap.getDouble(UPDATE_DATE_TIMESTAMP_FIELD);
        } else if (mInitializedFromStringifiedObject) {
            try {
                updateDateTimestamp = mJSONObject.getLong(UPDATE_DATE_TIMESTAMP_FIELD);
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }

        return updateDateTimestamp;
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
}
