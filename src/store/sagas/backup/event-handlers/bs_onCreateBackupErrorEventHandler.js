import Services from '../../../../services/Services';
import AppActions from '../../../actions/AppActions';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';

const bs_onCreateBackupErrorEventHandler = emit => {
  const onCreateBackupErrorEventHandler = ({code, message}) => {
    emit(AppActions.backup.actions.createBackupError({code, message}));
  };

  const backupService = Services.services().backupService;
  backupService.events.addEventListener({
    event: backupService.events.types.CREATE_BACKUP_ERROR,
    handlerId: 'bs_onCreateBackupErrorEventHandler',
    handler: onCreateBackupErrorEventHandler,
  });

  return () => {
    backupService.events.removeEventListener({
      event: backupService.events.types.CREATE_BACKUP_ERROR,
      handlerId: 'bs_onCreateBackupErrorEventHandler',
    });
  };
};

export default bs_onCreateBackupErrorEventHandler;
