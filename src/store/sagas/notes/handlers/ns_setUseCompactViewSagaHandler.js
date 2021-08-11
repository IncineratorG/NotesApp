import {call, select} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import Services from '../../../../services/Services';

function* ns_setUseCompactViewSagaHandler(action) {
  const {useCompactView} = action.payload;

  const {sortType, groupByCategories, selectedCategoryId} = yield select(
    state => state.notes.notesList.settings,
  );

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
      err: 'ns_setUseCompactViewSagaHandler()->ERROR: ' + e.toString(),
    });
  }
}

export default ns_setUseCompactViewSagaHandler;
