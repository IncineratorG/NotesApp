import {useCallback} from 'react';
import AppActions from '../../../../store/actions/AppActions';

const useUnlockingVaultDialogVaultedNoteController = model => {
  const {dispatch, navigation} = model;

  const unlockingVaultDialogCancelPressHandler = useCallback(() => {
    navigation.goBack();
    navigation.goBack();
  }, [navigation]);

  const unlockingVaultDialogCorrectPasswordEnteredHandler = useCallback(() => {
    dispatch(
      AppActions.vault.actions.setCorrectPasswordEntered({isCorrect: true}),
    );
  }, [dispatch]);

  return {
    unlockingVaultDialogCancelPressHandler,
    unlockingVaultDialogCorrectPasswordEnteredHandler,
  };
};

export default useUnlockingVaultDialogVaultedNoteController;
