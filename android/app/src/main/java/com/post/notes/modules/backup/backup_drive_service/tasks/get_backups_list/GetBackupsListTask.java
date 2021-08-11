package com.post.notes.modules.backup.backup_drive_service.tasks.get_backups_list;


import android.app.backup.BackupHelper;
import android.util.Log;

import com.google.api.services.drive.Drive;
import com.google.api.services.drive.model.File;
import com.google.api.services.drive.model.FileList;
import com.post.notes.common.autonomous_task.AutonomousTask;
import com.post.notes.common.task_runner.TaskRunner;
import com.post.notes.modules.backup.backup_drive_service.BackupDriveService;
import com.post.notes.modules.backup.backup_drive_service.callbacks.get_backups_list.GetBackupsListCancelledCallback;
import com.post.notes.modules.backup.backup_drive_service.callbacks.get_backups_list.GetBackupsListErrorCallback;
import com.post.notes.modules.backup.backup_drive_service.callbacks.get_backups_list.GetBackupsListFinishedCallback;
import com.post.notes.modules.backup.backup_drive_service.data.backup_item.BackupItem;
import com.post.notes.modules.backup.backup_drive_service.data.backup_items_list.BackupItemsList;
import com.post.notes.modules.backup.backup_drive_service.helpers.BackupDriveServiceHelper;

import java.io.IOException;
import java.util.List;

public class GetBackupsListTask extends AutonomousTask<Object, Object, Object> {
    private Drive mDriveService;
    private BackupItemsList mBackupItemsList;
    private GetBackupsListFinishedCallback mFinishedCallback;
    private GetBackupsListCancelledCallback mCancelledCallback;
    private GetBackupsListErrorCallback mErrorCallback;

    public GetBackupsListTask(Drive driveService,
                              GetBackupsListFinishedCallback finishedCallback,
                              GetBackupsListCancelledCallback cancelledCallback,
                              GetBackupsListErrorCallback errorCallback) {
        mDriveService = driveService;
        mBackupItemsList = new BackupItemsList();

        mFinishedCallback = finishedCallback;
        mCancelledCallback = cancelledCallback;
        mErrorCallback = errorCallback;
    }

    @Override
    public void runOnRunner(TaskRunner runner, Object... params) {
        runner.run(this);
    }

    @Override
    protected Object doInBackground(Object... objects) {
        String rootFolderId = BackupDriveServiceHelper.getRootFolderId(mDriveService);
        if (rootFolderId == null || rootFolderId.isEmpty()) {
            Log.d("tag", "GetBackupsListTask->ROOT_FOLDER_ID_IS_NULL");
            return null;
        }

        FileList backupFilesList = getBackupList(rootFolderId);
        if (backupFilesList == null) {
            Log.d("tag", "GetBackupsListTask->NO_BACKUP_FILES");
            return null;
        }

        Log.d("tag", "GetBackupsListTask->BACKUPS_LIST_SIZE: " + backupFilesList.getFiles().size());

        List<File> filesList = backupFilesList.getFiles();;
        for (int i = 0; i < filesList.size(); ++i) {
            File file = filesList.get(i);
            String fileName = file.getName();
            if (fileName == null || fileName.isEmpty()) {
                String fileId = file.getId();
                if (fileId != null) {
                    Log.d("tag", "GetBackupsListTask->WILL_REMOVE_BAD_BACKUP: " + fileId);
                    BackupDriveServiceHelper.removeFolder(mDriveService, fileId);
                } else {
                    Log.d("tag", "GetBackupsListTask->BAD_BACKUP_ID_IS_NULL");
                }

                continue;
            }

            Log.d("tag", "GetBackupsListTask->FOLDER_NAME: " + "|" + fileName + "|");

            BackupItem backupItem = BackupDriveService.getBackupItemFromFolderName(fileName, file.getId());
            if (backupItem.isEmpty()) {
                Log.d("tag", "GetBackupsListTask->BAD_BACKUP_ITEM");
                BackupDriveServiceHelper.removeFolder(mDriveService, file.getId());
                continue;
            }

            mBackupItemsList.add(backupItem);
        }
        mBackupItemsList.sort();

        return null;
    }

    @Override
    protected void onPostExecute(Object o) {
        mFinishedCallback.onFinished(mBackupItemsList);
    }

    @Override
    protected void onCancelled() {
        mCancelledCallback.onCancelled();
    }

    private FileList getBackupList(String rootFolderId) {
        if (rootFolderId == null || rootFolderId.isEmpty()) {
            return null;
        }

        FileList files = null;

        try {
            files = mDriveService.files().list()
                    .setSpaces("appDataFolder")
                    .setFields("nextPageToken, files(id, name)")
                    .setQ("mimeType='application/vnd.google-apps.folder' and '" + rootFolderId + "' in parents")
                    .setPageSize(1000)
                    .execute();
        } catch (IOException e) {
            Log.d("tag", "GetBackupsListTask->getBackupList()->IOEXCEPTION: " + e.getMessage());
            return null;
        }

        return files;
    }

//    private void getFolderContent(String folderId) {
//        FileList files = null;
//        try {
//            files = mDriveService.files().list()
//                    .setSpaces("appDataFolder")
//                    .setFields("nextPageToken, files(id, name)")
//                    .setQ("mimeType='application/vnd.google-apps.folder' and '" + folderId + "' in parents")
//                    .setPageSize(1000)
//                    .execute();
//        } catch (IOException e) {
//            Log.d("tag", "GetBackupsTask->getFolderContent()->IOEXCEPTION: " + e.getMessage());
//            return;
//        }
//
//        Log.d("tag", "GetBackupsTask->getFolderContent()->FOLDER_FILES_SIZE: " + files.getFiles().size());
//
//        for (File file : files.getFiles()) {
//            Log.d("tag", "GetBackupsTask->getFolderContent()->FILE: " + file.getName());
//        }
//    }

//    private String getRootFolderId() {
//        String rootFolderName = BackupDriveService.DRIVE_ROOT_FOLDER_NAME;
//        String rootFolderId = null;
//
//        if (mDriveService == null) {
//            Log.d("tag", "CreateBackupTask->getRootFolderId()->BAD_DRIVE_SERVICE");
//            return null;
//        }
//
//        try {
//            FileList files = mDriveService.files().list()
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
}
