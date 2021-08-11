const GlobalActions = () => {
  const types = {
    LOAD_CORE_APP_DATA: 'GA_LOAD_CORE_APP_DATA',
  };

  const loadCoreAppData = () => {
    return {
      type: types.LOAD_CORE_APP_DATA,
    };
  };

  return {
    types,
    actions: {
      loadCoreAppData,
    },
  };
};

export default GlobalActions;
