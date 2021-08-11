package com.post.notes.widget;


import android.appwidget.AppWidgetManager;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.graphics.Typeface;
import android.text.Spannable;
import android.text.SpannableString;
import android.text.style.StyleSpan;
import android.util.TypedValue;
import android.widget.RemoteViews;
import android.widget.RemoteViewsService;

import com.post.notes.R;
import com.post.notes.widget.data.widget_model_type.WidgetModelType;
import com.post.notes.widget.data.widget_note_as_list.WidgetNoteAsList;
import com.post.notes.widget.data.widget_note_as_text.WidgetNoteAsText;
import com.post.notes.widget.data.widget_notes_list.WidgetNotesList;
import com.post.notes.widget.intents.intents.WidgetIntents;
import com.post.notes.widget.models.WidgetModels;
import com.post.notes.widget.models.model.WidgetModel;
import com.post.notes.widget.utils.color_inverter.ColorInverter;
import com.post.notes.widget.utils.note_text_size.NoteTextSize;

public class NotesWidgetRemoteViewsFactory implements RemoteViewsService.RemoteViewsFactory {
    private Context mContext;
    private int widgetId;

    NotesWidgetRemoteViewsFactory(Context ctx, Intent intent) {
        mContext = ctx;
        widgetId = intent.getIntExtra(AppWidgetManager.EXTRA_APPWIDGET_ID,
                AppWidgetManager.INVALID_APPWIDGET_ID);
    }

    @Override
    public void onCreate() {

    }

    @Override
    public void onDataSetChanged() {

    }

    @Override
    public void onDestroy() {

    }

    @Override
    public int getCount() {
        WidgetModel model = WidgetModels.get().getWidgetModel(widgetId, mContext);
        switch (model.type()) {
            case (WidgetModelType.NOTES_LIST): {
                return model.notesList().size();
            }

            case (WidgetModelType.NOTE_AS_TEXT): {
                return 1;
            }

            case (WidgetModelType.NOTE_AS_LIST): {
                return model.noteAsList().itemsSize();
            }

            default: {
                return 0;
            }
        }
    }

    @Override
    public RemoteViews getViewAt(int i) {
        RemoteViews rView = null;

        WidgetModel model = WidgetModels.get().getWidgetModel(widgetId, mContext);
        switch (model.type()) {
            case (WidgetModelType.NOTES_LIST): {
                WidgetNotesList notesList = model.notesList();

                rView = new RemoteViews(mContext.getPackageName(), R.layout.notes_widget_notes_list_list_item);

                String noteTitle = notesList.noteTitle(i);
                String noteText = notesList.noteText(i);
                int noteTextSize = NoteTextSize.toFontSize(notesList.noteTextFontSizeType(i));
                if (!noteTitle.isEmpty()) {
                    SpannableString title = new SpannableString(noteTitle);
                    title.setSpan(new StyleSpan(Typeface.BOLD), 0, title.length(), Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);

                    rView.setTextViewText(R.id.noteName, title);
                } else {
                    rView.setTextViewText(R.id.noteName, noteText);
                }

                Intent listItemPressIntent = WidgetIntents.onNotesListItemPressFillInIntent(widgetId, notesList.noteId(i));
                rView.setOnClickFillInIntent(R.id.notesListItemLayout, listItemPressIntent);

                String noteColor = notesList.noteColor(i);

                rView.setTextColor(R.id.noteName, Color.parseColor(ColorInverter.invert(noteColor, "#3a3a3a", "#fafafa")));
                // ===
                rView.setTextViewTextSize(R.id.noteName, TypedValue.COMPLEX_UNIT_SP, noteTextSize);
                // ===
                rView.setInt(R.id.notesListItemLayout, "setBackgroundColor", Color.parseColor(noteColor));
                break;
            }

            case (WidgetModelType.NOTE_AS_TEXT): {
                WidgetNoteAsText noteAsText = model.noteAsText();

                rView = new RemoteViews(mContext.getPackageName(), R.layout.notes_widget_note_as_text_list_item);

                String noteText = noteAsText.noteText();
                String noteColor = noteAsText.noteColor();

                rView.setInt(R.layout.notes_widget_note_as_text_list_item, "setBackgroundColor", Color.parseColor(noteColor));
                rView.setTextViewText(R.id.noteText, noteText);
                // ===
                rView.setTextViewTextSize(R.id.noteText, TypedValue.COMPLEX_UNIT_SP, NoteTextSize.toFontSize(noteAsText.noteTextFontSizeType()));
                // ===
                rView.setTextColor(R.id.noteText, Color.parseColor(ColorInverter.invert(noteColor, "#3a3a3a", "#fafafa")));
                break;
            }

            case (WidgetModelType.NOTE_AS_LIST): {
                WidgetNoteAsList noteAsList = model.noteAsList();

                rView = new RemoteViews(mContext.getPackageName(), R.layout.notes_widget_note_as_list_list_item);

                String noteColor = noteAsList.noteColor();
                String darkColorBorder = "#3a3a3a";
                String whiteColorBorder = "#fafafa";
                String invertedColor = ColorInverter.invert(noteColor, darkColorBorder, whiteColorBorder);

                String itemName = noteAsList.itemName(i);
                boolean itemIsChecked = noteAsList.itemIsChecked(i);

                int checkboxImageId;
                if (!itemIsChecked) {
                    if (invertedColor.equalsIgnoreCase(darkColorBorder)) {
                        checkboxImageId = R.drawable.checkbox_unchecked_final_dark;
                    } else {
                        checkboxImageId = R.drawable.checkbox_unchecked_final_light;
                    }
                } else {
                    if (invertedColor.equalsIgnoreCase(darkColorBorder)) {
                        checkboxImageId = R.drawable.checkbox_checked_final_dark;
                    } else {
                        checkboxImageId = R.drawable.checkbox_checked_final_light;
                    }
                }

                rView.setImageViewResource(R.id.checkboxImage, checkboxImageId);
                rView.setInt(R.layout.notes_widget_note_as_list_list_item, "setBackgroundColor", Color.parseColor(noteColor));
                rView.setTextViewText(R.id.noteItemText, itemName);
                // ===
                rView.setTextViewTextSize(R.id.noteItemText, TypedValue.COMPLEX_UNIT_SP, NoteTextSize.toFontSize(noteAsList.noteTextFontSizeType()));
                // ===
                rView.setTextColor(R.id.noteItemText, Color.parseColor(invertedColor));

                Intent checkboxPressIntent = WidgetIntents.onNoteAsListItemCheckmarkPressIntent(widgetId, noteAsList.noteId(), i);
                rView.setOnClickFillInIntent(R.id.checkboxImage, checkboxPressIntent);
                break;
            }

            default: {
                rView = null;
            }
        }

        return rView;
    }

    @Override
    public RemoteViews getLoadingView() {
        return null;
    }

    @Override
    public int getViewTypeCount() {
        return 3;
    }

    @Override
    public long getItemId(int i) {
        return i;
    }

    @Override
    public boolean hasStableIds() {
        return true;
    }
}


//package com.notes.widget;
//
//
//import android.appwidget.AppWidgetManager;
//import android.content.Context;
//import android.content.Intent;
//import android.graphics.Color;
//import android.graphics.Typeface;
//import android.text.Spannable;
//import android.text.SpannableString;
//import android.text.style.StyleSpan;
//import android.util.Log;
//import android.widget.RemoteViews;
//import android.widget.RemoteViewsService;
//
//import com.notes.R;
//import com.notes.modules.modules_common.data.hybrid_objects.note.Note;
//import com.notes.widget.data.widget_model_type.WidgetModelType;
//import com.notes.widget.data.widget_notes_list.WidgetNotesList;
//import com.notes.widget.intents.intents.WidgetIntents;
//import com.notes.widget.models.WidgetModels;
//import com.notes.widget.models.model.WidgetModel;
//import com.notes.widget.utils.color_inverter.ColorInverter;
//
//import java.util.ArrayList;
//import java.util.List;
//
//public class NotesWidgetRemoteViewsFactory implements RemoteViewsService.RemoteViewsFactory {
//    private Context mContext;
//    private int widgetId;
//    private List<String> mData;
//
//    NotesWidgetRemoteViewsFactory(Context ctx, Intent intent) {
//        mContext = ctx;
//        widgetId = intent.getIntExtra(AppWidgetManager.EXTRA_APPWIDGET_ID,
//                AppWidgetManager.INVALID_APPWIDGET_ID);
//
//        mData = new ArrayList<>();
//        mData.add("One");
//        mData.add("Two");
//        mData.add("Three");
//        mData.add("Four");
//    }
//
//    @Override
//    public void onCreate() {
//
//    }
//
//    @Override
//    public void onDataSetChanged() {
//
//    }
//
//    @Override
//    public void onDestroy() {
//
//    }
//
//    @Override
//    public int getCount() {
//        WidgetModel model = WidgetModels.get().getWidgetModel(widgetId, mContext);
//        if (model.type().equalsIgnoreCase(WidgetModelType.NOTES_LIST)) {
//            return model.notesList().size();
//        } else {
//            return 0;
//        }
//    }
//
//    @Override
//    public RemoteViews getViewAt(int i) {
//        RemoteViews rView = null;
//
//        WidgetModel model = WidgetModels.get().getWidgetModel(widgetId, mContext);
//        if (model.type().equalsIgnoreCase(WidgetModelType.NOTES_LIST)) {
//            WidgetNotesList notesList = model.notesList();
//
//            rView = new RemoteViews(mContext.getPackageName(), R.layout.notes_widget_notes_list_list_item);
//
//            String noteTitle = notesList.noteTitle(i);
//            String noteText = notesList.noteText(i);
//            if (!noteTitle.isEmpty()) {
//                SpannableString title = new SpannableString(noteTitle);
//                title.setSpan(new StyleSpan(Typeface.BOLD), 0, title.length(), Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);
//
//                rView.setTextViewText(R.id.noteName, title);
//            } else {
//                rView.setTextViewText(R.id.noteName, noteText);
//            }
//
//            Intent listItemPressIntent = WidgetIntents.onNotesListItemPressFillInIntent(widgetId, notesList.noteId(i));
//            rView.setOnClickFillInIntent(R.id.notesListItemLayout, listItemPressIntent);
//
//            String noteColor = notesList.noteColor(i);
//
//            rView.setTextColor(R.id.noteName, Color.parseColor(ColorInverter.invert(noteColor, "#3a3a3a", "#fafafa")));
//            rView.setInt(R.id.notesListItemLayout, "setBackgroundColor", Color.parseColor(noteColor));
//        }
//
//        return rView;
//    }
//
//    @Override
//    public RemoteViews getLoadingView() {
//        return null;
//    }
//
//    @Override
//    public int getViewTypeCount() {
//        return 1;
//    }
//
//    @Override
//    public long getItemId(int i) {
//        return i;
//    }
//
//    @Override
//    public boolean hasStableIds() {
//        return true;
//    }
//}
