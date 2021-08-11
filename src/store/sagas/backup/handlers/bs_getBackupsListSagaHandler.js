import {call, put} from '@redux-saga/core/effects';
import Services from '../../../../services/Services';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import AppActions from '../../../actions/AppActions';

function* bs_getBackupsListSagaHandler(action) {
  yield put(AppActions.backup.actions.getBackupsListBegin());

  try {
    const backupService = Services.services().backupService;
    yield call(backupService.getBackupsList);
  } catch (e) {
    SystemEventsHandler.onError({
      err: 'bs_getBackupsListSagaHandler()->ERROR: ' + JSON.stringify(e),
    });

    const {code, message} = e;

    yield put(
      AppActions.backup.actions.getBackupsListError({
        code,
        message,
      }),
    );
  }
}

export default bs_getBackupsListSagaHandler;
