import Services from '../../../../services/Services';
import AppActions from '../../../actions/AppActions';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';

const bs_onCreateBackupFinishedEventHandler = emit => {
  const onCreateBackupFinishedEventHandler = () => {
    emit(AppActions.backup.actions.createBackupFinished());
    emit(AppActions.backup.actions.getBackupsList());
  };

  const backupService = Services.services().backupService;
  backupService.events.addEventListener({
    event: backupService.events.types.CREATE_BACKUP_FINISHED,
    handlerId: 'bs_onCreateBackupFinishedEventHandler',
    handler: onCreateBackupFinishedEventHandler,
  });

  return () => {
    backupService.events.removeEventListener({
      event: backupService.events.types.CREATE_BACKUP_FINISHED,
      handlerId: 'bs_onCreateBackupFinishedEventHandler',
    });
  };
};

export default bs_onCreateBackupFinishedEventHandler;
