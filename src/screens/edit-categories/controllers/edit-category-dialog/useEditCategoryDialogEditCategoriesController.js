import {useCallback} from 'react';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import useTranslation from '../../../../utils/common/localization';
import AppActions from '../../../../store/actions/AppActions';

const useEditCategoryDialogEditCategoriesController = model => {
  const {t} = useTranslation();

  const {
    data: {categoriesList, editableCategory},
    setters: {setEditCategoryDialogVisible, setEditableCategory},
    dispatch,
  } = model;

  const editCategoryDialogCancelPressHandler = useCallback(() => {
    setEditCategoryDialogVisible(false);
    setEditableCategory(null);
  }, [setEditCategoryDialogVisible, setEditableCategory]);

  const editCategoryDialogOkPressHandler = useCallback(
    ({name, color, isDefault}) => {
      const currentCategoryName = editableCategory.translation_mark
        ? t(editableCategory.translation_mark)
        : editableCategory.name;
      const currentCategoryColor = editableCategory.color;
      const currentCategoryIsDefault = editableCategory.isDefault;

      if (
        currentCategoryName === name &&
        currentCategoryColor === color &&
        currentCategoryIsDefault === isDefault
      ) {
        setEditCategoryDialogVisible(false);
        setEditableCategory(null);
        return;
      }

      const nameChanged = currentCategoryName !== name;
      const needResetDefaultProp = isDefault && !editableCategory.isDefault;

      const updatedCategoriesList = categoriesList.map((category, index) => {
        if (category.id !== editableCategory.id) {
          return {
            ...category,
            isDefault: needResetDefaultProp ? false : category.isDefault,
          };
        }

        return {
          ...category,
          name: nameChanged ? name : editableCategory.name,
          translation_mark: nameChanged
            ? null
            : editableCategory.translation_mark,
          color,
          isDefault,
        };
      });

      dispatch(
        AppActions.categories.actions.setUpdatedCategoriesList({
          categoriesList: updatedCategoriesList,
        }),
      );

      setEditCategoryDialogVisible(false);
      setEditableCategory(null);
    },
    [
      editableCategory,
      categoriesList,
      dispatch,
      t,
      setEditCategoryDialogVisible,
      setEditableCategory,
    ],
  );

  return {
    editCategoryDialogCancelPressHandler,
    editCategoryDialogOkPressHandler,
  };
};

export default useEditCategoryDialogEditCategoriesController;
