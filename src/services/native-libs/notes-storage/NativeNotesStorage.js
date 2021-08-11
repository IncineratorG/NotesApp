import NativeNotesStorageLib from './lib/NativeNotesStorageLib';
import NativeNotesStorageActions from './actions/NativeNotesStorageActions';
import {SystemEventsHandler} from '../../../utils/common/system-events-handler/SystemEventsHandler';

const NativeNotesStorage = () => {
  const nativeNotesStorage = NativeNotesStorageLib;

  const getCoreAppData = async () => {
    const action = NativeNotesStorageActions.getCoreAppData();
    return await nativeNotesStorage.execute(action);
  };

  const getNotesListSettings = async () => {
    const action = NativeNotesStorageActions.getNotesListSettings();
    return await nativeNotesStorage.execute(action);
  };

  const updateNotesListSettings = async ({
    sortType,
    useCompactView,
    groupByCategories,
    selectedCategoryId,
  }) => {
    const action = NativeNotesStorageActions.updateNotesListSettings({
      sortType,
      useCompactView,
      groupByCategories,
      selectedCategoryId,
    });
    return await nativeNotesStorage.execute(action);
  };

  const getAllNotes = async () => {
    const action = NativeNotesStorageActions.getAllNotes();
    return await nativeNotesStorage.execute(action);
  };

  const getNote = async ({id}) => {
    const action = NativeNotesStorageActions.getNote({id});
    return await nativeNotesStorage.execute(action);
  };

  const getAllCategories = async () => {
    const action = NativeNotesStorageActions.getAllCategories();
    return await nativeNotesStorage.execute(action);
  };

  const updateCategories = async ({categoriesList}) => {
    const action = NativeNotesStorageActions.updateCategories({
      stringifiedCategoriesList: JSON.stringify(categoriesList),
    });
    return await nativeNotesStorage.execute(action);
  };

  const updateNote = async ({note}) => {
    const action = NativeNotesStorageActions.updateNote({note});
    return await nativeNotesStorage.execute(action);
  };

  const updateMultipleNotes = async ({notesList}) => {
    const action = NativeNotesStorageActions.updateMultipleNotes({notesList});
    return await nativeNotesStorage.execute(action);
  };

  const removeNote = async ({id}) => {
    const action = NativeNotesStorageActions.removeNote({id});
    return await nativeNotesStorage.execute(action);
  };

  const removeMultipleNotes = async ({idsArray}) => {
    const action = NativeNotesStorageActions.removeMultipleNotes({idsArray});
    return await nativeNotesStorage.execute(action);
  };

  const saveNoteImage = async ({noteId, imageBase64String}) => {
    const action = NativeNotesStorageActions.saveNoteImage({
      noteId,
      imageBase64String,
    });
    return await nativeNotesStorage.execute(action);
  };

  const getNoteImage = async ({noteId, imageId}) => {
    const action = NativeNotesStorageActions.getNoteImage({noteId, imageId});
    return await nativeNotesStorage.execute(action);
  };

  const removeNoteImage = async ({noteId, imageId}) => {
    const action = NativeNotesStorageActions.removeNoteImage({noteId, imageId});
    return await nativeNotesStorage.execute(action);
  };

  const getAppSettings = async () => {
    const action = NativeNotesStorageActions.getAppSettings();
    return await nativeNotesStorage.execute(action);
  };

  const updateAppSettings = async ({appSettings}) => {
    const action = NativeNotesStorageActions.updateAppSettings({
      stringifiedAppSettings: JSON.stringify(appSettings),
    });
    return await nativeNotesStorage.execute(action);
  };

  const getVaultPassword = async () => {
    const action = NativeNotesStorageActions.getVaultPassword();
    return await nativeNotesStorage.execute(action);
  };

  const updateVaultPassword = async ({password}) => {
    const action = NativeNotesStorageActions.updateVaultPassword({password});
    return await nativeNotesStorage.execute(action);
  };

  return {
    getCoreAppData,
    getNotesListSettings,
    updateNotesListSettings,
    getAllNotes,
    getNote,
    getAllCategories,
    updateCategories,
    updateNote,
    updateMultipleNotes,
    removeNote,
    removeMultipleNotes,
    saveNoteImage,
    getNoteImage,
    removeNoteImage,
    getAppSettings,
    updateAppSettings,
    getVaultPassword,
    updateVaultPassword,
  };
};

export default NativeNotesStorage;
