import BackupLocalActions from './BackupLocalActions';

const backupLocalReducer = (state, action) => {
  switch (action.type) {
    case BackupLocalActions.types.SET_CONNECTED: {
      return {
        ...state,
        connected: action.payload.connected,
      };
    }

    case BackupLocalActions.types.SET_RECEIVING_BACKUPS_DIALOG_VISIBILITY: {
      return {
        ...state,
        receivingBackupsDialog: {
          ...state.receivingBackupsDialog,
          visible: action.payload.visible,
        },
      };
    }

    case BackupLocalActions.types.OPEN_REMOVE_BACKUP_CONFIRMATION_DIALOG: {
      const {driveId, note, timestamp} = action.payload;

      return {
        ...state,
        removeBackupConfirmationDialog: {
          ...state.removeBackupConfirmationDialog,
          visible: true,
          driveId,
          note,
          timestamp: Number(timestamp),
        },
      };
    }

    case BackupLocalActions.types.CLOSE_REMOVE_BACKUP_CONFIRMATION_DIALOG: {
      return {
        ...state,
        removeBackupConfirmationDialog: {
          ...state.removeBackupConfirmationDialog,
          visible: false,
          // driveId: '',
          // note: '',
          // timestamp: -1,
        },
      };
    }

    case BackupLocalActions.types.SET_REMOVING_BACKUP_DIALOG_VISIBILITY: {
      return {
        ...state,
        removingBackupDialog: {
          ...state.removingBackupDialog,
          visible: action.payload.visible,
        },
      };
    }

    case BackupLocalActions.types.SET_CREATING_BACKUP_DIALOG_VISIBILITY: {
      return {
        ...state,
        creatingBackupDialog: {
          ...state.creatingBackupDialog,
          visible: action.payload.visible,
        },
      };
    }

    case BackupLocalActions.types.SET_CREATING_BACKUP_DIALOG_PROGRESS_TEXT: {
      return {
        ...state,
        creatingBackupDialog: {
          ...state.creatingBackupDialog,
          progressText: action.payload.text,
        },
      };
    }

    case BackupLocalActions.types
      .OPEN_RESTORE_FROM_BACKUP_CONFIRMATION_DIALOG: {
      const {driveId, note, timestamp} = action.payload;

      return {
        ...state,
        restoreFromBackupConfirmationDialog: {
          ...state.restoreFromBackupConfirmationDialog,
          visible: true,
          driveId,
          note,
          timestamp: Number(timestamp),
        },
      };
    }

    case BackupLocalActions.types
      .CLOSE_RESTORE_FROM_BACKUP_CONFIRMATION_DIALOG: {
      return {
        ...state,
        restoreFromBackupConfirmationDialog: {
          ...state.restoreFromBackupConfirmationDialog,
          visible: false,
        },
      };
    }

    case BackupLocalActions.types.SET_RESTORING_FROM_BACKUP_DIALOG_VISIBILITY: {
      return {
        ...state,
        restoringFromBackupDialog: {
          ...state.restoringFromBackupDialog,
          visible: action.payload.visible,
        },
      };
    }

    case BackupLocalActions.types
      .SET_RESTORING_FROM_BACKUP_DIALOG_PROGRESS_TEXT: {
      return {
        ...state,
        restoringFromBackupDialog: {
          ...state.restoringFromBackupDialog,
          progressText: action.payload.text,
        },
      };
    }

    default: {
      return state;
    }
  }
};

export default backupLocalReducer;
