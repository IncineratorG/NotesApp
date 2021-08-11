import Services from '../../../../services/Services';
import AppActions from '../../../actions/AppActions';

const bs_onRestoreFromBackupProgressChangedEventHandler = emit => {
  const onRestoreFromBackupProgressChangedEventHandler = ({
    stageType,
    stageDescription,
    currentProgressItem,
    totalProgressItems,
  }) => {
    emit(
      AppActions.backup.actions.restoreFromBackupProgressChanged({
        stageType,
        stageDescription,
        currentProgressItem,
        totalProgressItems,
      }),
    );
  };

  const backupService = Services.services().backupService;
  backupService.events.addEventListener({
    event: backupService.events.types.RESTORE_FROM_BACKUP_PROGRESS_CHANGED,
    handlerId: 'bs_onRestoreFromBackupProgressChangedEventHandler',
    handler: onRestoreFromBackupProgressChangedEventHandler,
  });

  return () => {
    backupService.events.removeEventListener({
      event: backupService.events.types.RESTORE_FROM_BACKUP_PROGRESS_CHANGED,
      handlerId: 'bs_onRestoreFromBackupProgressChangedEventHandler',
    });
  };
};

export default bs_onRestoreFromBackupProgressChangedEventHandler;
