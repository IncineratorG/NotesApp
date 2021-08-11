const VaultPasswordCache = () => {
  let cachedPassword = null;
  let isSet = false;

  const set = ({password}) => {
    cachedPassword = password;
    isSet = true;
  };

  const get = () => {
    return cachedPassword;
  };

  const empty = () => {
    return !isSet;
  };

  const clear = () => {
    cachedPassword = null;
    isSet = false;
  };

  return {
    set,
    get,
    empty,
    clear,
  };
};

export default VaultPasswordCache;
