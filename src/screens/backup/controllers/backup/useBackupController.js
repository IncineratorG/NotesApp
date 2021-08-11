import {useCallback} from 'react';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import Services from '../../../../services/Services';
import AppActions from '../../../../store/actions/AppActions';
import BackupLocalActions from '../../store/BackupLocalActions';
import NetInfo from '@react-native-community/netinfo';

const useBackupController = model => {
  const {
    setters: {
      setLocalImage,
      setRemoteImage,
      setCreateBackupDialogVisible,
      setBackupNoteText,
    },
    navigation,
    dispatch,
    localDispatch,
  } = model;

  const backButtonPressHandler = useCallback(() => {
    dispatch(AppActions.backup.actions.clearBackupState());
    navigation.goBack();
    return true;
  }, [navigation, dispatch]);

  const loginPressHandler = useCallback(async () => {
    const {isConnected} = await NetInfo.fetch();
    localDispatch(
      BackupLocalActions.actions.setConnected({connected: isConnected}),
    );

    if (isConnected) {
      dispatch(AppActions.backup.actions.logIn());
    }
  }, [dispatch, localDispatch]);

  const logoutPressHandler = useCallback(async () => {
    SystemEventsHandler.onInfo({
      info: 'useBackupController->logoutPressHandler()',
    });

    // ===
    // Services.services().backupService.events.addOnLogoutResultEventListener({
    //   id: 'useBackupController',
    //   handler: data => {
    //     SystemEventsHandler.onInfo({
    //       info:
    //         'useBackupController->ON_LOGOUT_RESULT: ' + JSON.stringify(data),
    //     });
    //   },
    // });
    // ===

    const result = await Services.services().backupService.logOut();
    SystemEventsHandler.onInfo({
      info: 'useBackupController->logoutPressHandler()->RESULT: ' + result,
    });
  }, []);

  const createBackupPressHandler = useCallback(async () => {
    SystemEventsHandler.onInfo({
      info: 'useBackupController->createBackupPressHandler()',
    });

    // ===
    // Services.services().backupService.events.addOnCreateBackupResultEventListener(
    //   {
    //     id: 'useBackupController',
    //     handler: data => {
    //       const {image} = data;
    //
    //       SystemEventsHandler.onInfo({
    //         info:
    //           'useBackupController->ON_CREATE_BACKUP_RESULT: ' +
    //           (image === null),
    //       });
    //       setRemoteImage(image);
    //     },
    //   },
    // );
    // ===

    const result = await Services.services().backupService.createBackup({
      backupNote: 'My Backup note',
    });

    const {image} = result;
    SystemEventsHandler.onInfo({
      info:
        'useBackupController->createBackupPressHandler()->RESULT: ' +
        (image === null),
    });
    setLocalImage(image);
  }, [setLocalImage]);

  const createLocalBackupPressHandler = useCallback(async () => {
    SystemEventsHandler.onInfo({
      info: 'useBackupController->createLocalBackupPressHandler()',
    });

    // const result = await Services.services().backupService.createLocalBackup({
    //   backupNote: 'My Backup note',
    // });
    // SystemEventsHandler.onInfo({
    //   info:
    //     'useBackupController->createLocalBackupPressHandler()->RESULT: ' +
    //     JSON.stringify(result),
    // });
  }, []);

  const openCreateBackupDialogPressHandler = useCallback(() => {
    SystemEventsHandler.onInfo({
      info: 'useBackupController->openCreateBackupDialogPressHandler()',
    });

    dispatch(AppActions.backup.actions.getNotesImagesSize());

    setBackupNoteText('');
    setCreateBackupDialogVisible(true);
  }, [setCreateBackupDialogVisible, setBackupNoteText, dispatch]);

  const getBackupsList = useCallback(() => {
    dispatch(AppActions.backup.actions.getBackupsList());
  }, [dispatch]);

  const receivingBackupDialogCancelPressHandler = useCallback(() => {
    dispatch(AppActions.backup.actions.cancelAllBackupTasks());
    localDispatch(
      BackupLocalActions.actions.setReceivingBackupsDialogVisibility({
        visible: false,
      }),
    );
  }, [localDispatch, dispatch]);

  const backupItemRemovePressHandler = useCallback(
    ({driveId, note, timestamp}) => {
      localDispatch(
        BackupLocalActions.actions.openRemoveBackupConfirmationDialog({
          driveId,
          note,
          timestamp,
        }),
      );
    },
    [localDispatch],
  );

  const backupItemRestorePressHandler = useCallback(
    ({driveId, note, timestamp}) => {
      SystemEventsHandler.onInfo({
        info:
          'useBackupController->backupItemRestorePressHandler(): ' +
          driveId +
          ' - ' +
          note +
          ' - ' +
          timestamp,
      });

      localDispatch(
        BackupLocalActions.actions.openRestoreFromBackupConfirmationDialog({
          driveId,
          note,
          timestamp,
        }),
      );
    },
    [localDispatch],
  );

  const removeBackupConfirmationDialogCancelHandler = useCallback(() => {
    localDispatch(
      BackupLocalActions.actions.closeRemoveBackupConfirmationDialog(),
    );
  }, [localDispatch]);

  const removeBackupConfirmationDialogRemoveHandler = useCallback(
    ({driveId}) => {
      dispatch(
        AppActions.backup.actions.removeBackup({backupDriveId: driveId}),
      );
      localDispatch(
        BackupLocalActions.actions.closeRemoveBackupConfirmationDialog(),
      );
    },
    [dispatch, localDispatch],
  );

  const removingBackupDialogCancelHandler = useCallback(() => {
    localDispatch(
      BackupLocalActions.actions.setRemovingBackupDialogVisibility({
        visible: false,
      }),
    );
  }, [localDispatch]);

  const creatingBackupDialogCancelHandler = useCallback(() => {
    dispatch(AppActions.backup.actions.cancelAllBackupTasks());
  }, [dispatch]);

  const restoreFromBackupConfirmationDialogCancelHandler = useCallback(() => {
    localDispatch(
      BackupLocalActions.actions.closeRestoreFromBackupConfirmationDialog(),
    );
  }, [localDispatch]);

  const restoreFromBackupConfirmationDialogRestoreHandler = useCallback(
    ({driveId}) => {
      localDispatch(
        BackupLocalActions.actions.closeRestoreFromBackupConfirmationDialog(),
      );
      dispatch(
        AppActions.backup.actions.restoreFromBackup({backupDriveId: driveId}),
      );
    },
    [dispatch, localDispatch],
  );

  const restoringFromBackupDialogCancelHandler = useCallback(() => {
    dispatch(AppActions.backup.actions.cancelAllBackupTasks());
  }, [dispatch]);

  return {
    backButtonPressHandler,
    loginPressHandler,
    logoutPressHandler,
    createBackupPressHandler,
    createLocalBackupPressHandler,
    openCreateBackupDialogPressHandler,
    receivingBackupDialogCancelPressHandler,
    getBackupsList,
    backupItemRemovePressHandler,
    backupItemRestorePressHandler,
    removeBackupConfirmationDialogCancelHandler,
    removeBackupConfirmationDialogRemoveHandler,
    removingBackupDialogCancelHandler,
    creatingBackupDialogCancelHandler,
    restoreFromBackupConfirmationDialogCancelHandler,
    restoreFromBackupConfirmationDialogRestoreHandler,
    restoringFromBackupDialogCancelHandler,
  };
};

export default useBackupController;
