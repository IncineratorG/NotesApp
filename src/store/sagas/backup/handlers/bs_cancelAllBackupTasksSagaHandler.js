import {call, put} from '@redux-saga/core/effects';
import Services from '../../../../services/Services';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import AppActions from '../../../actions/AppActions';

function* bs_cancelAllBackupTasksSagaHandler(action) {
  try {
    const backupService = Services.services().backupService;
    yield call(backupService.cancelAllBackupTasks);
  } catch (e) {
    SystemEventsHandler.onError({
      err: 'bs_cancelAllBackupTasksSagaHandler()->ERROR: ' + e.toString(),
    });
  }
}

export default bs_cancelAllBackupTasksSagaHandler;
