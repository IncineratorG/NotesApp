import {call, put} from '@redux-saga/core/effects';
import Services from '../../../../services/Services';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import AppActions from '../../../actions/AppActions';

function* asa_loadAppSettingsSagaHandler(action) {
  try {
    const notesService = Services.services().notesService;
    const appSettings = yield call(notesService.getAppSettings);

    yield put(
      AppActions.appSettings.actions.loadAppSettingsFinished({appSettings}),
    );
  } catch (e) {
    SystemEventsHandler.onError({
      err: 'asa_loadAppSettingsSagaHandler->ERROR: ' + e.toString(),
    });
    yield put(AppActions.appSettings.actions.loadAppSettingsError());
  }
}

export default asa_loadAppSettingsSagaHandler;
