import {call, select} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import Services from '../../../../services/Services';
import NotesListSortTypes from '../../../../data/common/notes-list-sort-types/NotesListSortTypes';

function* ns_changeSortTypeSagaHandler(action) {
  const {sortType} = action.payload;

  const {
    useCompactView,
    groupByCategories: currentGroupByCategories,
    selectedCategoryId,
  } = yield select(state => state.notes.notesList.settings);
  const groupByCategories =
    sortType === NotesListSortTypes.MANUAL ? false : currentGroupByCategories;

  try {
    const noteService = Services.services().notesService;
    yield call(noteService.updateNotesListSettings, {
      sortType,
      useCompactView,
      groupByCategories,
      selectedCategoryId,
    });
  } catch (e) {
    SystemEventsHandler.onError({
      err: 'ns_changeSortTypeSagaHandler()->ERROR: ' + e.toString(),
    });
  }
}

export default ns_changeSortTypeSagaHandler;
