package com.post.notes.modules.backup.module_actions_executor.handlers;


import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.post.notes.modules.backup.backup_drive_service.tasks.BackupTasks;
import com.post.notes.modules.backup.module_events.payloads.BackupEventsJSPayloads;
import com.post.notes.modules.backup.module_events.types.BackupEventTypes;
import com.post.notes.modules.modules_common.data_types.js_action_handler.JSActionHandler;

public class GetNoteImagesSizeInBytesHandler implements JSActionHandler {
    @Override
    public void handle(ReactApplicationContext context, ReadableMap action, Promise result) {
        BackupTasks.runCalculateNoteImagesSizeTask(
                context,
                (sizeInBytes, cancelled) -> {
                    if (!cancelled) {
                        context
                                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                                .emit(
                                        BackupEventTypes.GET_NOTES_IMAGES_SIZE_IN_BYTES_RESULT,
                                        BackupEventsJSPayloads.getNotesImagesSizeInBytesResultEventPayload(sizeInBytes)
                                );
                    } else {
                        context
                                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                                .emit(
                                        BackupEventTypes.GET_NOTES_IMAGES_SIZE_IN_BYTES_RESULT,
                                        BackupEventsJSPayloads.getNotesImagesSizeInBytesResultEventPayload(0.0)
                                );
                    }
                }
        );

//        BackupTasks.calculateNoteImagesSizeTask(context, (sizeInBytes, cancelled) -> {
//            if (!cancelled) {
//                context
//                        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
//                        .emit(
//                                BackupEventTypes.GET_NOTES_IMAGES_SIZE_IN_BYTES_RESULT,
//                                BackupEventsJSPayloads.getNotesImagesSizeInBytesResultEventPayload(sizeInBytes)
//                        );
//            }
//        }).runOnRunner(BackupTaskRunner.get());

//        TaskRunner.getInstance().run(new CalculateNoteImagesSizeTask((sizeInBytes, cancelled) -> {
//            if (!cancelled) {
//                context
//                        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
//                        .emit(
//                                BackupEventTypes.GET_NOTES_IMAGES_SIZE_IN_BYTES_RESULT,
//                                BackupEventsJSPayloads.getNotesImagesSizeInBytesResultEventPayload(sizeInBytes)
//                        );
//            }
//        }), context);

        result.resolve(true);

//        BackupTasks.autonomousTestTask().runOnRunner(BackupTaskRunner.get());
//        BackupTaskRunner.get().run(new TestTask());

//        context
//                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
//                .emit(
//                        BackupEventTypes.GET_NOTES_IMAGES_SIZE_IN_BYTES_RESULT,
//                        BackupEventsJSPayloads.getNotesImagesSizeInBytesResultEventPayload(90)
//                );
    }
}


//package com.post.notes.modules.backup.module_actions_executor.handlers;
//
//
//import com.facebook.react.bridge.Promise;
//import com.facebook.react.bridge.ReactApplicationContext;
//import com.facebook.react.bridge.ReadableMap;
//import com.facebook.react.modules.core.DeviceEventManagerModule;
//import com.post.notes.common.task_runner.TaskRunner;
//import com.post.notes.modules.backup.module_events.payloads.BackupEventsJSPayloads;
//import com.post.notes.modules.backup.module_events.types.BackupEventTypes;
//import com.post.notes.modules.backup.backup_drive_service.tasks.calculate_note_images_size.CalculateNoteImagesSizeTask;
//import com.post.notes.modules.modules_common.data_types.js_action_handler.JSActionHandler;
//
//public class GetNoteImagesSizeInBytesHandler implements JSActionHandler {
//    @Override
//    public void handle(ReactApplicationContext context, ReadableMap action, Promise result) {
//        TaskRunner.getInstance().run(new CalculateNoteImagesSizeTask((sizeInBytes, cancelled) -> {
//            if (!cancelled) {
//                context
//                        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
//                        .emit(
//                                BackupEventTypes.GET_NOTES_IMAGES_SIZE_IN_BYTES_RESULT,
//                                BackupEventsJSPayloads.getNotesImagesSizeInBytesResultEventPayload(sizeInBytes)
//                        );
//            }
//        }), context);
//
//        result.resolve(true);
//    }
//}
