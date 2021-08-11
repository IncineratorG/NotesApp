package com.post.notes.widget.intents.intents;


import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;

import com.post.notes.widget.NotesWidget;
import com.post.notes.widget.intents.data.intent_action_types.WidgetIntentActionTypes;
import com.post.notes.widget.intents.data.intent_fileds.WidgetIntentFields;

public class WidgetIntents {
    public static PendingIntent onTitlePressIntent(Context context, int widgetId, String noteId) {
        Intent titlePressIntent = new Intent(context, NotesWidget.class);
        titlePressIntent.setAction(WidgetIntentFields.ACTION);

        titlePressIntent.putExtra(WidgetIntentFields.ACTION_TYPE_FIELD, WidgetIntentActionTypes.ON_TITLE_PRESS);
        titlePressIntent.putExtra(WidgetIntentFields.WIDGET_ID_FIELD, widgetId);
        titlePressIntent.putExtra(WidgetIntentFields.NOTE_ID_FIELD, noteId);
        titlePressIntent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_IDS, widgetId);

        Uri titlePressIntentData = Uri.parse(titlePressIntent.toUri(Intent.URI_INTENT_SCHEME));
        titlePressIntent.setData(titlePressIntentData);

        return PendingIntent.getBroadcast(context, widgetId, titlePressIntent, 0);
    }

    public static PendingIntent onImagePress(Context context, int widgetId) {
        Intent imagePressIntent = new Intent(context, NotesWidget.class);
        imagePressIntent.setAction(WidgetIntentFields.ACTION);

        imagePressIntent.putExtra(WidgetIntentFields.ACTION_TYPE_FIELD, WidgetIntentActionTypes.ON_IMAGE_PRESS);
        imagePressIntent.putExtra(WidgetIntentFields.WIDGET_ID_FIELD, widgetId);
        imagePressIntent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_IDS, widgetId);

        Uri imagePressIntentData = Uri.parse(imagePressIntent.toUri(Intent.URI_INTENT_SCHEME));
        imagePressIntent.setData(imagePressIntentData);

        return PendingIntent.getBroadcast(context, widgetId, imagePressIntent, 0);
    }

    public static PendingIntent onBackButtonPress(Context context, int widgetId) {
        Intent backButtonPressIntent = new Intent(context, NotesWidget.class);
        backButtonPressIntent.setAction(WidgetIntentFields.ACTION);

        backButtonPressIntent.putExtra(WidgetIntentFields.ACTION_TYPE_FIELD, WidgetIntentActionTypes.ON_BACK_BUTTON_PRESS);
        backButtonPressIntent.putExtra(WidgetIntentFields.WIDGET_ID_FIELD, widgetId);
        backButtonPressIntent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_IDS, widgetId);

        Uri backButtonPressIntentData = Uri.parse(backButtonPressIntent.toUri(Intent.URI_INTENT_SCHEME));
        backButtonPressIntent.setData(backButtonPressIntentData);

        return PendingIntent.getBroadcast(context, widgetId, backButtonPressIntent, 0);
    }

    public static PendingIntent onListItemPressCoveringIntent(Context context) {
        Intent coveringIntent = new Intent(context, NotesWidget.class);

        coveringIntent.setAction(WidgetIntentFields.ACTION);

        return PendingIntent.getBroadcast(context, 0, coveringIntent, 0);
    }

    public static Intent onNotesListItemPressFillInIntent(int widgetId, String noteId) {
        Intent notesListItemPressIntent = new Intent();

        notesListItemPressIntent.putExtra(WidgetIntentFields.ACTION_TYPE_FIELD, WidgetIntentActionTypes.ON_NOTE_PRESS);
        notesListItemPressIntent.putExtra(WidgetIntentFields.WIDGET_ID_FIELD, widgetId);
        notesListItemPressIntent.putExtra(WidgetIntentFields.NOTE_ID_FIELD, noteId);

        return notesListItemPressIntent;
    }

    public static Intent onNoteAsListItemCheckmarkPressIntent(int widgetId, String noteId, int noteItemPosition) {
        Intent noteAsListItemCheckmarkPressIntent = new Intent();

        noteAsListItemCheckmarkPressIntent.putExtra(WidgetIntentFields.ACTION_TYPE_FIELD, WidgetIntentActionTypes.ON_NOTE_AS_LIST_ITEM_CHECKMARK_PRESS);
        noteAsListItemCheckmarkPressIntent.putExtra(WidgetIntentFields.WIDGET_ID_FIELD, widgetId);
        noteAsListItemCheckmarkPressIntent.putExtra(WidgetIntentFields.NOTE_ID_FIELD, noteId);
        noteAsListItemCheckmarkPressIntent.putExtra(WidgetIntentFields.NOTE_AS_LIST_ITEM_POSITION, noteItemPosition);

        return noteAsListItemCheckmarkPressIntent;
    }
}
