import {call, put} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import Services from '../../../../services/Services';
import AppActions from '../../../actions/AppActions';

function* vs_loadVaultPasswordSagaHandler(action) {
  yield put(AppActions.vault.actions.loadVaultPasswordBegin());

  try {
    const notesService = Services.services().notesService;
    const password = yield call(notesService.getVaultPassword);

    yield put(AppActions.vault.actions.loadVaultPasswordFinished({password}));
  } catch (e) {
    SystemEventsHandler.onError({
      err: 'vs_loadVaultPasswordSagaHandler()->ERROR: ' + e.toString(),
    });

    const {code, message} = e;

    yield put(AppActions.vault.actions.loadVaultPasswordError({code, message}));
  }
}

export default vs_loadVaultPasswordSagaHandler;
