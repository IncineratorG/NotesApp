import {call, put} from '@redux-saga/core/effects';
import Services from '../../../../services/Services';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import AppActions from '../../../actions/AppActions';

function* bs_createBackupSagaHandler(action) {
  const {backupNote, needSaveImages} = action.payload;

  yield put(AppActions.backup.actions.createBackupBegin());

  try {
    const backupService = Services.services().backupService;
    yield call(backupService.createBackup, {backupNote, needSaveImages});
  } catch (e) {
    SystemEventsHandler.onError({
      err: 'bs_createBackupSagaHandler()->ERROR: ' + e.toString(),
    });

    yield put(
      AppActions.backup.actions.createBackupError({
        code: '3',
        message: e.toString(),
      }),
    );
  }
}

export default bs_createBackupSagaHandler;
