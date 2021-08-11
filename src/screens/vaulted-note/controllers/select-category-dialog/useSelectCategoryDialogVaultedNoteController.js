import {useCallback} from 'react';
import VaultedNoteLocalActions from '../../store/VaultedNoteLocalActions';

const useSelectCategoryDialogVaultedNoteController = model => {
  const {localDispatch} = model;

  const selectCategoryDialogCancelHandler = useCallback(() => {
    localDispatch(
      VaultedNoteLocalActions.actions.setSelectCategoryDialogVisibility({
        visible: false,
      }),
    );
  }, [localDispatch]);

  const selectCategoryDialogCategoryPressHandler = useCallback(
    ({category}) => {
      localDispatch(
        VaultedNoteLocalActions.actions.setSelectedCategory({category}),
      );
      localDispatch(
        VaultedNoteLocalActions.actions.setSelectCategoryDialogVisibility({
          visible: false,
        }),
      );
    },
    [localDispatch],
  );

  return {
    selectCategoryDialogCancelHandler,
    selectCategoryDialogCategoryPressHandler,
  };
};

export default useSelectCategoryDialogVaultedNoteController;
