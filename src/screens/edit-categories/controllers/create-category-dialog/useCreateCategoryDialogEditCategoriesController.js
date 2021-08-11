import {useCallback} from 'react';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import AppActions from '../../../../store/actions/AppActions';
import IdGenerator from '../../../../utils/common/id_generator/IdGenerator';

const useCreateCategoryDialogEditCategoriesController = model => {
  const {
    data: {categoryTemplate, categoriesList},
    setters: {setCreateCategoryDialogVisible},
    dispatch,
  } = model;

  const createCategoryDialogCancelPressHandler = useCallback(() => {
    setCreateCategoryDialogVisible(false);
  }, [setCreateCategoryDialogVisible]);

  const createCategoryDialogOkPressHandler = useCallback(
    ({name, color, isDefault}) => {
      const createdCategory = {
        ...categoryTemplate,
        id: IdGenerator.generate(),
        name,
        color,
        isDefault,
        orderPos: 0,
      };

      let updatedCategoriesList = [...categoriesList];
      updatedCategoriesList.unshift(createdCategory);
      updatedCategoriesList = updatedCategoriesList.map((category, index) => {
        if (isDefault) {
          if (category.id !== createdCategory.id) {
            return {
              ...category,
              isDefault: false,
              orderPos: index,
            };
          } else {
            return {
              ...category,
              orderPos: index,
            };
          }
        } else {
          return {
            ...category,
            orderPos: index,
          };
        }
      });

      dispatch(
        AppActions.categories.actions.setUpdatedCategoriesList({
          categoriesList: updatedCategoriesList,
        }),
      );

      setCreateCategoryDialogVisible(false);
    },
    [
      categoryTemplate,
      categoriesList,
      setCreateCategoryDialogVisible,
      dispatch,
    ],
  );

  return {
    createCategoryDialogCancelPressHandler,
    createCategoryDialogOkPressHandler,
  };
};

export default useCreateCategoryDialogEditCategoriesController;
