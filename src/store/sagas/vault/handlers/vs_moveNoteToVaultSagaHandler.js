import {call} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import Services from '../../../../services/Services';
import ReminderRepeatOption from '../../../../data/common/reminder-repeat-options/ReminderRepeatOptions';

function* vs_moveNoteToVaultSagaHandler(action) {
  const {note} = action.payload;

  const updatedNote = {
    ...note,
    vaultedDateTimestamp: Date.now(),
    reminder: {
      ...note.reminder,
      selectedDateInMilliseconds: -1,
      repeatOption: ReminderRepeatOption.NO_REPEAT,
    },
  };

  try {
    const noteService = Services.services().notesService;

    yield call(noteService.removeNoteReminder, {noteId: note.id});
    yield call(noteService.updateNote, {note: updatedNote});
  } catch (e) {
    SystemEventsHandler.onError({
      err: 'vs_moveNoteToVaultSagaHandler()->ERROR: ' + e.toString(),
    });
  }
}

export default vs_moveNoteToVaultSagaHandler;
