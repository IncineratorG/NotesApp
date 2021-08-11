import {call} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import Services from '../../../../services/Services';

function* ns_deleteMultipleNotesCompletelySagaHandler(action) {
  const {idsArray} = action.payload;

  try {
    const noteService = Services.services().notesService;
    yield call(noteService.removeMultipleNotes, {idsArray});
  } catch (e) {
    SystemEventsHandler.onError({
      err: 'ns_deleteNoteCompletelySagaHandler()->ERROR: ' + e.toString(),
    });
  }
}

export default ns_deleteMultipleNotesCompletelySagaHandler;
