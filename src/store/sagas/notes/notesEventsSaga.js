import {call, put, take, takeEvery} from '@redux-saga/core/effects';
import {eventChannel} from 'redux-saga';
import {SystemEventsHandler} from '../../../utils/common/system-events-handler/SystemEventsHandler';
import ns_openNoteRequestEventHandler from './event-handlers/ns_openNoteRequestEventHandler';
import ns_noteServiceDisposedEventHandler from './event-handlers/ns_noteServiceDisposedEventHandler';

function createNotesEventsChannel() {
  return eventChannel(emit => {
    const openNoteRequestEventUnsubscribe = ns_openNoteRequestEventHandler(
      emit,
    );

    return () => {
      openNoteRequestEventUnsubscribe();
    };
  });
}

function* notesEventsSaga() {
  SystemEventsHandler.onInfo({info: 'notesEventsSaga()'});

  const channel = yield call(createNotesEventsChannel);

  // yield takeEvery(channel, function* (action) {
  //   yield put(action);
  // });
  //
  // yield take('CLOSE_CHANNEL');
  // SystemEventsHandler.onInfo({info: 'WILL_CLOSE_CHANNEL'});
  // channel.close();

  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

export default notesEventsSaga;
