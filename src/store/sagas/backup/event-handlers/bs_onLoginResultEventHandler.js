import Services from '../../../../services/Services';
import AppActions from '../../../actions/AppActions';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';

const bs_onLoginResultEventHandler = emit => {
  const onLoginResultEventHandler = ({successful, email, error}) => {
    if (successful) {
      emit(AppActions.backup.actions.logInFinished({userName: email}));
      emit(AppActions.backup.actions.getBackupsList());
    }
  };

  const backupService = Services.services().backupService;
  backupService.events.addEventListener({
    event: backupService.events.types.LOG_IN_RESULT,
    handlerId: 'bs_onLoginResultEventHandler',
    handler: onLoginResultEventHandler,
  });

  return () => {
    backupService.events.removeEventListener({
      event: backupService.events.types.LOG_IN_RESULT,
      handlerId: 'bs_onLoginResultEventHandler',
    });
  };
};

export default bs_onLoginResultEventHandler;
