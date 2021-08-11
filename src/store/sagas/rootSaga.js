import {all, spawn, call} from 'redux-saga/effects';
import {SystemEventsHandler} from '../../utils/common/system-events-handler/SystemEventsHandler';
import notesSaga from './notes/notesSaga';
import categoriesSaga from './categories/categoriesSaga';
import appSettingsSaga from './app-settings/appSettingsSaga';
import notesEventsSaga from './notes/notesEventsSaga';
import shareSaga from './share/shareSaga';
import shareEventsSaga from './share/shareEventsSaga';
import backupSaga from './backup/backupSaga';
import backupEventsSaga from './backup/backupEventsSaga';
import vaultSaga from './vault/vaultSaga';
import globalSaga from './global/globalSaga';

function* rootSaga() {
  const sagas = [
    globalSaga,
    notesSaga,
    notesEventsSaga,
    categoriesSaga,
    appSettingsSaga,
    shareSaga,
    shareEventsSaga,
    backupSaga,
    backupEventsSaga,
    vaultSaga,
  ];

  yield all(
    sagas.map(saga =>
      spawn(function* () {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (e) {
            SystemEventsHandler.onError({err: 'rootSaga()->ERROR: ' + e});
          }
        }
      }),
    ),
  );
}

export default rootSaga;
