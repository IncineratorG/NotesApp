import {call} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import Services from '../../../../services/Services';

function* ns_deleteNoteCompletelySagaHandler(action) {
  const {id} = action.payload;

  try {
    const noteService = Services.services().notesService;
    yield call(noteService.removeNote, {id});
  } catch (e) {
    SystemEventsHandler.onError({
      err: 'ns_deleteNoteCompletelySagaHandler()->ERROR: ' + e.toString(),
    });
  }
}

export default ns_deleteNoteCompletelySagaHandler;
