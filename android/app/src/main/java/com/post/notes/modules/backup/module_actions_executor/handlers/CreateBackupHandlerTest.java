package com.post.notes.modules.backup.module_actions_executor.handlers;


import android.util.Base64;
import android.util.Log;
import android.util.Pair;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.google.api.client.http.ByteArrayContent;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.model.File;
import com.google.api.services.drive.model.FileList;
import com.post.notes.common.app_storages.AppStorages;
import com.post.notes.common.app_storages.notes_storage.AppNotesStorage;
import com.post.notes.common.data.hybrid_objects.note.Note;
import com.post.notes.common.data.hybrid_objects.notes_list.NotesList;
import com.post.notes.modules.backup.backup_drive_service.BackupDriveService;
import com.post.notes.modules.backup.module_actions.payloads.BackupJSActionPayloads;
import com.post.notes.modules.backup.module_actions.payloads.payloads.CreateBackupPayload;
import com.post.notes.modules.backup.module_errors.BackupErrors;
import com.post.notes.modules.backup.module_events.payloads.BackupEventsJSPayloads;
import com.post.notes.modules.backup.module_events.types.BackupEventTypes;
import com.post.notes.modules.modules_common.data.error.ModuleError;
import com.post.notes.modules.modules_common.data_types.js_action_handler.JSActionHandler;

import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class CreateBackupHandlerTest implements JSActionHandler {
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

        Log.d("tag", "CreateBackupHandler->SUCCESS->BACKUP_NOTE: " + payload.backupNote());

        result.resolve(true);

        // ===
        AppNotesStorage notesStorage = AppStorages.get().notesStorage();

        NotesList notes = notesStorage.getNotesList(context);
        List<Note> noteList = notes.notesList();
        Log.d("tag", "Notes count: " + String.valueOf(noteList.size()));

        if (noteList.size() <= 0) {
            return;
        }

        Note note = noteList.get(0);

        List<String> noteImageIds = note.images();
        Log.d("tag", "Note images count: " + String.valueOf(noteImageIds.size()));

        if (noteImageIds.size() <= 0) {
            return;
        }

        String imageId = noteImageIds.get(0);
        String image = notesStorage.getNoteImage(context, String.valueOf(note.id()), imageId);
        long sizeInBytes= (image.length() * 3 / 4);
        double sizeInKb = round((double) sizeInBytes / 1024, 2);
        double sizeInMb = round((double) sizeInKb / 1024, 2);
        Log.d("tag", "IMAGE_SIZE: " + String.valueOf(sizeInMb));

        // ===
//        byte[] encodedBytes = Base64.getEncoder().encode("Test".getBytes());

        byte[] bytes_0 = Base64.encode(image.getBytes(), Base64.DEFAULT);
        byte[] bytes_1 = image.getBytes();
        byte[] bytes_2 = image.getBytes(StandardCharsets.UTF_8);
        byte[] bytes_3 = image.getBytes(StandardCharsets.UTF_16);

        double sizeBytes_0 = round((double) bytes_0.length / 1024 / 1024, 2);
        double sizeBytes_1 = round((double) bytes_1.length / 1024 / 1024, 2);
        double sizeBytes_2 = round((double) bytes_2.length / 1024 / 1024, 2);
        double sizeBytes_3 = round((double) bytes_3.length / 1024 / 1024, 2);

        Log.d(
                "tag",
                "SIZE_V2: " +
                        String.valueOf(sizeBytes_0) + " - " +
                        String.valueOf(sizeBytes_1) + " - " +
                        String.valueOf(sizeBytes_2) + " - " +
                        String.valueOf(sizeBytes_3)
        );
        // ===

        String ROOT_FOLDER_NAME = "NotesAppBackups";

        String rootFolderId = getRootFolderId(ROOT_FOLDER_NAME);
        if (rootFolderId == null) {
            Log.d("tag", "ROOT_FOLDER_ID_IS_NULL");
            rootFolderId = createRootFolder(ROOT_FOLDER_NAME);
            Log.d("tag", "CREATED_ROOT_FOLDER_ID: " + rootFolderId);
        } else {
            Log.d("tag", "ROOT_FOLDER_ID: " + rootFolderId);

//            File file = saveStringData(image, rootFolderId);
//            if (file == null) {
//                Log.d("tag", "SAVED_FILE_IS_NULL");
//            } else {
//                Log.d("tag", "SAVED: " + file.getDescription());
//            }
        }
        // ===

//        context
//                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
//                .emit(
//                        BackupEventTypes.CREATE_BACKUP_RESULT,
//                        BackupEventsJSPayloads.createBackupResultEventPayload(true, "", "")
//                );
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
            fileMetadata.setMimeType("image/png");

//            // Sending side
//            byte[] data = text.getBytes(StandardCharsets.UTF_8);
//            String base64 = Base64.encodeToString(data, Base64.DEFAULT);
//
//            // Receiving side
//            byte[] data = Base64.decode(base64, Base64.DEFAULT);
//            String text = new String(data, StandardCharsets.UTF_8);

            byte[] dataBytes = data.getBytes(StandardCharsets.UTF_16);

            file = googleDriveService.files().create(fileMetadata, new ByteArrayContent("", dataBytes))
                    .setFields("id")
                    .execute();
        } catch (IOException e) {
            Log.d("tag", e.toString());
        }

        return file;
    }

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
//        Log.d("tag", "CreateBackupHandler->SUCCESS->BACKUP_NOTE: " + payload.backupNote());
//
//        result.resolve(true);
//
//        // ===
//        // =====
//
//        AppNotesStorage notesStorage = AppStorages.get().notesStorage();
//
//        NotesList notes = notesStorage.getNotesList(context);
//        List<Note> noteList = notes.notesList();
//
//        List<Pair<Long, List<Pair<String, Long>>>> noteImagesSize = new ArrayList<>();
//        for (int noteIndex = 0; noteIndex < noteList.size(); ++noteIndex) {
//            Note note = noteList.get(noteIndex);
//
//            List<String> noteImageIds = note.images();
//            List<Pair<String, Long>> imageSizes = new ArrayList<>();
//
//            for (int imageIdIndex = 0; imageIdIndex < noteImageIds.size(); ++imageIdIndex) {
//                String imageId = noteImageIds.get(imageIdIndex);
//
//                String image = notesStorage.getNoteImage(context, String.valueOf(note.id()), imageId);
//
//                long imageSize = (image.length() * 3 / 4);
//                imageSizes.add(Pair.create(imageId, imageSize));
//            }
//
//            if (imageSizes.size() > 0) {
//                noteImagesSize.add(Pair.create(note.id(), imageSizes));
//            }
//        }
//
//        double totalImagesSizeInMb = 0.0;
//        Log.d("tag", "Notes With Images: " + String.valueOf(noteImagesSize.size()));
//        for (int i = 0; i < noteImagesSize.size(); ++i) {
//            Pair<Long, List<Pair<String, Long>>> noteImagesData = noteImagesSize.get(i);
//            List<Pair<String, Long>> noteImageSizes = noteImagesData.second;
//
//            Log.d("tag", "Note: " + String.valueOf(noteImagesData.first) + " - Images Count: " + String.valueOf(noteImageSizes.size()));
//            for (int j = 0; j < noteImageSizes.size(); ++j) {
//                Pair<String, Long> imageData = noteImageSizes.get(j);
//
//                long sizeInBytes = imageData.second;
//                double sizeInKb = round((double) sizeInBytes / 1024, 2);
//                double sizeInMb = round((double) sizeInKb / 1024, 2);
//
//                totalImagesSizeInMb = totalImagesSizeInMb + sizeInMb;
//
//                Log.d("tag", imageData.first + " - " + String.valueOf(sizeInBytes) + " - " + String.valueOf(sizeInKb) + " - " + String.valueOf(sizeInMb));
//            }
//        }
//        Log.d("tag", "TOTAL_IMAGES_SIZE: " + String.valueOf(round(totalImagesSizeInMb, 2)));
//        // =====
//        // ===
//
//        context
//                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
//                .emit(
//                        BackupEventTypes.CREATE_BACKUP_RESULT,
//                        BackupEventsJSPayloads.createBackupResultEventPayload(true, "")
//                );
//    }

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
//        Log.d("tag", "CreateBackupHandler->SUCCESS->BACKUP_NOTE: " + payload.backupNote());
//
//        result.resolve(true);
//
//        context
//                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
//                .emit(
//                        BackupEventTypes.CREATE_BACKUP_RESULT,
//                        BackupEventsJSPayloads.createBackupResultEventPayload(true, "")
//                );
//    }

    public static double round(double value, int places) {
        if (places < 0) throw new IllegalArgumentException();

        BigDecimal bd = BigDecimal.valueOf(value);
        bd = bd.setScale(places, RoundingMode.HALF_UP);
        return bd.doubleValue();
    }
}
