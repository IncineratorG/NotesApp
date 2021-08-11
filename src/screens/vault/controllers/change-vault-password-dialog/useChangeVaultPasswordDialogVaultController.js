import {useCallback} from 'react';
import AppActions from '../../../../store/actions/AppActions';
import Snackbar from 'react-native-snackbar';
import useTranslation from '../../../../utils/common/localization';

const useChangeVaultPasswordDialogVaultController = model => {
  const {t} = useTranslation();

  const {
    dispatch,
    setters: {setChangePasswordDialogVisible},
  } = model;

  const changeVaultPasswordDialogChangePasswordHandler = useCallback(
    ({password}) => {
      setChangePasswordDialogVisible(false);
      dispatch(AppActions.vault.actions.setNewVaultPassword({password}));
      Snackbar.show({
        text: t('Vault_passwordChangedSnackbar'),
        duration: Snackbar.LENGTH_SHORT,
      });
    },
    [setChangePasswordDialogVisible, t, dispatch],
  );

  const changeVaultPasswordDialogCancelHandler = useCallback(() => {
    setChangePasswordDialogVisible(false);
  }, [setChangePasswordDialogVisible]);

  return {
    changeVaultPasswordDialogChangePasswordHandler,
    changeVaultPasswordDialogCancelHandler,
  };
};

export default useChangeVaultPasswordDialogVaultController;
