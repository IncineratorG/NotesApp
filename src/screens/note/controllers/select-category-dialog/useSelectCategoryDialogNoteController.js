import {useCallback} from 'react';
import NoteLocalActions from '../../store/NoteLocalActions';

const useSelectCategoryDialogNoteController = model => {
  const {localDispatch} = model;

  const selectCategoryDialogCancelHandler = useCallback(() => {
    localDispatch(
      NoteLocalActions.actions.setSelectCategoryDialogVisibility({
        visible: false,
      }),
    );
  }, [localDispatch]);

  const selectCategoryDialogCategoryPressHandler = useCallback(
    ({category}) => {
      localDispatch(NoteLocalActions.actions.setSelectedCategory({category}));
      localDispatch(
        NoteLocalActions.actions.setSelectCategoryDialogVisibility({
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

export default useSelectCategoryDialogNoteController;
