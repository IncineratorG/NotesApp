import Services from '../../../../services/Services';
import AppActions from '../../../actions/AppActions';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';

const bs_onGetBackupsListResultEventHandler = emit => {
  const onGetBackupsListResultEventHandler = data => {
    emit(AppActions.backup.actions.getBackupsListFinished({backupsList: data}));
  };

  const backupService = Services.services().backupService;
  backupService.events.addEventListener({
    event: backupService.events.types.GET_BACKUPS_LIST_RESULT,
    handlerId: 'bs_onGetBackupsListResultEventHandler',
    handler: onGetBackupsListResultEventHandler,
  });

  return () => {
    backupService.events.removeEventListener({
      event: backupService.events.types.GET_BACKUPS_LIST_RESULT,
      handlerId: 'bs_onGetBackupsListResultEventHandler',
    });
  };
};

export default bs_onGetBackupsListResultEventHandler;
