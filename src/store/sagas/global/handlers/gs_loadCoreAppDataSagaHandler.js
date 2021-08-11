import {call, put, all} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import Services from '../../../../services/Services';
import AppActions from '../../../actions/AppActions';

function* gs_loadCoreAppDataSagaHandler(action) {
  try {
    const notesService = Services.services().notesService;
    const {
      appSettings,
      notesListSettings,
      categoriesList,
      notesList,
      vaultPassword,
      vaultNotesListIdsSet,
    } = yield call(notesService.getCoreAppData);

    yield all([
      put(
        AppActions.appSettings.actions.loadAppSettingsFinished({appSettings}),
      ),
      put(
        AppActions.notes.actions.loadNotesListFinished({
          settings: notesListSettings,
          notesList,
          vaultedNotesIdsSet: vaultNotesListIdsSet,
        }),
      ),
      put(
        AppActions.categories.actions.loadCategoriesFinished({categoriesList}),
      ),
      put(
        AppActions.vault.actions.loadVaultPasswordFinished({
          password: vaultPassword,
        }),
      ),
    ]);
  } catch (e) {
    SystemEventsHandler.onError({
      err: 'gs_loadCoreAppDataSagaHandler()->ERROR: ' + e.toString(),
    });
  }
}

export default gs_loadCoreAppDataSagaHandler;
