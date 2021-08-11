import {takeLatest, debounce} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../utils/common/system-events-handler/SystemEventsHandler';
import AppActions from '../../actions/AppActions';
import vs_loadVaultPasswordSagaHandler from './handlers/vs_loadVaultPasswordSagaHandler';
import vs_setNewVaultPasswordSagaHandler from './handlers/vs_setNewVaultPasswordSagaHandler';
import vs_moveNoteToVaultSagaHandler from './handlers/vs_moveNoteToVaultSagaHandler';
import vs_moveNoteFromVaultSagaHandler from './handlers/vs_moveNoteFromVaultSagaHandler';
import vs_resetVaultPasswordSagaHandler from './handlers/vs_resetVaultPasswordSagaHandler';
import vs_updateVaultedNoteSagaHandler from './handlers/vs_updateVaultedNoteSagaHandler';

function* vaultSaga() {
  SystemEventsHandler.onInfo({info: 'vaultSaga'});

  yield takeLatest(
    AppActions.vault.types.LOAD_VAULT_PASSWORD,
    vs_loadVaultPasswordSagaHandler,
  );
  yield takeLatest(
    AppActions.vault.types.SET_NEW_VAULT_PASSWORD,
    vs_setNewVaultPasswordSagaHandler,
  );
  yield takeLatest(
    AppActions.vault.types.RESET_VAULT_PASSWORD,
    vs_resetVaultPasswordSagaHandler,
  );
  yield takeLatest(
    AppActions.vault.types.MOVE_NOTE_TO_VAULT,
    vs_moveNoteToVaultSagaHandler,
  );
  yield takeLatest(
    AppActions.vault.types.MOVE_NOTE_FROM_VAULT,
    vs_moveNoteFromVaultSagaHandler,
  );
  yield debounce(
    300,
    AppActions.vault.types.UPDATE_VAULTED_NOTE,
    vs_updateVaultedNoteSagaHandler,
  );
}

export default vaultSaga;
