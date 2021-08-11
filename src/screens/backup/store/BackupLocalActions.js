const BackupLocalActions = () => {
  const types = {
    SET_CONNECTED: 'BLA_SET_CONNECTED',
    SET_RECEIVING_BACKUPS_DIALOG_VISIBILITY:
      'BLA_SET_RECEIVING_BACKUPS_DIALOG_VISIBILITY',
    OPEN_REMOVE_BACKUP_CONFIRMATION_DIALOG:
      'BLA_OPEN_REMOVE_BACKUP_CONFIRMATION_DIALOG',
    CLOSE_REMOVE_BACKUP_CONFIRMATION_DIALOG:
      'BLA_CLOSE_REMOVE_BACKUP_CONFIRMATION_DIALOG',
    SET_REMOVING_BACKUP_DIALOG_VISIBILITY:
      'BLA_SET_REMOVING_BACKUP_DIALOG_VISIBILITY',
    SET_CREATING_BACKUP_DIALOG_VISIBILITY:
      'BLA_SET_CREATING_BACKUP_DIALOG_VISIBILITY',
    SET_CREATING_BACKUP_DIALOG_PROGRESS_TEXT:
      'BLA_SET_CREATING_BACKUP_DIALOG_PROGRESS_TEXT',
    OPEN_RESTORE_FROM_BACKUP_CONFIRMATION_DIALOG:
      'BLA_OPEN_RESTORE_FROM_BACKUP_CONFIRMATION_DIALOG',
    CLOSE_RESTORE_FROM_BACKUP_CONFIRMATION_DIALOG:
      'BLA_CLOSE_RESTORE_FROM_BACKUP_CONFIRMATION_DIALOG',
    SET_RESTORING_FROM_BACKUP_DIALOG_VISIBILITY:
      'BLA_SET_RESTORING_FROM_BACKUP_DIALOG_VISIBILITY',
    SET_RESTORING_FROM_BACKUP_DIALOG_PROGRESS_TEXT:
      'BLA_SET_RESTORING_FROM_BACKUP_DIALOG_PROGRESS_TEXT',
  };

  const setConnected = ({connected}) => {
    return {
      type: types.SET_CONNECTED,
      payload: {connected},
    };
  };

  const setReceivingBackupsDialogVisibility = ({visible}) => {
    return {
      type: types.SET_RECEIVING_BACKUPS_DIALOG_VISIBILITY,
      payload: {visible},
    };
  };

  const openRemoveBackupConfirmationDialog = ({driveId, note, timestamp}) => {
    return {
      type: types.OPEN_REMOVE_BACKUP_CONFIRMATION_DIALOG,
      payload: {driveId, note, timestamp},
    };
  };

  const closeRemoveBackupConfirmationDialog = () => {
    return {
      type: types.CLOSE_REMOVE_BACKUP_CONFIRMATION_DIALOG,
    };
  };

  const setRemovingBackupDialogVisibility = ({visible}) => {
    return {
      type: types.SET_REMOVING_BACKUP_DIALOG_VISIBILITY,
      payload: {visible},
    };
  };

  const setCreatingBackupDialogVisibility = ({visible}) => {
    return {
      type: types.SET_CREATING_BACKUP_DIALOG_VISIBILITY,
      payload: {visible},
    };
  };

  const setCreatingBackupDialogProgressText = ({text}) => {
    return {
      type: types.SET_CREATING_BACKUP_DIALOG_PROGRESS_TEXT,
      payload: {text},
    };
  };

  const openRestoreFromBackupConfirmationDialog = ({
    driveId,
    note,
    timestamp,
  }) => {
    return {
      type: types.OPEN_RESTORE_FROM_BACKUP_CONFIRMATION_DIALOG,
      payload: {driveId, note, timestamp},
    };
  };

  const closeRestoreFromBackupConfirmationDialog = () => {
    return {
      type: types.CLOSE_RESTORE_FROM_BACKUP_CONFIRMATION_DIALOG,
    };
  };

  const setRestoringFromBackupDialogVisibility = ({visible}) => {
    return {
      type: types.SET_RESTORING_FROM_BACKUP_DIALOG_VISIBILITY,
      payload: {visible},
    };
  };

  const setRestoringFromBackupDialogProgressText = ({text}) => {
    return {
      type: types.SET_RESTORING_FROM_BACKUP_DIALOG_PROGRESS_TEXT,
      payload: {text},
    };
  };

  return {
    types,
    actions: {
      setConnected,
      setReceivingBackupsDialogVisibility,
      openRemoveBackupConfirmationDialog,
      closeRemoveBackupConfirmationDialog,
      setRemovingBackupDialogVisibility,
      setCreatingBackupDialogVisibility,
      setCreatingBackupDialogProgressText,
      openRestoreFromBackupConfirmationDialog,
      closeRestoreFromBackupConfirmationDialog,
      setRestoringFromBackupDialogVisibility,
      setRestoringFromBackupDialogProgressText,
    },
  };
};

export default BackupLocalActions();
