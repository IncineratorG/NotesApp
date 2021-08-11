import {call, select} from '@redux-saga/core/effects';
import Services from '../../../../services/Services';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';

function* asa_moveCheckedListItemsToBottomSagaHandler(action) {
  const {moveCheckedToBottom} = action.payload;

  const {notes, other} = yield select(state => state.appSettings);

  const appSettings = {
    notes: {
      ...notes,
      moveCheckedToBottom,
    },
    other,
  };

  try {
    const notesService = Services.services().notesService;
    yield call(notesService.updateAppSettings, {appSettings});
  } catch (e) {
    SystemEventsHandler.onError({
      err:
        'asa_moveCheckedListItemsToBottomSagaHandler->ERROR: ' + e.toString(),
    });
  }
}

export default asa_moveCheckedListItemsToBottomSagaHandler;
