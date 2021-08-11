import {call, select} from '@redux-saga/core/effects';
import Services from '../../../../services/Services';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';

function* asa_setNoteImageQualitySagaHandler(action) {
  const {imageQuality} = action.payload;

  const {notes, other} = yield select(state => state.appSettings);

  const appSettings = {
    notes: {
      ...notes,
      noteImageQuality: imageQuality,
    },
    other,
  };

  try {
    const notesService = Services.services().notesService;
    yield call(notesService.updateAppSettings, {appSettings});
  } catch (e) {
    SystemEventsHandler.onError({
      err: 'asa_setNoteImageQualitySagaHandler->ERROR: ' + e.toString(),
    });
  }
}

export default asa_setNoteImageQualitySagaHandler;
