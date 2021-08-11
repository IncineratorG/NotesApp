import NotesListSortTypes from '../../../data/common/notes-list-sort-types/NotesListSortTypes';

const vaultLocalState = {
  vaultedNotesList: {
    settings: {
      sortType: NotesListSortTypes.MANUAL,
      groupByCategories: false,
      useCompactView: false,
      selectedCategoryId: -1,
    },
    notes: [],
  },
  removeNoteConfirmationDialog: {
    visible: false,
    noteId: -1,
  },
};

export default vaultLocalState;
