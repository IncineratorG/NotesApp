import NativeNotesStorage from '../native-libs/notes-storage/NativeNotesStorage';
import {SystemEventsHandler} from '../../utils/common/system-events-handler/SystemEventsHandler';
import InitialNoteListSettings from './data/initial/notes-list-settings/InitialNotesListSettings';
import InitialCategories from './data/initial/categories/InitialCategories';
import InitialAppSettings from './data/initial/app-settings/InitialAppSettings';
import AppSettingsCache from './cache/app-settings/AppSettingsCache';
import NotesListSettingsCache from './cache/notes-list-settings/NotesListSettingsCache';
import CategoriesCache from './cache/categories/CategoriesCache';
import NotesCache from './cache/notes/NotesCache';
import NotesServiceInitializer from './initializer/NotesServiceInitializer';
import PNServiceImplementation from './push-notifications/PNServiceImplementation';
import NativeStorage from '../native-libs/native-storage/NativeStorage';
import ImagesCache from './cache/images/ImagesCache';
import VaultPasswordCache from './cache/vault-password/VaultPasswordCache';
import VaultNotesIdsListCache from './cache/vault-notes-ids-list/VaultNotesIdsListCache';

const NotesService = () => {
  const SERVICE_ID = 'NotesServiceId';
  const NOTE_TO_OPEN_STORAGE_KEY = 'NOTE_TO_OPEN_STORAGE_KEY';

  const initializer = NotesServiceInitializer();
  const notesStorage = NativeNotesStorage();
  const nativeStorage = NativeStorage();
  const reminderServiceImpl = PNServiceImplementation();

  const appSettingsCache = AppSettingsCache();
  const notesListSettingsCache = NotesListSettingsCache();
  const categoriesCache = CategoriesCache();
  const notesCache = NotesCache();
  const imagesCache = ImagesCache();
  const vaultPasswordCache = VaultPasswordCache();

  const onOpenNoteRequestListeners = new Map();

  const init = async () => {
    SystemEventsHandler.onInfo({info: 'NotesService->init()'});

    const {appSettings, notesList} = await setCaches();

    const {noteIdsToRemove} = await initializer.initialize({
      notesList,
      appSettings,
    });
    if (noteIdsToRemove.length > 0) {
      await removeMultipleNotes({idsArray: noteIdsToRemove});
    }

    await reminderServiceImpl.init();
    reminderServiceImpl.addOnOpenNoteRequestListener({
      id: SERVICE_ID,
      handler: ({noteId}) => {
        SystemEventsHandler.onInfo({info: 'NotesService->OnOpenNoteRequest'});

        onOpenNoteRequestListeners.forEach((value, key) => {
          value({noteId});
        });
      },
    });
  };

  const dispose = () => {};

  const setCaches = async () => {
    const coreAppData = await notesStorage.getCoreAppData();
    const {
      appSettings: loadedAppSettings,
      notesListSettings: loadedNotesListSettings,
      notesList: loadedNotesList,
      categoriesList: loadedCategoriesList,
      vaultPassword: loadedVaultPassword,
    } = coreAppData;

    const appSettings = loadedAppSettings
      ? JSON.parse(loadedAppSettings)
      : {...InitialAppSettings};
    appSettingsCache.set({appSettings});
    if (!loadedAppSettings) {
      await updateAppSettings({appSettings});
    }

    const notesListSettings = loadedNotesListSettings
      ? loadedNotesListSettings
      : {...InitialNoteListSettings};
    notesListSettingsCache.set({notesListSettings});
    if (!loadedNotesListSettings) {
      await updateNotesListSettings(notesListSettings);
    }

    const notesList = loadedNotesList ? loadedNotesList : [];
    notesCache.set({notesList});

    const categoriesList = loadedCategoriesList
      ? JSON.parse(loadedCategoriesList)
      : [...InitialCategories.categoriesList];
    categoriesCache.set({categoriesList});
    if (!loadedCategoriesList) {
      await updateCategoriesList({categoriesList});
    }

    vaultPasswordCache.set({password: loadedVaultPassword});

    return {
      appSettings,
      notesListSettings,
      notesList,
      categoriesList,
      vaultPasswordCache,
    };
  };

  const invalidateCaches = () => {
    appSettingsCache.clear();
    notesListSettingsCache.clear();
    categoriesCache.clear();
    notesCache.clear();
    vaultPasswordCache.clear();
  };

  const addOnOpenNoteRequestListener = ({id, handler}) => {
    onOpenNoteRequestListeners.set(id, handler);
  };

  const removeOnOpenNoteRequestListener = ({id}) => {
    onOpenNoteRequestListeners.delete(id);
  };

  const getNoteToOpenId = async () => {
    const noteToOpenId = await nativeStorage.getStringifiedObject({
      key: NOTE_TO_OPEN_STORAGE_KEY,
    });
    if (noteToOpenId) {
      nativeStorage.removeObject({key: NOTE_TO_OPEN_STORAGE_KEY});
    }

    return noteToOpenId;
  };

  const getCoreAppData = async () => {
    if (
      appSettingsCache.empty() ||
      notesListSettingsCache.empty() ||
      categoriesCache.empty() ||
      notesCache.empty() ||
      vaultPasswordCache.empty()
    ) {
      SystemEventsHandler.onInfo({
        info: 'NotesService->getCoreAppData(): WILL_UPDATE_CACHES',
      });
      await setCaches();
    }

    const appSettings = appSettingsCache.get();
    const notesListSettings = notesListSettingsCache.get();
    const categoriesList = categoriesCache.get();
    const notesList = notesCache.get();
    const vaultPassword = vaultPasswordCache.get();

    return {
      appSettings,
      notesListSettings,
      categoriesList,
      notesList,
      vaultPassword,
    };
  };

  const getNotesList = async () => {
    let notesListSettings = null;
    if (!notesListSettingsCache.empty()) {
      notesListSettings = notesListSettingsCache.get();
    } else {
      notesListSettings = await notesStorage.getNotesListSettings();
      if (!notesListSettings) {
        notesListSettings = {...InitialNoteListSettings};
        await updateNotesListSettings(notesListSettings);
      }
      notesListSettingsCache.set({notesListSettings});
    }

    let notesList = null;
    if (!notesCache.empty()) {
      notesList = notesCache.get();
    } else {
      notesList = await notesStorage.getAllNotes();
      if (!notesList) {
        notesList = [];
      }
      notesCache.set({notesList});
    }

    return {
      settings: notesListSettings,
      notes: notesList,
    };
  };

  const getNote = async ({noteId}) => {
    return await notesStorage.getNote({id: noteId});
  };

  const updateNote = async ({note}) => {
    notesCache.updateNote({note});
    return await notesStorage.updateNote({note});
  };

  const updateMultipleNotes = async ({notesList}) => {
    notesCache.updateMultipleNotes({notesList});
    return await notesStorage.updateMultipleNotes({notesList});
  };

  const removeNote = async ({id}) => {
    notesCache.removeNote({id});
    return await notesStorage.removeNote({id});
  };

  const removeMultipleNotes = async ({idsArray}) => {
    notesCache.removeMultipleNotes({idsArray});
    return await notesStorage.removeMultipleNotes({idsArray});
  };

  const saveNoteImage = async ({noteId, imageBase64String}) => {
    return await notesStorage.saveNoteImage({noteId, imageBase64String});
  };

  const getNoteImage = async ({noteId, imageId}) => {
    let imageData = imagesCache.get(imageId);
    if (!imageData) {
      imageData = await notesStorage.getNoteImage({noteId, imageId});
      imagesCache.set({imageId, imageData});
    }

    return imageData;
  };

  const removeNoteImage = async ({noteId, imageId}) => {
    return await notesStorage.removeNoteImage({noteId, imageId});
  };

  const getCategoriesList = async () => {
    if (!categoriesCache.empty()) {
      return {
        categoriesList: categoriesCache.get(),
      };
    }

    const stringifiedCategoriesList = await notesStorage.getAllCategories();
    const categoriesList = stringifiedCategoriesList
      ? JSON.parse(stringifiedCategoriesList)
      : [...InitialCategories.categoriesList];

    if (!stringifiedCategoriesList) {
      await updateCategoriesList({categoriesList});
    }

    categoriesCache.set({categoriesList});
    return {
      categoriesList: categoriesCache.get(),
    };
  };

  const updateCategoriesList = async ({categoriesList}) => {
    categoriesCache.set({categoriesList});
    return await notesStorage.updateCategories({categoriesList});
  };

  const updateNotesListSettings = async ({
    sortType,
    useCompactView,
    groupByCategories,
    selectedCategoryId,
  }) => {
    notesListSettingsCache.set({
      notesListSettings: {
        sortType,
        useCompactView,
        groupByCategories,
        selectedCategoryId,
      },
    });
    return await notesStorage.updateNotesListSettings({
      sortType,
      useCompactView,
      groupByCategories,
      selectedCategoryId,
    });
  };

  const getAppSettings = async () => {
    if (!appSettingsCache.empty()) {
      return appSettingsCache.get();
    }

    const stringifiedAppSettings = await notesStorage.getAppSettings();
    let appSettings = stringifiedAppSettings
      ? JSON.parse(stringifiedAppSettings)
      : {...InitialAppSettings};

    if (!stringifiedAppSettings) {
      await updateAppSettings({appSettings});
    }

    appSettingsCache.set({appSettings});
    return appSettingsCache.get();
  };

  const updateAppSettings = async ({appSettings}) => {
    appSettingsCache.set({appSettings});
    return await notesStorage.updateAppSettings({appSettings});
  };

  const hasReminder = ({noteId}) => {
    return reminderServiceImpl.hasNotificationForNote({noteId});
  };

  const setNoteReminder = async ({
    noteId,
    title,
    message,
    dateInMilliseconds,
  }) => {
    SystemEventsHandler.onInfo({
      info:
        'NotesService->setNoteReminder(): ' +
        noteId +
        ' - ' +
        title +
        ' - ' +
        message +
        ' - ' +
        dateInMilliseconds,
    });

    if (dateInMilliseconds > Date.now()) {
      await reminderServiceImpl.setNotification({
        noteId,
        title,
        body: message,
        dateInMilliseconds,
      });
    }
  };

  const removeNoteReminder = async ({noteId}) => {
    SystemEventsHandler.onInfo({
      info: 'NotesService->removeNoteReminder(): ' + noteId,
    });
    await reminderServiceImpl.cancelNotification({noteId});
  };

  const removeAllReminders = async () => {
    const {notes} = await getNotesList();
    await Promise.all(
      notes.map(async note => {
        await removeNoteReminder({noteId: note.id});
      }),
    );
  };

  const getVaultPassword = async () => {
    let password = null;
    if (!vaultPasswordCache.empty()) {
      password = vaultPasswordCache.get();
    } else {
      password = await notesStorage.getVaultPassword();
      vaultPasswordCache.set({password});
    }

    return password;
  };

  const updateVaultPassword = async ({password}) => {
    vaultPasswordCache.set({password});
    return await notesStorage.updateVaultPassword({password});
  };

  return {
    init,
    dispose,
    invalidateCaches,
    addOnOpenNoteRequestListener,
    removeOnOpenNoteRequestListener,
    getNoteToOpenId,
    getCoreAppData,
    getNotesList,
    getNote,
    getCategoriesList,
    updateNotesListSettings,
    updateCategoriesList,
    updateNote,
    updateMultipleNotes,
    removeNote,
    removeMultipleNotes,
    saveNoteImage,
    getNoteImage,
    removeNoteImage,
    getAppSettings,
    updateAppSettings,
    hasReminder,
    setNoteReminder,
    removeNoteReminder,
    removeAllReminders,
    getVaultPassword,
    updateVaultPassword,
  };
};

export default NotesService;

// import NativeNotesStorage from '../native-libs/notes-storage/NativeNotesStorage';
// import {SystemEventsHandler} from '../../utils/common/system-events-handler/SystemEventsHandler';
// import InitialNoteListSettings from './data/initial/notes-list-settings/InitialNotesListSettings';
// import InitialCategories from './data/initial/categories/InitialCategories';
// import InitialAppSettings from './data/initial/app-settings/InitialAppSettings';
// import AppSettingsCache from './cache/app-settings/AppSettingsCache';
// import NotesListSettingsCache from './cache/notes-list-settings/NotesListSettingsCache';
// import CategoriesCache from './cache/categories/CategoriesCache';
// import NotesCache from './cache/notes/NotesCache';
// import NotesServiceInitializer from './initializer/NotesServiceInitializer';
// import PNServiceImplementation from './push-notifications/PNServiceImplementation';
// import NativeStorage from '../native-libs/native-storage/NativeStorage';
// import ImagesCache from './cache/images/ImagesCache';
//
// const NotesService = () => {
//   const SERVICE_ID = 'NotesServiceId';
//   const NOTE_TO_OPEN_STORAGE_KEY = 'NOTE_TO_OPEN_STORAGE_KEY';
//
//   const initializer = NotesServiceInitializer();
//   const notesStorage = NativeNotesStorage();
//   const nativeStorage = NativeStorage();
//   const reminderServiceImpl = PNServiceImplementation();
//
//   const appSettingsCache = AppSettingsCache();
//   const notesListSettingsCache = NotesListSettingsCache();
//   const categoriesCache = CategoriesCache();
//   const notesCache = NotesCache();
//   const imagesCache = ImagesCache();
//
//   const onOpenNoteRequestListeners = new Map();
//
//   const init = async () => {
//     SystemEventsHandler.onInfo({info: 'NotesService->init()'});
//
//     // ===
//     const coreAppData = await notesStorage.getCoreAppData();
//     const {
//       notesAppSettings,
//       notesListSettings,
//       notesList,
//       vaultNotesIdsList,
//       vaultPassword,
//     } = coreAppData;
//
//     let appSettings = notesAppSettings
//       ? JSON.parse(notesAppSettings)
//       : {...InitialAppSettings};
//     // notesListSettings = {...InitialNoteListSettings};
//
//     SystemEventsHandler.onInfo({info: JSON.stringify(coreAppData)});
//     // ===
//   };
//   const init_V0 = async () => {
//     SystemEventsHandler.onInfo({info: 'NotesService->init()'});
//
//     const {notes} = await getNotesList();
//     const appSettings = await getAppSettings();
//
//     const {noteIdsToRemove} = await initializer.initialize({
//       notesList: notes,
//       appSettings,
//     });
//     if (noteIdsToRemove.length > 0) {
//       await removeMultipleNotes({idsArray: noteIdsToRemove});
//     }
//
//     await reminderServiceImpl.init();
//     reminderServiceImpl.addOnOpenNoteRequestListener({
//       id: SERVICE_ID,
//       handler: ({noteId}) => {
//         SystemEventsHandler.onInfo({info: 'NotesService->OnOpenNoteRequest'});
//
//         onOpenNoteRequestListeners.forEach((value, key) => {
//           value({noteId});
//         });
//       },
//     });
//   };
//
//   const dispose = () => {};
//
//   const invalidateCaches = () => {
//     appSettingsCache.clear();
//     notesListSettingsCache.clear();
//     categoriesCache.clear();
//     notesCache.clear();
//   };
//
//   const addOnOpenNoteRequestListener = ({id, handler}) => {
//     onOpenNoteRequestListeners.set(id, handler);
//   };
//
//   const removeOnOpenNoteRequestListener = ({id}) => {
//     onOpenNoteRequestListeners.delete(id);
//   };
//
//   const getNoteToOpenId = async () => {
//     const noteToOpenId = await nativeStorage.getStringifiedObject({
//       key: NOTE_TO_OPEN_STORAGE_KEY,
//     });
//     if (noteToOpenId) {
//       nativeStorage.removeObject({key: NOTE_TO_OPEN_STORAGE_KEY});
//     }
//
//     return noteToOpenId;
//   };
//
//   const getCoreAppData = async () => {
//     const {
//       appSettings,
//       notesListSettings,
//       notesList,
//       vaultNotesIdsList,
//       vaultPassword,
//     } = await notesStorage.getCoreAppData();
//
//     return {
//       appSettings,
//       notesListSettings,
//       notesList,
//       vaultNotesIdsList,
//       vaultPassword,
//     };
//   };
//
//   const getNotesList = async () => {
//     let notesListSettings = null;
//     if (!notesListSettingsCache.empty()) {
//       notesListSettings = notesListSettingsCache.get();
//     } else {
//       notesListSettings = await notesStorage.getNotesListSettings();
//       if (!notesListSettings) {
//         notesListSettings = {...InitialNoteListSettings};
//         await updateNotesListSettings(notesListSettings);
//       }
//       notesListSettingsCache.set({notesListSettings});
//     }
//
//     let notesList = null;
//     if (!notesCache.empty()) {
//       notesList = notesCache.get();
//     } else {
//       notesList = await notesStorage.getAllNotes();
//       if (!notesList) {
//         notesList = [];
//       }
//       notesCache.set({notesList});
//     }
//
//     const vaultedNotesIdsSet = await getVaultNotesIds();
//
//     return {
//       settings: notesListSettings,
//       notes: notesList,
//       vaultedNotesIdsSet,
//     };
//   };
//
//   const getNote = async ({noteId}) => {
//     return await notesStorage.getNote({id: noteId});
//   };
//
//   const updateNote = async ({note}) => {
//     notesCache.updateNote({note});
//     const updateResult = await notesStorage.updateNote({note});
//     return updateResult;
//   };
//
//   const updateMultipleNotes = async ({notesList}) => {
//     notesCache.updateMultipleNotes({notesList});
//     return await notesStorage.updateMultipleNotes({notesList});
//   };
//
//   const removeNote = async ({id}) => {
//     notesCache.removeNote({id});
//     return await notesStorage.removeNote({id});
//   };
//
//   const removeMultipleNotes = async ({idsArray}) => {
//     notesCache.removeMultipleNotes({idsArray});
//     return await notesStorage.removeMultipleNotes({idsArray});
//   };
//
//   const saveNoteImage = async ({noteId, imageBase64String}) => {
//     return await notesStorage.saveNoteImage({noteId, imageBase64String});
//   };
//
//   const getNoteImage = async ({noteId, imageId}) => {
//     let imageData = imagesCache.get(imageId);
//     if (!imageData) {
//       imageData = await notesStorage.getNoteImage({noteId, imageId});
//       imagesCache.set({imageId, imageData});
//     }
//
//     return imageData;
//   };
//
//   const removeNoteImage = async ({noteId, imageId}) => {
//     return await notesStorage.removeNoteImage({noteId, imageId});
//   };
//
//   const getCategoriesList = async () => {
//     if (!categoriesCache.empty()) {
//       return {
//         categoriesList: categoriesCache.get(),
//       };
//     }
//
//     const stringifiedCategoriesList = await notesStorage.getAllCategories();
//     const categoriesList = stringifiedCategoriesList
//       ? JSON.parse(stringifiedCategoriesList)
//       : [...InitialCategories.categoriesList];
//
//     if (!stringifiedCategoriesList) {
//       await updateCategoriesList({categoriesList});
//     }
//
//     categoriesCache.set({categoriesList});
//     return {
//       categoriesList: categoriesCache.get(),
//     };
//   };
//
//   const updateCategoriesList = async ({categoriesList}) => {
//     categoriesCache.set({categoriesList});
//     return await notesStorage.updateCategories({categoriesList});
//   };
//
//   const updateNotesListSettings = async ({
//     sortType,
//     useCompactView,
//     groupByCategories,
//     selectedCategoryId,
//   }) => {
//     notesListSettingsCache.set({
//       notesListSettings: {
//         sortType,
//         useCompactView,
//         groupByCategories,
//         selectedCategoryId,
//       },
//     });
//     return await notesStorage.updateNotesListSettings({
//       sortType,
//       useCompactView,
//       groupByCategories,
//       selectedCategoryId,
//     });
//   };
//
//   const getAppSettings = async () => {
//     if (!appSettingsCache.empty()) {
//       return appSettingsCache.get();
//     }
//
//     const stringifiedAppSettings = await notesStorage.getAppSettings();
//     let appSettings = stringifiedAppSettings
//       ? JSON.parse(stringifiedAppSettings)
//       : {...InitialAppSettings};
//
//     if (!stringifiedAppSettings) {
//       await updateAppSettings({appSettings});
//     }
//
//     appSettingsCache.set({appSettings});
//     return appSettingsCache.get();
//   };
//
//   const updateAppSettings = async ({appSettings}) => {
//     appSettingsCache.set({appSettings});
//     return await notesStorage.updateAppSettings({appSettings});
//   };
//
//   const hasReminder = ({noteId}) => {
//     return reminderServiceImpl.hasNotificationForNote({noteId});
//   };
//
//   const setNoteReminder = async ({
//     noteId,
//     title,
//     message,
//     dateInMilliseconds,
//   }) => {
//     SystemEventsHandler.onInfo({
//       info:
//         'NotesService->setNoteReminder(): ' +
//         noteId +
//         ' - ' +
//         title +
//         ' - ' +
//         message +
//         ' - ' +
//         dateInMilliseconds,
//     });
//
//     if (dateInMilliseconds > Date.now()) {
//       await reminderServiceImpl.setNotification({
//         noteId,
//         title,
//         body: message,
//         dateInMilliseconds,
//       });
//     }
//   };
//
//   const removeNoteReminder = async ({noteId}) => {
//     SystemEventsHandler.onInfo({
//       info: 'NotesService->removeNoteReminder(): ' + noteId,
//     });
//     await reminderServiceImpl.cancelNotification({noteId});
//   };
//
//   const removeAllReminders = async () => {
//     const {notes} = await getNotesList();
//     await Promise.all(
//       notes.map(async note => {
//         await removeNoteReminder({noteId: note.id});
//       }),
//     );
//   };
//
//   const getVaultPassword = async () => {
//     return await notesStorage.getVaultPassword();
//   };
//
//   const updateVaultPassword = async ({password}) => {
//     SystemEventsHandler.onInfo({
//       info: 'NotesService->updateVaultPassword(): ' + password,
//     });
//     return await notesStorage.updateVaultPassword({password});
//   };
//
//   const getVaultNotesIds = async () => {
//     const stringifiedVaultNotesIdsList = await notesStorage.getVaultNotesIdsList();
//
//     SystemEventsHandler.onInfo({
//       info: 'NotesService->getVaultNotesIds(): ' + stringifiedVaultNotesIdsList,
//     });
//
//     return new Set();
//   };
//
//   const updateVaultNotesIds = async ({vaultedNotesIdsSet}) => {
//     SystemEventsHandler.onInfo({
//       info:
//         'NotesService->updateVaultNotesIds(): ' +
//         JSON.stringify(vaultedNotesIdsSet),
//     });
//
//     return await notesStorage.updateVaultNotesIds({vaultedNotesIdsSet});
//   };
//
//   return {
//     init,
//     dispose,
//     invalidateCaches,
//     addOnOpenNoteRequestListener,
//     removeOnOpenNoteRequestListener,
//     getNoteToOpenId,
//     getNotesList,
//     getNote,
//     getCategoriesList,
//     updateNotesListSettings,
//     updateCategoriesList,
//     updateNote,
//     updateMultipleNotes,
//     removeNote,
//     removeMultipleNotes,
//     saveNoteImage,
//     getNoteImage,
//     removeNoteImage,
//     getAppSettings,
//     updateAppSettings,
//     hasReminder,
//     setNoteReminder,
//     removeNoteReminder,
//     removeAllReminders,
//     getVaultPassword,
//     updateVaultPassword,
//   };
// };
//
// export default NotesService;
