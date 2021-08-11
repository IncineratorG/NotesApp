import {call, put} from '@redux-saga/core/effects';
import Services from '../../../../services/Services';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import AppActions from '../../../actions/AppActions';

function* bs_restoreFromBackupSagaHandler(action) {
  const {backupDriveId} = action.payload;

  yield put(AppActions.backup.actions.restoreFromBackupBegin());

  try {
    // Отменяем все запланированные уведомления.
    const notesService = Services.services().notesService;
    yield call(notesService.removeAllReminders);

    // Производим восстановление из выбранной резервной копии.
    const backupService = Services.services().backupService;
    yield call(backupService.restoreFromBackup, {backupDriveId});

    // Очищаем кэш заметок.
    yield call(notesService.invalidateCaches);
  } catch (e) {
    SystemEventsHandler.onError({
      err: 'bs_restoreFromBackupSagaHandler()->ERROR: ' + JSON.stringify(e),
    });

    const {code, message} = e;

    yield put(
      AppActions.backup.actions.restoreFromBackupError({
        code,
        message,
      }),
    );
  }
}

export default bs_restoreFromBackupSagaHandler;

// import {call, put} from '@redux-saga/core/effects';
// import Services from '../../../../services/Services';
// import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
// import AppActions from '../../../actions/AppActions';
//
// function* bs_restoreFromBackupSagaHandler(action) {
//   const {backupDriveId} = action.payload;
//
//   yield put(AppActions.backup.actions.restoreFromBackupBegin());
//
//   try {
//     const backupService = Services.services().backupService;
//     yield call(backupService.restoreFromBackup, {backupDriveId});
//
//     const notesService = Services.services().notesService;
//     yield call(notesService.invalidateCaches);
//   } catch (e) {
//     SystemEventsHandler.onError({
//       err: 'bs_restoreFromBackupSagaHandler()->ERROR: ' + JSON.stringify(e),
//     });
//
//     const {code, message} = e;
//
//     yield put(
//       AppActions.backup.actions.restoreFromBackupError({
//         code,
//         message,
//       }),
//     );
//   }
// }
//
// export default bs_restoreFromBackupSagaHandler;
