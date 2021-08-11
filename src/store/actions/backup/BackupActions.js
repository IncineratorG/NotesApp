const BackupActions = () => {
  const types = {
    CLEAR_BACKUP_STATE: 'BA_CLEAR_BACKUP_STATE',
    CANCEL_ALL_BACKUP_TASKS: 'BA_CANCEL_ALL_BACKUP_TASKS',
    LOG_IN: 'BA_LOG_IN',
    LOG_IN_BEGIN: 'BA_LOG_IN_BEGIN',
    LOG_IN_FINISHED: 'BA_LOG_IN_FINISHED',
    LOG_IN_ERROR: 'BA_LOG_IN_ERROR',
    LOG_OUT: 'BA_LOG_OUT',
    LOG_OUT_BEGIN: 'BA_LOG_OUT_BEGIN',
    LOG_OUT_FINISHED: 'BA_LOG_OUT_FINISHED',
    LOG_OUT_ERROR: 'BA_LOG_OUT_ERROR',
    GET_NOTES_IMAGES_SIZE: 'BA_GET_NOTES_IMAGES_SIZE',
    GET_NOTES_IMAGES_SIZE_BEGIN: 'BA_GET_NOTES_IMAGES_SIZE_BEGIN',
    GET_NOTES_IMAGES_SIZE_FINISHED: 'BA_GET_NOTES_IMAGES_SIZE_FINISHED',
    GET_NOTES_IMAGES_SIZE_ERROR: 'BA_GET_NOTES_IMAGES_SIZE_ERROR',
    CREATE_BACKUP: 'BA_CREATE_BACKUP',
    CREATE_BACKUP_BEGIN: 'BA_CREATE_BACKUP_BEGIN',
    CREATE_BACKUP_PROGRESS_CHANGED: 'BA_CREATE_BACKUP_PROGRESS_CHANGED',
    CREATE_BACKUP_FINISHED: 'BA_CREATE_BACKUP_FINISHED',
    CREATE_BACKUP_CANCELLED: 'BA_CREATE_BACKUP_CANCELLED',
    CREATE_BACKUP_ERROR: 'BA_CREATE_BACKUP_ERROR',
    GET_BACKUPS_LIST: 'BA_GET_BACKUPS_LIST',
    GET_BACKUPS_LIST_BEGIN: 'BA_GET_BACKUPS_LIST_BEGIN',
    GET_BACKUPS_LIST_FINISHED: 'BA_GET_BACKUPS_LIST_FINISHED',
    GET_BACKUPS_LIST_ERROR: 'BA_GET_BACKUPS_LIST_ERROR',
    REMOVE_BACKUP: 'BA_REMOVE_BACKUP',
    REMOVE_BACKUP_BEGIN: 'BA_REMOVE_BACKUP_BEGIN',
    REMOVE_BACKUP_FINISHED: 'BA_REMOVE_BACKUP_FINISHED',
    REMOVE_BACKUP_ERROR: 'BA_REMOVE_BACKUP_ERROR',
    RESTORE_FROM_BACKUP: 'BA_RESTORE_FROM_BACKUP',
    RESTORE_FROM_BACKUP_BEGIN: 'BA_RESTORE_FROM_BACKUP_BEGIN',
    RESTORE_FROM_BACKUP_PROGRESS_CHANGED:
      'BA_RESTORE_FROM_BACKUP_PROGRESS_CHANGED',
    RESTORE_FROM_BACKUP_FINISHED: 'BA_RESTORE_FROM_BACKUP_FINISHED',
    RESTORE_FROM_BACKUP_CANCELLED: 'BA_RESTORE_FROM_BACKUP_CANCELLED',
    RESTORE_FROM_BACKUP_ERROR: 'BA_RESTORE_FROM_BACKUP_ERROR',
  };

  const clearBackupState = () => {
    return {
      type: types.CLEAR_BACKUP_STATE,
    };
  };

  const cancelAllBackupTasks = () => {
    return {
      type: types.CANCEL_ALL_BACKUP_TASKS,
    };
  };

  const logIn = () => {
    return {
      type: types.LOG_IN,
    };
  };

  const logInBegin = () => {
    return {
      type: types.LOG_IN_BEGIN,
    };
  };

  const logInFinished = ({userName}) => {
    return {
      type: types.LOG_IN_FINISHED,
      payload: {userName},
    };
  };

  const logInError = ({code, message}) => {
    return {
      type: types.LOG_IN_ERROR,
      payload: {code, message},
    };
  };

  const logOut = () => {
    return {
      type: types.LOG_OUT,
    };
  };

  const logOutBegin = () => {
    return {
      type: types.LOG_OUT_BEGIN,
    };
  };

  const logOutFinished = () => {
    return {
      type: types.LOG_OUT_FINISHED,
    };
  };

  const logOutError = ({code, message}) => {
    return {
      type: types.LOG_OUT_ERROR,
      payload: {code, message},
    };
  };

  const getNotesImagesSize = () => {
    return {
      type: types.GET_NOTES_IMAGES_SIZE,
    };
  };

  const getNotesImagesSizeBegin = () => {
    return {
      type: types.GET_NOTES_IMAGES_SIZE_BEGIN,
    };
  };

  const getNotesImagesSizeFinished = ({sizeInBytes}) => {
    return {
      type: types.GET_NOTES_IMAGES_SIZE_FINISHED,
      payload: {sizeInBytes},
    };
  };

  const getNotesImagesSizeError = ({code, message}) => {
    return {
      type: types.GET_NOTES_IMAGES_SIZE_ERROR,
      payload: {code, message},
    };
  };

  const createBackup = ({backupNote, needSaveImages}) => {
    return {
      type: types.CREATE_BACKUP,
      payload: {backupNote, needSaveImages},
    };
  };

  const createBackupBegin = () => {
    return {
      type: types.CREATE_BACKUP_BEGIN,
    };
  };

  const createBackupProgressChanged = ({
    stageType,
    stageDescription,
    currentProgressItem,
    totalProgressItems,
  }) => {
    return {
      type: types.CREATE_BACKUP_PROGRESS_CHANGED,
      payload: {
        stageType,
        stageDescription,
        currentProgressItem,
        totalProgressItems,
      },
    };
  };

  const createBackupFinished = () => {
    return {
      type: types.CREATE_BACKUP_FINISHED,
    };
  };

  const createBackupCancelled = () => {
    return {
      type: types.CREATE_BACKUP_CANCELLED,
    };
  };

  const createBackupError = ({code, message}) => {
    return {
      type: types.CREATE_BACKUP_ERROR,
      payload: {code, message},
    };
  };

  const getBackupsList = () => {
    return {
      type: types.GET_BACKUPS_LIST,
    };
  };

  const getBackupsListBegin = () => {
    return {
      type: types.GET_BACKUPS_LIST_BEGIN,
    };
  };

  const getBackupsListFinished = ({backupsList}) => {
    return {
      type: types.GET_BACKUPS_LIST_FINISHED,
      payload: {backupsList},
    };
  };

  const getBackupsListError = ({code, message}) => {
    return {
      type: types.GET_BACKUPS_LIST_ERROR,
      payload: {code, message},
    };
  };

  const removeBackup = ({backupDriveId}) => {
    return {
      type: types.REMOVE_BACKUP,
      payload: {backupDriveId},
    };
  };

  const removeBackupBegin = () => {
    return {
      type: types.REMOVE_BACKUP_BEGIN,
    };
  };

  const removeBackupFinished = () => {
    return {
      type: types.REMOVE_BACKUP_FINISHED,
    };
  };

  const removeBackupError = ({code, message}) => {
    return {
      type: types.REMOVE_BACKUP_ERROR,
      payload: {code, message},
    };
  };

  const restoreFromBackup = ({backupDriveId}) => {
    return {
      type: types.RESTORE_FROM_BACKUP,
      payload: {backupDriveId},
    };
  };

  const restoreFromBackupBegin = () => {
    return {
      type: types.RESTORE_FROM_BACKUP_BEGIN,
    };
  };

  const restoreFromBackupProgressChanged = ({
    stageType,
    stageDescription,
    currentProgressItem,
    totalProgressItems,
  }) => {
    return {
      type: types.RESTORE_FROM_BACKUP_PROGRESS_CHANGED,
      payload: {
        stageType,
        stageDescription,
        currentProgressItem,
        totalProgressItems,
      },
    };
  };

  const restoreFromBackupFinished = () => {
    return {
      type: types.RESTORE_FROM_BACKUP_FINISHED,
    };
  };

  const restoreFromBackupCancelled = () => {
    return {
      type: types.RESTORE_FROM_BACKUP_CANCELLED,
    };
  };

  const restoreFromBackupError = ({code, message}) => {
    return {
      type: types.RESTORE_FROM_BACKUP_ERROR,
      payload: {code, message},
    };
  };

  return {
    types,
    actions: {
      clearBackupState,
      cancelAllBackupTasks,
      logIn,
      logInBegin,
      logInFinished,
      logInError,
      logOut,
      logOutBegin,
      logOutFinished,
      logOutError,
      getNotesImagesSize,
      getNotesImagesSizeBegin,
      getNotesImagesSizeFinished,
      getNotesImagesSizeError,
      createBackup,
      createBackupBegin,
      createBackupProgressChanged,
      createBackupFinished,
      createBackupCancelled,
      createBackupError,
      getBackupsList,
      getBackupsListBegin,
      getBackupsListFinished,
      getBackupsListError,
      removeBackup,
      removeBackupBegin,
      removeBackupFinished,
      removeBackupError,
      restoreFromBackup,
      restoreFromBackupBegin,
      restoreFromBackupProgressChanged,
      restoreFromBackupFinished,
      restoreFromBackupCancelled,
      restoreFromBackupError,
    },
  };
};

export default BackupActions;
