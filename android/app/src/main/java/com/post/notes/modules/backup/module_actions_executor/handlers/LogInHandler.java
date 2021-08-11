package com.post.notes.modules.backup.module_actions_executor.handlers;


import android.content.Intent;
import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.google.android.gms.auth.api.signin.GoogleSignIn;
import com.google.api.client.extensions.android.http.AndroidHttp;
import com.google.api.client.googleapis.extensions.android.gms.auth.GoogleAccountCredential;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.DriveScopes;
import com.post.notes.modules.backup.backup_drive_service.BackupDriveService;
import com.post.notes.modules.backup.module_events.payloads.BackupEventsJSPayloads;
import com.post.notes.modules.backup.module_events.types.BackupEventTypes;
import com.post.notes.modules.modules_common.data_types.activity_result_callback.ModuleActivityResultCallbacks;
import com.post.notes.modules.modules_common.data_types.js_action_handler.JSActionHandler;

import java.util.Collections;

public class LogInHandler implements JSActionHandler {
    private ModuleActivityResultCallbacks mActivityResultCallbacks;

    public LogInHandler(ModuleActivityResultCallbacks activityResultCallbacks) {
        mActivityResultCallbacks = activityResultCallbacks;
    }

    @Override
    public void handle(ReactApplicationContext context, ReadableMap action, Promise result) {
        Log.d("tag", "LogInHandler");

        BackupDriveService.get().logIn(
                context,
                mActivityResultCallbacks,
                (activity, googleAccount) -> {
                    context
                            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                            .emit(
                                    BackupEventTypes.LOG_IN_RESULT,
                                    BackupEventsJSPayloads.loginResultEventPayload(true, googleAccount.getEmail(), "")
                            );
                },
                (activity, e) -> {
                    context
                            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                            .emit(
                                    BackupEventTypes.LOG_IN_RESULT,
                                    BackupEventsJSPayloads.loginResultEventPayload(false, "", e.toString())
                            );
                }
        );

        result.resolve(true);
    }

//    private void handleSignInResult(Intent result, ReactApplicationContext context) {
//        Log.d("tag", "handleSignInResult()");
//
//        GoogleSignIn.getSignedInAccountFromIntent(result)
//                .addOnSuccessListener(googleAccount -> {
//                    Log.d("tag", "Signed in as " + googleAccount.getEmail());
//
//                    // Use the authenticated account to sign in to the Drive service.
//                    GoogleAccountCredential credential =
//                            GoogleAccountCredential.usingOAuth2(
//                                    context, Collections.singleton(DriveScopes.DRIVE_FILE));
//                    credential.setSelectedAccount(googleAccount.getAccount());
//                    Drive googleDriveService =
//                            new Drive.Builder(
//                                    AndroidHttp.newCompatibleTransport(),
//                                    new GsonFactory(),
//                                    credential)
//                                    .setApplicationName("Notes")
//                                    .build();
//
//                    BackupDriveService.get().setGoogleDriveService(googleDriveService);
//
//                    context
//                            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
//                            .emit(
//                                    BackupEventTypes.LOG_IN_RESULT,
//                                    BackupEventsJSPayloads.loginResultEventPayload(true, googleAccount.getEmail(), "")
//                            );
//                })
//                .addOnFailureListener(exception -> {
//                    Log.e("tag", "Unable to sign in.", exception);
//
//                    context
//                            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
//                            .emit(
//                                    BackupEventTypes.LOG_IN_RESULT,
//                                    BackupEventsJSPayloads.loginResultEventPayload(false, "", exception.toString())
//                            );
//                });
//    }
}


//package com.post.notes.modules.backup.module_actions_executor.handlers;
//
//
//import android.app.Activity;
//import android.content.Intent;
//import android.util.Log;
//
//import com.facebook.react.bridge.Promise;
//import com.facebook.react.bridge.ReactApplicationContext;
//import com.facebook.react.bridge.ReadableMap;
//import com.facebook.react.modules.core.DeviceEventManagerModule;
//import com.google.android.gms.auth.api.signin.GoogleSignIn;
//import com.google.android.gms.auth.api.signin.GoogleSignInClient;
//import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
//import com.google.android.gms.common.api.Scope;
//import com.google.api.client.extensions.android.http.AndroidHttp;
//import com.google.api.client.googleapis.extensions.android.gms.auth.GoogleAccountCredential;
//import com.google.api.client.json.gson.GsonFactory;
//import com.google.api.services.drive.Drive;
//import com.google.api.services.drive.DriveScopes;
//import com.post.notes.modules.backup.backup_drive_service.BackupDriveService;
//import com.post.notes.modules.backup.module_events.payloads.BackupEventsJSPayloads;
//import com.post.notes.modules.backup.module_events.types.BackupEventTypes;
//import com.post.notes.modules.modules_common.data_types.activity_result_callback.ActivityResultCallback;
//import com.post.notes.modules.modules_common.data_types.js_action_handler.JSActionHandler;
//
//import java.util.Collections;
//import java.util.Map;
//
//public class LogInHandler implements JSActionHandler {
//    private static final int REQUEST_CODE_SIGN_IN = 1;
//    private Map<Integer, ActivityResultCallback> mActivityResultCallbacks;
//
//    public LogInHandler(Map<Integer, ActivityResultCallback> activityResultCallbacks) {
//        mActivityResultCallbacks = activityResultCallbacks;
//    }
//
//    @Override
//    public void handle(ReactApplicationContext context, ReadableMap action, Promise result) {
//        GoogleSignInOptions signInOptions =
//                new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
//                        .requestEmail()
////                        .requestScopes(new Scope(DriveScopes.DRIVE))
//                        .requestScopes(new Scope(DriveScopes.DRIVE_APPDATA))
//                        .requestScopes(new Scope(DriveScopes.DRIVE_FILE))
//                        .build();
//        GoogleSignInClient client = GoogleSignIn.getClient(context, signInOptions);
//
//        BackupDriveService.get().setGoogleSignInClient(client);
//
//        mActivityResultCallbacks.put(
//                REQUEST_CODE_SIGN_IN,
//                (activity, requestCode, resultCode, data) -> {
//                    if (resultCode == Activity.RESULT_OK && data != null) {
//                        handleSignInResult(data, context);
//                    }
//                });
//
//        context.startActivityForResult(client.getSignInIntent(), REQUEST_CODE_SIGN_IN, null);
//
//        result.resolve(true);
//    }
//
//    private void handleSignInResult(Intent result, ReactApplicationContext context) {
//        Log.d("tag", "handleSignInResult()");
//
//        GoogleSignIn.getSignedInAccountFromIntent(result)
//                .addOnSuccessListener(googleAccount -> {
//                    Log.d("tag", "Signed in as " + googleAccount.getEmail());
//
//                    // Use the authenticated account to sign in to the Drive service.
//                    GoogleAccountCredential credential =
//                            GoogleAccountCredential.usingOAuth2(
//                                    context, Collections.singleton(DriveScopes.DRIVE_FILE));
//                    credential.setSelectedAccount(googleAccount.getAccount());
//                    Drive googleDriveService =
//                            new Drive.Builder(
//                                    AndroidHttp.newCompatibleTransport(),
//                                    new GsonFactory(),
//                                    credential)
//                                    .setApplicationName("Notes")
//                                    .build();
//
//                    BackupDriveService.get().setGoogleDriveService(googleDriveService);
//
//                    context
//                            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
//                            .emit(
//                                    BackupEventTypes.LOG_IN_RESULT,
//                                    BackupEventsJSPayloads.loginResultEventPayload(true, googleAccount.getEmail(), "")
//                            );
//                })
//                .addOnFailureListener(exception -> {
//                    Log.e("tag", "Unable to sign in.", exception);
//
//                    context
//                            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
//                            .emit(
//                                    BackupEventTypes.LOG_IN_RESULT,
//                                    BackupEventsJSPayloads.loginResultEventPayload(false, "", exception.toString())
//                            );
//                });
//    }
//}
