import {takeLatest} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../utils/common/system-events-handler/SystemEventsHandler';
import AppActions from '../../actions/AppActions';
import asa_setDefaultNoteTextSizeSagaHandler from './handlers/asa_setDefaultNoteTextSizeSagaHandler';
import asa_setAutoTrashClearingSagaHandler from './handlers/asa_setAutoTrashClearingSagaHandler';
import asa_moveCheckedListItemsToBottomSagaHandler from './handlers/asa_moveCheckedListItemsToBottomSagaHandler';
import asa_loadAppSettingsSagaHandler from './handlers/asa_loadAppSettingsSagaHandler';
import asa_setNoteImageQualitySagaHandler from './handlers/asa_setNoteImageQualitySagaHandler';

function* appSettingsSaga() {
  SystemEventsHandler.onInfo({info: 'appSettingsSaga'});

  yield takeLatest(
    AppActions.appSettings.types.LOAD_APP_SETTINGS,
    asa_loadAppSettingsSagaHandler,
  );
  yield takeLatest(
    AppActions.appSettings.types.SET_DEFAULT_NOTE_TEXT_SIZE,
    asa_setDefaultNoteTextSizeSagaHandler,
  );
  yield takeLatest(
    AppActions.appSettings.types.SET_AUTO_TRASH_CLEARING,
    asa_setAutoTrashClearingSagaHandler,
  );
  yield takeLatest(
    AppActions.appSettings.types.SET_MOVE_CHECKED_LIST_ITEMS_TO_BOTTOM,
    asa_moveCheckedListItemsToBottomSagaHandler,
  );
  yield takeLatest(
    AppActions.appSettings.types.SET_NOTE_IMAGE_QUALITY,
    asa_setNoteImageQualitySagaHandler,
  );
}

export default appSettingsSaga;
