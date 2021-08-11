const AppSettingsCache = () => {
  let cachedAppSettings = null;

  const set = ({appSettings}) => {
    cachedAppSettings = {...appSettings};
  };

  const get = () => {
    return cachedAppSettings;
  };

  const empty = () => {
    return cachedAppSettings === null;
  };

  const clear = () => {
    cachedAppSettings = null;
  };

  return {
    set,
    get,
    empty,
    clear,
  };
};

export default AppSettingsCache;
