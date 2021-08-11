const CategoriesActions = () => {
  const types = {
    LOAD_CATEGORIES: 'CA_LOAD_CATEGORIES',
    LOAD_CATEGORIES_BEGIN: 'CA_LOAD_CATEGORIES_BEGIN',
    LOAD_CATEGORIES_FINISHED: 'CA_LOAD_CATEGORIES_FINISHED',
    LOAD_CATEGORIES_ERROR: 'CA_LOAD_CATEGORIES_ERROR',
    SET_UPDATED_CATEGORIES_LIST: 'CA_SET_UPDATED_CATEGORIES_LIST',
    REMOVE_CATEGORY: 'CA_REMOVE_CATEGORY',
  };

  const loadCategories = () => {
    return {
      type: types.LOAD_CATEGORIES,
    };
  };

  const loadCategoriesBegin = () => {
    return {
      type: types.LOAD_CATEGORIES_BEGIN,
    };
  };

  const loadCategoriesFinished = ({categoriesList}) => {
    return {
      type: types.LOAD_CATEGORIES_FINISHED,
      payload: {categoriesList},
    };
  };

  const loadCategoriesError = ({code, description}) => {
    return {
      type: types.LOAD_CATEGORIES_ERROR,
      payload: {error: {code, description}},
    };
  };

  const setUpdatedCategoriesList = ({categoriesList}) => {
    return {
      type: types.SET_UPDATED_CATEGORIES_LIST,
      payload: {categoriesList},
    };
  };

  const removeCategory = ({category}) => {
    return {
      type: types.REMOVE_CATEGORY,
      payload: {category},
    };
  };

  return {
    types,
    actions: {
      loadCategories,
      loadCategoriesBegin,
      loadCategoriesFinished,
      loadCategoriesError,
      setUpdatedCategoriesList,
      removeCategory,
    },
  };
};

export default CategoriesActions;
