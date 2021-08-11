import {useCallback} from 'react';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import AppActions from '../../../../store/actions/AppActions';

const useRemoveCategoryWarningDialogEditCategoriesController = model => {
  const {
    dispatch,
    data: {removableCategory},
    setters: {setRemoveCategoryWarningDialogVisible, setRemovableCategory},
  } = model;

  const removeCategoryWarningDialogOnCancel = useCallback(() => {
    setRemoveCategoryWarningDialogVisible(false);
    setRemovableCategory(null);
  }, [setRemoveCategoryWarningDialogVisible, setRemovableCategory]);

  const removeCategoryWarningDialogRemovePressHandler = useCallback(() => {
    SystemEventsHandler.onInfo({
      info:
        'useRemoveCategoryWarningDialogEditCategoriesController->removeCategoryWarningDialogRemovePressHandler()',
    });

    dispatch(
      AppActions.categories.actions.removeCategory({
        category: removableCategory,
      }),
    );

    setRemoveCategoryWarningDialogVisible(false);
    setRemovableCategory(null);
  }, [
    removableCategory,
    dispatch,
    setRemoveCategoryWarningDialogVisible,
    setRemovableCategory,
  ]);

  return {
    removeCategoryWarningDialogOnCancel,
    removeCategoryWarningDialogRemovePressHandler,
  };
};

export default useRemoveCategoryWarningDialogEditCategoriesController;
