import {call, put} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import AppActions from '../../../actions/AppActions';
import Services from '../../../../services/Services';

function* cs_loadCategoriesSagaHandler(action) {
  SystemEventsHandler.onInfo({info: 'cs_loadCategoriesSagaHandler()'});

  yield put(AppActions.categories.actions.loadCategoriesBegin());

  try {
    const notesService = Services.services().notesService;
    const {categoriesList} = yield call(notesService.getCategoriesList);

    yield put(
      AppActions.categories.actions.loadCategoriesFinished({categoriesList}),
    );
  } catch (e) {
    SystemEventsHandler.onError({
      err: 'cs_loadCategoriesSagaHandler->ERROR: ' + e.toString(),
    });

    yield put(
      AppActions.categories.actions.loadCategoriesError({
        code: -1,
        description: e.toString(),
      }),
    );
  }
}

export default cs_loadCategoriesSagaHandler;
