import {useCallback} from 'react';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import AppRoutes from '../../../../data/common/routes/AppRoutes';
import AppActions from '../../../../store/actions/AppActions';

const useDrawerMenuController = model => {
  const {
    navigation,
    dispatch,
    data: {vaultPassword, correctVaultPasswordEntered},
    setters: {
      setUnlockingVaultDialogVisible,
      setCreateVaultPasswordDialogVisible,
      setResetVaultPasswordDialogVisible,
    },
  } = model;

  const backupItemPressHandler = useCallback(() => {
    navigation.closeDrawer();
    navigation.navigate(AppRoutes.Backup);
  }, [navigation]);

  const settingsItemPressHandler = useCallback(() => {
    navigation.navigate(AppRoutes.Settings);
  }, [navigation]);

  const aboutItemPressHandler = useCallback(() => {
    navigation.navigate(AppRoutes.About);
  }, [navigation]);

  const remindersItemPressHandler = useCallback(() => {
    SystemEventsHandler.onInfo({
      info: 'useDrawerMenuController()->remindersItemPressHandler()',
    });
  }, []);

  const recycleBinItemPressHandler = useCallback(() => {
    navigation.navigate(AppRoutes.RecycleBin);
  }, [navigation]);

  const notesOrderingItemPressHandler = useCallback(() => {
    navigation.navigate(AppRoutes.NotesOrdering);
  }, [navigation]);

  const allNotesPressHandler = useCallback(() => {
    dispatch(
      AppActions.notes.actions.setSelectedCategoryId({
        categoryId: -1,
      }),
    );
    navigation.closeDrawer();
  }, [dispatch, navigation]);

  const categoryPressHandler = useCallback(
    ({category}) => {
      dispatch(
        AppActions.notes.actions.setSelectedCategoryId({
          categoryId: category.id,
        }),
      );
      navigation.closeDrawer();
    },
    [dispatch, navigation],
  );

  const editCategoryPressHandler = useCallback(() => {
    navigation.navigate(AppRoutes.EditCategories);
  }, [navigation]);

  const vaultPressHandler = useCallback(() => {
    navigation.closeDrawer();
    if (vaultPassword && correctVaultPasswordEntered) {
      navigation.navigate(AppRoutes.Vault);
    } else if (vaultPassword && !correctVaultPasswordEntered) {
      setUnlockingVaultDialogVisible(true);
    } else {
      setCreateVaultPasswordDialogVisible(true);
    }
  }, [
    vaultPassword,
    correctVaultPasswordEntered,
    navigation,
    setCreateVaultPasswordDialogVisible,
    setUnlockingVaultDialogVisible,
  ]);

  const unlockingVaultDialogCancelHandler = useCallback(() => {
    setUnlockingVaultDialogVisible(false);
  }, [setUnlockingVaultDialogVisible]);

  const unlockingVaultDialogResetPasswordHandler = useCallback(() => {
    setUnlockingVaultDialogVisible(false);
    setResetVaultPasswordDialogVisible(true);
  }, [setUnlockingVaultDialogVisible, setResetVaultPasswordDialogVisible]);

  const unlockingVaultDialogCorrectPasswordEnteredHandler = useCallback(() => {
    setUnlockingVaultDialogVisible(false);
    dispatch(
      AppActions.vault.actions.setCorrectPasswordEntered({
        isCorrect: true,
      }),
    );
    navigation.navigate(AppRoutes.Vault);
  }, [navigation, dispatch, setUnlockingVaultDialogVisible]);

  const createVaultPasswordDialogCancelHandler = useCallback(() => {
    setCreateVaultPasswordDialogVisible(false);
  }, [setCreateVaultPasswordDialogVisible]);

  const createVaultPasswordDialogPasswordSetHandler = useCallback(
    ({password}) => {
      if (password) {
        setCreateVaultPasswordDialogVisible(false);
        dispatch(AppActions.vault.actions.setNewVaultPassword({password}));
        navigation.navigate(AppRoutes.Vault);
      }
    },
    [dispatch, navigation, setCreateVaultPasswordDialogVisible],
  );

  const resetVaultPasswordDialogCancelHandler = useCallback(() => {
    setResetVaultPasswordDialogVisible(false);
  }, [setResetVaultPasswordDialogVisible]);

  const resetVaultPasswordDialogResetHandler = useCallback(() => {
    setResetVaultPasswordDialogVisible(false);
    dispatch(AppActions.vault.actions.resetVaultPassword());
    setCreateVaultPasswordDialogVisible(true);
  }, [
    setResetVaultPasswordDialogVisible,
    setCreateVaultPasswordDialogVisible,
    dispatch,
  ]);

  return {
    backupItemPressHandler,
    settingsItemPressHandler,
    aboutItemPressHandler,
    remindersItemPressHandler,
    notesOrderingItemPressHandler,
    recycleBinItemPressHandler,
    allNotesPressHandler,
    categoryPressHandler,
    editCategoryPressHandler,
    vaultPressHandler,
    unlockingVaultDialogCancelHandler,
    unlockingVaultDialogResetPasswordHandler,
    unlockingVaultDialogCorrectPasswordEnteredHandler,
    createVaultPasswordDialogCancelHandler,
    createVaultPasswordDialogPasswordSetHandler,
    resetVaultPasswordDialogCancelHandler,
    resetVaultPasswordDialogResetHandler,
  };
};

export default useDrawerMenuController;
