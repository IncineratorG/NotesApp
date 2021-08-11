import {takeLatest, debounce} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../utils/common/system-events-handler/SystemEventsHandler';
import AppActions from '../../actions/AppActions';
import ns_loadNotesListSagaHandler from './handlers/ns_loadNotesListSagaHandler';
import ns_changeSortTypeSagaHandler from './handlers/ns_changeSortTypeSagaHandler';
import ns_setUseCompactViewSagaHandler from './handlers/ns_setUseCompactViewSagaHandler';
import ns_updateNoteSagaHandler from './handlers/ns_updateNoteSagaHandler';
import ns_setSelectedCategoryIdSagaHandler from './handlers/ns_setSelectedCategoryIdSagaHandler';
import ns_setGroupByCategoriesSagaHandler from './handlers/ns_setGroupByCategoriesSagaHandler';
import ns_moveNoteToTrashSagaHandler from './handlers/ns_moveNoteToTrashSagaHandler';
import ns_restoreNoteFromTrashSagaHandler from './handlers/ns_restoreNoteFromTrashSagaHandler';
import ns_deleteNoteCompletelySagaHandler from './handlers/ns_deleteNoteCompletelySagaHandler';
import ns_deleteMultipleNotesCompletelySagaHandler from './handlers/ns_deleteMultipleNotesCompletelySagaHandler';
import ns_swapNotesListItemsSagaHandler from './handlers/ns_swapNotesListItemsSagaHandler';
import ns_updateMultipleNotesSagaHandler from './handlers/ns_updateMultipleNotesSagaHandler';
import ns_setNoteSearchTextSagaHandler from './handlers/ns_setNoteSearchTextSagaHandler';

function* notesSaga() {
  SystemEventsHandler.onInfo({info: 'notesSaga'});

  yield takeLatest(
    AppActions.notes.types.LOAD_NOTES_LIST,
    ns_loadNotesListSagaHandler,
  );
  yield takeLatest(
    AppActions.notes.types.CHANGE_SORT_TYPE,
    ns_changeSortTypeSagaHandler,
  );
  yield takeLatest(
    AppActions.notes.types.SET_GROUP_BY_CATEGORIES,
    ns_setGroupByCategoriesSagaHandler,
  );
  yield takeLatest(
    AppActions.notes.types.SET_USE_COMPACT_VIEW,
    ns_setUseCompactViewSagaHandler,
  );
  yield takeLatest(
    AppActions.notes.types.SET_SELECTED_CATEGORY_ID,
    ns_setSelectedCategoryIdSagaHandler,
  );
  yield debounce(
    200,
    AppActions.notes.types.UPDATE_NOTE,
    ns_updateNoteSagaHandler,
  );
  yield takeLatest(
    AppActions.notes.types.UPDATE_MULTIPLE_NOTES,
    ns_updateMultipleNotesSagaHandler,
  );
  yield takeLatest(
    AppActions.notes.types.MOVE_NOTE_TO_TRASH,
    ns_moveNoteToTrashSagaHandler,
  );
  yield takeLatest(
    AppActions.notes.types.RESTORE_NOTE_FROM_TRASH,
    ns_restoreNoteFromTrashSagaHandler,
  );
  yield takeLatest(
    AppActions.notes.types.REMOVE_NOTE_COMPLETELY,
    ns_deleteNoteCompletelySagaHandler,
  );
  yield takeLatest(
    AppActions.notes.types.REMOVE_MULTIPLE_NOTES_COMPLETELY,
    ns_deleteMultipleNotesCompletelySagaHandler,
  );
  yield takeLatest(
    AppActions.notes.types.SWAP_LIST_ITEMS,
    ns_swapNotesListItemsSagaHandler,
  );
  yield debounce(
    300,
    AppActions.notes.types.SET_NOTE_SEARCH_TEXT,
    ns_setNoteSearchTextSagaHandler,
  );
}

export default notesSaga;
