import {takeLatest} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../utils/common/system-events-handler/SystemEventsHandler';
import AppActions from '../../actions/AppActions';
import gs_loadCoreAppDataSagaHandler from './handlers/gs_loadCoreAppDataSagaHandler';

function* globalSaga() {
  SystemEventsHandler.onInfo({info: 'globalSaga'});

  yield takeLatest(
    AppActions.global.types.LOAD_CORE_APP_DATA,
    gs_loadCoreAppDataSagaHandler,
  );
}

export default globalSaga;
