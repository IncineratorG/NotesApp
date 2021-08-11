import useVaultController from './vault/useVaultController';
import useHeaderVaultController from './header/useHeaderVaultController';
import useChangeVaultPasswordDialogVaultController from './change-vault-password-dialog/useChangeVaultPasswordDialogVaultController';

const useVaultRootController = model => {
  const headerController = useHeaderVaultController(model);
  const vaultController = useVaultController(model);
  const changeVaultPasswordController = useChangeVaultPasswordDialogVaultController(
    model,
  );

  return {
    headerController,
    vaultController,
    changeVaultPasswordController,
  };
};

export default useVaultRootController;
