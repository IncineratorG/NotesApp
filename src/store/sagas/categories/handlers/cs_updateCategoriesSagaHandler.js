import {call} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import Services from '../../../../services/Services';

function* cs_updateCategoriesSagaHandler(action) {
  const {categoriesList} = action.payload;

  SystemEventsHandler.onInfo({
    info: 'cs_updateCategoriesSagaHandler(): ' + categoriesList.length,
  });

  try {
    const notesService = Services.services().notesService;
    yield call(notesService.updateCategoriesList, {categoriesList});
  } catch (e) {
    SystemEventsHandler.onError({
      err: 'cs_updateCategoriesSagaHandler->ERROR: ' + e.toString(),
    });
  }
}

export default cs_updateCategoriesSagaHandler;
