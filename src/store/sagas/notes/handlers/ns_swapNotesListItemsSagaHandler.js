import {call, select} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import Services from '../../../../services/Services';

function* ns_swapNotesListItemsSagaHandler(action) {
  const allNotesList = yield select(state => state.notes.notesList.allNotes);

  try {
    const noteService = Services.services().notesService;
    yield call(noteService.updateMultipleNotes, {notesList: allNotesList});
  } catch (e) {
    SystemEventsHandler.onError({
      err: 'ns_swapNotesListItemsSagaHandler()->ERROR: ' + e.toString(),
    });
  }
}

export default ns_swapNotesListItemsSagaHandler;
