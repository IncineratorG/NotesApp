const backupLocalState = {
  connected: false,
  receivingBackupsDialog: {
    visible: false,
  },
  removeBackupConfirmationDialog: {
    visible: false,
    driveId: '',
    note: '',
    timestamp: -1,
  },
  removingBackupDialog: {
    visible: false,
  },
  creatingBackupDialog: {
    visible: false,
    progressText: '',
  },
  restoreFromBackupConfirmationDialog: {
    visible: false,
    driveId: '',
    note: '',
    timestamp: -1,
  },
  restoringFromBackupDialog: {
    visible: false,
    progressText: '',
  },
};

export default backupLocalState;
