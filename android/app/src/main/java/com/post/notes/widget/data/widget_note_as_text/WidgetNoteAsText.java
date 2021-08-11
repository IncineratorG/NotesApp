package com.post.notes.widget.data.widget_note_as_text;


import com.post.notes.common.data.hybrid_objects.category.Category;
import com.post.notes.common.data.hybrid_objects.note.Note;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class WidgetNoteAsText {
    private Note mNote;
    private Map<Long, Category> mCategoriesMap;

    public WidgetNoteAsText() {
        mNote = null;
        mCategoriesMap = new HashMap<>();
    }

    public WidgetNoteAsText(Note note, List<Category> categories) {
        mNote = note;
        mCategoriesMap = new HashMap<>();
        for (Category c : categories) {
            mCategoriesMap.put(c.id(), c);
        }
    }

    public void clear() {
        mNote = null;
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

    public String noteText() {
        if (mNote == null) {
            return "";
        }

        return mNote.noteText();
    }

    public String noteTextFontSizeType() {
        if (mNote == null) {
            return "";
        }

        return mNote.textSize();
    }

    public String noteColor() {
        Category category = mCategoriesMap.get(mNote.categoryId());
        if (category == null) {
            return "#ffffff";
        }

        return category.color();
    }
}
