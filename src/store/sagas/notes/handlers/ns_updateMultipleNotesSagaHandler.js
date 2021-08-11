import {call} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import Services from '../../../../services/Services';

function* ns_updateMultipleNotesSagaHandler(action) {
  const {notesList} = action.payload;
  if (!notesList) {
    SystemEventsHandler.onError({
      err: 'ns_updateMultipleNotesSagaHandler()->BAD_NOTES_LIST',
    });
    return;
  }

  try {
    const noteService = Services.services().notesService;
    yield call(noteService.updateMultipleNotes, {notesList});
  } catch (e) {
    SystemEventsHandler.onError({
      err: 'ns_updateMultipleNotesSagaHandler()->ERROR: ' + e.toString(),
    });
  }
}

export default ns_updateMultipleNotesSagaHandler;
