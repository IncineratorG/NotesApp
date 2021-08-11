const VaultActions = () => {
  const types = {
    LOAD_VAULT_PASSWORD: 'VA_LOAD_VAULT_PASSWORD',
    LOAD_VAULT_PASSWORD_BEGIN: 'VA_LOAD_VAULT_PASSWORD_BEGIN',
    LOAD_VAULT_PASSWORD_FINISHED: 'VA_LOAD_VAULT_PASSWORD_FINISHED',
    LOAD_VAULT_PASSWORD_ERROR: 'VA_LOAD_VAULT_PASSWORD_ERROR',
    SET_NEW_VAULT_PASSWORD: 'VA_SET_NEW_VAULT_PASSWORD',
    RESET_VAULT_PASSWORD: 'VA_RESET_VAULT_PASSWORD',
    SET_CORRECT_PASSWORD_ENTERED: 'VA_SET_CORRECT_PASSWORD_ENTERED',
    MOVE_NOTE_TO_VAULT: 'VA_MOVE_NOTE_TO_VAULT',
    MOVE_NOTE_FROM_VAULT: 'VA_MOVE_NOTE_FROM_VAULT',
    UPDATE_VAULTED_NOTE: 'VA_UPDATE_VAULTED_NOTE',
  };

  const loadVaultPassword = () => {
    return {
      type: types.LOAD_VAULT_PASSWORD,
    };
  };

  const loadVaultPasswordBegin = () => {
    return {
      type: types.LOAD_VAULT_PASSWORD_BEGIN,
    };
  };

  const loadVaultPasswordFinished = ({password}) => {
    return {
      type: types.LOAD_VAULT_PASSWORD_FINISHED,
      payload: {password},
    };
  };

  const loadVaultPasswordError = ({code, message}) => {
    return {
      type: types.LOAD_VAULT_PASSWORD_ERROR,
      payload: {code, message},
    };
  };

  const setNewVaultPassword = ({password}) => {
    return {
      type: types.SET_NEW_VAULT_PASSWORD,
      payload: {password},
    };
  };

  const resetVaultPassword = () => {
    return {
      type: types.RESET_VAULT_PASSWORD,
    };
  };

  const setCorrectPasswordEntered = ({isCorrect}) => {
    return {
      type: types.SET_CORRECT_PASSWORD_ENTERED,
      payload: {isCorrect},
    };
  };

  const moveNoteToVault = ({note}) => {
    return {
      type: types.MOVE_NOTE_TO_VAULT,
      payload: {note},
    };
  };

  const moveNoteFromVault = ({note}) => {
    return {
      type: types.MOVE_NOTE_FROM_VAULT,
      payload: {note},
    };
  };

  const updateVaultedNote = ({note}) => {
    return {
      type: types.UPDATE_VAULTED_NOTE,
      payload: {note},
    };
  };

  return {
    types,
    actions: {
      loadVaultPassword,
      loadVaultPasswordBegin,
      loadVaultPasswordFinished,
      loadVaultPasswordError,
      setNewVaultPassword,
      resetVaultPassword,
      setCorrectPasswordEntered,
      moveNoteToVault,
      moveNoteFromVault,
      updateVaultedNote,
    },
  };
};

export default VaultActions;
