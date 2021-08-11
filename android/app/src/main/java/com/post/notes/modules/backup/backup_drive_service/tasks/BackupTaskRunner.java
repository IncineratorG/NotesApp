package com.post.notes.modules.backup.backup_drive_service.tasks;


import com.post.notes.common.task.Task;
import com.post.notes.common.task_runner.TaskRunner;

public class BackupTaskRunner {
    private static BackupTaskRunner mInstance = null;
    private TaskRunner mTaskRunner;
    private Task mCurrentTask;

    private BackupTaskRunner() {
        mTaskRunner = new TaskRunner();
        mCurrentTask = null;
    }

    public static synchronized TaskRunner get() {
        if (mInstance == null) {
            mInstance = new BackupTaskRunner();
        }

        return mInstance.mTaskRunner;
    }
}
