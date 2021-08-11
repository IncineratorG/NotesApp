import Services from '../../../../services/Services';
import AppActions from '../../../actions/AppActions';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';

const bs_onCreateBackupCancelledEventHandler = emit => {
  const onCreateBackupCancelledEventHandler = () => {
    emit(AppActions.backup.actions.createBackupCancelled());
  };

  const backupService = Services.services().backupService;
  backupService.events.addEventListener({
    event: backupService.events.types.CREATE_BACKUP_CANCELLED,
    handlerId: 'bs_onCreateBackupCancelledEventHandler',
    handler: onCreateBackupCancelledEventHandler,
  });

  return () => {
    backupService.events.removeEventListener({
      event: backupService.events.types.CREATE_BACKUP_CANCELLED,
      handlerId: 'bs_onCreateBackupCancelledEventHandler',
    });
  };
};

export default bs_onCreateBackupCancelledEventHandler;
