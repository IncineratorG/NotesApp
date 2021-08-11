import useEditCategoriesController from './edit-categories/useEditCategoriesController';
import useEditCategoryDialogEditCategoriesController from './edit-category-dialog/useEditCategoryDialogEditCategoriesController';
import useCreateCategoryDialogEditCategoriesController from './create-category-dialog/useCreateCategoryDialogEditCategoriesController';
import useRemoveCategoryWarningDialogEditCategoriesController from './remove-category-warning-dialog/useRemoveCategoryWarningDialogEditCategoriesController';

const useEditCategoriesRootController = model => {
  const editCategoriesController = useEditCategoriesController(model);
  const editCategoryDialogController = useEditCategoryDialogEditCategoriesController(
    model,
  );
  const createCategoryDialogController = useCreateCategoryDialogEditCategoriesController(
    model,
  );
  const removeCategoryWarningDialogController = useRemoveCategoryWarningDialogEditCategoriesController(
    model,
  );

  return {
    editCategoriesController,
    editCategoryDialogController,
    createCategoryDialogController,
    removeCategoryWarningDialogController,
  };
};

export default useEditCategoriesRootController;
