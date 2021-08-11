package com.post.notes.widget.intents.handlers;


import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.util.Log;

import com.post.notes.MainActivity;
import com.post.notes.common.app_storages.AppStorages;
import com.post.notes.common.constants.Constants;
import com.post.notes.common.data.hybrid_objects.note.Note;
import com.post.notes.widget.NotesWidget;
import com.post.notes.widget.data.widget_note_as_list.WidgetNoteAsList;
import com.post.notes.widget.intents.data.intent_action_types.WidgetIntentActionTypes;
import com.post.notes.widget.intents.data.intent_fileds.WidgetIntentFields;
import com.post.notes.widget.models.WidgetModels;
import com.post.notes.widget.models.model.WidgetModel;

public class WidgetIntentsHandler {
//    private static final String NOTE_TO_OPEN_STORAGE_KEY = "NOTE_TO_OPEN_STORAGE_KEY";

    public static boolean handle(Context context, Intent intent) {
        String intentAction = intent.getAction();

        if (intentAction == null) {
            return false;
        } else if (!intentAction.equalsIgnoreCase(WidgetIntentFields.ACTION)) {
            return false;
        }

        String intentType = intent.getStringExtra(WidgetIntentFields.ACTION_TYPE_FIELD);
        if (intentType == null) {
            return false;
        }

        switch (intentType) {
            case (WidgetIntentActionTypes.ON_TITLE_PRESS): {
                Log.d("tag", "WidgetIntentsHandler->handle()->ON_TITLE_PRESS");

                int widgetId = intent.getIntExtra(WidgetIntentFields.WIDGET_ID_FIELD, -1);
                if (widgetId < 0) {
                    Log.d("tag", "WidgetIntentsHandler->handle()->ON_TITLE_PRESS->BAD_WIDGET_ID: " + String.valueOf(widgetId));
                    return true;
                }

                String noteId = intent.getStringExtra(WidgetIntentFields.NOTE_ID_FIELD);

                Log.d("tag", "WidgetIntentsHandler->handle()->ON_TITLE_PRESS: " + String.valueOf(widgetId) + " - " + noteId);

                if (noteId == null || !noteId.isEmpty()) {
                    AppStorages.get().commonStorage().save(context, Constants.NOTE_TO_OPEN_STORAGE_KEY, noteId);
//                    LocalStorage.get(context).save(NOTE_TO_OPEN_STORAGE_KEY, noteId);
                }

                Intent openAppIntent = new Intent(context, MainActivity.class);
//                openAppIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
                PendingIntent openAppPendingIntent = PendingIntent.getActivity(context, 0, openAppIntent, 0);
                try {
                    openAppPendingIntent.send();
                } catch (PendingIntent.CanceledException e) {
//                    Toast.makeText(context, "ON_TITLE_PRESS->ERROR", Toast.LENGTH_SHORT).show();
                }

                return true;
            }

            case (WidgetIntentActionTypes.ON_IMAGE_PRESS): {
                Log.d("tag", "WidgetIntentsHandler->handle()->ON_IMAGE_PRESS");
                NotesWidget.update(
                        context,
                        AppWidgetManager
                                .getInstance(context)
                                .getAppWidgetIds(new ComponentName(context, NotesWidget.class))
                );
                return true;
            }

            case (WidgetIntentActionTypes.ON_BACK_BUTTON_PRESS): {
                Log.d("tag", "WidgetIntentsHandler->handle()->ON_BACK_BUTTON_PRESS");

                int widgetId = intent.getIntExtra(WidgetIntentFields.WIDGET_ID_FIELD, -1);
                if (widgetId < 0) {
                    Log.d("tag", "WidgetIntentsHandler->handle()->ON_BACK_BUTTON_PRESS->BAD_WIDGET_ID: " + String.valueOf(widgetId));
                    return true;
                }

                WidgetModel model = WidgetModels.get().getWidgetModel(widgetId, context);
                model.loadNotesList(context);

                NotesWidget.update(
                        context,
                        AppWidgetManager
                                .getInstance(context)
                                .getAppWidgetIds(new ComponentName(context, NotesWidget.class))
                );

                return true;
            }

            case (WidgetIntentActionTypes.ON_NOTE_PRESS): {
                int widgetId = intent.getIntExtra(WidgetIntentFields.WIDGET_ID_FIELD, -1);
                if (widgetId < 0) {
                    Log.d("tag", "WidgetIntentsHandler->handle()->ON_NOTE_PRESS->BAD_WIDGET_ID: " + String.valueOf(widgetId));
                    return true;
                }

                String noteId = intent.getStringExtra(WidgetIntentFields.NOTE_ID_FIELD);

                Log.d("tag", "WidgetIntentsHandler->handle()->ON_NOTE_PRESS: " + String.valueOf(widgetId) + " - " + noteId);

                WidgetModel model = WidgetModels.get().getWidgetModel(widgetId, context);
                model.loadNote(noteId, context);

                NotesWidget.update(
                        context,
                        AppWidgetManager
                                .getInstance(context)
                                .getAppWidgetIds(new ComponentName(context, NotesWidget.class))
                );

                return true;
            }

            case (WidgetIntentActionTypes.ON_NOTE_AS_LIST_ITEM_CHECKMARK_PRESS): {
                Log.d("tag", "WidgetIntentsHandler->handle()->ON_NOTE_AS_LIST_ITEM_CHECKMARK_PRESS");

                int widgetId = intent.getIntExtra(WidgetIntentFields.WIDGET_ID_FIELD, -1);
                if (widgetId < 0) {
                    Log.d("tag", "WidgetIntentsHandler->handle()->ON_NOTE_AS_LIST_ITEM_CHECKMARK_PRESS->BAD_WIDGET_ID: " + String.valueOf(widgetId));
                    return true;
                }

                String noteId = intent.getStringExtra(WidgetIntentFields.NOTE_ID_FIELD);
                int noteItemPosition = intent.getIntExtra(WidgetIntentFields.NOTE_AS_LIST_ITEM_POSITION, -1);

                Log.d(
                        "tag",
                        "WidgetIntentsHandler->handle()->ON_NOTE_AS_LIST_ITEM_CHECKMARK_PRESS: " +
                                String.valueOf(widgetId) +
                                " - " +
                                noteId +
                                " - " +
                                String.valueOf(noteItemPosition)
                );

                WidgetModel model = WidgetModels.get().getWidgetModel(widgetId, context);
                WidgetNoteAsList noteAsList = model.noteAsList();

                Note updatedNote = noteAsList.changeItemCheckStatus(noteItemPosition);
                if (updatedNote == null) {
                    return true;
                }

                AppStorages.get().notesStorage().updateNote(context, updatedNote);
//                NotesStorage.get(context).updateNote(updatedNote);

                NotesWidget.update(
                        context,
                        AppWidgetManager
                                .getInstance(context)
                                .getAppWidgetIds(new ComponentName(context, NotesWidget.class))
                );

                return true;
            }
        }

        return false;
    }
}
