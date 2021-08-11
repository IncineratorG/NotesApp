import {call, put} from '@redux-saga/core/effects';
import Services from '../../../../services/Services';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import AppActions from '../../../actions/AppActions';

function* bs_getNotesImagesSizeInBytesSagaHandler(action) {
  yield put(AppActions.backup.actions.getNotesImagesSizeBegin());

  try {
    const backupService = Services.services().backupService;
    yield call(backupService.getNoteImagesSizeInBytes);
  } catch (e) {
    SystemEventsHandler.onError({
      err: 'bs_getNotesImagesSizeInBytesSagaHandler()->ERROR: ' + e.toString(),
    });

    yield put(
      AppActions.backup.actions.getNotesImagesSizeError({
        code: '1',
        message: e.toString(),
      }),
    );
  }
}

export default bs_getNotesImagesSizeInBytesSagaHandler;
