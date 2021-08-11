import useBackupController from './backup/useBackupController';
import useCreateBackupDialogBackupController from './create-backup-dialog/useCreateBackupDialogBackupController';
import useHeaderBackupController from './header/useHeaderBackupController';

const useBackupRootController = model => {
  const backupController = useBackupController(model);
  const createBackupDialogController = useCreateBackupDialogBackupController(
    model,
  );
  const headerController = useHeaderBackupController(model);

  return {
    backupController,
    createBackupDialogController,
    headerController,
  };
};

export default useBackupRootController;
