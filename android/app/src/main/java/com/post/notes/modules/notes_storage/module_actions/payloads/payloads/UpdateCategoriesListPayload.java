package com.post.notes.modules.notes_storage.module_actions.payloads.payloads;


import com.facebook.react.bridge.ReadableMap;
import com.post.notes.modules.modules_common.data_types.js_payload.JSPayload;

public class UpdateCategoriesListPayload implements JSPayload {
    private final String STRINGIFIED_CATEGORIES_LIST_FIELD = "stringifiedCategoriesList";

    private boolean mIsValid;
    private String mStringifiedCategoriesList;

    public UpdateCategoriesListPayload(ReadableMap readableMap) {
        if (readableMap == null) {
            return;
        }

        mStringifiedCategoriesList = readableMap.getString(STRINGIFIED_CATEGORIES_LIST_FIELD);
        if (mStringifiedCategoriesList == null) {
            return;
        }

        mIsValid = true;
    }

    @Override
    public boolean isValid() {
        return mIsValid;
    }

    public String stringifiedCategoriesList() {
        return mStringifiedCategoriesList;
    }
}
