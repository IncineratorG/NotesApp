import {useCallback} from 'react';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import AppActions from '../../../../store/actions/AppActions';
import NetInfo from '@react-native-community/netinfo';
import BackupLocalActions from '../../store/BackupLocalActions';

const useHeaderBackupController = model => {
  const {
    setters: {setHeaderMenuVisible},
    dispatch,
    localDispatch,
  } = model;

  const headerMenuButtonPressHandler = useCallback(() => {
    setHeaderMenuVisible(true);
  }, [setHeaderMenuVisible]);

  const headerMenuCloseHandler = useCallback(() => {
    setHeaderMenuVisible(false);
  }, [setHeaderMenuVisible]);

  const headerMenuLogInPressHandler = useCallback(async () => {
    setHeaderMenuVisible(false);

    const {isConnected} = await NetInfo.fetch();
    localDispatch(
      BackupLocalActions.actions.setConnected({connected: isConnected}),
    );

    if (isConnected) {
      dispatch(AppActions.backup.actions.logIn());
    }
  }, [setHeaderMenuVisible, dispatch, localDispatch]);

  const headerMenuLogOutPressHandler = useCallback(() => {
    setHeaderMenuVisible(false);
    dispatch(AppActions.backup.actions.logOut());
  }, [setHeaderMenuVisible, dispatch]);

  const headerMenuRefreshPressHandler = useCallback(async () => {
    setHeaderMenuVisible(false);

    const {isConnected} = await NetInfo.fetch();
    localDispatch(
      BackupLocalActions.actions.setConnected({connected: isConnected}),
    );

    if (isConnected) {
      dispatch(AppActions.backup.actions.logIn());
    }
  }, [setHeaderMenuVisible, dispatch, localDispatch]);

  return {
    headerMenuButtonPressHandler,
    headerMenuCloseHandler,
    headerMenuLogInPressHandler,
    headerMenuLogOutPressHandler,
    headerMenuRefreshPressHandler,
  };
};

export default useHeaderBackupController;
