const VaultNotesIdsListCache = () => {
  let cachedVaultNotesIdsList = null;

  const set = ({vaultNotesIdsList}) => {
    cachedVaultNotesIdsList = [...vaultNotesIdsList];
  };

  const get = () => {
    if (cachedVaultNotesIdsList) {
      return new Set(cachedVaultNotesIdsList);
    } else {
      return null;
    }
  };

  const empty = () => {
    return cachedVaultNotesIdsList === null;
  };

  const clear = () => {
    cachedVaultNotesIdsList = null;
  };

  return {
    set,
    get,
    empty,
    clear,
  };
};

export default VaultNotesIdsListCache;
