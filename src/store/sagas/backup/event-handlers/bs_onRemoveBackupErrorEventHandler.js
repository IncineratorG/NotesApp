import Services from '../../../../services/Services';
import AppActions from '../../../actions/AppActions';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';

const bs_onRemoveBackupErrorEventHandler = emit => {
  const onRemoveBackupErrorEventHandler = ({code, message}) => {
    emit(AppActions.backup.actions.removeBackupError({code, message}));
  };

  const backupService = Services.services().backupService;
  backupService.events.addEventListener({
    event: backupService.events.types.REMOVE_BACKUP_ERROR,
    handlerId: 'bs_onRemoveBackupErrorEventHandler',
    handler: onRemoveBackupErrorEventHandler,
  });

  return () => {
    backupService.events.removeEventListener({
      event: backupService.events.types.REMOVE_BACKUP_ERROR,
      handlerId: 'bs_onRemoveBackupErrorEventHandler',
    });
  };
};

export default bs_onRemoveBackupErrorEventHandler;
