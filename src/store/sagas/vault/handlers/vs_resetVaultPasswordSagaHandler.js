import {call} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import Services from '../../../../services/Services';

function* vs_resetVaultPasswordSagaHandler(action) {
  try {
    const notesService = Services.services().notesService;

    // Сбрасываем пароль от хранилища.
    yield call(notesService.updateVaultPassword, {password: null});

    const {notes} = yield call(notesService.getNotesList);
    const vaultedNotesIds = [];
    notes.forEach(note => {
      if (note.vaultedDateTimestamp > 0) {
        vaultedNotesIds.push(note.id);
      }
    });

    // Удаляем находящиеся в хранилище заметки.
    yield call(notesService.removeMultipleNotes, {
      idsArray: [...vaultedNotesIds],
    });
  } catch (e) {
    SystemEventsHandler.onError({
      err: 'vs_resetVaultPasswordSagaHandler()->ERROR: ' + e.toString(),
    });
  }
}

export default vs_resetVaultPasswordSagaHandler;
