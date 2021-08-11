import {put} from '@redux-saga/core/effects';
import AppActions from '../../../actions/AppActions';

function* ns_setNoteSearchTextSagaHandler(action) {
  const {text} = action.payload;
  yield put(AppActions.notes.actions.setFinalNoteSearchText({text}));
}

export default ns_setNoteSearchTextSagaHandler;
