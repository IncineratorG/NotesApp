package com.post.notes.modules.backup.module_actions_executor.handlers;


import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.google.api.client.http.ByteArrayContent;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.model.File;
import com.google.api.services.drive.model.FileList;
import com.post.notes.modules.backup.backup_drive_service.BackupDriveService;
import com.post.notes.modules.backup.backup_drive_service.callbacks.create_backup.CreateBackupCancelledCallback;
import com.post.notes.modules.backup.backup_drive_service.callbacks.create_backup.CreateBackupErrorCallback;
import com.post.notes.modules.backup.backup_drive_service.callbacks.create_backup.CreateBackupFinishedCallback;
import com.post.notes.modules.backup.backup_drive_service.callbacks.create_backup.CreateBackupProgressChangedCallback;
import com.post.notes.modules.backup.module_actions.payloads.BackupJSActionPayloads;
import com.post.notes.modules.backup.module_actions.payloads.payloads.CreateBackupPayload;
import com.post.notes.modules.backup.module_errors.BackupErrors;
import com.post.notes.modules.backup.module_events.payloads.BackupEventsJSPayloads;
import com.post.notes.modules.backup.module_events.types.BackupEventTypes;
import com.post.notes.modules.modules_common.data.error.ModuleError;
import com.post.notes.modules.modules_common.data_types.js_action_handler.JSActionHandler;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.nio.charset.StandardCharsets;
import java.util.Collections;
import java.util.List;

public class CreateBackupHandler implements JSActionHandler {
    private final String ACTION_PAYLOAD = "payload";

    @Override
    public void handle(ReactApplicationContext context, ReadableMap action, Promise result) {
        ReadableMap payloadMap = action.getMap(ACTION_PAYLOAD);
        if (payloadMap == null) {
            ModuleError error = BackupErrors.badPayload();
            result.reject(error.code(), error.message());
            return;
        }

        CreateBackupPayload payload = BackupJSActionPayloads
                .createBackupPayload(payloadMap);
        if (!payload.isValid()) {
            ModuleError error = BackupErrors.badPayload();
            result.reject(error.code(), error.message());
            return;
        }

        Log.d("tag", "CreateBackupHandler->SUCCESS->BACKUP_NOTE: " + payload.backupNote() + " - " + payload.needSaveImages());

        CreateBackupProgressChangedCallback progressChangedCallback = progress -> {
            Log.d("tag", "CreateBackupHandler->BACKUP_PROGRESS_CHANGED: " + progress.stageType());

            context
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit(
                            BackupEventTypes.CREATE_BACKUP_PROGRESS_CHANGED,
                            BackupEventsJSPayloads.createBackupProgressChangedEventPayload(progress)
                    );
        };
        CreateBackupFinishedCallback finishedCallback = () -> {
            Log.d("tag", "CreateBackupHandler->BACKUP_FINISHED");

            context
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit(
                            BackupEventTypes.CREATE_BACKUP_FINISHED,
                            BackupEventsJSPayloads.createBackupFinishedEventPayload()
                    );
        };
        CreateBackupCancelledCallback cancelledCallback = () -> {
            Log.d("tag", "CreateBackupHandler->BACKUP_CANCELLED");

            context
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit(
                            BackupEventTypes.CREATE_BACKUP_CANCELLED,
                            BackupEventsJSPayloads.createBackupCancelledEventPayload()
                    );
        };
        CreateBackupErrorCallback errorCallback = error -> {
            Log.d("tag", "CreateBackupHandler->BACKUP_ERROR: " + error.code() + " - " + error.message());

            context
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit(
                            BackupEventTypes.CREATE_BACKUP_ERROR,
                            BackupEventsJSPayloads.createBackupErrorEventPayload(error)
                    );
        };

        BackupDriveService.get().createBackup(
                context,
                payload.backupNote(),
                payload.needSaveImages(),
                progressChangedCallback,
                finishedCallback,
                cancelledCallback,
                errorCallback
        );

        result.resolve(true);
    }

    private String getRootFolderId(String rootFolderName) {
        String rootFolderId = null;

        Drive googleDriveService = BackupDriveService.get().getGoogleDriveService();
        if (googleDriveService == null) {
            Log.d("tag", "BAD_GOOGLE_DRIVE_SERVICE");
            return null;
        }

        try {
            FileList files = googleDriveService.files().list()
                    .setSpaces("appDataFolder")
                    .setFields("nextPageToken, files(id, name)")
                    .setPageSize(1000)
                    .setQ("mimeType='application/vnd.google-apps.folder' and name='" + rootFolderName + "'")
                    .execute();

            for (File file : files.getFiles()) {
                if (file.getName().equals(rootFolderName)) {
                    rootFolderId = file.getId();
                    break;
                }
            }
        } catch (IOException e) {
            Log.d("tag", "GetBackupDataTask.getRootFolderId()->IOEXCEPTION");
            return null;
        }

        return rootFolderId;
    }

    private String createRootFolder(String rootFolderName) {
        Drive googleDriveService = BackupDriveService.get().getGoogleDriveService();
        if (googleDriveService == null) {
            Log.d("tag", "BAD_GOOGLE_DRIVE_SERVICE");
            return null;
        }

        String rootFolderId = null;

        try {
            File fileMetadata = new File();
            fileMetadata.setName(rootFolderName);
            fileMetadata.setParents(Collections.singletonList("appDataFolder"));
            fileMetadata.setMimeType("application/vnd.google-apps.folder");

            File file = googleDriveService.files().create(fileMetadata)
                    .setFields("id")
                    .execute();

            rootFolderId = file.getId();
        } catch (IOException e) {
            Log.d("tag", e.toString());
        }

        return rootFolderId;
    }

    public File saveStringData(String data, String rootFolderId) {
        File file = null;

        Drive googleDriveService = BackupDriveService.get().getGoogleDriveService();
        if (googleDriveService == null) {
            Log.d("tag", "BAD_GOOGLE_DRIVE_SERVICE");
            return null;
        }

        try {
            File fileMetadata = new File();
            fileMetadata.setName("Image");
            fileMetadata.setParents(Collections.singletonList(rootFolderId));
            fileMetadata.setMimeType("text/xml");

            byte[] dataBytes = data.getBytes(StandardCharsets.UTF_8);

            file = googleDriveService.files().create(fileMetadata, new ByteArrayContent("", dataBytes))
                    .setFields("id")
                    .execute();
        } catch (IOException e) {
            Log.d("tag", e.toString());
        }

        return file;
    }

    public ByteArrayOutputStream getStringData(String folderId) {
        FileList files = null;
        File file = null;

        Drive googleDriveService = BackupDriveService.get().getGoogleDriveService();
        if (googleDriveService == null) {
            Log.d("tag", "BAD_GOOGLE_DRIVE_SERVICE");
            return null;
        }

        try {
            files = googleDriveService.files().list()
                    .setSpaces("appDataFolder")
                    .setFields("nextPageToken, files(id, name)")
                    .setQ("mimeType='text/xml' and '" + folderId + "' in parents")
                    .setPageSize(1000)
                    .execute();
        } catch (IOException e) {
            Log.d("tag", "getStringData()->IOEXCEPTION: " + e.getMessage());
            return null;
        }

        List<File> filesList = files.getFiles();
        file = filesList.get(0);

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        try {
            googleDriveService.files().get(file.getId()).executeMediaAndDownloadTo(outputStream);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return outputStream;
    }

    public static double round(double value, int places) {
        if (places < 0) throw new IllegalArgumentException();

        BigDecimal bd = BigDecimal.valueOf(value);
        bd = bd.setScale(places, RoundingMode.HALF_UP);
        return bd.doubleValue();
    }
}

//package com.post.notes.modules.backup.module_actions_executor.handlers;
//
//
//import android.util.Base64;
//import android.util.Log;
//
//import com.facebook.react.bridge.Promise;
//import com.facebook.react.bridge.ReactApplicationContext;
//import com.facebook.react.bridge.ReadableMap;
//import com.facebook.react.bridge.WritableMap;
//import com.facebook.react.bridge.WritableNativeMap;
//import com.facebook.react.modules.core.DeviceEventManagerModule;
//import com.google.api.client.http.ByteArrayContent;
//import com.google.api.services.drive.Drive;
//import com.google.api.services.drive.model.File;
//import com.google.api.services.drive.model.FileList;
//import com.post.notes.common.app_storages.AppStorages;
//import com.post.notes.common.app_storages.notes_storage.AppNotesStorage;
//import com.post.notes.common.data.hybrid_objects.note.Note;
//import com.post.notes.common.data.hybrid_objects.notes_list.NotesList;
//import com.post.notes.modules.backup.backup_drive_service.BackupDriveService;
//import com.post.notes.modules.backup.module_actions.payloads.BackupJSActionPayloads;
//import com.post.notes.modules.backup.module_actions.payloads.payloads.CreateBackupPayload;
//import com.post.notes.modules.backup.module_errors.BackupErrors;
//import com.post.notes.modules.backup.module_events.payloads.BackupEventsJSPayloads;
//import com.post.notes.modules.backup.module_events.types.BackupEventTypes;
//import com.post.notes.modules.modules_common.data.error.ModuleError;
//import com.post.notes.modules.modules_common.data_types.js_action_handler.JSActionHandler;
//
//import java.io.ByteArrayOutputStream;
//import java.io.IOException;
//import java.io.UnsupportedEncodingException;
//import java.math.BigDecimal;
//import java.math.RoundingMode;
//import java.nio.charset.StandardCharsets;
//import java.util.Collections;
//import java.util.List;
//
//public class CreateBackupHandler_V2 implements JSActionHandler {
//    private final String ACTION_PAYLOAD = "payload";
//
//    @Override
//    public void handle(ReactApplicationContext context, ReadableMap action, Promise result) {
//        ReadableMap payloadMap = action.getMap(ACTION_PAYLOAD);
//        if (payloadMap == null) {
//            ModuleError error = BackupErrors.badPayload();
//            result.reject(error.code(), error.message());
//            return;
//        }
//
//        CreateBackupPayload payload = BackupJSActionPayloads
//                .createBackupPayload(payloadMap);
//        if (!payload.isValid()) {
//            ModuleError error = BackupErrors.badPayload();
//            result.reject(error.code(), error.message());
//            return;
//        }
//
//        Log.d("tag", "CreateBackupHandler_V2->SUCCESS->BACKUP_NOTE: " + payload.backupNote());
//
//        AppNotesStorage notesStorage = AppStorages.get().notesStorage();
//
//        NotesList notes = notesStorage.getNotesList(context);
//        List<Note> noteList = notes.notesList();
//        Log.d("tag", "Notes count: " + String.valueOf(noteList.size()));
//
//        Note note = noteList.get(0);
//
//        List<String> noteImageIds = note.images();
//        Log.d("tag", "Note images count: " + String.valueOf(noteImageIds.size()));
//
//        String imageId = noteImageIds.get(0);
//        String image = notesStorage.getNoteImage(context, String.valueOf(note.id()), imageId);
//
//        WritableMap resultObject = new WritableNativeMap();
//        resultObject.putBoolean("result", true);
//        resultObject.putString("image", image);
//
//        result.resolve(resultObject);
//
//        // ===
//        String ROOT_FOLDER_NAME = "NotesAppBackups";
//
//        String rootFolderId = getRootFolderId(ROOT_FOLDER_NAME);
//        if (rootFolderId == null) {
//            Log.d("tag", "ROOT_FOLDER_ID_IS_NULL");
//            rootFolderId = createRootFolder(ROOT_FOLDER_NAME);
//            Log.d("tag", "CREATED_ROOT_FOLDER_ID: " + rootFolderId);
//        } else {
//            Log.d("tag", "ROOT_FOLDER_ID: " + rootFolderId);
//        }
//
//        File file = saveStringData(image, rootFolderId);
//        Log.d("tag", "SAVED_FILE_ID: " + file.getId());
//
//        ByteArrayOutputStream outputStream = getStringData(rootFolderId);
//        try {
//            String savedImage = outputStream.toString(StandardCharsets.UTF_8.name());
//            context
//                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
//                    .emit(
//                            BackupEventTypes.CREATE_BACKUP_RESULT,
//                            BackupEventsJSPayloads.createBackupResultEventPayload(true, "", savedImage)
//                    );
//        } catch (UnsupportedEncodingException e) {
//            Log.d("tag", "ERROR_IN_SAVED_IMAGE: " + e.toString());
//        }
//        // ===
//
////        context
////                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
////                .emit(
////                        BackupEventTypes.CREATE_BACKUP_RESULT,
////                        BackupEventsJSPayloads.createBackupResultEventPayload(true, "", image)
////                );
//    }
//
//    private String getRootFolderId(String rootFolderName) {
//        String rootFolderId = null;
//
//        Drive googleDriveService = BackupDriveService.get().getGoogleDriveService();
//        if (googleDriveService == null) {
//            Log.d("tag", "BAD_GOOGLE_DRIVE_SERVICE");
//            return null;
//        }
//
//        try {
//            FileList files = googleDriveService.files().list()
//                    .setSpaces("appDataFolder")
//                    .setFields("nextPageToken, files(id, name)")
//                    .setPageSize(1000)
//                    .setQ("mimeType='application/vnd.google-apps.folder' and name='" + rootFolderName + "'")
//                    .execute();
//
//            for (File file : files.getFiles()) {
//                if (file.getName().equals(rootFolderName)) {
//                    rootFolderId = file.getId();
//                    break;
//                }
//            }
//        } catch (IOException e) {
//            Log.d("tag", "GetBackupDataTask.getRootFolderId()->IOEXCEPTION");
//            return null;
//        }
//
//        return rootFolderId;
//    }
//
//    private String createRootFolder(String rootFolderName) {
//        Drive googleDriveService = BackupDriveService.get().getGoogleDriveService();
//        if (googleDriveService == null) {
//            Log.d("tag", "BAD_GOOGLE_DRIVE_SERVICE");
//            return null;
//        }
//
//        String rootFolderId = null;
//
//        try {
//            File fileMetadata = new File();
//            fileMetadata.setName(rootFolderName);
//            fileMetadata.setParents(Collections.singletonList("appDataFolder"));
//            fileMetadata.setMimeType("application/vnd.google-apps.folder");
//
//            File file = googleDriveService.files().create(fileMetadata)
//                    .setFields("id")
//                    .execute();
//
//            rootFolderId = file.getId();
//        } catch (IOException e) {
//            Log.d("tag", e.toString());
//        }
//
//        return rootFolderId;
//    }
//
//    public File saveStringData(String data, String rootFolderId) {
//        File file = null;
//
//        Drive googleDriveService = BackupDriveService.get().getGoogleDriveService();
//        if (googleDriveService == null) {
//            Log.d("tag", "BAD_GOOGLE_DRIVE_SERVICE");
//            return null;
//        }
//
//        try {
//            File fileMetadata = new File();
//            fileMetadata.setName("Image");
//            fileMetadata.setParents(Collections.singletonList(rootFolderId));
//            fileMetadata.setMimeType("text/xml");
//
//            byte[] dataBytes = data.getBytes(StandardCharsets.UTF_8);
//
//            file = googleDriveService.files().create(fileMetadata, new ByteArrayContent("", dataBytes))
//                    .setFields("id")
//                    .execute();
//        } catch (IOException e) {
//            Log.d("tag", e.toString());
//        }
//
//        return file;
//    }
//
//    public ByteArrayOutputStream getStringData(String folderId) {
//        FileList files = null;
//        File file = null;
//
//        Drive googleDriveService = BackupDriveService.get().getGoogleDriveService();
//        if (googleDriveService == null) {
//            Log.d("tag", "BAD_GOOGLE_DRIVE_SERVICE");
//            return null;
//        }
//
//        try {
//            files = googleDriveService.files().list()
//                    .setSpaces("appDataFolder")
//                    .setFields("nextPageToken, files(id, name)")
//                    .setQ("mimeType='text/xml' and '" + folderId + "' in parents")
//                    .setPageSize(1000)
//                    .execute();
//        } catch (IOException e) {
//            Log.d("tag", "getStringData()->IOEXCEPTION: " + e.getMessage());
//            return null;
//        }
//
//        List<File> filesList = files.getFiles();
//        file = filesList.get(0);
//
//        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
//        try {
//            googleDriveService.files().get(file.getId()).executeMediaAndDownloadTo(outputStream);
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//
//        return outputStream;
//    }
//
//    public static double round(double value, int places) {
//        if (places < 0) throw new IllegalArgumentException();
//
//        BigDecimal bd = BigDecimal.valueOf(value);
//        bd = bd.setScale(places, RoundingMode.HALF_UP);
//        return bd.doubleValue();
//    }
//}
