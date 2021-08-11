import Services from '../../../../services/Services';
import AppActions from '../../../actions/AppActions';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';

const bs_onRemoveBackupFinishedEventHandler = emit => {
  const onRemoveBackupFinishedEventHandler = () => {
    SystemEventsHandler.onInfo({
      info: 'bs_onRemoveBackupFinishedEventHandler()',
    });
    emit(AppActions.backup.actions.removeBackupFinished());
    emit(AppActions.backup.actions.getBackupsList());
  };

  const backupService = Services.services().backupService;
  backupService.events.addEventListener({
    event: backupService.events.types.REMOVE_BACKUP_FINISHED,
    handlerId: 'bs_onRemoveBackupFinishedEventHandler',
    handler: onRemoveBackupFinishedEventHandler,
  });

  return () => {
    backupService.events.removeEventListener({
      event: backupService.events.types.REMOVE_BACKUP_FINISHED,
      handlerId: 'bs_onRemoveBackupFinishedEventHandler',
    });
  };
};

export default bs_onRemoveBackupFinishedEventHandler;
