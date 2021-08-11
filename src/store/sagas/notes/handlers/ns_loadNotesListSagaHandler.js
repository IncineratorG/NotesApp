import {call, put} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import AppActions from '../../../actions/AppActions';
import Services from '../../../../services/Services';

function* ns_loadNotesListSagaHandler(action) {
  SystemEventsHandler.onInfo({info: 'ns_loadNotesListSagaHandler()'});

  yield put(AppActions.notes.actions.loadNotesListBegin());

  try {
    const notesService = Services.services().notesService;
    const {settings, notes, vaultedNotesIdsSet} = yield call(
      notesService.getNotesList,
    );

    yield put(
      AppActions.notes.actions.loadNotesListFinished({
        settings,
        notesList: notes,
        vaultedNotesIdsSet,
      }),
    );
  } catch (e) {
    SystemEventsHandler.onError({
      err: 'ns_loadNotesListSagaHandler()->ERROR: ' + e.toString(),
    });

    yield put(
      AppActions.notes.actions.loadNotesListError({
        code: -1,
        description: e.toString(),
      }),
    );
  }
}

export default ns_loadNotesListSagaHandler;
