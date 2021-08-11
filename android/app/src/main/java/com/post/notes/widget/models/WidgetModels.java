package com.post.notes.widget.models;


import android.content.Context;

import com.post.notes.widget.models.model.WidgetModel;

import java.util.HashMap;
import java.util.Map;

public class WidgetModels {
    private static WidgetModels sInstance;
    private Map<Integer, WidgetModel> mModels;

    private WidgetModels() {
        mModels = new HashMap<>();
    }

    public static WidgetModels get() {
        if (sInstance == null) {
            sInstance = new WidgetModels();
        }

        return sInstance;
    }

    public WidgetModel getWidgetModel(int widgetId, Context context) {
        WidgetModel model;
        if (mModels.containsKey(widgetId)) {
            model = mModels.get(widgetId);
        } else {
            model = new WidgetModel(widgetId, context);
            mModels.put(widgetId, model);
        }

        return model;
    }

    public void update(Context context) {
        for (Map.Entry<Integer, WidgetModel> entry : mModels.entrySet()) {
            entry.getValue().update(context);
        }
    }
}
