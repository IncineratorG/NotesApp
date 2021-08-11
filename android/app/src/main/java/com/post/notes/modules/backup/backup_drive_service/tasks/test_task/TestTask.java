package com.post.notes.modules.backup.backup_drive_service.tasks.test_task;


import android.util.Log;

import com.post.notes.common.task.Task;

public class TestTask extends Task<Object, Object, Object> {
    public TestTask() {
    }

    @Override
    protected Object doInBackground(Object... objects) {
        for (int i = 0; i < 7; ++i) {
            Log.d("tag", String.valueOf(i));

            if (isCancelled()) {
                break;
            }

            try {
                Thread.sleep(500);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }

        return null;
    }

    @Override
    protected void onCancelled() {
        Log.d("tag", "TEST_TASK_CANCELLED");
    }
}
