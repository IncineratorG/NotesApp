package com.post.notes.widget.data.widget_note_as_list;


import com.post.notes.common.data.hybrid_objects.category.Category;
import com.post.notes.common.data.hybrid_objects.note.Note;
import com.post.notes.widget.utils.text_transformer.TextTransformer;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class WidgetNoteAsList {
    private Note mNote;
    private List<String> mNoteItemsList;
    private Map<Long, Category> mCategoriesMap;

    public WidgetNoteAsList() {
        mNote = null;
        mNoteItemsList = new ArrayList<>();
        mCategoriesMap = new HashMap<>();
    }

    public WidgetNoteAsList(Note note, List<Category> categories) {
        mNote = note;

        mNoteItemsList = TextTransformer.toList(mNote.noteText(), mNote.moveCheckedToBottom());

        mCategoriesMap = new HashMap<>();
        for (Category c : categories) {
            mCategoriesMap.put(c.id(), c);
        }
    }

    public void clear() {
        mNote = null;
        mNoteItemsList = new ArrayList<>();
    }

    public String noteId() {
        if (mNote == null) {
            return "";
        }

        return String.valueOf(mNote.id());
    }

    public String noteTitle() {
        if (mNote == null) {
            return "";
        }

        return mNote.title();
    }

    public String noteColor() {
        if (mNote == null) {
            return "#ffffff";
        }

        Category category = mCategoriesMap.get(mNote.categoryId());
        if (category == null) {
            return "#ffffff";
        }

        return category.color();
    }

    public String noteTextFontSizeType() {
        if (mNote == null) {
            return "";
        }

        return mNote.textSize();
    }

    public int itemsSize() {
        return mNoteItemsList.size();
    }

    public String itemName(int position) {
        if (position >= mNoteItemsList.size()) {
            return "";
        }

        String item = mNoteItemsList.get(position);
        if (TextTransformer.isChecked(item)) {
            return TextTransformer.makeItemUnchecked(item);
        }

        return item;
    }

    public boolean itemIsChecked(int position) {
        if (position >= mNoteItemsList.size()) {
            return false;
        }

        String item = mNoteItemsList.get(position);
        return TextTransformer.isChecked(item);
    }

    public Note changeItemCheckStatus(int position) {
        if (position < 0 || position >= mNoteItemsList.size() || mNote == null) {
            return null;
        }

        String item = mNoteItemsList.get(position);
        if (TextTransformer.isChecked(item)) {
//            Log.d("tag", "WidgetNoteAsList->changeItemCheckStatus()->ITEM: " + item + " - " + "WILL_MAKE_UNCHECK");
            item = TextTransformer.makeItemUnchecked(item);
        } else {
//            Log.d("tag", "WidgetNoteAsList->changeItemCheckStatus()->ITEM: " + item + " - " + "WILL_MAKE_CHECK");
            item = TextTransformer.makeItemChecked(item);
        }

        mNoteItemsList.set(position, item);
        mNote.setNoteText(TextTransformer.toText(mNoteItemsList));

        return mNote;
    }
}
