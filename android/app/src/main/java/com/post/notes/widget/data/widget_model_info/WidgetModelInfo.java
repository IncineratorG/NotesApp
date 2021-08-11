package com.post.notes.widget.data.widget_model_info;


import android.util.Log;

import com.post.notes.widget.data.widget_model_type.WidgetModelType;

import java.util.List;

public class WidgetModelInfo {
    private static final String SEPARATOR = "-9495537-";
    private int mWidgetId = -1;
    private String mModelType = WidgetModelType.NOTES_LIST;
    private String mNoteId = "-1";

    public WidgetModelInfo() {

    }

    public WidgetModelInfo(String stringifiedInfo) {
        Log.d("tag", "WdgetModelInfo: " + stringifiedInfo);

        if (stringifiedInfo == null) {
            Log.d("tag", "WidgetModelInfo->BAD_STRINGIFIED_INFO");
            return;
        }

        String[] modelInfoData = stringifiedInfo.split(SEPARATOR);
        if (modelInfoData.length != 3) {
            Log.d("tag", "WidgetModelInfo->BAD_MODEL_INFO_DATA");
            return;
        }

        mWidgetId = Integer.parseInt(modelInfoData[0]);
        mModelType = modelInfoData[1];
        mNoteId = modelInfoData[2];
    }

    public WidgetModelInfo(int widgetId, String modelType, String noteId) {
        mWidgetId = widgetId;
        mModelType = modelType;
        mNoteId = noteId;
    }

    public String stringify() {
        return String.valueOf(mWidgetId) + SEPARATOR + mModelType + SEPARATOR + mNoteId;
    }

    public int widgetId() {
        return mWidgetId;
    }

    public String modelType() {
        return mModelType;
    }

    public String noteId() {
        return mNoteId;
    }
}
