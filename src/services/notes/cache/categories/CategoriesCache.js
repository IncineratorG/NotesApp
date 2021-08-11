import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';

const CategoriesCache = () => {
  let cachedCategoriesList = null;

  const set = ({categoriesList}) => {
    cachedCategoriesList = [...categoriesList];
  };

  const get = () => {
    return cachedCategoriesList;
  };

  const empty = () => {
    return cachedCategoriesList === null;
  };

  const clear = () => {
    cachedCategoriesList = null;
  };

  return {
    set,
    get,
    empty,
    clear,
  };
};

export default CategoriesCache;
