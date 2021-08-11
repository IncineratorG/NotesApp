import {call} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import Services from '../../../../services/Services';

function* vs_setNewVaultPasswordSagaHandler(action) {
  const {password} = action.payload;

  try {
    const notesService = Services.services().notesService;
    yield call(notesService.updateVaultPassword, {password});
  } catch (e) {
    SystemEventsHandler.onError({
      err: 'vs_loadVaultPasswordSagaHandler()->ERROR: ' + e.toString(),
    });
  }
}

export default vs_setNewVaultPasswordSagaHandler;
