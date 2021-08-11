import NativeBackupLib from './lib/NativeBackupLib';
import NativeBackupActions from './actions/NativeBackupActions';
import NativeBackupEvents from './events/NativeBackupEvents';
import NativeBackupConstants from './constants/NativeBackupConstants';

const NativeBackup = () => {
  const nativeBackupService = NativeBackupLib;
  const nativeBackupServiceEventEmitter = NativeBackupEvents.eventEmitter;

  const {
    taskProgressTypes: {SIMPLE, COMPLEX},
    createBackupTaskStagesTypes: {
      PREPARING_DATA_STAGE,
      SAVING_APP_SETTINGS_STAGE,
      SAVING_NOTES_TEXT_STAGE,
      SAVING_NOTES_IMAGES_STAGE,
    },
    restoreFromBackupTaskStagesTypes: {
      PREPARING_BACKUP_DATA_STAGE,
      RESTORING_APP_SETTINGS_STAGE,
      RESTORING_NOTES_TEXT_STAGE,
      RESTORING_NOTES_IMAGES_STAGE,
      FINISHING_STAGE,
    },
  } = NativeBackupConstants;

  const constants = {
    taskProgressTypes: {SIMPLE, COMPLEX},
    createBackupTaskStagesTypes: {
      PREPARING_DATA_STAGE,
      SAVING_APP_SETTINGS_STAGE,
      SAVING_NOTES_TEXT_STAGE,
      SAVING_NOTES_IMAGES_STAGE,
    },
    restoreFromBackupTaskStagesTypes: {
      PREPARING_BACKUP_DATA_STAGE,
      RESTORING_APP_SETTINGS_STAGE,
      RESTORING_NOTES_TEXT_STAGE,
      RESTORING_NOTES_IMAGES_STAGE,
      FINISHING_STAGE,
    },
  };

  const eventTypes = {
    LOG_IN_RESULT: NativeBackupEvents.types.LOG_IN_RESULT,
    LOG_OUT_RESULT: NativeBackupEvents.types.LOG_OUT_RESULT,
    GET_NOTES_IMAGES_SIZE_IN_BYTES_RESULT:
      NativeBackupEvents.types.GET_NOTES_IMAGES_SIZE_IN_BYTES_RESULT,
    CREATE_BACKUP_PROGRESS_CHANGED:
      NativeBackupEvents.types.CREATE_BACKUP_PROGRESS_CHANGED,
    CREATE_BACKUP_FINISHED: NativeBackupEvents.types.CREATE_BACKUP_FINISHED,
    CREATE_BACKUP_CANCELLED: NativeBackupEvents.types.CREATE_BACKUP_CANCELLED,
    CREATE_BACKUP_ERROR: NativeBackupEvents.types.CREATE_BACKUP_ERROR,
    GET_BACKUPS_LIST_RESULT: NativeBackupEvents.types.GET_BACKUPS_LIST_RESULT,
    GET_BACKUPS_LIST_ERROR: NativeBackupEvents.types.GET_BACKUPS_LIST_ERROR,
    REMOVE_BACKUP_FINISHED: NativeBackupEvents.types.REMOVE_BACKUP_FINISHED,
    REMOVE_BACKUP_ERROR: NativeBackupEvents.types.REMOVE_BACKUP_ERROR,
    RESTORE_FROM_BACKUP_PROGRESS_CHANGED:
      NativeBackupEvents.types.RESTORE_FROM_BACKUP_PROGRESS_CHANGED,
    RESTORE_FROM_BACKUP_FINISHED:
      NativeBackupEvents.types.RESTORE_FROM_BACKUP_FINISHED,
    RESTORE_FROM_BACKUP_CANCELLED:
      NativeBackupEvents.types.RESTORE_FROM_BACKUP_CANCELLED,
    RESTORE_FROM_BACKUP_ERROR:
      NativeBackupEvents.types.RESTORE_FROM_BACKUP_ERROR,
  };
  const eventsMaps = new Map();

  const subscribeToNativeEvents = () => {
    eventsMaps.set(eventTypes.LOG_IN_RESULT, new Map());
    nativeBackupServiceEventEmitter.addListener(
      NativeBackupEvents.types.LOG_IN_RESULT,
      data => {
        const eventMap = eventsMaps.get(eventTypes.LOG_IN_RESULT);
        if (eventMap) {
          eventMap.forEach((value, key) => {
            value(NativeBackupEvents.payloads.loginResultEventPayload(data));
          });
        }
      },
    );

    eventsMaps.set(eventTypes.LOG_OUT_RESULT, new Map());
    nativeBackupServiceEventEmitter.addListener(
      NativeBackupEvents.types.LOG_OUT_RESULT,
      data => {
        const eventMap = eventsMaps.get(eventTypes.LOG_OUT_RESULT);
        if (eventMap) {
          eventMap.forEach((value, key) => {
            value(NativeBackupEvents.payloads.logoutResultEventPayload(data));
          });
        }
      },
    );

    eventsMaps.set(eventTypes.GET_NOTES_IMAGES_SIZE_IN_BYTES_RESULT, new Map());
    nativeBackupServiceEventEmitter.addListener(
      NativeBackupEvents.types.GET_NOTES_IMAGES_SIZE_IN_BYTES_RESULT,
      data => {
        const eventMap = eventsMaps.get(
          eventTypes.GET_NOTES_IMAGES_SIZE_IN_BYTES_RESULT,
        );
        if (eventMap) {
          eventMap.forEach((value, key) => {
            value(
              NativeBackupEvents.payloads.getNotesImagesSizeInBytesResultEventPayload(
                data,
              ),
            );
          });
        }
      },
    );

    eventsMaps.set(eventTypes.CREATE_BACKUP_PROGRESS_CHANGED, new Map());
    nativeBackupServiceEventEmitter.addListener(
      NativeBackupEvents.types.CREATE_BACKUP_PROGRESS_CHANGED,
      data => {
        const eventMap = eventsMaps.get(
          eventTypes.CREATE_BACKUP_PROGRESS_CHANGED,
        );
        if (eventMap) {
          eventMap.forEach((value, key) => {
            value(
              NativeBackupEvents.payloads.createBackupProgressChangedEventPayload(
                data,
              ),
            );
          });
        }
      },
    );

    eventsMaps.set(eventTypes.CREATE_BACKUP_FINISHED, new Map());
    nativeBackupServiceEventEmitter.addListener(
      NativeBackupEvents.types.CREATE_BACKUP_FINISHED,
      data => {
        const eventMap = eventsMaps.get(eventTypes.CREATE_BACKUP_FINISHED);
        if (eventMap) {
          eventMap.forEach((value, key) => {
            value(
              NativeBackupEvents.payloads.createBackupFinishedEventPayload(
                data,
              ),
            );
          });
        }
      },
    );

    eventsMaps.set(eventTypes.CREATE_BACKUP_CANCELLED, new Map());
    nativeBackupServiceEventEmitter.addListener(
      NativeBackupEvents.types.CREATE_BACKUP_CANCELLED,
      data => {
        const eventMap = eventsMaps.get(eventTypes.CREATE_BACKUP_CANCELLED);
        if (eventMap) {
          eventMap.forEach((value, key) => {
            value(
              NativeBackupEvents.payloads.createBackupCancelledEventPayload(
                data,
              ),
            );
          });
        }
      },
    );

    eventsMaps.set(eventTypes.CREATE_BACKUP_ERROR, new Map());
    nativeBackupServiceEventEmitter.addListener(
      NativeBackupEvents.types.CREATE_BACKUP_ERROR,
      data => {
        const eventMap = eventsMaps.get(eventTypes.CREATE_BACKUP_ERROR);
        if (eventMap) {
          eventMap.forEach((value, key) => {
            value(
              NativeBackupEvents.payloads.createBackupErrorEventPayload(data),
            );
          });
        }
      },
    );

    eventsMaps.set(eventTypes.GET_BACKUPS_LIST_RESULT, new Map());
    nativeBackupServiceEventEmitter.addListener(
      NativeBackupEvents.types.GET_BACKUPS_LIST_RESULT,
      data => {
        const eventMap = eventsMaps.get(eventTypes.GET_BACKUPS_LIST_RESULT);
        if (eventMap) {
          eventMap.forEach((value, key) => {
            value(
              NativeBackupEvents.payloads.getBackupsListResultEventPayload(
                data,
              ),
            );
          });
        }
      },
    );

    eventsMaps.set(eventTypes.GET_BACKUPS_LIST_ERROR, new Map());
    nativeBackupServiceEventEmitter.addListener(
      NativeBackupEvents.types.GET_BACKUPS_LIST_ERROR,
      data => {
        const eventMap = eventsMaps.get(eventTypes.GET_BACKUPS_LIST_ERROR);
        if (eventMap) {
          eventMap.forEach((value, key) => {
            value(
              NativeBackupEvents.payloads.getBackupsListErrorEventPayload(data),
            );
          });
        }
      },
    );

    eventsMaps.set(eventTypes.REMOVE_BACKUP_FINISHED, new Map());
    nativeBackupServiceEventEmitter.addListener(
      NativeBackupEvents.types.REMOVE_BACKUP_FINISHED,
      data => {
        const eventMap = eventsMaps.get(eventTypes.REMOVE_BACKUP_FINISHED);
        if (eventMap) {
          eventMap.forEach((value, key) => {
            value(
              NativeBackupEvents.payloads.removeBackupFinishedEventPayload(
                data,
              ),
            );
          });
        }
      },
    );

    eventsMaps.set(eventTypes.REMOVE_BACKUP_ERROR, new Map());
    nativeBackupServiceEventEmitter.addListener(
      NativeBackupEvents.types.REMOVE_BACKUP_ERROR,
      data => {
        const eventMap = eventsMaps.get(eventTypes.REMOVE_BACKUP_ERROR);
        if (eventMap) {
          eventMap.forEach((value, key) => {
            value(
              NativeBackupEvents.payloads.removeBackupErrorEventPayload(data),
            );
          });
        }
      },
    );

    eventsMaps.set(eventTypes.RESTORE_FROM_BACKUP_PROGRESS_CHANGED, new Map());
    nativeBackupServiceEventEmitter.addListener(
      NativeBackupEvents.types.RESTORE_FROM_BACKUP_PROGRESS_CHANGED,
      data => {
        const eventMap = eventsMaps.get(
          eventTypes.RESTORE_FROM_BACKUP_PROGRESS_CHANGED,
        );
        if (eventMap) {
          eventMap.forEach((value, key) => {
            value(
              NativeBackupEvents.payloads.restoreFromBackupProgressChangedEventPayload(
                data,
              ),
            );
          });
        }
      },
    );

    eventsMaps.set(eventTypes.RESTORE_FROM_BACKUP_FINISHED, new Map());
    nativeBackupServiceEventEmitter.addListener(
      NativeBackupEvents.types.RESTORE_FROM_BACKUP_FINISHED,
      data => {
        const eventMap = eventsMaps.get(
          eventTypes.RESTORE_FROM_BACKUP_FINISHED,
        );
        if (eventMap) {
          eventMap.forEach((value, key) => {
            value(
              NativeBackupEvents.payloads.restoreFromBackupFinishedEventPayload(
                data,
              ),
            );
          });
        }
      },
    );

    eventsMaps.set(eventTypes.RESTORE_FROM_BACKUP_CANCELLED, new Map());
    nativeBackupServiceEventEmitter.addListener(
      NativeBackupEvents.types.RESTORE_FROM_BACKUP_CANCELLED,
      data => {
        const eventMap = eventsMaps.get(
          eventTypes.RESTORE_FROM_BACKUP_CANCELLED,
        );
        if (eventMap) {
          eventMap.forEach((value, key) => {
            value(
              NativeBackupEvents.payloads.restoreFromBackupCancelledEventPayload(
                data,
              ),
            );
          });
        }
      },
    );

    eventsMaps.set(eventTypes.RESTORE_FROM_BACKUP_ERROR, new Map());
    nativeBackupServiceEventEmitter.addListener(
      NativeBackupEvents.types.RESTORE_FROM_BACKUP_ERROR,
      data => {
        const eventMap = eventsMaps.get(eventTypes.RESTORE_FROM_BACKUP_ERROR);
        if (eventMap) {
          eventMap.forEach((value, key) => {
            value(
              NativeBackupEvents.payloads.restoreFromBackupErrorEventPayload(
                data,
              ),
            );
          });
        }
      },
    );
  };
  subscribeToNativeEvents();

  const dispose = () => {
    nativeBackupServiceEventEmitter.removeAllListeners(
      NativeBackupEvents.types.LOG_IN_RESULT,
    );
    nativeBackupServiceEventEmitter.removeAllListeners(
      NativeBackupEvents.types.LOG_OUT_RESULT,
    );
    nativeBackupServiceEventEmitter.removeAllListeners(
      NativeBackupEvents.types.CREATE_BACKUP_RESULT,
    );
    nativeBackupServiceEventEmitter.removeAllListeners(
      NativeBackupEvents.types.GET_NOTES_IMAGES_SIZE_IN_BYTES_RESULT,
    );
    nativeBackupServiceEventEmitter.removeAllListeners(
      NativeBackupEvents.types.CREATE_BACKUP_PROGRESS_CHANGED,
    );
    nativeBackupServiceEventEmitter.removeAllListeners(
      NativeBackupEvents.types.CREATE_BACKUP_FINISHED,
    );
    nativeBackupServiceEventEmitter.removeAllListeners(
      NativeBackupEvents.types.CREATE_BACKUP_CANCELLED,
    );
    nativeBackupServiceEventEmitter.removeAllListeners(
      NativeBackupEvents.types.CREATE_BACKUP_ERROR,
    );
    nativeBackupServiceEventEmitter.removeAllListeners(
      NativeBackupEvents.types.GET_BACKUPS_LIST_RESULT,
    );
    nativeBackupServiceEventEmitter.removeAllListeners(
      NativeBackupEvents.types.GET_BACKUPS_LIST_ERROR,
    );
    nativeBackupServiceEventEmitter.removeAllListeners(
      NativeBackupEvents.types.REMOVE_BACKUP_FINISHED,
    );
    nativeBackupServiceEventEmitter.removeAllListeners(
      NativeBackupEvents.types.REMOVE_BACKUP_ERROR,
    );
    nativeBackupServiceEventEmitter.removeAllListeners(
      NativeBackupEvents.types.RESTORE_FROM_BACKUP_PROGRESS_CHANGED,
    );
    nativeBackupServiceEventEmitter.removeAllListeners(
      NativeBackupEvents.types.RESTORE_FROM_BACKUP_FINISHED,
    );
    nativeBackupServiceEventEmitter.removeAllListeners(
      NativeBackupEvents.types.RESTORE_FROM_BACKUP_CANCELLED,
    );
    nativeBackupServiceEventEmitter.removeAllListeners(
      NativeBackupEvents.types.RESTORE_FROM_BACKUP_ERROR,
    );
  };

  const addEventListener = ({event, handlerId, handler}) => {
    const eventMap = eventsMaps.get(event);
    if (eventMap) {
      eventMap.set(handlerId, handler);
    }
  };

  const removeEventListener = ({event, handlerId}) => {
    const eventMap = eventsMaps.get(event);
    if (eventMap) {
      eventMap.delete(handlerId);
    }
  };

  const login = async () => {
    const action = NativeBackupActions.loginAction();
    return await nativeBackupService.execute(action);
  };

  const logout = async () => {
    const action = NativeBackupActions.logoutAction();
    return await nativeBackupService.execute(action);
  };

  const createBackup = async ({backupNote, needSaveImages}) => {
    const action = NativeBackupActions.createBackupAction({
      backupNote,
      needSaveImages,
    });
    return await nativeBackupService.execute(action);
  };

  const cancelAllBackupTasks = async () => {
    const action = NativeBackupActions.cancelAllBackupTasksAction();
    return await nativeBackupService.execute(action);
  };

  const getNoteImagesSizeInBytes = async () => {
    const action = NativeBackupActions.getNotesImagesSizeInBytesAction();
    return await nativeBackupService.execute(action);
  };

  const getBackupsList = async () => {
    const action = NativeBackupActions.getBackupsListAction();
    return await nativeBackupService.execute(action);
  };

  const removeBackup = async ({backupDriveId}) => {
    const action = NativeBackupActions.removeBackupAction({backupDriveId});
    return await nativeBackupService.execute(action);
  };

  const restoreFromBackup = async ({backupDriveId}) => {
    const action = NativeBackupActions.restoreFromBackupAction({backupDriveId});
    return await nativeBackupService.execute(action);
  };

  return {
    constants,
    events: {
      types: eventTypes,
      addEventListener,
      removeEventListener,
    },
    dispose,
    login,
    logout,
    createBackup,
    cancelAllBackupTasks,
    getNoteImagesSizeInBytes,
    getBackupsList,
    removeBackup,
    restoreFromBackup,
  };
};

export default NativeBackup;
