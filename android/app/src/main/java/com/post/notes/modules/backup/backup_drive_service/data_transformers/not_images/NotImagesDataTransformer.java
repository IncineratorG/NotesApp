package com.post.notes.modules.backup.backup_drive_service.data_transformers.not_images;


import android.content.Context;
import android.util.Log;
import android.util.Xml;

import com.google.api.client.http.ByteArrayContent;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.model.File;
import com.google.api.services.drive.model.FileList;
import com.post.notes.common.app_storages.AppStorages;
import com.post.notes.common.app_storages.notes_storage.AppNotesStorage;
import com.post.notes.common.data.hybrid_objects.note.Note;
import com.post.notes.common.data.hybrid_objects.notes_list.NotesList;
import com.post.notes.common.data.hybrid_objects.notes_list_settings.NotesListSettings;
import com.post.notes.common.task.Task;
import com.post.notes.modules.backup.backup_drive_service.BackupDriveService;
import com.post.notes.modules.backup.backup_drive_service.data.data_transformer.BackupDataTransformer;
import com.post.notes.modules.backup.backup_drive_service.data.data_transformer.CreateBackupResult;
import com.post.notes.modules.backup.backup_drive_service.data.data_transformer.RestoreFromBackupResult;
import com.post.notes.modules.backup.backup_drive_service.data.task_progress.BackupTaskProgress;
import com.post.notes.modules.backup.backup_drive_service.helpers.BackupDriveServiceHelper;
import com.post.notes.modules.backup.backup_drive_service.tasks.create_backup.CreateBackupTask;
import com.post.notes.modules.backup.backup_drive_service.tasks.restore_from_backup.RestoreFromBackupTask;

import org.xmlpull.v1.XmlPullParser;
import org.xmlpull.v1.XmlPullParserException;
import org.xmlpull.v1.XmlSerializer;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class NotImagesDataTransformer implements BackupDataTransformer {
    private static final String SERIALIZER_NAMESPACE = null;
    private static final String TAG_BACKUP = "backup";
    private static final String TAG_APP_SETTINGS = "appsettings";
    private static final String TAG_NOTES_LIST_SETTINGS = "noteslistsettings";
    private static final String TAG_CATEGORIES_LIST = "categorieslist";
    private static final String TAG_NOTES_LIST = "noteslist";
    private static final String TAG_NOTE = "note";
    private static final String TAG_VAULT_PASSWORD = "vaultPassword";

    private static final String KEY_APP_SETTINGS = "appSettings";
    private static final String KEY_NOTES_LIST_SETTINGS = "notesListSettings";
    private static final String KEY_CATEGORIES_LIST = "categoriesList";
    private static final String KEY_NOTES_LIST = "notesList";
    private static final String KEY_VAULT_PASSWORD = "vaultPassword";

    public NotImagesDataTransformer() {

    }

    @SuppressWarnings("rawtypes")
    public CreateBackupResult toGoogleDriveBackup(Task task,
                                                  Context context,
                                                  Drive driveService,
                                                  String backupRootFolderId) {
        if (task.isTaskCancelled()) {
            return new CreateBackupResult();
        }

        task.publishTaskProgress(new BackupTaskProgress(CreateBackupTask.SAVING_APP_SETTINGS_STAGE));

        AppNotesStorage notesStorage = AppStorages.get().notesStorage();

        String appSettings = notesStorage.getStringifiedAppSettings(context);
        if (appSettings == null) {
            Log.d("tag", "NotImagesDataTransformer->toGoogleDriveBackup(): appSettings_IS_NULL");
            appSettings = "";
        }

        NotesListSettings notesListSettings = notesStorage.getNotesListSettings(context);
        String stringifiedNotesListSettings = notesListSettings.stringify();
        if (stringifiedNotesListSettings == null) {
            Log.d("tag", "NotImagesDataTransformer->toGoogleDriveBackup(): stringifiedNotesListSettings_IS_NULL");
            stringifiedNotesListSettings = "";
        }

        String categoriesList = notesStorage.getStringifiedCategoriesList(context);
        if (categoriesList == null) {
            Log.d("tag", "NotImagesDataTransformer->toGoogleDriveBackup(): categoriesList_IS_NULL");
            categoriesList = "";
        }

        NotesList notesList = notesStorage.getNotesList(context);
        List<Note> notes = notesList.notesList();

        List<String> stringifiedNotes = new ArrayList<>();
        for (int i = 0; i < notes.size(); ++i) {
            Note note = notes.get(i);
            if (!note.deleted()) {
                stringifiedNotes.add(note.stringify());
            }
        }

        String vaultPassword = notesStorage.getVaultPassword(context);

        ByteArrayOutputStream xmlStream = toXmlStream(
                appSettings,
                stringifiedNotesListSettings,
                categoriesList,
                stringifiedNotes,
                vaultPassword
        );
        if (xmlStream == null) {
            Log.d("tag", "NotImagesDataTransformer->toGoogleDriveBackup()->ERROR: XML_STREAM_IS_NULL");
            return new CreateBackupResult();
        }

        String notImagesDataFolderId = BackupDriveServiceHelper.createFolder(
                driveService,
                BackupDriveService.NOT_IMAGES_DATA_FOLDER_NAME,
                backupRootFolderId
        );

        task.publishTaskProgress(new BackupTaskProgress(CreateBackupTask.SAVING_NOTES_TEXT_STAGE));

        if (task.isTaskCancelled()) {
            return new CreateBackupResult();
        }

        File file = null;
        try {
            File fileMetadata = new File();
            fileMetadata.setName(BackupDriveService.NOT_IMAGES_DATA_FILE_NAME);
            fileMetadata.setParents(Collections.singletonList(notImagesDataFolderId));
            fileMetadata.setMimeType("text/xml");

            byte[] dataBytes = xmlStream.toByteArray();

            file = driveService.files().create(fileMetadata, new ByteArrayContent("", dataBytes))
                    .setFields("id")
                    .execute();
        } catch (IOException e) {
            Log.d("tag", "NotImagesDataTransformer->toGoogleDriveBackup()->ERROR: " + e.toString());
            return new CreateBackupResult();
        }

        CreateBackupResult result = new CreateBackupResult();
        result.setBackupSizeInBytes(xmlStream.size());
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

        task.publishTaskProgress(new BackupTaskProgress(RestoreFromBackupTask.RESTORING_APP_SETTINGS_STAGE));

        FileList files = null;
        try {
            files = driveService.files().list()
                    .setSpaces("appDataFolder")
                    .setFields("nextPageToken, files(id, name)")
                    .setQ("mimeType='application/vnd.google-apps.folder' and '" + backupFolderId + "' in parents")
                    .setPageSize(1000)
                    .execute();
        } catch (IOException e) {
            Log.d("tag", "NotImagesDataTransformer->fromGoogleDriveBackup()->IOEXCEPTION: " + e.getMessage());
            return result;
        }

        if (files == null) {
            Log.d("tag", "NotImagesDataTransformer->fromGoogleDriveBackup(): FILES_IS_NULL");
            return result;
        }

        if (task.isTaskCancelled()) {
            return result;
        }

        Log.d("tag", "NotImagesDataTransformer->fromGoogleDriveBackup()->FILES_SIZE: " + files.getFiles().size());

        String notImagesBackupFolderId = null;
        List<File> backupFoldersList = files.getFiles();
        for (int i = 0; i < backupFoldersList.size(); ++i) {
            if (backupFoldersList.get(i).getName().equalsIgnoreCase(BackupDriveService.NOT_IMAGES_DATA_FOLDER_NAME)) {
                notImagesBackupFolderId = backupFoldersList.get(i).getId();
                break;
            }
        }

        if (notImagesBackupFolderId == null) {
            Log.d("tag", "NotImagesDataTransformer->fromGoogleDriveBackup(): BAD_NOT_IMAGES_BACKUP_FOLDER_ID");
            return result;
        }

        task.publishTaskProgress(new BackupTaskProgress(RestoreFromBackupTask.RESTORING_NOTES_TEXT_STAGE));

        Map<String, Object> serializedBackupDataMap = getSerializedDataFromDrive(notImagesBackupFolderId, driveService);
        if (serializedBackupDataMap.size() == 0) {
            Log.d("tag", "NotImagesDataTransformer->fromGoogleDriveBackup(): NO_BACKUP_OBJECTS_RETRIEVED");
            return result;
        }

        if (task.isTaskCancelled()) {
            return result;
        }

        String appSettings = (String) serializedBackupDataMap.get(KEY_APP_SETTINGS);
        String notesListSettings = (String) serializedBackupDataMap.get(KEY_NOTES_LIST_SETTINGS);
        String categoriesList = (String) serializedBackupDataMap.get(KEY_CATEGORIES_LIST);
        @SuppressWarnings("unchecked")
        List<String> stringifiedNotesList = (List<String>) serializedBackupDataMap.get(KEY_NOTES_LIST);
        String vaultPassword = (String) serializedBackupDataMap.get(KEY_VAULT_PASSWORD);

        if (appSettings == null || notesListSettings == null || categoriesList == null || stringifiedNotesList == null) {
            Log.d("tag", "NotImagesDataTransformer->fromGoogleDriveBackup(): BAD_BACKUP_OBJECTS_RETRIEVED");
            return result;
        }

        Log.d("tag", "NotImagesDataTransformer->fromGoogleDriveBackup(): RETRIEVED_BACKUP_IS_OK");

        List<Note> notesList = new ArrayList<>(stringifiedNotesList.size());
        for (int i = 0; i < stringifiedNotesList.size(); ++i) {
            notesList.add(new Note(stringifiedNotesList.get(i)));
        }

        if (task.isTaskCancelled()) {
            return result;
        }

        AppNotesStorage notesStorage = AppStorages.get().notesStorage();

        notesStorage.saveAppSettings(context, appSettings);
        notesStorage.saveNotesListSettings(context, new NotesListSettings(notesListSettings));
        notesStorage.saveCategoriesList(context, categoriesList);
        notesStorage.setVaultPassword(context, vaultPassword);

        notesStorage.removeAllNotes(context);
        notesStorage.updateMultipleNotes(context, notesList);

        result.setSuccessful(true);

        return result;
    }

    private Map<String, Object> getSerializedDataFromDrive(String folderId, Drive driveService) {
        Map<String, Object> serializedDataMap = new HashMap<>();

        FileList files = null;
        try {
            files = driveService.files().list()
                    .setSpaces("appDataFolder")
                    .setFields("nextPageToken, files(id, name, size)")
                    .setQ("mimeType='text/xml' and '" + folderId + "' in parents")
                    .setPageSize(1000)
                    .execute();
        } catch (IOException e) {
            Log.d("tag", "NotImagesDataTransformer->getSerializedDataFromDrive()->IOEXCEPTION: " + e.getMessage());
            return serializedDataMap;
        }

        if (files == null) {
            Log.d("tag", "NotImagesDataTransformer->getSerializedDataFromDrive(): FILES_IS_NULL");
            return serializedDataMap;
        }

        String textDataBackupDriveId = null;

        List<File> notImagesFolderFiles = files.getFiles();
        for (int i = 0; i < notImagesFolderFiles.size(); ++i) {
            if (notImagesFolderFiles.get(i).getName().equalsIgnoreCase(BackupDriveService.NOT_IMAGES_DATA_FILE_NAME)) {
                textDataBackupDriveId = notImagesFolderFiles.get(i).getId();
                break;
            }
        }

        if (textDataBackupDriveId == null) {
            Log.d("tag", "NotImagesDataTransformer->getSerializedDataFromDrive(): BAD_TEXT_DATA_BACKUP_DRIVE_ID");
            return serializedDataMap;
        }

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        ByteArrayInputStream inputStream = null;
        try {
            driveService.files().get(textDataBackupDriveId).executeMediaAndDownloadTo(outputStream);
            inputStream = new ByteArrayInputStream(outputStream.toByteArray());
//            driveService.files().export(notImagesFolderDriveId, "text/xml").executeMediaAndDownloadTo(outputStream);
//            driveService.files().export(notImagesFolderDriveId, "text/plain").executeMediaAndDownloadTo(outputStream);
//            driveService.about().get().
        } catch (IOException e) {
            Log.d("tag", "NotImagesDataTransformer->getSerializedDataFromDrive()->IOEXCEPTION: " + e.getMessage());
            return serializedDataMap;
        }

        XmlPullParser parser = Xml.newPullParser();

        String appSettings = null;
        String notesListSettings = null;
        String categoriesList = null;
        List<String> notesList = new ArrayList<>();
        String vaultPassword = null;

        try {
            parser.setFeature(XmlPullParser.FEATURE_PROCESS_NAMESPACES, false);
            parser.setInput(inputStream, null);

            String dataString = null;

            int eventType = parser.getEventType();
            while (eventType != XmlPullParser.END_DOCUMENT) {
                String tagName = parser.getName();

                switch (eventType) {
                    case XmlPullParser.START_TAG: {
                        break;
                    }

                    case XmlPullParser.TEXT: {
                        if (parser.isWhitespace()) {
                            break;
                        }

                        dataString = parser.getText();
                        break;
                    }

                    case XmlPullParser.END_TAG: {
                        switch (tagName) {
                            case TAG_APP_SETTINGS: {
                                appSettings = dataString;
                                break;
                            }

                            case TAG_NOTES_LIST_SETTINGS: {
                                notesListSettings = dataString;
                                break;
                            }

                            case TAG_CATEGORIES_LIST: {
                                categoriesList = dataString;
                                break;
                            }

                            case TAG_NOTE: {
                                notesList.add(dataString);
                                break;
                            }

                            case TAG_VAULT_PASSWORD: {
                                vaultPassword = dataString;
                                break;
                            }
                        }
                        break;
                    }
                }

                eventType = parser.next();
            }
        } catch (XmlPullParserException | IOException e) {
            Log.d("tag", "NotImagesDataTransformer->getSerializedDataFromDrive()->IOEXCEPTION: " + e.getMessage());
            return serializedDataMap;
        }

        serializedDataMap.put(KEY_APP_SETTINGS, appSettings);
        serializedDataMap.put(KEY_NOTES_LIST_SETTINGS, notesListSettings);
        serializedDataMap.put(KEY_CATEGORIES_LIST, categoriesList);
        serializedDataMap.put(KEY_NOTES_LIST, notesList);
        serializedDataMap.put(KEY_VAULT_PASSWORD, vaultPassword);

        return serializedDataMap;
    }

    private ByteArrayOutputStream toXmlStream(String appSettings,
                                              String notesListSettings,
                                              String categoriesList,
                                              List<String> notes,
                                              String vaultPassword) {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        XmlSerializer serializer = Xml.newSerializer();
        try {
            serializer.setOutput(outputStream, StandardCharsets.UTF_8.name());
            serializer.startDocument(null, true);
            serializer.setFeature("http://xmlpull.org/v1/doc/features.html#indent-output", true);

            serializer.startTag(SERIALIZER_NAMESPACE, TAG_BACKUP);

            serializer.startTag(SERIALIZER_NAMESPACE, TAG_APP_SETTINGS);
            serializer.text(appSettings);
            serializer.endTag(SERIALIZER_NAMESPACE, TAG_APP_SETTINGS);

            serializer.startTag(SERIALIZER_NAMESPACE, TAG_NOTES_LIST_SETTINGS);
            serializer.text(notesListSettings);
            serializer.endTag(SERIALIZER_NAMESPACE, TAG_NOTES_LIST_SETTINGS);

            serializer.startTag(SERIALIZER_NAMESPACE, TAG_CATEGORIES_LIST);
            serializer.text(categoriesList);
            serializer.endTag(SERIALIZER_NAMESPACE, TAG_CATEGORIES_LIST);

            serializer.startTag(SERIALIZER_NAMESPACE, TAG_NOTES_LIST);
            for (int i = 0; i < notes.size(); ++i) {
                serializer.startTag(SERIALIZER_NAMESPACE, TAG_NOTE);
                serializer.text(notes.get(i));
                serializer.endTag(SERIALIZER_NAMESPACE, TAG_NOTE);
            }
            serializer.endTag(SERIALIZER_NAMESPACE, TAG_NOTES_LIST);

            if (vaultPassword != null) {
                serializer.startTag(SERIALIZER_NAMESPACE, TAG_VAULT_PASSWORD);
                serializer.text(vaultPassword);
                serializer.endTag(SERIALIZER_NAMESPACE, TAG_VAULT_PASSWORD);
            }

            serializer.endTag(SERIALIZER_NAMESPACE, TAG_BACKUP);

            serializer.endDocument();
            serializer.flush();
        } catch (IOException e) {
            Log.i("tag", "NotImagesTransformer->toXmlStream(): " + e.toString());
            return null;
        }

        return outputStream;
    }
}


//package com.post.notes.modules.backup.backup_drive_service.data_transformers.not_images;
//
//
//import android.content.Context;
//import android.util.Log;
//import android.util.Xml;
//
//import com.google.api.client.http.ByteArrayContent;
//import com.google.api.services.drive.Drive;
//import com.google.api.services.drive.model.File;
//import com.google.api.services.drive.model.FileList;
//import com.post.notes.common.app_storages.AppStorages;
//import com.post.notes.common.app_storages.notes_storage.AppNotesStorage;
//import com.post.notes.common.data.hybrid_objects.note.Note;
//import com.post.notes.common.data.hybrid_objects.notes_list.NotesList;
//import com.post.notes.common.data.hybrid_objects.notes_list_settings.NotesListSettings;
//import com.post.notes.common.task.Task;
//import com.post.notes.modules.backup.backup_drive_service.BackupDriveService;
//import com.post.notes.modules.backup.backup_drive_service.data.data_transformer.BackupDataTransformer;
//import com.post.notes.modules.backup.backup_drive_service.data.data_transformer.CreateBackupResult;
//import com.post.notes.modules.backup.backup_drive_service.data.data_transformer.RestoreFromBackupResult;
//import com.post.notes.modules.backup.backup_drive_service.data.task_progress.BackupTaskProgress;
//import com.post.notes.modules.backup.backup_drive_service.helpers.BackupDriveServiceHelper;
//import com.post.notes.modules.backup.backup_drive_service.tasks.create_backup.CreateBackupTask;
//import com.post.notes.modules.backup.backup_drive_service.tasks.restore_from_backup.RestoreFromBackupTask;
//
//import org.xmlpull.v1.XmlPullParser;
//import org.xmlpull.v1.XmlPullParserException;
//import org.xmlpull.v1.XmlSerializer;
//
//import java.io.ByteArrayInputStream;
//import java.io.ByteArrayOutputStream;
//import java.io.IOException;
//import java.nio.charset.StandardCharsets;
//import java.util.ArrayList;
//import java.util.Collections;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//public class NotImagesDataTransformer implements BackupDataTransformer {
//    private static final String SERIALIZER_NAMESPACE = null;
//    private static final String TAG_BACKUP = "backup";
//    private static final String TAG_APP_SETTINGS = "appsettings";
//    private static final String TAG_NOTES_LIST_SETTINGS = "noteslistsettings";
//    private static final String TAG_CATEGORIES_LIST = "categorieslist";
//    private static final String TAG_NOTES_LIST = "noteslist";
//    private static final String TAG_NOTE = "note";
//
//    private static final String KEY_APP_SETTINGS = "appSettings";
//    private static final String KEY_NOTES_LIST_SETTINGS = "notesListSettings";
//    private static final String KEY_CATEGORIES_LIST = "categoriesList";
//    private static final String KEY_NOTES_LIST = "notesList";
//
//    public NotImagesDataTransformer() {
//
//    }
//
//    @SuppressWarnings("rawtypes")
//    public CreateBackupResult toGoogleDriveBackup(Task task,
//                                                  Context context,
//                                                  Drive driveService,
//                                                  String backupRootFolderId) {
//        if (task.isTaskCancelled()) {
//            return new CreateBackupResult();
//        }
//
//        task.publishTaskProgress(new BackupTaskProgress(CreateBackupTask.SAVING_APP_SETTINGS_STAGE));
//
//        AppNotesStorage notesStorage = AppStorages.get().notesStorage();
//
//        String appSettings = notesStorage.getStringifiedAppSettings(context);
//        if (appSettings == null) {
//            Log.d("tag", "NotImagesDataTransformer->toGoogleDriveBackup(): appSettings_IS_NULL");
//            appSettings = "";
//        }
//
//        NotesListSettings notesListSettings = notesStorage.getNotesListSettings(context);
//        String stringifiedNotesListSettings = notesListSettings.stringify();
//        if (stringifiedNotesListSettings == null) {
//            Log.d("tag", "NotImagesDataTransformer->toGoogleDriveBackup(): stringifiedNotesListSettings_IS_NULL");
//            stringifiedNotesListSettings = "";
//        }
//
//        String categoriesList = notesStorage.getStringifiedCategoriesList(context);
//        if (categoriesList == null) {
//            Log.d("tag", "NotImagesDataTransformer->toGoogleDriveBackup(): categoriesList_IS_NULL");
//            categoriesList = "";
//        }
//
//        NotesList notesList = notesStorage.getNotesList(context);
//        List<Note> notes = notesList.notesList();
//
//        List<String> stringifiedNotes = new ArrayList<>();
//        for (int i = 0; i < notes.size(); ++i) {
//            Note note = notes.get(i);
//            if (!note.deleted()) {
//                stringifiedNotes.add(note.stringify());
//            }
//        }
//
//        ByteArrayOutputStream xmlStream = toXmlStream(
//                appSettings,
//                stringifiedNotesListSettings,
//                categoriesList,
//                stringifiedNotes
//        );
//        if (xmlStream == null) {
//            Log.d("tag", "NotImagesDataTransformer->toGoogleDriveBackup()->ERROR: XML_STREAM_IS_NULL");
//            return new CreateBackupResult();
//        }
//
//        String notImagesDataFolderId = BackupDriveServiceHelper.createFolder(
//                driveService,
//                BackupDriveService.NOT_IMAGES_DATA_FOLDER_NAME,
//                backupRootFolderId
//        );
//
//        task.publishTaskProgress(new BackupTaskProgress(CreateBackupTask.SAVING_NOTES_TEXT_STAGE));
//
//        if (task.isTaskCancelled()) {
//            return new CreateBackupResult();
//        }
//
//        File file = null;
//        try {
//            File fileMetadata = new File();
//            fileMetadata.setName(BackupDriveService.NOT_IMAGES_DATA_FILE_NAME);
//            fileMetadata.setParents(Collections.singletonList(notImagesDataFolderId));
//            fileMetadata.setMimeType("text/xml");
//
//            byte[] dataBytes = xmlStream.toByteArray();
//
//            file = driveService.files().create(fileMetadata, new ByteArrayContent("", dataBytes))
//                    .setFields("id")
//                    .execute();
//        } catch (IOException e) {
//            Log.d("tag", "NotImagesDataTransformer->toGoogleDriveBackup()->ERROR: " + e.toString());
//            return new CreateBackupResult();
//        }
//
//        CreateBackupResult result = new CreateBackupResult();
//        result.setBackupSizeInBytes(xmlStream.size());
//        result.setSuccessful(true);
//
//        return result;
//    }
//
//    @SuppressWarnings("rawtypes")
//    public RestoreFromBackupResult fromGoogleDriveBackup(Task task,
//                                      Context context,
//                                      Drive driveService,
//                                      String backupFolderId) {
//        Log.d("tag", "BACKUP_FOLDER_ID: " + backupFolderId);
//
//        RestoreFromBackupResult result = new RestoreFromBackupResult();
//        if (task.isTaskCancelled()) {
//            return result;
//        }
//
//        task.publishTaskProgress(new BackupTaskProgress(RestoreFromBackupTask.RESTORING_APP_SETTINGS_STAGE));
//
//        FileList files = null;
//        try {
//            files = driveService.files().list()
//                    .setSpaces("appDataFolder")
//                    .setFields("nextPageToken, files(id, name)")
//                    .setQ("mimeType='application/vnd.google-apps.folder' and '" + backupFolderId + "' in parents")
//                    .setPageSize(1000)
//                    .execute();
//        } catch (IOException e) {
//            Log.d("tag", "NotImagesDataTransformer->fromGoogleDriveBackup()->IOEXCEPTION: " + e.getMessage());
//            return result;
//        }
//
//        if (files == null) {
//            Log.d("tag", "NotImagesDataTransformer->fromGoogleDriveBackup(): FILES_IS_NULL");
//            return result;
//        }
//
//        if (task.isTaskCancelled()) {
//            return result;
//        }
//
//        Log.d("tag", "NotImagesDataTransformer->fromGoogleDriveBackup()->FILES_SIZE: " + files.getFiles().size());
//
//        String notImagesBackupFolderId = null;
//        List<File> backupFoldersList = files.getFiles();
//        for (int i = 0; i < backupFoldersList.size(); ++i) {
//            if (backupFoldersList.get(i).getName().equalsIgnoreCase(BackupDriveService.NOT_IMAGES_DATA_FOLDER_NAME)) {
//                notImagesBackupFolderId = backupFoldersList.get(i).getId();
//                break;
//            }
//        }
//
//        if (notImagesBackupFolderId == null) {
//            Log.d("tag", "NotImagesDataTransformer->fromGoogleDriveBackup(): BAD_NOT_IMAGES_BACKUP_FOLDER_ID");
//            return result;
//        }
//
//        task.publishTaskProgress(new BackupTaskProgress(RestoreFromBackupTask.RESTORING_NOTES_TEXT_STAGE));
//
//        Map<String, Object> serializedBackupDataMap = getSerializedDataFromDrive(notImagesBackupFolderId, driveService);
//        if (serializedBackupDataMap.size() == 0) {
//            Log.d("tag", "NotImagesDataTransformer->fromGoogleDriveBackup(): NO_BACKUP_OBJECTS_RETRIEVED");
//            return result;
//        }
//
//        if (task.isTaskCancelled()) {
//            return result;
//        }
//
//        String appSettings = (String) serializedBackupDataMap.get(KEY_APP_SETTINGS);
//        String notesListSettings = (String) serializedBackupDataMap.get(KEY_NOTES_LIST_SETTINGS);
//        String categoriesList = (String) serializedBackupDataMap.get(KEY_CATEGORIES_LIST);
//        @SuppressWarnings("unchecked")
//        List<String> stringifiedNotesList = (List<String>) serializedBackupDataMap.get(KEY_NOTES_LIST);
//
//        if (appSettings == null || notesListSettings == null || categoriesList == null || stringifiedNotesList == null) {
//            Log.d("tag", "NotImagesDataTransformer->fromGoogleDriveBackup(): BAD_BACKUP_OBJECTS_RETRIEVED");
//            return result;
//        }
//
//        Log.d("tag", "NotImagesDataTransformer->fromGoogleDriveBackup(): RETRIEVED_BACKUP_IS_OK");
//
//        List<Note> notesList = new ArrayList<>(stringifiedNotesList.size());
//        for (int i = 0; i < stringifiedNotesList.size(); ++i) {
//            notesList.add(new Note(stringifiedNotesList.get(i)));
//        }
//
//        if (task.isTaskCancelled()) {
//            return result;
//        }
//
//        AppNotesStorage notesStorage = AppStorages.get().notesStorage();
//
//        notesStorage.saveAppSettings(context, appSettings);
//        notesStorage.saveNotesListSettings(context, new NotesListSettings(notesListSettings));
//        notesStorage.saveCategoriesList(context, categoriesList);
//
//        notesStorage.removeAllNotes(context);
//        notesStorage.updateMultipleNotes(context, notesList);
//
//        result.setSuccessful(true);
//
//        return result;
//    }
//
//    private Map<String, Object> getSerializedDataFromDrive(String folderId, Drive driveService) {
//        Map<String, Object> serializedDataMap = new HashMap<>();
//
//        FileList files = null;
//        try {
//            files = driveService.files().list()
//                    .setSpaces("appDataFolder")
//                    .setFields("nextPageToken, files(id, name, size)")
//                    .setQ("mimeType='text/xml' and '" + folderId + "' in parents")
//                    .setPageSize(1000)
//                    .execute();
//        } catch (IOException e) {
//            Log.d("tag", "NotImagesDataTransformer->getSerializedDataFromDrive()->IOEXCEPTION: " + e.getMessage());
//            return serializedDataMap;
//        }
//
//        if (files == null) {
//            Log.d("tag", "NotImagesDataTransformer->getSerializedDataFromDrive(): FILES_IS_NULL");
//            return serializedDataMap;
//        }
//
//        String textDataBackupDriveId = null;
//
//        List<File> notImagesFolderFiles = files.getFiles();
//        for (int i = 0; i < notImagesFolderFiles.size(); ++i) {
//            if (notImagesFolderFiles.get(i).getName().equalsIgnoreCase(BackupDriveService.NOT_IMAGES_DATA_FILE_NAME)) {
//                textDataBackupDriveId = notImagesFolderFiles.get(i).getId();
//                break;
//            }
//        }
//
//        if (textDataBackupDriveId == null) {
//            Log.d("tag", "NotImagesDataTransformer->getSerializedDataFromDrive(): BAD_TEXT_DATA_BACKUP_DRIVE_ID");
//            return serializedDataMap;
//        }
//
//        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
//        ByteArrayInputStream inputStream = null;
//        try {
//            driveService.files().get(textDataBackupDriveId).executeMediaAndDownloadTo(outputStream);
//            inputStream = new ByteArrayInputStream(outputStream.toByteArray());
////            driveService.files().export(notImagesFolderDriveId, "text/xml").executeMediaAndDownloadTo(outputStream);
////            driveService.files().export(notImagesFolderDriveId, "text/plain").executeMediaAndDownloadTo(outputStream);
////            driveService.about().get().
//        } catch (IOException e) {
//            Log.d("tag", "NotImagesDataTransformer->getSerializedDataFromDrive()->IOEXCEPTION: " + e.getMessage());
//            return serializedDataMap;
//        }
//
//        XmlPullParser parser = Xml.newPullParser();
//
//        String appSettings = null;
//        String notesListSettings = null;
//        String categoriesList = null;
//        List<String> notesList = new ArrayList<>();
//
//        try {
//            parser.setFeature(XmlPullParser.FEATURE_PROCESS_NAMESPACES, false);
//            parser.setInput(inputStream, null);
//
//            String dataString = null;
//
//            int eventType = parser.getEventType();
//            while (eventType != XmlPullParser.END_DOCUMENT) {
//                String tagName = parser.getName();
//
//                switch (eventType) {
//                    case XmlPullParser.START_TAG: {
//                        break;
//                    }
//
//                    case XmlPullParser.TEXT: {
//                        if (parser.isWhitespace()) {
//                            break;
//                        }
//
//                        dataString = parser.getText();
//                        break;
//                    }
//
//                    case XmlPullParser.END_TAG: {
//                        switch (tagName) {
//                            case TAG_APP_SETTINGS: {
//                                appSettings = dataString;
//                                break;
//                            }
//
//                            case TAG_NOTES_LIST_SETTINGS: {
//                                notesListSettings = dataString;
//                                break;
//                            }
//
//                            case TAG_CATEGORIES_LIST: {
//                                categoriesList = dataString;
//                                break;
//                            }
//
//                            case TAG_NOTE: {
//                                notesList.add(dataString);
//                                break;
//                            }
//                        }
//                        break;
//                    }
//                }
//
//                eventType = parser.next();
//            }
//        } catch (XmlPullParserException | IOException e) {
//            Log.d("tag", "NotImagesDataTransformer->getSerializedDataFromDrive()->IOEXCEPTION: " + e.getMessage());
//            return serializedDataMap;
//        }
//
//        serializedDataMap.put(KEY_APP_SETTINGS, appSettings);
//        serializedDataMap.put(KEY_NOTES_LIST_SETTINGS, notesListSettings);
//        serializedDataMap.put(KEY_CATEGORIES_LIST, categoriesList);
//        serializedDataMap.put(KEY_NOTES_LIST, notesList);
//
//        return serializedDataMap;
//    }
//
//    private ByteArrayOutputStream toXmlStream(String appSettings,
//                                              String notesListSettings,
//                                              String categoriesList,
//                                              List<String> notes) {
//        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
//        XmlSerializer serializer = Xml.newSerializer();
//        try {
//            serializer.setOutput(outputStream, StandardCharsets.UTF_8.name());
//            serializer.startDocument(null, true);
//            serializer.setFeature("http://xmlpull.org/v1/doc/features.html#indent-output", true);
//
//            serializer.startTag(SERIALIZER_NAMESPACE, TAG_BACKUP);
//
//            serializer.startTag(SERIALIZER_NAMESPACE, TAG_APP_SETTINGS);
//            serializer.text(appSettings);
//            serializer.endTag(SERIALIZER_NAMESPACE, TAG_APP_SETTINGS);
//
//            serializer.startTag(SERIALIZER_NAMESPACE, TAG_NOTES_LIST_SETTINGS);
//            serializer.text(notesListSettings);
//            serializer.endTag(SERIALIZER_NAMESPACE, TAG_NOTES_LIST_SETTINGS);
//
//            serializer.startTag(SERIALIZER_NAMESPACE, TAG_CATEGORIES_LIST);
//            serializer.text(categoriesList);
//            serializer.endTag(SERIALIZER_NAMESPACE, TAG_CATEGORIES_LIST);
//
//            serializer.startTag(SERIALIZER_NAMESPACE, TAG_NOTES_LIST);
//            for (int i = 0; i < notes.size(); ++i) {
//                serializer.startTag(SERIALIZER_NAMESPACE, TAG_NOTE);
//                serializer.text(notes.get(i));
//                serializer.endTag(SERIALIZER_NAMESPACE, TAG_NOTE);
//            }
//            serializer.endTag(SERIALIZER_NAMESPACE, TAG_NOTES_LIST);
//
//            serializer.endTag(SERIALIZER_NAMESPACE, TAG_BACKUP);
//
//            serializer.endDocument();
//            serializer.flush();
//        } catch (IOException e) {
//            Log.i("tag", "NotImagesTransformer->toXmlStream(): " + e.toString());
//            return null;
//        }
//
//        return outputStream;
//    }
//}
