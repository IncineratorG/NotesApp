package com.post.notes.modules.backup.backup_drive_service.callbacks.log_in;


import android.app.Activity;

public interface OnLoginFailure {
    void handle(Activity activity, Exception e);
}
