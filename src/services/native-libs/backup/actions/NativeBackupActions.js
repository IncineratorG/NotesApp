import NativeBackupConstants from '../constants/NativeBackupConstants';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';

const NativeBackupActions = () => {
  const {
    actionTypes: {
      LOG_IN,
      LOG_OUT,
      CREATE_BACKUP,
      CANCEL_ALL_BACKUP_TASKS,
      GET_NOTES_IMAGES_SIZE_IN_BYTES,
      GET_BACKUPS_LIST,
      REMOVE_BACKUP,
      RESTORE_FROM_BACKUP,
    },
  } = NativeBackupConstants;

  const loginAction = () => {
    return {
      type: LOG_IN,
    };
  };

  const logoutAction = () => {
    return {
      type: LOG_OUT,
    };
  };

  const createBackupAction = ({backupNote, needSaveImages}) => {
    return {
      type: CREATE_BACKUP,
      payload: {
        note: backupNote ? backupNote : '',
        needSaveImages: !!needSaveImages,
      },
    };
  };

  const cancelAllBackupTasksAction = () => {
    return {
      type: CANCEL_ALL_BACKUP_TASKS,
    };
  };

  const getNotesImagesSizeInBytesAction = () => {
    return {
      type: GET_NOTES_IMAGES_SIZE_IN_BYTES,
    };
  };

  const getBackupsListAction = () => {
    return {
      type: GET_BACKUPS_LIST,
    };
  };

  const removeBackupAction = ({backupDriveId}) => {
    return {
      type: REMOVE_BACKUP,
      payload: {backupDriveId},
    };
  };

  const restoreFromBackupAction = ({backupDriveId}) => {
    return {
      type: RESTORE_FROM_BACKUP,
      payload: {backupDriveId},
    };
  };

  return {
    loginAction,
    logoutAction,
    createBackupAction,
    cancelAllBackupTasksAction,
    getNotesImagesSizeInBytesAction,
    getBackupsListAction,
    removeBackupAction,
    restoreFromBackupAction,
  };
};

export default NativeBackupActions();
