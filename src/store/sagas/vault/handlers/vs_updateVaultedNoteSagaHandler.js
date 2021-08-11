import {call} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import Services from '../../../../services/Services';

function* vs_updateVaultedNoteSagaHandler(action) {
  SystemEventsHandler.onInfo({info: 'vs_updateVaultedNoteSagaHandler()'});

  const {note} = action.payload;

  try {
    const noteService = Services.services().notesService;
    yield call(noteService.updateNote, {note});
  } catch (e) {
    SystemEventsHandler.onError({
      err: 'vs_updateVaultedNoteSagaHandler()->ERROR: ' + e.toString(),
    });
  }
}

export default vs_updateVaultedNoteSagaHandler;
