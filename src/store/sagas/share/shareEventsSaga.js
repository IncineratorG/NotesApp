import {call, put, take} from '@redux-saga/core/effects';
import {eventChannel} from 'redux-saga';
import {SystemEventsHandler} from '../../../utils/common/system-events-handler/SystemEventsHandler';
import ss_shareServiceAvailabilityChangeEventHandler from './event-handlers/ss_shareServiceAvailabiltyChangeEventHandler';

function createShareEventsChannel() {
  return eventChannel(emit => {
    const shareServiceAvailabilityChangeUnsubscribe = ss_shareServiceAvailabilityChangeEventHandler(
      emit,
    );

    return () => {
      shareServiceAvailabilityChangeUnsubscribe();
    };
  });
}

function* shareEventsSaga() {
  SystemEventsHandler.onInfo({info: 'shareEventsSaga()'});

  const channel = yield call(createShareEventsChannel);

  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

export default shareEventsSaga;
