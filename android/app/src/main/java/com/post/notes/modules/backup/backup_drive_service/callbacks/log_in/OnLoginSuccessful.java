package com.post.notes.modules.backup.backup_drive_service.callbacks.log_in;


import android.app.Activity;

import com.google.android.gms.auth.api.signin.GoogleSignInAccount;

public interface OnLoginSuccessful {
    void handle(Activity activity, GoogleSignInAccount googleAccount);
}
