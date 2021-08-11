import {call, select} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import Services from '../../../../services/Services';

function* ns_setSelectedCategoryIdSagaHandler(action) {
  const {categoryId} = action.payload;

  const {sortType, groupByCategories, useCompactView} = yield select(
    state => state.notes.notesList.settings,
  );

  try {
    const noteService = Services.services().notesService;
    yield call(noteService.updateNotesListSettings, {
      sortType,
      useCompactView,
      groupByCategories,
      selectedCategoryId: categoryId,
    });
  } catch (e) {
    SystemEventsHandler.onError({
      err: 'ns_setSelectedCategoryIdSagaHandler()->ERROR: ' + e.toString(),
    });
  }
}

export default ns_setSelectedCategoryIdSagaHandler;
