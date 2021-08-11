import {useCallback} from 'react';
import NoteLocalActions from '../../store/NoteLocalActions';

const useSelectTextSizeDialogNoteController = model => {
  const {localDispatch} = model;

  const selectTextSizeDialogCancelHandler = useCallback(() => {
    localDispatch(
      NoteLocalActions.actions.setSelectTextSizeDialogVisibility({
        visible: false,
      }),
    );
  }, [localDispatch]);

  const selectTextSizeDialogSelectTextSizeHandler = useCallback(
    ({textSizeType}) => {
      localDispatch(
        NoteLocalActions.actions.setSelectedTextSize({textSizeType}),
      );
      localDispatch(
        NoteLocalActions.actions.setSelectTextSizeDialogVisibility({
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

export default useSelectTextSizeDialogNoteController;
