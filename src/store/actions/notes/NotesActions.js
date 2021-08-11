const NotesActions = () => {
  const types = {
    LOAD_NOTES_LIST: 'NA_LOAD_NOTES_LIST',
    LOAD_NOTES_LIST_BEGIN: 'NA_LOAD_NOTES_LIST_BEGIN',
    LOAD_NOTES_LIST_FINISHED: 'NA_LOAD_NOTES_LIST_FINISHED',
    LOAD_NOTES_LIST_ERROR: 'NA_LOAD_NOTES_LIST_ERROR',
    SWAP_LIST_ITEMS: 'NA_SWAP_LIST_ITEMS',
    CHANGE_SORT_TYPE: 'NA_CHANGE_SORT_TYPE',
    SET_USE_COMPACT_VIEW: 'NA_SET_USE_COMPACT_VIEW',
    SET_GROUP_BY_CATEGORIES: 'NA_SET_GROUP_BY_CATEGORIES',
    SET_SELECTED_CATEGORY_ID: 'NA_SET_SELECTED_CATEGORY_ID',
    UPDATE_NOTE: 'NA_UPDATE_NOTE',
    UPDATE_MULTIPLE_NOTES: 'NA_UPDATE_MULTIPLE_NOTES',
    MOVE_NOTE_TO_TRASH: 'NA_MOVE_NOTE_TO_TRASH',
    RESTORE_NOTE_FROM_TRASH: 'NA_RESTORE_NOTE_FROM_TRASH',
    REMOVE_NOTE_COMPLETELY: 'NA_REMOVE_NOTE_COMPLETELY',
    REMOVE_MULTIPLE_NOTES_COMPLETELY: 'NA_REMOVE_MULTIPLE_NOTES_COMPLETELY',
    SET_REQUESTED_TO_OPEN_NOTE_ID: 'NA_SET_REQUESTED_TO_OPEN_NOTE_ID',
    CLEAR_REQUESTED_TO_OPEN_NOTE_ID: 'NA_CLEAR_REQUESTED_TO_OPEN_NOTE_ID',
    SET_NOTE_SEARCH_TEXT: 'NA_SET_NOTE_SEARCH_TEXT',
    SET_FINAL_NOTE_SEARCH_TEXT: 'NA_SET_FINAL_NOTE_SEARCH_TEXT',
    CLEAR_NOTE_SEARCH_TEXT: 'NA_CLEAR_NOTE_SEARCH_TEXT',
  };

  const loadNotesList = () => {
    return {
      type: types.LOAD_NOTES_LIST,
    };
  };

  const loadNotesListBegin = () => {
    return {
      type: types.LOAD_NOTES_LIST_BEGIN,
    };
  };

  const loadNotesListFinished = ({settings, notesList, vaultedNotesIdsSet}) => {
    return {
      type: types.LOAD_NOTES_LIST_FINISHED,
      payload: {settings, notesList, vaultedNotesIdsSet},
    };
  };

  const loadNotesListError = ({code, description}) => {
    return {
      type: types.LOAD_NOTES_LIST_ERROR,
      payload: {error: {code, description}},
    };
  };

  const swapListItems = ({from, to, data}) => {
    return {
      type: types.SWAP_LIST_ITEMS,
      payload: {from, to, data},
    };
  };

  const changeSortType = ({sortType}) => {
    return {
      type: types.CHANGE_SORT_TYPE,
      payload: {sortType},
    };
  };

  const setGroupByCategories = ({groupByCategories}) => {
    return {
      type: types.SET_GROUP_BY_CATEGORIES,
      payload: {groupByCategories},
    };
  };

  const setUseCompactView = ({useCompactView}) => {
    return {
      type: types.SET_USE_COMPACT_VIEW,
      payload: {useCompactView},
    };
  };

  const setSelectedCategoryId = ({categoryId}) => {
    return {
      type: types.SET_SELECTED_CATEGORY_ID,
      payload: {categoryId},
    };
  };

  const updateNote = ({note}) => {
    return {
      type: types.UPDATE_NOTE,
      payload: {note},
    };
  };

  const updateMultipleNotes = ({notesList}) => {
    return {
      type: types.UPDATE_MULTIPLE_NOTES,
      payload: {notesList},
    };
  };

  const moveNoteToTrash = ({note}) => {
    return {
      type: types.MOVE_NOTE_TO_TRASH,
      payload: {note},
    };
  };

  const restoreNoteFromTrash = ({note}) => {
    return {
      type: types.RESTORE_NOTE_FROM_TRASH,
      payload: {note},
    };
  };

  const removeNoteCompletely = ({id}) => {
    return {
      type: types.REMOVE_NOTE_COMPLETELY,
      payload: {id},
    };
  };

  const removeMultipleNotesCompletely = ({idsArray}) => {
    return {
      type: types.REMOVE_MULTIPLE_NOTES_COMPLETELY,
      payload: {idsArray},
    };
  };

  const setRequestedToOpenNoteId = ({noteId}) => {
    return {
      type: types.SET_REQUESTED_TO_OPEN_NOTE_ID,
      payload: {noteId},
    };
  };

  const clearRequestedToOpenNoteId = () => {
    return {
      type: types.CLEAR_REQUESTED_TO_OPEN_NOTE_ID,
    };
  };

  const setNoteSearchText = ({text}) => {
    return {
      type: types.SET_NOTE_SEARCH_TEXT,
      payload: {text},
    };
  };

  const setFinalNoteSearchText = ({text}) => {
    return {
      type: types.SET_FINAL_NOTE_SEARCH_TEXT,
      payload: {text},
    };
  };

  const clearNoteSearchText = () => {
    return {
      type: types.CLEAR_NOTE_SEARCH_TEXT,
    };
  };

  return {
    types,
    actions: {
      loadNotesList,
      loadNotesListBegin,
      loadNotesListFinished,
      loadNotesListError,
      swapListItems,
      changeSortType,
      setGroupByCategories,
      setUseCompactView,
      setSelectedCategoryId,
      updateNote,
      updateMultipleNotes,
      moveNoteToTrash,
      restoreNoteFromTrash,
      removeNoteCompletely,
      removeMultipleNotesCompletely,
      setRequestedToOpenNoteId,
      clearRequestedToOpenNoteId,
      setNoteSearchText,
      setFinalNoteSearchText,
      clearNoteSearchText,
    },
  };
};

export default NotesActions;
