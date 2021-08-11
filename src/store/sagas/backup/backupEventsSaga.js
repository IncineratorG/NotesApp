import {call, put, take} from '@redux-saga/core/effects';
import {eventChannel} from 'redux-saga';
import {SystemEventsHandler} from '../../../utils/common/system-events-handler/SystemEventsHandler';
import bs_onNotesImagesSizeInBytesResultEventHandler from './event-handlers/bs_onNotesImagesSizeInBytesResultEventHandler';
import bs_onLoginResultEventHandler from './event-handlers/bs_onLoginResultEventHandler';
import bs_onLogOutResultEventHandler from './event-handlers/bs_onLogOutResultEventHandler';
import bs_onCreateBackupProgressChangedEventHandler from './event-handlers/bs_onCreateBackupProgressChangedEventHandler';
import bs_onCreateBackupFinishedEventHandler from './event-handlers/bs_onCreateBackupFinishedEventHandler';
import bs_onCreateBackupCancelledEventHandler from './event-handlers/bs_onCreateBackupCancelledEventHandler';
import bs_onCreateBackupErrorEventHandler from './event-handlers/bs_onCreateBackupErrorEventHandler';
import bs_onGetBackupsListResultEventHandler from './event-handlers/bs_onGetBackupsListResultEventHandler';
import bs_onGetBackupsListErrorEventHandler from './event-handlers/bs_onGetBackupsListErrorEventHandler';
import bs_onRemoveBackupFinishedEventHandler from './event-handlers/bs_onRemoveBackupFinishedEventHandler';
import bs_onRemoveBackupErrorEventHandler from './event-handlers/bs_onRemoveBackupErrorEventHandler';
import bs_onRestoreFromBackupProgressChangedEventHandler from './event-handlers/bs_onRestoreFromBackupProgressChangedEventHandler';
import bs_onRestoreFromBackupFinishedEventHandler from './event-handlers/bs_onRestoreFromBackupFinishedEventHandler';
import bs_onRestoreFromBackupCancelledEventHandler from './event-handlers/bs_onRestoreFromBackupCancelledEventHandler';
import bs_onRestoreFromBackupErrorEventHandler from './event-handlers/bs_onRestoreFromBackupErrorEventHandler';

function createBackupEventsChannel() {
  return eventChannel(emit => {
    const onNotesImagesSizeInBytesResultEventUnsubscribe = bs_onNotesImagesSizeInBytesResultEventHandler(
      emit,
    );
    const onLoginResultEventUnsubscribe = bs_onLoginResultEventHandler(emit);
    const onLogOutResultEventUnsubscribe = bs_onLogOutResultEventHandler(emit);
    const onCreateBackupProgressChangedEventUnsubscribe = bs_onCreateBackupProgressChangedEventHandler(
      emit,
    );
    const onCreateBackupFinishedEventUnsubscribe = bs_onCreateBackupFinishedEventHandler(
      emit,
    );
    const onCreateBackupCancelledEventUnsubscribe = bs_onCreateBackupCancelledEventHandler(
      emit,
    );
    const onCreateBackupErrorEventUnsubscribe = bs_onCreateBackupErrorEventHandler(
      emit,
    );
    const onGetBackupsListResultEventUnsubscribe = bs_onGetBackupsListResultEventHandler(
      emit,
    );
    const onGetBackupsListErrorEventUnsubscribe = bs_onGetBackupsListErrorEventHandler(
      emit,
    );
    const onRemoveBackupFinishedEventUnsubscribe = bs_onRemoveBackupFinishedEventHandler(
      emit,
    );
    const onRemoveBackupErrorEventUnsubscribe = bs_onRemoveBackupErrorEventHandler(
      emit,
    );
    const onRestoreFromBackupProgressChangedEventUnsubscribe = bs_onRestoreFromBackupProgressChangedEventHandler(
      emit,
    );
    const onRestoreFromBackupFinishedEventUnsubscribe = bs_onRestoreFromBackupFinishedEventHandler(
      emit,
    );
    const onRestoreFromBackupCancelledEventUnsubscribe = bs_onRestoreFromBackupCancelledEventHandler(
      emit,
    );
    const onRestoreFromBackupErrorEventUnsubscribe = bs_onRestoreFromBackupErrorEventHandler(
      emit,
    );

    return () => {
      onNotesImagesSizeInBytesResultEventUnsubscribe();
      onLoginResultEventUnsubscribe();
      onLogOutResultEventUnsubscribe();
      onCreateBackupProgressChangedEventUnsubscribe();
      onCreateBackupFinishedEventUnsubscribe();
      onCreateBackupCancelledEventUnsubscribe();
      onCreateBackupErrorEventUnsubscribe();
      onGetBackupsListResultEventUnsubscribe();
      onGetBackupsListErrorEventUnsubscribe();
      onRemoveBackupFinishedEventUnsubscribe();
      onRemoveBackupErrorEventUnsubscribe();
      onRestoreFromBackupProgressChangedEventUnsubscribe();
      onRestoreFromBackupFinishedEventUnsubscribe();
      onRestoreFromBackupCancelledEventUnsubscribe();
      onRestoreFromBackupErrorEventUnsubscribe();
    };
  });
}

function* backupEventsSaga() {
  SystemEventsHandler.onInfo({info: 'backupEventsSaga()'});

  const channel = yield call(createBackupEventsChannel);

  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

export default backupEventsSaga;
