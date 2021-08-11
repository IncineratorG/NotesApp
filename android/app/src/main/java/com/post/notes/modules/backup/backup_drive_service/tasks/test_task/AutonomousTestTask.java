package com.post.notes.modules.backup.backup_drive_service.tasks.test_task;


import android.util.Log;

import com.post.notes.common.autonomous_task.AutonomousTask;
import com.post.notes.common.task_runner.TaskRunner;

public class AutonomousTestTask extends AutonomousTask<Object, Object, Object> {
    @Override
    public void runOnRunner(TaskRunner runner, Object... params) {
        runner.run(this);
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
}
