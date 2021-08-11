package com.post.notes.widget.models.model;


import android.content.Context;
import android.util.Log;

import com.post.notes.common.app_storages.AppStorages;
import com.post.notes.common.app_storages.notes_storage.AppNotesStorage;
import com.post.notes.common.data.hybrid_objects.category.Category;
import com.post.notes.common.data.hybrid_objects.note.Note;
import com.post.notes.common.data.hybrid_objects.notes_list.NotesList;
import com.post.notes.common.data.hybrid_objects.notes_list_settings.NotesListSettings;
import com.post.notes.common.data.hybrid_objects.vault_notes_ids_list.VaultNotesIdsList;
import com.post.notes.widget.data.widget_model_info.WidgetModelInfo;
import com.post.notes.widget.data.widget_model_type.WidgetModelType;
import com.post.notes.widget.data.widget_note_as_list.WidgetNoteAsList;
import com.post.notes.widget.data.widget_note_as_text.WidgetNoteAsText;
import com.post.notes.widget.data.widget_notes_list.WidgetNotesList;

import java.util.List;

public class WidgetModel {
    private WidgetModelInfo mWidgetModelInfo;
    private WidgetNotesList mWidgetNotesList = new WidgetNotesList();
    private WidgetNoteAsText mWidgetNoteAsText = new WidgetNoteAsText();
    private WidgetNoteAsList mWidgetNoteAsList = new WidgetNoteAsList();

    public WidgetModel(int widgetId, Context context) {
        mWidgetModelInfo = AppStorages.get().widgetStorage().getWidgetModelInfo(context, widgetId);
        if (mWidgetModelInfo == null || mWidgetModelInfo.widgetId() < 0) {
            mWidgetModelInfo = new WidgetModelInfo(widgetId, WidgetModelType.NOTES_LIST, "-1");
        }

        update(context);
    }

    public boolean update(Context context) {
        if (mWidgetModelInfo == null) {
            Log.d("tag", "WidgetModel->update->BAD_MODEL_INFO");
            return false;
        }

        String modelType = mWidgetModelInfo.modelType();

        if (modelType.equalsIgnoreCase(WidgetModelType.NOTES_LIST)) {
            loadNotesList(context);
        } else if (modelType.equalsIgnoreCase(WidgetModelType.NOTE_AS_LIST)
                || modelType.equalsIgnoreCase(WidgetModelType.NOTE_AS_TEXT)) {
            loadNote(mWidgetModelInfo.noteId(), context);
        } else {
            Log.d("tag", "WidgetModel->UNKNOWN_MODEL_TYPE: " + mWidgetModelInfo.modelType());
        }

        return true;
    }

    public String type() {
        return mWidgetModelInfo.modelType();
    }

    public boolean loadNotesList(Context context) {
        Log.d("tag", "loadNotesList()");

        AppNotesStorage notesStorage = AppStorages.get().notesStorage();
        NotesList notesList = notesStorage.getNotesList(context);
        List<Category> categories = notesStorage.getCategoriesList(context);
        NotesListSettings notesListSettings = notesStorage.getNotesListSettings(context);

        mWidgetNotesList = new WidgetNotesList(
                notesList,
                categories,
                notesListSettings
        );

        mWidgetNoteAsList.clear();
        mWidgetNoteAsText.clear();

        mWidgetModelInfo = new WidgetModelInfo(mWidgetModelInfo.widgetId(), WidgetModelType.NOTES_LIST, "-1");

        AppStorages.get().widgetStorage().setWidgetModelInfo(context, mWidgetModelInfo);

        return true;
    }

    public boolean loadNote(String noteId, Context context) {
        AppNotesStorage notesStorage = AppStorages.get().notesStorage();

        Note note = notesStorage.getNote(context, noteId);
        if (note == null || note.isEmpty() || note.deleted() || note.vaultedDateTimestamp() > 0) {
            loadNotesList(context);
            return true;
        }

        List<Category> categories = notesStorage.getCategoriesList(context);

        if (note.isList()) {
            Log.d("tag", "loadNote()->NOTE_AS_LIST");

            mWidgetModelInfo = new WidgetModelInfo(mWidgetModelInfo.widgetId(), WidgetModelType.NOTE_AS_LIST, noteId);
            mWidgetNoteAsList = new WidgetNoteAsList(note, categories);
            mWidgetNoteAsText.clear();
        } else {
            Log.d("tag", "loadNote()->NOTE_AS_TEXT");

            mWidgetModelInfo = new WidgetModelInfo(mWidgetModelInfo.widgetId(), WidgetModelType.NOTE_AS_TEXT, noteId);
            mWidgetNoteAsText = new WidgetNoteAsText(note, categories);
            mWidgetNoteAsList.clear();
        }

        mWidgetNotesList.clear();

        AppStorages.get().widgetStorage().setWidgetModelInfo(context, mWidgetModelInfo);

        return true;
    }

    public WidgetNotesList notesList() {
        return mWidgetNotesList;
    }

    public WidgetNoteAsText noteAsText() {
        return mWidgetNoteAsText;
    }

    public WidgetNoteAsList noteAsList() {
        return mWidgetNoteAsList;
    }
}
