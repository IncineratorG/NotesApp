import Services from '../../../../services/Services';
import AppActions from '../../../actions/AppActions';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';

const bs_onLogOutResultEventHandler = emit => {
  const onLogOutResultEventHandler = ({successful, error}) => {
    if (successful) {
      emit(AppActions.backup.actions.logOutFinished());
    }
  };

  const backupService = Services.services().backupService;
  backupService.events.addEventListener({
    event: backupService.events.types.LOG_OUT_RESULT,
    handlerId: 'bs_onLogOutResultEventHandler',
    handler: onLogOutResultEventHandler,
  });

  return () => {
    backupService.events.removeEventListener({
      event: backupService.events.types.LOG_OUT_RESULT,
      handlerId: 'bs_onLogOutResultEventHandler',
    });
  };
};

export default bs_onLogOutResultEventHandler;
