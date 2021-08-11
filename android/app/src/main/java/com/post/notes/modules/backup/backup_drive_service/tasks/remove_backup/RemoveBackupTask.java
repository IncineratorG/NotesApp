package com.post.notes.modules.backup.backup_drive_service.tasks.remove_backup;


import android.util.Log;

import com.google.api.services.drive.Drive;
import com.post.notes.common.autonomous_task.AutonomousTask;
import com.post.notes.common.task_runner.TaskRunner;
import com.post.notes.modules.backup.backup_drive_service.callbacks.remove_backup.RemoveBackupErrorCallback;
import com.post.notes.modules.backup.backup_drive_service.callbacks.remove_backup.RemoveBackupFinishedCallback;
import com.post.notes.modules.backup.backup_drive_service.helpers.BackupDriveServiceHelper;

import java.io.IOException;

public class RemoveBackupTask extends AutonomousTask<Object, Object, Object> {
    private String mBackupDriveId;
    private Drive mDriveService;
    private RemoveBackupFinishedCallback mFinishedCallback;
    private RemoveBackupErrorCallback mErrorCallback;
    private boolean mWasError;

    public RemoveBackupTask(String driveId,
                            Drive driveService,
                            RemoveBackupFinishedCallback finishedCallback,
                            RemoveBackupErrorCallback errorCallback) {
        mBackupDriveId = driveId;
        mDriveService = driveService;
        mFinishedCallback = finishedCallback;
        mErrorCallback = errorCallback;
    }

    @Override
    public void runOnRunner(TaskRunner runner, Object... params) {
        runner.run(this);
    }

    @Override
    protected Object doInBackground(Object... objects) {
        mWasError = false;
        BackupDriveServiceHelper.removeFolder(mDriveService, mBackupDriveId);
        return null;
    }

    @Override
    protected void onPostExecute(Object o) {
        if (!mWasError) {
            mFinishedCallback.onFinished();
        }
    }
}
