const BackupServiceEvents = nativeBackupService => {
  const eventsMaps = new Map();

  const types = {
    LOG_IN_RESULT: nativeBackupService.events.types.LOG_IN_RESULT,
    LOG_OUT_RESULT: nativeBackupService.events.types.LOG_OUT_RESULT,
    GET_NOTES_IMAGES_SIZE_IN_BYTES_RESULT:
      nativeBackupService.events.types.GET_NOTES_IMAGES_SIZE_IN_BYTES_RESULT,
    CREATE_BACKUP_PROGRESS_CHANGED:
      nativeBackupService.events.types.CREATE_BACKUP_PROGRESS_CHANGED,
    CREATE_BACKUP_FINISHED:
      nativeBackupService.events.types.CREATE_BACKUP_FINISHED,
    CREATE_BACKUP_CANCELLED:
      nativeBackupService.events.types.CREATE_BACKUP_CANCELLED,
    CREATE_BACKUP_ERROR: nativeBackupService.events.types.CREATE_BACKUP_ERROR,
    GET_BACKUPS_LIST_RESULT:
      nativeBackupService.events.types.GET_BACKUPS_LIST_RESULT,
    GET_BACKUPS_LIST_ERROR:
      nativeBackupService.events.types.GET_BACKUPS_LIST_ERROR,
    REMOVE_BACKUP_FINISHED:
      nativeBackupService.events.types.REMOVE_BACKUP_FINISHED,
    REMOVE_BACKUP_ERROR: nativeBackupService.events.types.REMOVE_BACKUP_ERROR,
    RESTORE_FROM_BACKUP_PROGRESS_CHANGED:
      nativeBackupService.events.types.RESTORE_FROM_BACKUP_PROGRESS_CHANGED,
    RESTORE_FROM_BACKUP_FINISHED:
      nativeBackupService.events.types.RESTORE_FROM_BACKUP_FINISHED,
    RESTORE_FROM_BACKUP_CANCELLED:
      nativeBackupService.events.types.RESTORE_FROM_BACKUP_CANCELLED,
    RESTORE_FROM_BACKUP_ERROR:
      nativeBackupService.events.types.RESTORE_FROM_BACKUP_ERROR,
  };

  const handleEvent = (event, data) => {
    const eventMap = eventsMaps.get(event);
    if (eventMap) {
      eventMap.forEach((value, key) => {
        value(data);
      });
    }
  };

  const subscribeToNativeEvents = () => {
    eventsMaps.set(types.LOG_IN_RESULT, new Map());
    nativeBackupService.events.addEventListener({
      event: nativeBackupService.events.types.LOG_IN_RESULT,
      handlerId: 'BackupServiceEvents',
      handler: data => handleEvent(types.LOG_IN_RESULT, data),
    });

    eventsMaps.set(types.LOG_OUT_RESULT, new Map());
    nativeBackupService.events.addEventListener({
      event: nativeBackupService.events.types.LOG_OUT_RESULT,
      handlerId: 'BackupServiceEvents',
      handler: data => handleEvent(types.LOG_OUT_RESULT, data),
    });

    eventsMaps.set(types.GET_NOTES_IMAGES_SIZE_IN_BYTES_RESULT, new Map());
    nativeBackupService.events.addEventListener({
      event:
        nativeBackupService.events.types.GET_NOTES_IMAGES_SIZE_IN_BYTES_RESULT,
      handlerId: 'BackupServiceEvents',
      handler: data =>
        handleEvent(types.GET_NOTES_IMAGES_SIZE_IN_BYTES_RESULT, data),
    });

    eventsMaps.set(types.CREATE_BACKUP_PROGRESS_CHANGED, new Map());
    nativeBackupService.events.addEventListener({
      event: nativeBackupService.events.types.CREATE_BACKUP_PROGRESS_CHANGED,
      handlerId: 'BackupServiceEvents',
      handler: data => handleEvent(types.CREATE_BACKUP_PROGRESS_CHANGED, data),
    });

    eventsMaps.set(types.CREATE_BACKUP_FINISHED, new Map());
    nativeBackupService.events.addEventListener({
      event: nativeBackupService.events.types.CREATE_BACKUP_FINISHED,
      handlerId: 'BackupServiceEvents',
      handler: data => handleEvent(types.CREATE_BACKUP_FINISHED, data),
    });

    eventsMaps.set(types.CREATE_BACKUP_CANCELLED, new Map());
    nativeBackupService.events.addEventListener({
      event: nativeBackupService.events.types.CREATE_BACKUP_CANCELLED,
      handlerId: 'BackupServiceEvents',
      handler: data => handleEvent(types.CREATE_BACKUP_CANCELLED, data),
    });

    eventsMaps.set(types.CREATE_BACKUP_ERROR, new Map());
    nativeBackupService.events.addEventListener({
      event: nativeBackupService.events.types.CREATE_BACKUP_ERROR,
      handlerId: 'BackupServiceEvents',
      handler: data => handleEvent(types.CREATE_BACKUP_ERROR, data),
    });

    eventsMaps.set(types.GET_BACKUPS_LIST_RESULT, new Map());
    nativeBackupService.events.addEventListener({
      event: nativeBackupService.events.types.GET_BACKUPS_LIST_RESULT,
      handlerId: 'BackupServiceEvents',
      handler: data => handleEvent(types.GET_BACKUPS_LIST_RESULT, data),
    });

    eventsMaps.set(types.GET_BACKUPS_LIST_ERROR, new Map());
    nativeBackupService.events.addEventListener({
      event: nativeBackupService.events.types.GET_BACKUPS_LIST_ERROR,
      handlerId: 'BackupServiceEvents',
      handler: data => handleEvent(types.GET_BACKUPS_LIST_ERROR, data),
    });

    eventsMaps.set(types.REMOVE_BACKUP_FINISHED, new Map());
    nativeBackupService.events.addEventListener({
      event: nativeBackupService.events.types.REMOVE_BACKUP_FINISHED,
      handlerId: 'BackupServiceEvents',
      handler: data => handleEvent(types.REMOVE_BACKUP_FINISHED, data),
    });

    eventsMaps.set(types.REMOVE_BACKUP_ERROR, new Map());
    nativeBackupService.events.addEventListener({
      event: nativeBackupService.events.types.REMOVE_BACKUP_ERROR,
      handlerId: 'BackupServiceEvents',
      handler: data => handleEvent(types.REMOVE_BACKUP_ERROR, data),
    });

    eventsMaps.set(types.RESTORE_FROM_BACKUP_PROGRESS_CHANGED, new Map());
    nativeBackupService.events.addEventListener({
      event:
        nativeBackupService.events.types.RESTORE_FROM_BACKUP_PROGRESS_CHANGED,
      handlerId: 'BackupServiceEvents',
      handler: data =>
        handleEvent(types.RESTORE_FROM_BACKUP_PROGRESS_CHANGED, data),
    });

    eventsMaps.set(types.RESTORE_FROM_BACKUP_FINISHED, new Map());
    nativeBackupService.events.addEventListener({
      event: nativeBackupService.events.types.RESTORE_FROM_BACKUP_FINISHED,
      handlerId: 'BackupServiceEvents',
      handler: data => handleEvent(types.RESTORE_FROM_BACKUP_FINISHED, data),
    });

    eventsMaps.set(types.RESTORE_FROM_BACKUP_CANCELLED, new Map());
    nativeBackupService.events.addEventListener({
      event: nativeBackupService.events.types.RESTORE_FROM_BACKUP_CANCELLED,
      handlerId: 'BackupServiceEvents',
      handler: data => handleEvent(types.RESTORE_FROM_BACKUP_CANCELLED, data),
    });

    eventsMaps.set(types.RESTORE_FROM_BACKUP_ERROR, new Map());
    nativeBackupService.events.addEventListener({
      event: nativeBackupService.events.types.RESTORE_FROM_BACKUP_ERROR,
      handlerId: 'BackupServiceEvents',
      handler: data => handleEvent(types.RESTORE_FROM_BACKUP_ERROR, data),
    });
  };
  subscribeToNativeEvents();

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

  return {
    types,
    addEventListener,
    removeEventListener,
  };
};

export default BackupServiceEvents;
