package com.post.notes.common.task_runner;


import android.os.AsyncTask;

import com.post.notes.common.task.Task;

public class TaskRunner {
    private Task mCurrentTask;

    public TaskRunner() {
        mCurrentTask = null;
    }

    @SuppressWarnings("unchecked")
    public synchronized void run(Task task, Object... params) {
        if (mCurrentTask != null && mCurrentTask.getStatus() == AsyncTask.Status.RUNNING) {
            mCurrentTask.cancel(true);
        }

        mCurrentTask = task;
        mCurrentTask.execute(params);
    }

    public synchronized void stopCurrentTask() {
        if (mCurrentTask != null && mCurrentTask.getStatus() == AsyncTask.Status.RUNNING) {
            mCurrentTask.cancel(true);
        }
    }
}
