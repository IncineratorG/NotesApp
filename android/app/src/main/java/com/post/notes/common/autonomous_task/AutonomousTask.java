package com.post.notes.common.autonomous_task;


import com.post.notes.common.task.Task;
import com.post.notes.common.task_runner.TaskRunner;

public abstract class AutonomousTask<Params, Progress, Result> extends Task<Params, Progress, Result> {
    public abstract void runOnRunner(TaskRunner runner, Object... params);
}
