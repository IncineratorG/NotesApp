import {call, put} from '@redux-saga/core/effects';
import Services from '../../../../services/Services';
import AppActions from '../../../actions/AppActions';

function* bs_logOutSagaHandler(action) {
  yield put(AppActions.backup.actions.logInBegin());

  const backupService = Services.services().backupService;
  yield call(backupService.logOut);
}

export default bs_logOutSagaHandler;
