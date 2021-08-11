package com.post.notes.widget;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.net.Uri;
import android.util.Log;
import android.widget.RemoteViews;

import com.post.notes.R;
import com.post.notes.common.app_storages.AppStorages;
import com.post.notes.common.app_storages.widget_storage.AppWidgetStorage;
import com.post.notes.widget.data.widget_model_type.WidgetModelType;
import com.post.notes.widget.data.widget_note_as_list.WidgetNoteAsList;
import com.post.notes.widget.data.widget_note_as_text.WidgetNoteAsText;
import com.post.notes.widget.intents.handlers.WidgetIntentsHandler;
import com.post.notes.widget.intents.intents.WidgetIntents;
import com.post.notes.widget.models.WidgetModels;
import com.post.notes.widget.models.model.WidgetModel;

public class NotesWidget extends AppWidgetProvider {
    public static void update(Context context, int[] ids) {
        Log.d("tag", "NotesWidget->update(): " + ids.length);

//        WidgetModels.get().update(context);

        Intent intent = new Intent(context, NotesWidget.class);
        intent.setAction(AppWidgetManager.ACTION_APPWIDGET_UPDATE);
        intent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_IDS, ids);
        context.sendBroadcast(intent);
    }

    void updateAppWidget(Context context, AppWidgetManager appWidgetManager,
                                int appWidgetId) {
        WidgetModels.get().update(context);

        RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.notes_widget);

        updateWidgetHeader(views, context, appWidgetId);
        updateWidgetBody(views, context, appWidgetId);
        updateWidgetListItemsOnClickHandlers(views, context, appWidgetId);

        appWidgetManager.updateAppWidget(appWidgetId, views);
        appWidgetManager.notifyAppWidgetViewDataChanged(appWidgetId, R.id.widgetListView);
    }

    private void updateWidgetHeader(RemoteViews rv, Context context, int appWidgetId) {
        WidgetModel model = WidgetModels.get().getWidgetModel(appWidgetId, context);

        String titleText = "Notes";
        String noteId = "";
        int imageId = R.drawable.app_icon;
        if (!model.type().equalsIgnoreCase(WidgetModelType.NOTES_LIST)) {
            imageId = R.drawable.arrow_back;

            if (model.type().equalsIgnoreCase(WidgetModelType.NOTE_AS_TEXT)) {
                WidgetNoteAsText noteAsText = model.noteAsText();
                titleText = noteAsText.noteTitle();
                noteId = noteAsText.noteId();
            } else {
                WidgetNoteAsList noteAsList = model.noteAsList();
                titleText = noteAsList.noteTitle();
                noteId = noteAsList.noteId();
            }
        }

        rv.setTextViewText(R.id.headerTitle, titleText);
        rv.setImageViewResource(R.id.headerImage, imageId);

        PendingIntent titlePressPendingIntent = WidgetIntents.onTitlePressIntent(context, appWidgetId, noteId);
        rv.setOnClickPendingIntent(R.id.headerTitle, titlePressPendingIntent);

        if (imageId == R.drawable.app_icon) {
            PendingIntent imagePressPendingIntent = WidgetIntents.onImagePress(context, appWidgetId);
            rv.setOnClickPendingIntent(R.id.headerImage, imagePressPendingIntent);
        } else {
            PendingIntent backButtonPressPendingIntent = WidgetIntents.onBackButtonPress(context, appWidgetId);
            rv.setOnClickPendingIntent(R.id.headerImage, backButtonPressPendingIntent);
        }
    }

    private void updateWidgetBody(RemoteViews rv, Context context, int appWidgetId) {
        WidgetModel model = WidgetModels.get().getWidgetModel(appWidgetId, context);

        Intent adapter = new Intent(context, NotesWidgetRemoteViewsService.class);
        adapter.putExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, appWidgetId);

        Uri data = Uri.parse(adapter.toUri(Intent.URI_INTENT_SCHEME));
        adapter.setData(data);
        rv.setRemoteAdapter(R.id.widgetListView, adapter);

        if (model.type().equalsIgnoreCase(WidgetModelType.NOTES_LIST)) {
            rv.setInt(R.id.widgetListView, "setBackgroundColor", Color.parseColor("#00ffffff"));
        } else {
            if (model.type().equalsIgnoreCase(WidgetModelType.NOTE_AS_TEXT)) {
                WidgetNoteAsText noteAsText = model.noteAsText();
                String noteColor = noteAsText.noteColor();
                rv.setInt(R.id.widgetListView, "setBackgroundColor", Color.parseColor(noteColor));

//                PendingIntent noteAsTextPressIntent = WidgetIntents.onNoteAsTextPressPendingIntent(context, appWidgetId, noteAsText.noteId());
//                rv.setOnClickPendingIntent(R.id.widgetListView, noteAsTextPressIntent);
            } else {
                WidgetNoteAsList noteAsList = model.noteAsList();
                String noteColor = noteAsList.noteColor();
                rv.setInt(R.id.widgetListView, "setBackgroundColor", Color.parseColor(noteColor));
            }
        }



//        if (model.type().equalsIgnoreCase(WidgetModelType.NOTES_LIST) ||
//            model.type().equalsIgnoreCase(WidgetModelType.NOTE_AS_LIST)) {
//            rv.setViewVisibility(R.id.noteAsTextLayout, View.GONE);
//            rv.setViewVisibility(R.id.widgetListView, View.VISIBLE);
//
//            Intent adapter = new Intent(context, NotesWidgetRemoteViewsService.class);
//            adapter.putExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, appWidgetId);
//
//            Uri data = Uri.parse(adapter.toUri(Intent.URI_INTENT_SCHEME));
//            adapter.setData(data);
//            rv.setRemoteAdapter(R.id.widgetListView, adapter);
//        } else {
//            rv.setViewVisibility(R.id.widgetListView, View.GONE);
//            rv.setViewVisibility(R.id.noteAsTextLayout, View.VISIBLE);
//
//            WidgetNoteAsText noteAsText = model.noteAsText();
//            String noteText = noteAsText.noteText();
//            String noteColor = noteAsText.noteColor();
//
//            rv.setInt(R.id.noteAsTextLayout, "setBackgroundColor", Color.parseColor(noteColor));
//            rv.setTextViewText(R.id.noteText, noteText);
//            rv.setTextColor(R.id.noteText, Color.parseColor(ColorInverter.invert(noteColor, "#3a3a3a", "#fafafa")));
//        }

//        if (!flag) {
//            rv.setViewVisibility(R.id.anotherLayout, View.GONE);
//            rv.setViewVisibility(R.id.widgetItemsList, View.VISIBLE);
//
//            Intent adapter = new Intent(context, NotesWidgetRemoteViewsService.class);
//            adapter.putExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, appWidgetId);
//
//            Uri data = Uri.parse(adapter.toUri(Intent.URI_INTENT_SCHEME));
//            adapter.setData(data);
//            rv.setRemoteAdapter(R.id.widgetItemsList, adapter);
//        } else {
//            rv.setViewVisibility(R.id.widgetItemsList, View.GONE);
//            rv.setViewVisibility(R.id.anotherLayout, View.VISIBLE);
//            rv.setInt(R.id.anotherLayout, "setBackgroundColor", Color.parseColor("#3d2013"));
//        }
    }
//    private void updateWidgetList(RemoteViews rv, Context context, int appWidgetId) {
//        if (!flag) {
////            Log.d("tag", "WILL_SHOW_LIST");
//
//            rv.setViewVisibility(R.id.anotherLayout, View.GONE);
//            rv.setViewVisibility(R.id.widgetItemsList, View.VISIBLE);
//
//            Intent adapter = new Intent(context, NotesWidgetRemoteViewsService.class);
//            adapter.putExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, appWidgetId);
//
//            Uri data = Uri.parse(adapter.toUri(Intent.URI_INTENT_SCHEME));
//            adapter.setData(data);
//            rv.setRemoteAdapter(R.id.widgetItemsList, adapter);
//        } else {
////            Log.d("tag", "WILL_HIDE_LIST");
//
//            rv.setViewVisibility(R.id.widgetItemsList, View.GONE);
//            rv.setViewVisibility(R.id.anotherLayout, View.VISIBLE);
//            rv.setInt(R.id.anotherLayout, "setBackgroundColor", Color.parseColor("#3d2013"));
//
//            // ===
////            Intent adapter = new Intent(context, NotesWidgetRemoteViewsService.class);
////            adapter.putExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, appWidgetId);
////            adapter.putExtra("modelType", WidgetModelType.NOTE_AS_TEXT);
////
////            Uri data = Uri.parse(adapter.toUri(Intent.URI_INTENT_SCHEME));
////            adapter.setData(data);
////            rv.setRemoteAdapter(R.id.widgetItemsList, adapter);
//            // ===
//        }
//
////        Intent adapter = new Intent(context, NotesWidgetRemoteViewsService.class);
////        adapter.putExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, appWidgetId);
////        Uri data = Uri.parse(adapter.toUri(Intent.URI_INTENT_SCHEME));
////        adapter.setData(data);
////        rv.setRemoteAdapter(R.id.widgetItemsList, adapter);
//    }

    private void updateWidgetListItemsOnClickHandlers(RemoteViews rv, Context context, int appWidgetId) {
        PendingIntent listItemPressCoveringIntent = WidgetIntents
                .onListItemPressCoveringIntent(context);
        rv.setPendingIntentTemplate(R.id.widgetListView, listItemPressCoveringIntent);
    }

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        // There may be multiple widgets active, so update all of them
        for (int appWidgetId : appWidgetIds) {
            updateAppWidget(context, appWidgetManager, appWidgetId);
        }
    }

    @Override
    public void onEnabled(Context context) {
        // Enter relevant functionality for when the first widget is created
    }

    @Override
    public void onDeleted(Context context, int[] appWidgetIds) {
        Log.d("tag", "===> NotesWidget->onDeleted() <===");


//        WidgetStorage widgetStorage = WidgetStorage.get(context);
        AppWidgetStorage widgetStorage = AppStorages.get().widgetStorage();
        for (int appWidgetId : appWidgetIds) {
            widgetStorage.removeWidgetModelInfo(context, appWidgetId);
        }
    }

    @Override
    public void onDisabled(Context context) {
        // Enter relevant functionality for when the last widget is disabled
    }

    @Override
    public void onReceive(Context context, Intent intent) {
        super.onReceive(context, intent);
        boolean intentHandled = WidgetIntentsHandler.handle(context, intent);
    }
}