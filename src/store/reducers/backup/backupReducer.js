import AppActions from '../../actions/AppActions';
import {SystemEventsHandler} from '../../../utils/common/system-events-handler/SystemEventsHandler';

const initialBackupState = {
  userAccount: {
    inProgress: false,
    userName: '',
    loggedIn: false,
    error: {
      hasError: false,
      code: '',
      message: '',
    },
  },
  backupsList: {
    inProgress: false,
    list: [],
    error: {
      hasError: false,
      code: '',
      message: '',
    },
  },
  createdBackupInfo: {
    inProgress: false,
    imagesSizeInBytes: 0,
    error: {
      hasError: false,
      code: '',
      message: '',
    },
  },
  createBackupProcess: {
    inProgress: false,
    isCancelled: false,
    progress: {
      stageType: '',
      stageDescription: '',
      currentProgressItem: '',
      totalProgressItems: '',
    },
    error: {
      hasError: false,
      code: '',
      message: '',
    },
  },
  removeBackupProcess: {
    inProgress: false,
    error: {
      hasError: false,
      code: '',
      message: '',
    },
  },
  restoreFromBackupProcess: {
    inProgress: false,
    isCancelled: false,
    progress: {
      stageType: '',
      stageDescription: '',
      currentProgressItem: '',
      totalProgressItems: '',
    },
    error: {
      hasError: false,
      code: '',
      message: '',
    },
  },
};

const backupReducer = (state = initialBackupState, action) => {
  switch (action.type) {
    case AppActions.backup.types.CLEAR_BACKUP_STATE: {
      return {
        ...state,
        userAccount: {
          ...state.userAccount,
          inProgress: false,
          userName: '',
          loggedIn: false,
        },
        backupsList: {
          ...state.backupsList,
          inProgress: false,
          list: [],
          error: {
            hasError: false,
            code: '',
            message: '',
          },
        },
      };
    }

    case AppActions.backup.types.LOG_IN_BEGIN: {
      return {
        ...state,
        userAccount: {
          ...state.userAccount,
          inProgress: true,
          userName: '',
          loggedIn: false,
          error: {
            ...state.userAccount.error,
            hasError: false,
            code: '',
            message: '',
          },
        },
      };
    }

    case AppActions.backup.types.LOG_IN_FINISHED: {
      const {userName} = action.payload;

      return {
        ...state,
        userAccount: {
          ...state.userAccount,
          inProgress: false,
          userName,
          loggedIn: true,
          error: {
            ...state.userAccount.error,
            hasError: false,
            code: '',
            message: '',
          },
        },
      };
    }

    case AppActions.backup.types.LOG_IN_ERROR: {
      const {code, message} = action.payload;

      return {
        ...state,
        userAccount: {
          ...state.userAccount,
          inProgress: false,
          userName: '',
          loggedIn: false,
          error: {
            ...state.userAccount.error,
            hasError: true,
            code,
            message,
          },
        },
      };
    }

    case AppActions.backup.types.LOG_OUT_FINISHED: {
      return {
        ...state,
        userAccount: {
          ...state.userAccount,
          inProgress: false,
          userName: '',
          loggedIn: false,
          error: {
            ...state.userAccount.error,
            hasError: false,
            code: '',
            message: '',
          },
        },
        backupsList: {
          ...state.backupsList,
          inProgress: false,
          list: [],
          error: {
            hasError: false,
            code: '',
            message: '',
          },
        },
      };
    }

    case AppActions.backup.types.GET_NOTES_IMAGES_SIZE_BEGIN: {
      return {
        ...state,
        createdBackupInfo: {
          ...state.createdBackupInfo,
          inProgress: true,
          imagesSizeInBytes: 0,
          error: {
            ...state.createdBackupInfo.error,
            hasError: false,
            code: '',
            message: '',
          },
        },
      };
    }

    case AppActions.backup.types.GET_NOTES_IMAGES_SIZE_FINISHED: {
      const {sizeInBytes} = action.payload;

      return {
        ...state,
        createdBackupInfo: {
          ...state.createdBackupInfo,
          inProgress: false,
          imagesSizeInBytes: sizeInBytes,
          error: {
            ...state.createdBackupInfo.error,
            hasError: false,
            code: '',
            message: '',
          },
        },
      };
    }

    case AppActions.backup.types.GET_NOTES_IMAGES_SIZE_ERROR: {
      const {code, message} = action.payload;

      return {
        ...state,
        createdBackupInfo: {
          ...state.createdBackupInfo,
          inProgress: false,
          error: {
            ...state.createdBackupInfo.error,
            hasError: true,
            code,
            message,
          },
        },
      };
    }

    case AppActions.backup.types.CREATE_BACKUP_BEGIN: {
      SystemEventsHandler.onInfo({
        info: 'backupReducer->CREATE_BACKUP_BEGIN',
      });

      return {
        ...state,
        createBackupProcess: {
          ...state.createBackupProcess,
          inProgress: true,
          isCancelled: false,
          progress: {
            stageType: '',
            stageDescription: '',
            currentProgressItem: '',
            totalProgressItems: '',
          },
          error: {
            hasError: false,
            code: '',
            message: '',
          },
        },
      };
    }

    case AppActions.backup.types.CREATE_BACKUP_PROGRESS_CHANGED: {
      const {
        stageType,
        stageDescription,
        currentProgressItem,
        totalProgressItems,
      } = action.payload;

      SystemEventsHandler.onInfo({
        info: 'backupReducer->CREATE_BACKUP_PROGRESS_CHANGED',
      });

      return {
        ...state,
        createBackupProcess: {
          ...state.createBackupProcess,
          inProgress: true,
          isCancelled: false,
          progress: {
            stageType,
            stageDescription,
            currentProgressItem,
            totalProgressItems,
          },
          error: {
            hasError: false,
            code: '',
            message: '',
          },
        },
      };
    }

    case AppActions.backup.types.CREATE_BACKUP_FINISHED: {
      SystemEventsHandler.onInfo({
        info: 'backupReducer->CREATE_BACKUP_FINISHED',
      });

      return {
        ...state,
        createBackupProcess: {
          ...state.createBackupProcess,
          inProgress: false,
          isCancelled: false,
          progress: {
            stageType: '',
            stageDescription: '',
            currentProgressItem: '',
            totalProgressItems: '',
          },
          error: {
            hasError: false,
            code: '',
            message: '',
          },
        },
      };
    }

    case AppActions.backup.types.CREATE_BACKUP_CANCELLED: {
      SystemEventsHandler.onInfo({
        info: 'backupReducer->CREATE_BACKUP_CANCELLED',
      });

      return {
        ...state,
        createBackupProcess: {
          ...state.createBackupProcess,
          inProgress: false,
          isCancelled: true,
          progress: {
            stageType: '',
            stageDescription: '',
            currentProgressItem: '',
            totalProgressItems: '',
          },
          error: {
            hasError: false,
            code: '',
            message: '',
          },
        },
      };
    }

    case AppActions.backup.types.CREATE_BACKUP_ERROR: {
      const {code, message} = action.payload;

      return {
        ...state,
        createBackupProcess: {
          ...state.createBackupProcess,
          inProgress: false,
          isCancelled: false,
          progress: {
            stageType: '',
            stageDescription: '',
            currentProgressItem: '',
            totalProgressItems: '',
          },
          error: {
            hasError: true,
            code,
            message,
          },
        },
      };
    }

    case AppActions.backup.types.GET_BACKUPS_LIST_BEGIN: {
      SystemEventsHandler.onInfo({
        info: 'backupReducer->GET_BACKUPS_LIST_BEGIN',
      });

      return {
        ...state,
        backupsList: {
          ...state.backupsList,
          inProgress: true,
          // list: [],
          error: {
            hasError: false,
            code: '',
            message: '',
          },
        },
      };
    }

    case AppActions.backup.types.GET_BACKUPS_LIST_FINISHED: {
      const {backupsList} = action.payload;

      SystemEventsHandler.onInfo({
        info: 'backupReducer->GET_BACKUPS_LIST_FINISHED',
      });

      return {
        ...state,
        backupsList: {
          ...state.backupsList,
          inProgress: false,
          list: [...backupsList],
          error: {
            hasError: false,
            code: '',
            message: '',
          },
        },
      };
    }

    case AppActions.backup.types.GET_BACKUPS_LIST_ERROR: {
      const {code, message} = action.payload;

      SystemEventsHandler.onInfo({
        info:
          'backupReducer->GET_BACKUPS_LIST_ERROR: ' +
          JSON.stringify(action.payload),
      });

      return {
        ...state,
        backupsList: {
          ...state.backupsList,
          inProgress: false,
          error: {
            hasError: true,
            code,
            message,
          },
        },
      };
    }

    case AppActions.backup.types.REMOVE_BACKUP_BEGIN: {
      return {
        ...state,
        removeBackupProcess: {
          ...state.removeBackupProcess,
          inProgress: true,
          error: {
            hasError: false,
            code: '',
            message: '',
          },
        },
      };
    }

    case AppActions.backup.types.REMOVE_BACKUP_FINISHED: {
      return {
        ...state,
        removeBackupProcess: {
          ...state.removeBackupProcess,
          inProgress: false,
          error: {
            hasError: false,
            code: '',
            message: '',
          },
        },
      };
    }

    case AppActions.backup.types.REMOVE_BACKUP_ERROR: {
      const {code, message} = action.payload;

      return {
        ...state,
        removeBackupProcess: {
          ...state.removeBackupProcess,
          inProgress: false,
          error: {
            hasError: true,
            code,
            message,
          },
        },
      };
    }

    case AppActions.backup.types.RESTORE_FROM_BACKUP_BEGIN: {
      SystemEventsHandler.onInfo({
        info: 'backupReducer->RESTORE_FROM_BACKUP_BEGIN',
      });

      return {
        ...state,
        restoreFromBackupProcess: {
          ...state.restoreFromBackupProcess,
          inProgress: true,
          isCancelled: false,
          progress: {
            stageType: '',
            stageDescription: '',
            currentProgressItem: '',
            totalProgressItems: '',
          },
          error: {
            hasError: false,
            code: '',
            message: '',
          },
        },
      };
    }

    case AppActions.backup.types.RESTORE_FROM_BACKUP_PROGRESS_CHANGED: {
      SystemEventsHandler.onInfo({
        info: 'backupReducer->RESTORE_FROM_BACKUP_PROGRESS_CHANGED',
      });

      const {
        stageType,
        stageDescription,
        currentProgressItem,
        totalProgressItems,
      } = action.payload;

      return {
        ...state,
        restoreFromBackupProcess: {
          ...state.restoreFromBackupProcess,
          inProgress: true,
          isCancelled: false,
          progress: {
            stageType,
            stageDescription,
            currentProgressItem,
            totalProgressItems,
          },
          error: {
            hasError: false,
            code: '',
            message: '',
          },
        },
      };
    }

    case AppActions.backup.types.RESTORE_FROM_BACKUP_FINISHED: {
      SystemEventsHandler.onInfo({
        info: 'backupReducer->RESTORE_FROM_BACKUP_FINISHED',
      });

      return {
        ...state,
        restoreFromBackupProcess: {
          ...state.restoreFromBackupProcess,
          inProgress: false,
          isCancelled: false,
          progress: {
            stageType: '',
            stageDescription: '',
            currentProgressItem: '',
            totalProgressItems: '',
          },
          error: {
            hasError: false,
            code: '',
            message: '',
          },
        },
      };
    }

    case AppActions.backup.types.RESTORE_FROM_BACKUP_CANCELLED: {
      SystemEventsHandler.onInfo({
        info: 'backupReducer->RESTORE_FROM_BACKUP_CANCELLED',
      });

      return {
        ...state,
        restoreFromBackupProcess: {
          ...state.restoreFromBackupProcess,
          inProgress: false,
          isCancelled: true,
          progress: {
            stageType: '',
            stageDescription: '',
            currentProgressItem: '',
            totalProgressItems: '',
          },
          error: {
            hasError: false,
            code: '',
            message: '',
          },
        },
      };
    }

    case AppActions.backup.types.RESTORE_FROM_BACKUP_ERROR: {
      SystemEventsHandler.onInfo({
        info: 'backupReducer->RESTORE_FROM_BACKUP_ERROR',
      });

      const {code, message} = action.payload;

      return {
        ...state,
        restoreFromBackupProcess: {
          ...state.restoreFromBackupProcess,
          inProgress: false,
          isCancelled: false,
          progress: {
            stageType: '',
            stageDescription: '',
            currentProgressItem: '',
            totalProgressItems: '',
          },
          error: {
            hasError: true,
            code,
            message,
          },
        },
      };
    }

    default: {
      return state;
    }
  }
};

export default backupReducer;
