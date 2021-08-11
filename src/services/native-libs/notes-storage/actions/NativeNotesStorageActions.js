import NativeNotesStorageConstants from '../constants/NativeNotesStorageConstants';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';

const NativeNotesStorageActions = () => {
  const {
    actionTypes: {
      GET_CORE_APP_DATA,
      GET_NOTES_LIST_SETTINGS,
      UPDATE_NOTES_LIST_SETTINGS,
      GET_ALL_NOTES,
      GET_NOTE,
      UPDATE_NOTE,
      UPDATE_MULTIPLE_NOTES,
      REMOVE_NOTE,
      REMOVE_MULTIPLE_NOTES,
      SAVE_NOTE_IMAGE,
      GET_NOTE_IMAGE,
      REMOVE_NOTE_IMAGE,
      GET_ALL_CATEGORIES,
      UPDATE_CATEGORIES_LIST,
      GET_APP_SETTINGS,
      UPDATE_APP_SETTINGS,
      GET_VAULT_PASSWORD,
      UPDATE_VAULT_PASSWORD,
    },
  } = NativeNotesStorageConstants;

  const getCoreAppData = () => {
    return {
      type: GET_CORE_APP_DATA,
    };
  };

  const getNotesListSettings = () => {
    return {
      type: GET_NOTES_LIST_SETTINGS,
    };
  };

  const updateNotesListSettings = ({
    sortType,
    useCompactView,
    groupByCategories,
    selectedCategoryId,
  }) => {
    return {
      type: UPDATE_NOTES_LIST_SETTINGS,
      payload: {
        sortType,
        useCompactView,
        groupByCategories,
        selectedCategoryId,
      },
    };
  };

  const getAllNotes = () => {
    return {
      type: GET_ALL_NOTES,
    };
  };

  const getNote = ({id}) => {
    return {
      type: GET_NOTE,
      payload: {id},
    };
  };

  const updateNote = ({note}) => {
    return {
      type: UPDATE_NOTE,
      payload: {note},
    };
  };

  const updateMultipleNotes = ({notesList}) => {
    return {
      type: UPDATE_MULTIPLE_NOTES,
      payload: {notesList},
    };
  };

  const removeNote = ({id}) => {
    return {
      type: REMOVE_NOTE,
      payload: {id},
    };
  };

  const removeMultipleNotes = ({idsArray}) => {
    return {
      type: REMOVE_MULTIPLE_NOTES,
      payload: {idsArray},
    };
  };

  const saveNoteImage = ({noteId, imageBase64String}) => {
    return {
      type: SAVE_NOTE_IMAGE,
      payload: {noteId, imageBase64String},
    };
  };

  const getNoteImage = ({noteId, imageId}) => {
    return {
      type: GET_NOTE_IMAGE,
      payload: {noteId, imageId},
    };
  };

  const removeNoteImage = ({noteId, imageId}) => {
    return {
      type: REMOVE_NOTE_IMAGE,
      payload: {noteId, imageId},
    };
  };

  const getAllCategories = () => {
    return {
      type: GET_ALL_CATEGORIES,
    };
  };

  const updateCategories = ({stringifiedCategoriesList}) => {
    return {
      type: UPDATE_CATEGORIES_LIST,
      payload: {stringifiedCategoriesList},
    };
  };

  const getAppSettings = () => {
    return {
      type: GET_APP_SETTINGS,
    };
  };

  const updateAppSettings = ({stringifiedAppSettings}) => {
    return {
      type: UPDATE_APP_SETTINGS,
      payload: {stringifiedAppSettings},
    };
  };

  const getVaultPassword = () => {
    return {
      type: GET_VAULT_PASSWORD,
    };
  };

  const updateVaultPassword = ({password}) => {
    return {
      type: UPDATE_VAULT_PASSWORD,
      payload: {password},
    };
  };

  return {
    getCoreAppData,
    getNotesListSettings,
    updateNotesListSettings,
    getAllNotes,
    getNote,
    updateNote,
    updateMultipleNotes,
    removeNote,
    removeMultipleNotes,
    saveNoteImage,
    getNoteImage,
    removeNoteImage,
    getAllCategories,
    updateCategories,
    getAppSettings,
    updateAppSettings,
    getVaultPassword,
    updateVaultPassword,
  };
};

export default NativeNotesStorageActions();
