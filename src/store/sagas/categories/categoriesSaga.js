import {takeLatest} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../utils/common/system-events-handler/SystemEventsHandler';
import AppActions from '../../actions/AppActions';
import cs_loadCategoriesSagaHandler from './handlers/cs_loadCategoriesSagaHandler';
import cs_updateCategoriesSagaHandler from './handlers/cs_updateCategoriesSagaHandler';
import cs_removeCategorySagaHandler from './handlers/cs_removeCategorySagaHandler';

function* categoriesSaga() {
  SystemEventsHandler.onInfo({info: 'categoriesSaga'});

  yield takeLatest(
    AppActions.categories.types.LOAD_CATEGORIES,
    cs_loadCategoriesSagaHandler,
  );
  yield takeLatest(
    AppActions.categories.types.SET_UPDATED_CATEGORIES_LIST,
    cs_updateCategoriesSagaHandler,
  );
  yield takeLatest(
    AppActions.categories.types.REMOVE_CATEGORY,
    cs_removeCategorySagaHandler,
  );
}

export default categoriesSaga;
