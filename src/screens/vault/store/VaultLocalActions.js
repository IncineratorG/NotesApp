const VaultLocalActions = () => {
  const types = {
    SET_VAULTED_NOTES_LIST: 'VLA_SET_VAULTED_NOTES_LIST',
    SET_REMOVE_NOTE_CONFIRMATION_DIALOG_VISIBILITY:
      'VLA_SET_REMOVE_NOTE_CONFIRMATION_DIALOG_VISIBILITY',
    SET_REMOVE_NOTE_ID: 'VLA_SET_REMOVE_NOTE_ID',
  };

  const setVaultedNotesList = ({
    vaultedNotesList,
    sortType,
    groupByCategories,
    useCompactView,
    selectedCategoryId,
  }) => {
    return {
      type: types.SET_VAULTED_NOTES_LIST,
      payload: {
        vaultedNotesList,
        sortType,
        groupByCategories,
        useCompactView,
        selectedCategoryId,
      },
    };
  };

  const setRemoveNoteConfirmationDialogVisibility = ({visible}) => {
    return {
      type: types.SET_REMOVE_NOTE_CONFIRMATION_DIALOG_VISIBILITY,
      payload: {visible},
    };
  };

  const setRemoveNoteId = ({id}) => {
    return {
      type: types.SET_REMOVE_NOTE_ID,
      payload: {id},
    };
  };

  return {
    types,
    actions: {
      setVaultedNotesList,
      setRemoveNoteConfirmationDialogVisibility,
      setRemoveNoteId,
    },
  };
};

export default VaultLocalActions();
