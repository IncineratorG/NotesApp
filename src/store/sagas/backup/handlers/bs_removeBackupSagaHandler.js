import {call, put} from '@redux-saga/core/effects';
import Services from '../../../../services/Services';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import AppActions from '../../../actions/AppActions';

function* bs_removeBackupSagaHandler(action) {
  const {backupDriveId} = action.payload;

  yield put(AppActions.backup.actions.removeBackupBegin());

  try {
    const backupService = Services.services().backupService;
    yield call(backupService.removeBackup, {backupDriveId});
  } catch (e) {
    SystemEventsHandler.onError({
      err: 'bs_removeBackupSagaHandler()->ERROR: ' + JSON.stringify(e),
    });

    const {code, message} = e;

    yield put(
      AppActions.backup.actions.removeBackupError({
        code,
        message,
      }),
    );
  }
}

export default bs_removeBackupSagaHandler;
