package com.post.notes.common.task;


import android.os.AsyncTask;

import com.post.notes.modules.backup.backup_drive_service.data.task_progress.BackupTaskProgress;

public abstract class Task<Params, Progress, Result> extends AsyncTask<Params, Progress, Result> {
    public boolean isTaskCancelled() {
        return isCancelled();
    }

    @SuppressWarnings("unchecked")
    public void publishTaskProgress(BackupTaskProgress progress) {
        publishProgress((Progress) progress);
    }
}
