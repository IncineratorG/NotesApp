import VaultLocalActions from './VaultLocalActions';
import VaultedNotesListComposer from './helpers/vaulted-notes-list-composer/VaultedNotesListComposer';

const vaultLocalReducer = (state, action) => {
  switch (action.type) {
    case VaultLocalActions.types.SET_VAULTED_NOTES_LIST: {
      const {
        vaultedNotesList,
        sortType,
        groupByCategories,
        useCompactView,
        selectedCategoryId,
      } = action.payload;

      const {
        vaultedNotesList: composedVaultedNotesList,
      } = VaultedNotesListComposer.compose({
        notesList: vaultedNotesList,
        sortType,
        groupByCategories,
        selectedCategoryId,
      });

      return {
        ...state,
        vaultedNotesList: {
          ...state.vaultedNotesList,
          settings: {
            ...state.vaultedNotesList.settings,
            sortType,
            groupByCategories,
            useCompactView,
            selectedCategoryId,
          },
          notes: composedVaultedNotesList,
        },
      };
    }

    case VaultLocalActions.types
      .SET_REMOVE_NOTE_CONFIRMATION_DIALOG_VISIBILITY: {
      return {
        ...state,
        removeNoteConfirmationDialog: {
          ...state.removeNoteConfirmationDialog,
          visible: action.payload.visible,
        },
      };
    }

    case VaultLocalActions.types.SET_REMOVE_NOTE_ID: {
      return {
        ...state,
        removeNoteConfirmationDialog: {
          ...state.removeNoteConfirmationDialog,
          noteId: action.payload.id,
        },
      };
    }

    default: {
      return state;
    }
  }
};

export default vaultLocalReducer;
