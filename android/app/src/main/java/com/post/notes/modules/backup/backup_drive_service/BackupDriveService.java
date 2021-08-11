package com.post.notes.modules.backup.backup_drive_service;


import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.google.android.gms.auth.api.signin.GoogleSignIn;
import com.google.android.gms.auth.api.signin.GoogleSignInClient;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import com.google.android.gms.common.api.Scope;
import com.google.api.client.extensions.android.http.AndroidHttp;
import com.google.api.client.googleapis.extensions.android.gms.auth.GoogleAccountCredential;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.DriveScopes;
import com.post.notes.modules.backup.backup_drive_service.callbacks.create_backup.CreateBackupCancelledCallback;
import com.post.notes.modules.backup.backup_drive_service.callbacks.create_backup.CreateBackupErrorCallback;
import com.post.notes.modules.backup.backup_drive_service.callbacks.create_backup.CreateBackupFinishedCallback;
import com.post.notes.modules.backup.backup_drive_service.callbacks.create_backup.CreateBackupProgressChangedCallback;
import com.post.notes.modules.backup.backup_drive_service.callbacks.get_backups_list.GetBackupsListCancelledCallback;
import com.post.notes.modules.backup.backup_drive_service.callbacks.get_backups_list.GetBackupsListErrorCallback;
import com.post.notes.modules.backup.backup_drive_service.callbacks.get_backups_list.GetBackupsListFinishedCallback;
import com.post.notes.modules.backup.backup_drive_service.callbacks.log_in.OnLoginFailure;
import com.post.notes.modules.backup.backup_drive_service.callbacks.log_in.OnLoginSuccessful;
import com.post.notes.modules.backup.backup_drive_service.callbacks.log_out.OnLogOutFailure;
import com.post.notes.modules.backup.backup_drive_service.callbacks.log_out.OnLogOutSuccessful;
import com.post.notes.modules.backup.backup_drive_service.callbacks.remove_backup.RemoveBackupErrorCallback;
import com.post.notes.modules.backup.backup_drive_service.callbacks.remove_backup.RemoveBackupFinishedCallback;
import com.post.notes.modules.backup.backup_drive_service.callbacks.restore_from_backup.RestoreFromBackupCancelledCallback;
import com.post.notes.modules.backup.backup_drive_service.callbacks.restore_from_backup.RestoreFromBackupErrorCallback;
import com.post.notes.modules.backup.backup_drive_service.callbacks.restore_from_backup.RestoreFromBackupFinishedCallback;
import com.post.notes.modules.backup.backup_drive_service.callbacks.restore_from_backup.RestoreFromBackupProgressChangedCallback;
import com.post.notes.modules.backup.backup_drive_service.data.backup_item.BackupItem;
import com.post.notes.modules.backup.backup_drive_service.tasks.BackupTasks;
import com.post.notes.modules.backup.module_errors.BackupErrors;
import com.post.notes.modules.modules_common.data_types.activity_result_callback.ModuleActivityResultCallbacks;

import java.util.Collections;

public class BackupDriveService {
    public static final String DRIVE_ROOT_FOLDER_NAME = "NotesAppBackups";

    public static final String BACKUP_TEMPORARY_FOLDER_NAME = "backupTemp";

    public static final String APP_SETTINGS_FOLDER_NAME = "AppSettings";
    public static final String APP_SETTINGS_FILE_NAME = "appSettingsBackup";

    public static final String NOTES_LIST_SETTINGS_FOLDER_NAME = "NotesListSettings";
    public static final String NOTES_LIST_SETTINGS_FILE_NAME = "notesListSettingsBackup";

    public static final String CATEGORIES_FOLDER_NAME = "Categories";
    public static final String CATEGORIES_FILE_NAME = "categoriesBackup";

    public static final String NOTES_FOLDER_NAME = "Notes";

    public static final String NOT_IMAGES_DATA_FOLDER_NAME = "TextData";
    public static final String NOT_IMAGES_DATA_FILE_NAME = "textDataBackup";

    public static final String IMAGES_FOLDER_NAME = "Images";

    private static final int REQUEST_CODE_SIGN_IN = 1;
    private static final String BACKUP_FOLDER_NAME_DELIMITER = "@#@";

    private static BackupDriveService sInstance;

    private Drive mDriveService;
    private GoogleSignInClient mClient;

    private BackupDriveService() {

    }

    public static synchronized BackupDriveService get() {
        if (sInstance == null) {
            sInstance = new BackupDriveService();
        }

        return sInstance;
    }

    public static String generateBackupFolderName(String backupNote, String backupSizeInBytes) {
        if (backupNote == null) {
            backupNote = "";
        }
        if (backupSizeInBytes == null) {
            backupSizeInBytes = "0";
        }

        String currentMilliseconds = String.valueOf(System.currentTimeMillis());

        return currentMilliseconds +
                BACKUP_FOLDER_NAME_DELIMITER +
                backupNote +
                BACKUP_FOLDER_NAME_DELIMITER +
                backupSizeInBytes;
    }

    public static BackupItem getBackupItemFromFolderName(String folderName, String folderId) {
        if (folderName == null || folderName.isEmpty() || folderId == null || folderId.isEmpty()) {
            Log.d("tag", "BackupDriveService->getBackupItemFromFolderName->BAD_BACKUP_DATA");
            return new BackupItem();
        }

        String[] backupInfo = folderName.split(BACKUP_FOLDER_NAME_DELIMITER);
        if (backupInfo.length < 3) {
            Log.d("tag", "BackupDriveService->getBackupItemFromFolderName->BAD_BACKUP_DATA");
            return new BackupItem();
        }

        String timestamp = backupInfo[0];
        String note = backupInfo[1];
        String size = backupInfo[2];

        return new BackupItem(timestamp, note, size, folderId);
    }

    public synchronized void logIn(ReactApplicationContext context,
                                   ModuleActivityResultCallbacks activityResultCallbacks,
                                   OnLoginSuccessful loginSuccessfulCallback,
                                   OnLoginFailure loginFailureCallback) {
        GoogleSignInOptions signInOptions =
                new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
                        .requestEmail()
//                        .requestScopes(new Scope(DriveScopes.DRIVE))
//                        .requestScopes(new Scope(DriveScopes.DRIVE_APPDATA))
//                        .requestScopes(new Scope(DriveScopes.DRIVE_FILE))
                        .requestScopes(new Scope(DriveScopes.DRIVE_APPDATA))
                        .build();

        mClient = GoogleSignIn.getClient(context, signInOptions);

        activityResultCallbacks.set(
                REQUEST_CODE_SIGN_IN,
                (activity, requestCode, resultCode, data) -> {
                    if (resultCode == Activity.RESULT_OK && data != null) {
                        handleSignInResult(data, activity, loginSuccessfulCallback, loginFailureCallback);
                    }
                }
        );

        context.startActivityForResult(mClient.getSignInIntent(), REQUEST_CODE_SIGN_IN, null);
    }

    public synchronized void logOut(OnLogOutSuccessful logOutSuccessfulCallback,
                                    OnLogOutFailure logOutFailureCallback) {

        if (mClient == null) {
            logOutSuccessfulCallback.handle();
        }

        mClient.signOut()
                .addOnCompleteListener(task -> {
                    logOutSuccessfulCallback.handle();
                })
                .addOnFailureListener(e -> {
                    logOutFailureCallback.handle(e);
                });
    }

    public synchronized void getBackupsList(GetBackupsListFinishedCallback finishedCallback,
                                            GetBackupsListCancelledCallback cancelledCallback,
                                            GetBackupsListErrorCallback errorCallback) {
        if (mClient == null || mDriveService == null) {
            errorCallback.onError(BackupErrors.driveServiceNotInitialized());
            return;
        }

        BackupTasks.runGetBackupsListTask(
                mDriveService,
                finishedCallback,
                cancelledCallback,
                errorCallback
        );
    }

    public synchronized void createBackup(Context context,
                                          String backupNote,
                                          boolean needSaveImages,
                                          CreateBackupProgressChangedCallback progressChangedCallback,
                                          CreateBackupFinishedCallback finishedCallback,
                                          CreateBackupCancelledCallback cancelledCallback,
                                          CreateBackupErrorCallback errorCallback) {
        if (mClient == null || mDriveService == null) {
            errorCallback.onError(BackupErrors.driveServiceNotInitialized());
            return;
        }

        BackupTasks.runCreateBackupTask(
                context,
                backupNote,
                needSaveImages,
                mDriveService,
                progressChangedCallback,
                finishedCallback,
                cancelledCallback,
                errorCallback
        );
    }

    public synchronized void removeBackup(String backupDriveId,
                                          RemoveBackupFinishedCallback finishedCallback,
                                          RemoveBackupErrorCallback errorCallback) {
        if (mClient == null || mDriveService == null) {
            errorCallback.onError(BackupErrors.driveServiceNotInitialized());
            return;
        }

        BackupTasks.runRemoveBackupTask(
                backupDriveId,
                mDriveService,
                finishedCallback,
                errorCallback
        );
    }

    public synchronized void restoreFromBackup(Context context,
                                               String backupDriveId,
                                               RestoreFromBackupProgressChangedCallback progressChangedCallback,
                                               RestoreFromBackupFinishedCallback finishedCallback,
                                               RestoreFromBackupCancelledCallback cancelledCallback,
                                               RestoreFromBackupErrorCallback errorCallback) {
        if (mClient == null || mDriveService == null) {
            errorCallback.onError(BackupErrors.driveServiceNotInitialized());
            return;
        }

        BackupTasks.runRestoreFromBackupTask(
                context,
                backupDriveId,
                mDriveService,
                progressChangedCallback,
                finishedCallback,
                cancelledCallback,
                errorCallback
        );
    }

    public synchronized Drive getGoogleDriveService() {
        return mDriveService;
    }

    private void handleSignInResult(Intent result,
                                    Activity activity,
                                    OnLoginSuccessful loginSuccessfulCallback,
                                    OnLoginFailure loginFailureCallback) {
        Log.d("tag", "BackupDriveService->handleSignInResult()");

        GoogleSignIn.getSignedInAccountFromIntent(result)
                .addOnSuccessListener(googleAccount -> {
                    Log.d("tag", "Signed in as " + googleAccount.getEmail());

                    // Use the authenticated account to sign in to the Drive service.
                    GoogleAccountCredential credential =
                            GoogleAccountCredential.usingOAuth2(
                                    (Context) activity, Collections.singleton(DriveScopes.DRIVE_APPDATA));
                    credential.setSelectedAccount(googleAccount.getAccount());
//                    GoogleAccountCredential credential =
//                            GoogleAccountCredential.usingOAuth2(
//                                    (Context) activity, Collections.singleton(DriveScopes.DRIVE_FILE));
//                    credential.setSelectedAccount(googleAccount.getAccount());

                    // ===
                    String appName = getAppLabel(activity);
                    if (appName.isEmpty()) {
                        Log.d("tag", "BackupDriveService->handleSignInResult()->BAD_APP_NAME: " + appName);
                    }
                    // ===

                    mDriveService = new Drive.Builder(
                            AndroidHttp.newCompatibleTransport(),
                            new GsonFactory(),
                            credential)
                            .setApplicationName(appName)
                            .build();

                    loginSuccessfulCallback.handle(activity, googleAccount);
                })
                .addOnFailureListener(exception -> {
                    Log.e("tag", "Unable to sign in.", exception);

                    loginFailureCallback.handle(activity, exception);
                });
    }

    private String getAppLabel(Context context) {
        PackageManager packageManager = context.getPackageManager();
        ApplicationInfo applicationInfo = null;
        try {
            applicationInfo = packageManager.getApplicationInfo(context.getApplicationInfo().packageName, 0);
        } catch (final PackageManager.NameNotFoundException e) {
            Log.d("tag", "BackupDriveService->getAppLabel()->NameNotFoundException");
        }

        return (String) (applicationInfo != null ? packageManager.getApplicationLabel(applicationInfo) : "");
    }
}

//    public synchronized void setGoogleSignInClient(GoogleSignInClient client) {
//        mClient = client;
//    }

//    public synchronized GoogleSignInClient getGoogleSignInClient() {
//        return mClient;
//    }

//    public synchronized void setGoogleDriveService(Drive drive) {
//        mDriveService = drive;
//    }
