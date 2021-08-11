import NativeNotesStorageLib from '../lib/NativeNotesStorageLib';

const NativeNotesStorageConstants = () => {
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
  } = NativeNotesStorageLib.getConstants();

  return {
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
  };
};

export default NativeNotesStorageConstants();
