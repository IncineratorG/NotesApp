import {useCallback} from 'react';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import AppActions from '../../../../store/actions/AppActions';

const useEditCategoriesController = model => {
  const {
    dispatch,
    setters: {
      setEditCategoryDialogVisible,
      setEditableCategory,
      setCreateCategoryDialogVisible,
      setRemoveCategoryWarningDialogVisible,
      setRemovableCategory,
    },
  } = model;

  const addCategoryPressHandler = useCallback(() => {
    setCreateCategoryDialogVisible(true);
  }, [setCreateCategoryDialogVisible]);

  const categoriesOrderChangedHandler = useCallback(
    ({updatedCategoriesList}) => {
      const newCategoriesList = updatedCategoriesList.map((category, index) => {
        return {
          ...category,
          orderPos: index,
        };
      });

      dispatch(
        AppActions.categories.actions.setUpdatedCategoriesList({
          categoriesList: newCategoriesList,
        }),
      );
    },
    [dispatch],
  );

  const categoryPressHandler = useCallback(
    ({category}) => {
      setEditableCategory(category);
      setEditCategoryDialogVisible(true);
    },
    [setEditableCategory, setEditCategoryDialogVisible],
  );

  const removeCategoryHandler = useCallback(
    ({category}) => {
      setRemovableCategory(category);
      setRemoveCategoryWarningDialogVisible(true);

      // const updatedCategoriesList = categoriesList.filter(
      //   c => c.id !== category.id,
      // );
      //
      // dispatch(
      //   AppActions.categories.actions.setUpdatedCategoriesList({
      //     categoriesList: updatedCategoriesList,
      //   }),
      // );
    },
    [setRemovableCategory, setRemoveCategoryWarningDialogVisible],
  );

  return {
    addCategoryPressHandler,
    categoriesOrderChangedHandler,
    categoryPressHandler,
    removeCategoryHandler,
  };
};

export default useEditCategoriesController;
