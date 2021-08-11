import {call, select} from '@redux-saga/core/effects';
import Services from '../../../../services/Services';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';

function* asa_setAutoTrashClearingSagaHandler(action) {
  const {clear} = action.payload;

  const {notes, other} = yield select(state => state.appSettings);

  const appSettings = {
    notes,
    other: {
      ...other,
      trash: {
        ...other.trash,
        automaticCleaning: clear,
      },
    },
  };

  try {
    const notesService = Services.services().notesService;
    yield call(notesService.updateAppSettings, {appSettings});
  } catch (e) {
    SystemEventsHandler.onError({
      err: 'asa_setAutoTrashClearingSagaHandler->ERROR: ' + e.toString(),
    });
  }
}

export default asa_setAutoTrashClearingSagaHandler;
