import Services from '../../../../services/Services';
import AppActions from '../../../actions/AppActions';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';

const bs_onRestoreFromBackupErrorEventHandler = emit => {
  const onRestoreFromBackupErrorEventHandler = ({code, message}) => {
    emit(AppActions.backup.actions.restoreFromBackupError({code, message}));
  };

  const backupService = Services.services().backupService;
  backupService.events.addEventListener({
    event: backupService.events.types.RESTORE_FROM_BACKUP_ERROR,
    handlerId: 'bs_onRestoreFromBackupErrorEventHandler',
    handler: onRestoreFromBackupErrorEventHandler,
  });

  return () => {
    backupService.events.removeEventListener({
      event: backupService.events.types.RESTORE_FROM_BACKUP_ERROR,
      handlerId: 'bs_onRestoreFromBackupErrorEventHandler',
    });
  };
};

export default bs_onRestoreFromBackupErrorEventHandler;
