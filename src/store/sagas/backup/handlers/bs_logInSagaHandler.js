import {call, put} from '@redux-saga/core/effects';
import Services from '../../../../services/Services';
import AppActions from '../../../actions/AppActions';

function* bs_logInSagaHandler(action) {
  yield put(AppActions.backup.actions.logInBegin());

  const backupService = Services.services().backupService;
  yield call(backupService.logIn);
}

export default bs_logInSagaHandler;
