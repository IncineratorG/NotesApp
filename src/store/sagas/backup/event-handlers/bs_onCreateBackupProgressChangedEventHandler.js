import Services from '../../../../services/Services';
import AppActions from '../../../actions/AppActions';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';

const bs_onCreateBackupProgressChangedEventHandler = emit => {
  const onCreateBackupProgressChangedEventHandler = ({
    stageType,
    stageDescription,
    currentProgressItem,
    totalProgressItems,
  }) => {
    emit(
      AppActions.backup.actions.createBackupProgressChanged({
        stageType,
        stageDescription,
        currentProgressItem,
        totalProgressItems,
      }),
    );
  };

  const backupService = Services.services().backupService;
  backupService.events.addEventListener({
    event: backupService.events.types.CREATE_BACKUP_PROGRESS_CHANGED,
    handlerId: 'bs_onCreateBackupProgressChangedEventHandler',
    handler: onCreateBackupProgressChangedEventHandler,
  });

  return () => {
    backupService.events.removeEventListener({
      event: backupService.events.types.CREATE_BACKUP_PROGRESS_CHANGED,
      handlerId: 'bs_onCreateBackupProgressChangedEventHandler',
    });
  };
};

export default bs_onCreateBackupProgressChangedEventHandler;
