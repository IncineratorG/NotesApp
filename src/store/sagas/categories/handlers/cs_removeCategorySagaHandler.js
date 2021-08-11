import {put, select} from '@redux-saga/core/effects';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import AppActions from '../../../actions/AppActions';

function* cs_removeCategorySagaHandler(action) {
  const {category: deletedCategory} = action.payload;

  SystemEventsHandler.onInfo({info: 'cs_removeCategorySagaHandler()'});

  const {
    categoriesList: {categories},
    defaultCategory,
  } = yield select(state => state.categories);
  const allNotesList = yield select(state => state.notes.notesList.allNotes);

  const updatedNotesList = [];
  allNotesList.forEach(note => {
    if (note.category.id === deletedCategory.id) {
      updatedNotesList.push({
        ...note,
        category: {
          ...note.category,
          id: defaultCategory.id,
        },
      });
    }
  });

  const updatedCategoriesList = categories.filter(
    c => c.id !== deletedCategory.id,
  );

  yield put(
    AppActions.categories.actions.setUpdatedCategoriesList({
      categoriesList: updatedCategoriesList,
    }),
  );

  if (updatedNotesList.length > 0) {
    yield put(
      AppActions.notes.actions.updateMultipleNotes({
        notesList: updatedNotesList,
      }),
    );
  }
}

export default cs_removeCategorySagaHandler;
