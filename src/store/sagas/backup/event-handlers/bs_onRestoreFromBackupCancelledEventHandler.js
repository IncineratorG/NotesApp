import Services from '../../../../services/Services';
import AppActions from '../../../actions/AppActions';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';

const bs_onRestoreFromBackupCancelledEventHandler = emit => {
  const onRestoreFromBackupCancelledEventHandler = () => {
    emit(AppActions.backup.actions.restoreFromBackupCancelled());
  };

  const backupService = Services.services().backupService;
  backupService.events.addEventListener({
    event: backupService.events.types.RESTORE_FROM_BACKUP_CANCELLED,
    handlerId: 'bs_onRestoreFromBackupCancelledEventHandler',
    handler: onRestoreFromBackupCancelledEventHandler,
  });

  return () => {
    backupService.events.removeEventListener({
      event: backupService.events.types.RESTORE_FROM_BACKUP_CANCELLED,
      handlerId: 'bs_onRestoreFromBackupCancelledEventHandler',
    });
  };
};

export default bs_onRestoreFromBackupCancelledEventHandler;
