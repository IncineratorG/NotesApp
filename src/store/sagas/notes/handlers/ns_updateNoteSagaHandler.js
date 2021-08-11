import {call} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import Services from '../../../../services/Services';
import NoteToReminderMessage from '../../../../utils/note/note-to-reminder-message/NoteToReminderMessage';

function* ns_updateNoteSagaHandler(action) {
  const {note} = action.payload;

  const noteService = Services.services().notesService;

  let needUpdateReminder = false;
  let needRemoveReminder = false;

  const {
    reminder: {selectedDateInMilliseconds, repeatOption},
  } = note;

  if (selectedDateInMilliseconds > Date.now()) {
    needUpdateReminder = true;
  } else {
    const noteHasSavedReminder = noteService.hasReminder({noteId: note.id});
    if (noteHasSavedReminder) {
      needRemoveReminder = true;
    }
  }

  try {
    yield call(noteService.updateNote, {note});
    if (needUpdateReminder) {
      yield call(noteService.setNoteReminder, {
        noteId: note.id,
        title: note.title,
        message: NoteToReminderMessage.convert({note}),
        dateInMilliseconds: note.reminder.selectedDateInMilliseconds,
      });
    } else if (needRemoveReminder) {
      yield call(noteService.removeNoteReminder, {noteId: note.id});
    }
  } catch (e) {
    SystemEventsHandler.onError({
      err: 'ns_updateNoteSagaHandler()->ERROR: ' + e.toString(),
    });
  }
}

export default ns_updateNoteSagaHandler;

// import {call, select} from '@redux-saga/core/effects';
// import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
// import Services from '../../../../services/Services';
//
// function* ns_updateNoteSagaHandler(action) {
//   const {note} = action.payload;
//
//   SystemEventsHandler.onInfo({info: 'ns_updateNoteSagaHandler()'});
//
//   // ===
//   // =====
//   if (note && note.reminder) {
//     // const {selectedDateInMilliseconds, repeatOption} = note.reminder;
//     // if (selectedDateInMilliseconds > 0) {
//     // }
//     // SystemEventsHandler.onInfo({
//     //   info:
//     //     'ns_updateNoteSagaHandler(): ' +
//     //     id +
//     //     ' - ' +
//     //     selectedDateInMilliseconds +
//     //     ' - ' +
//     //     repeatOption,
//     // });
//     // const activeNotes = yield select(state => state.notes.notesList.notes);
//     // SystemEventsHandler.onInfo({
//     //   info: 'ns_updateNoteSagaHandler(): ' + JSON.stringify(activeNotes),
//     // });
//   }
//   // =====
//   // ===
//
//   try {
//     const noteService = Services.services().notesService;
//
//     yield call(noteService.updateNote, {note});
//   } catch (e) {
//     SystemEventsHandler.onError({
//       err: 'ns_updateNoteSagaHandler()->ERROR: ' + e.toString(),
//     });
//   }
// }
//
// export default ns_updateNoteSagaHandler;
