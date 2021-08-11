import {call} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import Services from '../../../../services/Services';

function* vs_moveNoteFromVaultSagaHandler(action) {
  const {note} = action.payload;

  const updatedNote = {
    ...note,
    vaultedDateTimestamp: -1,
  };

  try {
    const noteService = Services.services().notesService;

    yield call(noteService.updateNote, {note: updatedNote});
  } catch (e) {
    SystemEventsHandler.onError({
      err: 'vs_moveNoteFromVaultSagaHandler()->ERROR: ' + e.toString(),
    });
  }
}

export default vs_moveNoteFromVaultSagaHandler;
