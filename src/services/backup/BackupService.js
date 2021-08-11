import NativeBackup from '../native-libs/backup/NativeBackup';
import BackupServiceEvents from './events/BackupServiceEvents';

const BackupService = () => {
  const nativeBackupService = NativeBackup();
  const serviceEvents = BackupServiceEvents(nativeBackupService);

  const init = () => {};

  const dispose = () => {
    // nativeBackupService.dispose();
  };

  const logIn = async () => {
    return await nativeBackupService.login();
  };

  const logOut = async () => {
    return await nativeBackupService.logout();
  };

  const createBackup = async ({backupNote, needSaveImages}) => {
    return await nativeBackupService.createBackup({
      backupNote: backupNote ? backupNote : '',
      needSaveImages,
    });
  };

  const cancelAllBackupTasks = async () => {
    return await nativeBackupService.cancelAllBackupTasks();
  };

  const getNoteImagesSizeInBytes = async () => {
    return await nativeBackupService.getNoteImagesSizeInBytes();
  };

  const getBackupsList = async () => {
    return await nativeBackupService.getBackupsList();
  };

  const removeBackup = async ({backupDriveId}) => {
    return await nativeBackupService.removeBackup({backupDriveId});
  };

  const restoreFromBackup = async ({backupDriveId}) => {
    return await nativeBackupService.restoreFromBackup({backupDriveId});
  };

  return {
    constants: nativeBackupService.constants,
    events: serviceEvents,
    init,
    dispose,
    logIn,
    logOut,
    createBackup,
    cancelAllBackupTasks,
    getNoteImagesSizeInBytes,
    getBackupsList,
    removeBackup,
    restoreFromBackup,
  };
};

export default BackupService;
