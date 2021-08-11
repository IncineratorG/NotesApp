import {call} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import Services from '../../../../services/Services';
import ReminderRepeatOption from '../../../../data/common/reminder-repeat-options/ReminderRepeatOptions';

function* ns_moveNoteToTrashSagaHandler(action) {
  const {note} = action.payload;

  const updatedNote = {
    ...note,
    reminder: {
      ...note.reminder,
      selectedDateInMilliseconds: -1,
      repeatOption: ReminderRepeatOption.NO_REPEAT,
    },
    deleted: true,
    deleteDateTimestamp: Date.now(),
  };

  try {
    const noteService = Services.services().notesService;
    yield call(noteService.removeNoteReminder, {noteId: note.id});
    yield call(noteService.updateNote, {note: updatedNote});
  } catch (e) {
    SystemEventsHandler.onError({
      err: 'ns_moveNoteToTrashSagaHandler()->ERROR: ' + e.toString(),
    });
  }
}

export default ns_moveNoteToTrashSagaHandler;
