import Services from '../../../../services/Services';
import AppActions from '../../../actions/AppActions';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';

const bs_onGetBackupsListErrorEventHandler = emit => {
  const onGetBackupsListErrorEventHandler = ({code, message}) => {
    emit(AppActions.backup.actions.getBackupsListError({code, message}));
  };

  const backupService = Services.services().backupService;
  backupService.events.addEventListener({
    event: backupService.events.types.GET_BACKUPS_LIST_ERROR,
    handlerId: 'bs_onGetBackupsListErrorEventHandler',
    handler: onGetBackupsListErrorEventHandler,
  });

  return () => {
    backupService.events.removeEventListener({
      event: backupService.events.types.GET_BACKUPS_LIST_ERROR,
      handlerId: 'bs_onGetBackupsListErrorEventHandler',
    });
  };
};

export default bs_onGetBackupsListErrorEventHandler;
