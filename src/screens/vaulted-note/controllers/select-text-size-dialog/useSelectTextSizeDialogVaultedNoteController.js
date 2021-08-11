import {useCallback} from 'react';
import VaultedNoteLocalActions from '../../store/VaultedNoteLocalActions';

const useSelectTextSizeDialogVaultedNoteController = model => {
  const {localDispatch} = model;

  const selectTextSizeDialogCancelHandler = useCallback(() => {
    localDispatch(
      VaultedNoteLocalActions.actions.setSelectTextSizeDialogVisibility({
        visible: false,
      }),
    );
  }, [localDispatch]);

  const selectTextSizeDialogSelectTextSizeHandler = useCallback(
    ({textSizeType}) => {
      localDispatch(
        VaultedNoteLocalActions.actions.setSelectedTextSize({textSizeType}),
      );
      localDispatch(
        VaultedNoteLocalActions.actions.setSelectTextSizeDialogVisibility({
          visible: false,
        }),
      );
    },
    [localDispatch],
  );

  return {
    selectTextSizeDialogCancelHandler,
    selectTextSizeDialogSelectTextSizeHandler,
  };
};

export default useSelectTextSizeDialogVaultedNoteController;
