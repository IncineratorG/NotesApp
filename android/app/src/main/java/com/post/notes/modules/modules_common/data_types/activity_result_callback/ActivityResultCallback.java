package com.post.notes.modules.modules_common.data_types.activity_result_callback;


import android.app.Activity;
import android.content.Intent;

public interface ActivityResultCallback {
    void handle(Activity activity, int requestCode, int resultCode, Intent data);
}
