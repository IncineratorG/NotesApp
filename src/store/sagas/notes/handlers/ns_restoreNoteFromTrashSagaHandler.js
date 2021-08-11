import {call} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import Services from '../../../../services/Services';

function* ns_restoreNoteFromTrashSagaHandler(action) {
  const {note} = action.payload;

  const updatedNote = {
    ...note,
    deleted: false,
    deleteDateTimestamp: -1,
  };

  try {
    const noteService = Services.services().notesService;
    yield call(noteService.updateNote, {note: updatedNote});
  } catch (e) {
    SystemEventsHandler.onError({
      err: 'ns_restoreNoteFromTrashSagaHandler()->ERROR: ' + e.toString(),
    });
  }
}

export default ns_restoreNoteFromTrashSagaHandler;
