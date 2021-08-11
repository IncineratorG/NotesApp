package com.post.notes.modules.backup.backup_drive_service.data_transformers.images;


import android.content.Context;
import android.util.Log;

import com.google.api.client.http.ByteArrayContent;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.model.File;
import com.google.api.services.drive.model.FileList;
import com.post.notes.common.app_storages.AppStorages;
import com.post.notes.common.app_storages.notes_storage.AppNotesStorage;
import com.post.notes.common.data.hybrid_objects.note.Note;
import com.post.notes.common.data.hybrid_objects.notes_list.NotesList;
import com.post.notes.common.task.Task;
import com.post.notes.modules.backup.backup_drive_service.BackupDriveService;
import com.post.notes.modules.backup.backup_drive_service.data.data_transformer.BackupDataTransformer;
import com.post.notes.modules.backup.backup_drive_service.data.data_transformer.CreateBackupResult;
import com.post.notes.modules.backup.backup_drive_service.data.data_transformer.RestoreFromBackupResult;
import com.post.notes.modules.backup.backup_drive_service.data.task_progress.BackupTaskProgress;
import com.post.notes.modules.backup.backup_drive_service.data_transformers.images.backup_image_info.BackupImageInfo;
import com.post.notes.modules.backup.backup_drive_service.helpers.BackupDriveServiceHelper;
import com.post.notes.modules.backup.backup_drive_service.tasks.create_backup.CreateBackupTask;
import com.post.notes.modules.backup.backup_drive_service.tasks.restore_from_backup.RestoreFromBackupTask;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class ImagesTransformer implements BackupDataTransformer {
    private static final String IMAGE_NAME_DELIMITER = "@#@";

    public ImagesTransformer() {

    }

    @SuppressWarnings("rawtypes")
    public CreateBackupResult toGoogleDriveBackup(Task task,
                                                  Context context,
                                                  Drive driveService,
                                                  String backupRootFolderId) {
        double backupSize = 0.0;

        if (task.isTaskCancelled()) {
            return new CreateBackupResult();
        }

        task.publishTaskProgress(new BackupTaskProgress(CreateBackupTask.SAVING_NOTES_IMAGES_STAGE));

        AppNotesStorage notesStorage = AppStorages.get().notesStorage();

        NotesList notesList = notesStorage.getNotesList(context);
        List<Note> notes = notesList.notesList();

        String imagesFolderId = BackupDriveServiceHelper.createFolder(
                driveService,
                BackupDriveService.IMAGES_FOLDER_NAME,
                backupRootFolderId
        );

        int totalImagesCount = 0;
        for (int i = 0; i < notes.size(); ++i) {
            Note note = notes.get(i);
            if (!note.deleted()) {
                totalImagesCount = totalImagesCount + note.images().size();
            }
        }

        int imagesCounter = 0;
        for (int i = 0; i < notes.size(); ++i) {
            Note note = notes.get(i);
            if (!note.deleted()) {
                List<String> imagesIds = note.images();
                String noteId = null;
                if (imagesIds.size() > 0) {
                    noteId = String.valueOf(note.id());
                }

                for (int j = 0; j < imagesIds.size(); ++j) {
                    if (task.isTaskCancelled()) {
                        return new CreateBackupResult();
                    }

                    Log.d("tag", "ImagesTransformer->toGoogleDriveBackup()->SAVING_IMAGE: " + String.valueOf(++imagesCounter));

                    task.publishTaskProgress(new BackupTaskProgress(CreateBackupTask.SAVING_NOTES_IMAGES_STAGE, imagesCounter, totalImagesCount));

                    String imageId = imagesIds.get(j);

                    String imageData = notesStorage.getNoteImage(context, noteId, imageId);
                    backupSize = backupSize + imageData.getBytes().length;

                    File file = null;
                    try {
                        File fileMetadata = new File();
                        fileMetadata.setName(generateImageName(noteId, imageId));
                        fileMetadata.setParents(Collections.singletonList(imagesFolderId));
                        fileMetadata.setMimeType("text/xml");

                        byte[] dataBytes = imageData.getBytes(StandardCharsets.UTF_8);

                        file = driveService.files().create(fileMetadata, new ByteArrayContent("", dataBytes))
                                .setFields("id")
                                .execute();
                    } catch (IOException e) {
                        Log.d("tag", "ImagesTransformer->toGoogleDriveBackup()->ERROR: " + e.toString());
                        return new CreateBackupResult();
                    }
                }
            }
        }

        CreateBackupResult result = new CreateBackupResult();
        result.setBackupSizeInBytes(backupSize);
        result.setSuccessful(true);

        return result;
    }

    @SuppressWarnings("rawtypes")
    public RestoreFromBackupResult fromGoogleDriveBackup(Task task,
                                                         Context context,
                                                         Drive driveService,
                                                         String backupFolderId) {
        Log.d("tag", "BACKUP_FOLDER_ID: " + backupFolderId);

        RestoreFromBackupResult result = new RestoreFromBackupResult();
        if (task.isTaskCancelled()) {
            return result;
        }

        task.publishTaskProgress(new BackupTaskProgress(RestoreFromBackupTask.RESTORING_NOTES_IMAGES_STAGE));

        FileList files = null;
        try {
            files = driveService.files().list()
                    .setSpaces("appDataFolder")
                    .setFields("nextPageToken, files(id, name)")
                    .setQ("mimeType='application/vnd.google-apps.folder' and '" + backupFolderId + "' in parents")
                    .setPageSize(1000)
                    .execute();
        } catch (IOException e) {
            Log.d("tag", "ImagesTransformer->fromGoogleDriveBackup()->IOEXCEPTION: " + e.getMessage());
            return result;
        }

        if (files == null) {
            Log.d("tag", "ImagesTransformer->fromGoogleDriveBackup(): FILES_IS_NULL");
            return result;
        }

        if (task.isTaskCancelled()) {
            return result;
        }

        Log.d("tag", "ImagesTransformer->fromGoogleDriveBackup()->FILES_SIZE: " + files.getFiles().size());

        String imagesBackupFolderId = null;
        List<File> backupFoldersList = files.getFiles();
        for (int i = 0; i < backupFoldersList.size(); ++i) {
            if (backupFoldersList.get(i).getName().equalsIgnoreCase(BackupDriveService.IMAGES_FOLDER_NAME)) {
                imagesBackupFolderId = backupFoldersList.get(i).getId();
                break;
            }
        }

        if (imagesBackupFolderId == null) {
            Log.d("tag", "ImagesTransformer->fromGoogleDriveBackup(): BAD_NOT_IMAGES_BACKUP_FOLDER_ID");

            AppNotesStorage notesStorage = AppStorages.get().notesStorage();
            notesStorage.removeAllImages(context);

            result.setSuccessful(true);

            return result;
        }

        Log.d("tag", "IMAGES_BACKUP_FOLDER_ID: " + imagesBackupFolderId);

        AppNotesStorage notesStorage = AppStorages.get().notesStorage();
        notesStorage.removeAllImages(context);

        List<BackupImageInfo> backupImagesInfo = getBackupImagesInfo(imagesBackupFolderId, driveService);

        int imagesCount = 0;
        for (int i = 0; i < backupImagesInfo.size(); ++i) {
            if (task.isTaskCancelled()) {
                return result;
            }

            task.publishTaskProgress(
                    new BackupTaskProgress(RestoreFromBackupTask.RESTORING_NOTES_IMAGES_STAGE, ++imagesCount, backupImagesInfo.size())
            );

            BackupImageInfo imageInfo = backupImagesInfo.get(i);

            restoreImageFromBackup(
                    context,
                    imageInfo.imageDriveId(),
                    imageInfo.noteId(),
                    imageInfo.imageId(),
                    driveService
            );
        }

        result.setRestoredImagesInfo(backupImagesInfo);
        result.setSuccessful(true);

        return result;
    }

    private boolean restoreImageFromBackup(Context context,
                                           String imageDriveId,
                                           String appNoteId,
                                           String appImageId,
                                           Drive driveService) {
        Log.d("tag", "ImagesTransformer->restoreImageFromBackup(): " + imageDriveId + " - " + appNoteId + " - " + appImageId);

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        try {
            driveService.files().get(imageDriveId).executeMediaAndDownloadTo(outputStream);
        } catch (IOException e) {
            Log.d("tag", "ImagesTransformer->restoreImageFromBackup()->IOEXCEPTION: " + e.getMessage());
            return false;
        }

        try {
            String stringifiedImageData = outputStream.toString(StandardCharsets.UTF_8.name());

            AppNotesStorage notesStorage = AppStorages.get().notesStorage();
            notesStorage.updateNoteImage(context, appNoteId, appImageId, stringifiedImageData);
        } catch (UnsupportedEncodingException e) {
            Log.d("tag", "ImagesTransformer->restoreImageFromBackup()->IOEXCEPTION: " + e.getMessage());
            return false;
        }

        return true;
    }

    private List<BackupImageInfo> getBackupImagesInfo(String folderId, Drive driveService) {
        List<BackupImageInfo> imagesInfoList = new ArrayList<>();

        FileList files = null;
        try {
            files = driveService.files().list()
                    .setSpaces("appDataFolder")
                    .setFields("nextPageToken, files(id, name)")
                    .setQ("mimeType='text/xml' and '" + folderId + "' in parents")
                    .setPageSize(1000)
                    .execute();
        } catch (IOException e) {
            Log.d("tag", "ImagesTransformer->getBackupImagesInfo()->IOEXCEPTION: " + e.getMessage());
            return imagesInfoList;
        }

        if (files == null) {
            Log.d("tag", "ImagesTransformer->getBackupImagesInfo(): FILES_IS_NULL");
            return imagesInfoList;
        }

        List<File> imagesFolderFiles = files.getFiles();
        for (int i = 0; i < imagesFolderFiles.size(); ++i) {
            String imageDriveId = imagesFolderFiles.get(i).getId();
            String imageName = imagesFolderFiles.get(i).getName();
            String noteId = getNoteIdFromImageName(imageName);
            String imageId = getImageIdFromImageName(imageName);

            imagesInfoList.add(new BackupImageInfo(noteId, imageId, imageDriveId));
        }

        return imagesInfoList;
    }

    private String generateImageName(String noteId, String imageId) {
        return noteId + IMAGE_NAME_DELIMITER + imageId;
    }

    private String getNoteIdFromImageName(String imageName) {
        String[] imageInfo = imageName.split(IMAGE_NAME_DELIMITER);
        if (imageInfo.length < 1) {
            return "";
        }

        return imageInfo[0];
    }

    private String getImageIdFromImageName(String imageName) {
        String[] imageInfo = imageName.split(IMAGE_NAME_DELIMITER);
        if (imageInfo.length < 2) {
            return "";
        }

        return imageInfo[1];
    }
}


//package com.post.notes.modules.backup.backup_drive_service.data_transformers.images;
//
//
//import android.content.Context;
//import android.util.Log;
//
//import com.google.api.client.http.ByteArrayContent;
//import com.google.api.services.drive.Drive;
//import com.google.api.services.drive.model.File;
//import com.post.notes.common.app_storages.AppStorages;
//import com.post.notes.common.app_storages.notes_storage.AppNotesStorage;
//import com.post.notes.common.data.hybrid_objects.note.Note;
//import com.post.notes.common.data.hybrid_objects.notes_list.NotesList;
//import com.post.notes.common.task.Task;
//import com.post.notes.modules.backup.backup_drive_service.BackupDriveService;
//import com.post.notes.modules.backup.backup_drive_service.data.data_transformer.BackupDataTransformer;
//import com.post.notes.modules.backup.backup_drive_service.data.data_transformer.BackupTransformerResult;
//import com.post.notes.modules.backup.backup_drive_service.data.task_progress.BackupTaskProgress;
//import com.post.notes.modules.backup.backup_drive_service.helpers.BackupDriveServiceHelper;
//import com.post.notes.modules.backup.backup_drive_service.tasks.create_backup.CreateBackupTask;
//
//import java.io.IOException;
//import java.nio.charset.StandardCharsets;
//import java.util.Collections;
//import java.util.List;
//
//public class ImagesTransformer implements BackupDataTransformer {
//    public ImagesTransformer() {
//
//    }
//
//    @SuppressWarnings("rawtypes")
//    public BackupTransformerResult toGoogleDriveBackup(Task task,
//                                                       Context context,
//                                                       Drive driveService,
//                                                       String backupRootFolderId) {
//        double backupSize = 0.0;
//
//        if (task.isTaskCancelled()) {
//            return new BackupTransformerResult();
//        }
//
//        task.publishTaskProgress(new BackupTaskProgress(CreateBackupTask.SAVING_NOTES_IMAGES_STAGE));
//
//        AppNotesStorage notesStorage = AppStorages.get().notesStorage();
//
//        NotesList notesList = notesStorage.getNotesList(context);
//        List<Note> notes = notesList.notesList();
//
//        String imagesFolderId = BackupDriveServiceHelper.createFolder(
//                driveService,
//                BackupDriveService.IMAGES_FOLDER_NAME,
//                backupRootFolderId
//        );
//
//        int totalImagesCount = 0;
//        for (int i = 0; i < notes.size(); ++i) {
//            Note note = notes.get(i);
//            if (!note.deleted()) {
//                totalImagesCount = totalImagesCount + note.images().size();
//            }
//        }
//
//        int imagesCounter = 0;
//        for (int i = 0; i < notes.size(); ++i) {
//            Note note = notes.get(i);
//            if (!note.deleted()) {
//                List<String> imagesIds = note.images();
//                String noteId = null;
//                if (imagesIds.size() > 0) {
//                    noteId = String.valueOf(note.id());
//                }
//
//                for (int j = 0; j < imagesIds.size(); ++j) {
//                    if (task.isTaskCancelled()) {
//                        return new BackupTransformerResult();
//                    }
//
//                    Log.d("tag", "ImagesTransformer->toGoogleDriveBackup()->SAVING_IMAGE: " + String.valueOf(++imagesCounter));
//
//                    task.publishTaskProgress(new BackupTaskProgress(CreateBackupTask.SAVING_NOTES_IMAGES_STAGE, imagesCounter, totalImagesCount));
//
//                    String imageId = imagesIds.get(j);
//
//                    String imageData = notesStorage.getNoteImage(context, noteId, imageId);
//                    backupSize = backupSize + imageData.getBytes().length;
//
//                    File file = null;
//                    try {
//                        File fileMetadata = new File();
//                        fileMetadata.setName(String.valueOf(i));
//                        fileMetadata.setParents(Collections.singletonList(imagesFolderId));
//                        fileMetadata.setMimeType("text/xml");
//
//                        byte[] dataBytes = imageData.getBytes(StandardCharsets.UTF_8);
//
//                        file = driveService.files().create(fileMetadata, new ByteArrayContent("", dataBytes))
//                                .setFields("id")
//                                .execute();
//                    } catch (IOException e) {
//                        Log.d("tag", "ImagesTransformer->toGoogleDriveBackup()->ERROR: " + e.toString());
//                        return new BackupTransformerResult();
//                    }
//                }
//            }
//        }
//
//        BackupTransformerResult result = new BackupTransformerResult();
//        result.setBackupSizeInBytes(backupSize);
//        result.setSuccessful(true);
//
//        return result;
//    }
//
//    public void fromGoogleDriveBackup() {
//
//    }
//}
