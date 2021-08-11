import {useCallback} from 'react';
import AppActions from '../../../../store/actions/AppActions';
import wait from '../../../../utils/common/wait/wait';

const useHeaderVaultController = model => {
  const {
    navigation,
    dispatch,
    setters: {setHeaderMenuVisible, setChangePasswordDialogVisible},
  } = model;

  const headerMenuButtonPressHandler = useCallback(() => {
    setHeaderMenuVisible(true);
  }, [setHeaderMenuVisible]);

  const headerMenuCloseHandler = useCallback(() => {
    setHeaderMenuVisible(false);
  }, [setHeaderMenuVisible]);

  const headerMenuChangePasswordHandler = useCallback(() => {
    setHeaderMenuVisible(false);
    setChangePasswordDialogVisible(true);
  }, [setHeaderMenuVisible, setChangePasswordDialogVisible]);

  const headerMenuExitHandler = useCallback(async () => {
    setHeaderMenuVisible(false);

    await wait(100);

    navigation.goBack();
    dispatch(
      AppActions.vault.actions.setCorrectPasswordEntered({
        isCorrect: false,
      }),
    );
  }, [setHeaderMenuVisible, dispatch, navigation]);

  return {
    headerMenuButtonPressHandler,
    headerMenuCloseHandler,
    headerMenuChangePasswordHandler,
    headerMenuExitHandler,
  };
};

export default useHeaderVaultController;
