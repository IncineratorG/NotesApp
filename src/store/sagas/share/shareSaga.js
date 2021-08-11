import {takeLatest} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../utils/common/system-events-handler/SystemEventsHandler';
import AppActions from '../../actions/AppActions';
import ss_shareNoteViaAppSagaHandler from './handlers/ss_shareNoteViaAppSagaHandler';

function* shareSaga() {
  SystemEventsHandler.onInfo({info: 'shareSaga'});

  yield takeLatest(
    AppActions.share.types.SHARE_NOTE_VIA_APP,
    ss_shareNoteViaAppSagaHandler,
  );
}

export default shareSaga;
