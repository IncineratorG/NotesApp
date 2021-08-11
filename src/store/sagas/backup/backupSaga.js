import {takeLatest} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../utils/common/system-events-handler/SystemEventsHandler';
import AppActions from '../../actions/AppActions';
import bs_getNotesImagesSizeInBytesSagaHandler from './handlers/bs_getNotesImagesSizeInBytesSagaHandler';
import bs_cancelAllBackupTasksSagaHandler from './handlers/bs_cancelAllBackupTasksSagaHandler';
import bs_logInSagaHandler from './handlers/bs_logInSagaHandler';
import bs_logOutSagaHandler from './handlers/bs_logOutSagaHandler';
import bs_createBackupSagaHandler from './handlers/bs_createBackupSagaHandler';
import bs_getBackupsListSagaHandler from './handlers/bs_getBackupsListSagaHandler';
import bs_removeBackupSagaHandler from './handlers/bs_removeBackupSagaHandler';
import bs_restoreFromBackupSagaHandler from './handlers/bs_restoreFromBackupSagaHandler';

function* backupSaga() {
  SystemEventsHandler.onInfo({info: 'backupSaga'});

  yield takeLatest(AppActions.backup.types.LOG_IN, bs_logInSagaHandler);
  yield takeLatest(AppActions.backup.types.LOG_OUT, bs_logOutSagaHandler);
  yield takeLatest(
    AppActions.backup.types.GET_NOTES_IMAGES_SIZE,
    bs_getNotesImagesSizeInBytesSagaHandler,
  );
  yield takeLatest(
    AppActions.backup.types.CANCEL_ALL_BACKUP_TASKS,
    bs_cancelAllBackupTasksSagaHandler,
  );
  yield takeLatest(
    AppActions.backup.types.CREATE_BACKUP,
    bs_createBackupSagaHandler,
  );
  yield takeLatest(
    AppActions.backup.types.GET_BACKUPS_LIST,
    bs_getBackupsListSagaHandler,
  );
  yield takeLatest(
    AppActions.backup.types.REMOVE_BACKUP,
    bs_removeBackupSagaHandler,
  );
  yield takeLatest(
    AppActions.backup.types.RESTORE_FROM_BACKUP,
    bs_restoreFromBackupSagaHandler,
  );
}

export default backupSaga;
