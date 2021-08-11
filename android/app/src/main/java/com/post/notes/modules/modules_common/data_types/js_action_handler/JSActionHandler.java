package com.post.notes.modules.modules_common.data_types.js_action_handler;


import android.content.Context;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;

public interface JSActionHandler {
    void handle(ReactApplicationContext context, ReadableMap action, Promise result);
}
