import React from 'react';
import EditCategoriesView from './views/EditCategoriesView';
import useEditCategoriesModel from './models/useEditCategoriesModel';
import useEditCategoriesRootController from './controllers/useEditCategoriesRootController';

const EditCategories = () => {
  const model = useEditCategoriesModel();
  const controller = useEditCategoriesRootController(model);

  return <EditCategoriesView model={model} controller={controller} />;
};

export default React.memo(EditCategories);
