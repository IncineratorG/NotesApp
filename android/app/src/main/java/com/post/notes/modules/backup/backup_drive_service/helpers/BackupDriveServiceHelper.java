package com.post.notes.modules.backup.backup_drive_service.helpers;


import android.util.Log;

import com.google.api.services.drive.Drive;
import com.google.api.services.drive.model.File;
import com.google.api.services.drive.model.FileList;
import com.post.notes.modules.backup.backup_drive_service.BackupDriveService;

import java.io.IOException;
import java.util.Collections;

public class BackupDriveServiceHelper {
    public static String getRootFolderId(Drive driveService) {
        String rootFolderName = BackupDriveService.DRIVE_ROOT_FOLDER_NAME;
        String rootFolderId = null;

        if (driveService == null) {
            Log.d("tag", "BackupDriveServiceHelper->getRootFolderId()->BAD_DRIVE_SERVICE");
            return null;
        }

        try {
            FileList files = driveService.files().list()
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
            Log.d("tag", "BackupDriveServiceHelper->getRootFolderId()->IOEXCEPTION");
            return null;
        }

        return rootFolderId;
    }

    public static String createFolder(Drive driveService, String folderName, String rootFolderId) {
        if (folderName == null) {
            Log.d("tag", "BackupDriveServiceHelper->createFolder()->BAD_FOLDER_NAME");
            return null;
        }

        String folderId = null;

        if (driveService == null) {
            Log.d("tag", "BackupDriveServiceHelper->createFolder()->BAD_DRIVE_SERVICE");
            return null;
        }

        try {
            File fileMetadata = new File();
            fileMetadata.setName(folderName);
            if (rootFolderId == null) {
                fileMetadata.setParents(Collections.singletonList("appDataFolder"));
            } else {
                fileMetadata.setParents(Collections.singletonList(rootFolderId));
            }
            fileMetadata.setMimeType("application/vnd.google-apps.folder");

            File file = driveService.files().create(fileMetadata)
                    .setFields("id")
                    .execute();

            folderId = file.getId();
        } catch (IOException e) {
            Log.d("tag", e.toString());
        }

        return folderId;
    }

    public static void removeFolder(Drive driveService, String folderId) {
        try {
            driveService.files().delete(folderId).execute();
        } catch (IOException e) {
            Log.d("tag", "BackupDriveServiceHelper->removeFolder()->IOEXCEPTION: " + e.getMessage());
        }
    }
}
