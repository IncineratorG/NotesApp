package com.post.notes.widget;


import android.content.Intent;
import android.widget.RemoteViewsService;

public class NotesWidgetRemoteViewsService extends RemoteViewsService {
    @Override
    public RemoteViewsFactory onGetViewFactory(Intent intent) {
        return new NotesWidgetRemoteViewsFactory(getApplicationContext(), intent);
    }
}
