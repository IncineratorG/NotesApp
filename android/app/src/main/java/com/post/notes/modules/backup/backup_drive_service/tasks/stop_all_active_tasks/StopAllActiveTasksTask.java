package com.post.notes.modules.backup.backup_drive_service.tasks.stop_all_active_tasks;


import com.post.notes.common.autonomous_task.AutonomousTask;
import com.post.notes.common.task_runner.TaskRunner;

public class StopAllActiveTasksTask extends AutonomousTask<Object, Object, Object> {
    @Override
    public void runOnRunner(TaskRunner runner, Object... params) {
        runner.stopCurrentTask();
    }

    @Override
    protected Object doInBackground(Object... objects) {
        return null;
    }
}
