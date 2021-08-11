import {
  useState,
  useEffect,
  useLayoutEffect,
  useReducer,
  useCallback,
} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import noteLocalReducer from '../store/noteLocalReducer';
import noteLocalState from '../store/noteLocalState';
import NoteLocalActions from '../store/NoteLocalActions';
import AppActions from '../../../store/actions/AppActions';
import {SystemEventsHandler} from '../../../utils/common/system-events-handler/SystemEventsHandler';
import useOpenNoteRequestsHandler from '../../../utils/common/hooks/useOpenNoteRequestsHandler';
import AppRoutes from '../../../data/common/routes/AppRoutes';
import Services from '../../../services/Services';
import useAppStateChangeCallback from '../../../utils/common/hooks/useAppStateChangeCallback';
import AppEvents from '../../../events/AppEvents';

const useNoteModel = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {note, newNote} = route.params;

  const dispatch = useDispatch();

  const [localState, localDispatch] = useReducer(
    noteLocalReducer,
    noteLocalState,
  );
  const {note: localStateNote} = localState;
  const {
    category: {id: categoryId},
  } = localStateNote;

  // ===
  // =====
  const openNoteCallback = useCallback(
    noteToOpen => {
      if (noteToOpen) {
        navigation.goBack();
        navigation.navigate(AppRoutes.Note, {note: noteToOpen});
      }
    },
    [navigation],
  );

  useOpenNoteRequestsHandler({
    routeName: AppRoutes.Note,
    dispatch,
    openNoteCallback,
  });
  // =====
  // ===

  const [isNewNote, setIsNewNote] = useState(false);
  const [noteMenuVisible, setNoteMenuVisible] = useState(false);
  const [categoryColor, setCategoryColor] = useState('#FFFFFF');
  const [noteReminderExpired, setNoteReminderExpired] = useState(false);
  const [
    sortNoteItemsAlphabetically,
    setSortNoteItemsAlphabetically,
  ] = useState(false);
  const [removeCheckedItems, setRemoveCheckedItems] = useState(false);
  const [uncheckAllItems, setUncheckAllItems] = useState(false);
  const [noteAsListUndoChanges, setNoteAsListUndoChanges] = useState(false);
  const [updatedNote, setUpdatedNote] = useState(null);
  const [imageViewerVisible, setImageViewerVisible] = useState(false);
  const [imageViewerImages, setImageViewerImages] = useState([]);
  const [imageViewerInitialIndex, setImageViewerInitialIndex] = useState(0);
  const [
    skipNextAppStateChangeEvent,
    setSkipNextAppStateChangeEvent,
  ] = useState(false);
  const [
    removeNoteImageConfirmationDialogVisible,
    setRemoveNoteImageConfirmationDialogVisible,
  ] = useState(false);
  const [removeImageId, setRemoveImageId] = useState('');

  const categoriesList = useSelector(
    store => store.categories.categoriesList.categories,
  );
  const shareServiceAvailabilityMap = useSelector(
    store => store.share.availability.shareServiceAvailabilityMap,
  );
  const noteImageQuality = useSelector(
    store => store.appSettings.notes.noteImageQuality,
  );

  useLayoutEffect(() => {
    SystemEventsHandler.onInfo({info: 'useNoteMode()->useLayoutEffect()'});

    if (note) {
      localDispatch(
        NoteLocalActions.actions.setInitialNoteData({
          id: note.id,
          title: note.title,
          isList: note.isList,
          noteText: note.noteText,
          textSize: note.textSize,
          moveCheckedToBottom: note.moveCheckedToBottom,
          reminder: {...note.reminder},
          images: [...note.images],
          deleted: note.deleted,
          vaultedDateTimestamp: note.vaultedDateTimestamp,
          deleteDateTimestamp: note.deleteDateTimestamp,
          creationDateTimestamp: note.creationDateTimestamp,
          updateDateTimestamp: note.updateDateTimestamp,
          categoryId: note.category.id,
          orderPos: note.orderPos,
        }),
      );
    }
  }, [note]);

  useEffect(() => {
    if (updatedNote) {
      // SystemEventsHandler.onInfo({
      //   info:
      //     'useNoteModel()->UPDATED_NOTE_EFFECT: ' + JSON.stringify(updatedNote),
      // });

      localDispatch(
        NoteLocalActions.actions.setInitialNoteData({
          id: updatedNote.id,
          title: updatedNote.title,
          isList: updatedNote.isList,
          noteText: updatedNote.noteText,
          textSize: updatedNote.textSize,
          moveCheckedToBottom: updatedNote.moveCheckedToBottom,
          reminder: {...updatedNote.reminder},
          images: updatedNote.images,
          deleted: updatedNote.deleted,
          vaultedDateTimestamp: updatedNote.vaultedDateTimestamp,
          deleteDateTimestamp: updatedNote.deleteDateTimestamp,
          creationDateTimestamp: updatedNote.creationDateTimestamp,
          updateDateTimestamp: updatedNote.updateDateTimestamp,
          categoryId: updatedNote.category.id,
          orderPos: updatedNote.orderPos,
        }),
      );
      setUpdatedNote(null);
    }
  }, [updatedNote]);

  useAppStateChangeCallback({
    callback: async () => {
      if (skipNextAppStateChangeEvent) {
        SystemEventsHandler.onInfo({info: 'useNoteModel->WILL_SKIP_CALLBACK'});
        setSkipNextAppStateChangeEvent(false);
        return;
      }

      const serviceUpdatedNote = await Services.services().notesService.getNote(
        {
          noteId: note.id,
        },
      );
      setUpdatedNote(serviceUpdatedNote);
    },
    runOnGoingToForeground: true,
  });

  useEffect(() => {
    if (categoryId >= 0) {
      for (let i = 0; i < categoriesList.length; ++i) {
        if (categoriesList[i].id === categoryId) {
          setCategoryColor(categoriesList[i].color);
          break;
        }
      }
    }
  }, [categoryId, categoriesList]);

  useEffect(() => {
    if (note) {
      const {updateDateTimestamp: initialNoteUpdateTimestamp} = note;
      const {updateDateTimestamp: localNoteUpdateTimestamp} = localStateNote;

      if (
        localNoteUpdateTimestamp > 0 &&
        localNoteUpdateTimestamp !== initialNoteUpdateTimestamp
      ) {
        SystemEventsHandler.onInfo({
          info: 'useNoteModel()->WILL_UPDATE_NOTE: ' + localStateNote.title,
        });

        dispatch(AppActions.notes.actions.updateNote({note: localStateNote}));
      }
    }
  }, [localStateNote, note, dispatch]);

  useEffect(() => {
    const {
      reminder: {selectedDateInMilliseconds, repeatOption},
    } = localStateNote;

    if (selectedDateInMilliseconds > 0) {
      const currentDateInMilliseconds = Date.now();
      if (selectedDateInMilliseconds < currentDateInMilliseconds) {
        setNoteReminderExpired(true);
      } else {
        setNoteReminderExpired(false);
      }
    } else {
      setNoteReminderExpired(false);
    }
  }, [localStateNote]);

  useEffect(() => {
    const subscription = AppEvents.addListener({
      event: AppEvents.events.OPEN_IMAGE_PICKER,
      listener: () => {
        setSkipNextAppStateChangeEvent(true);
      },
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    if (newNote) {
      setIsNewNote(true);
    } else {
      setIsNewNote(false);
    }
  }, [newNote]);

  return {
    data: {
      isNewNote,
      noteMenuVisible,
      localState,
      noteReminderExpired,
      categoryColor,
      sortNoteItemsAlphabetically,
      removeCheckedItems,
      uncheckAllItems,
      noteAsListUndoChanges,
      shareServiceAvailabilityMap,
      noteImageQuality,
      imageViewerVisible,
      imageViewerImages,
      imageViewerInitialIndex,
      removeNoteImageConfirmationDialogVisible,
      removeImageId,
    },
    setters: {
      setNoteMenuVisible,
      setSortNoteItemsAlphabetically,
      setRemoveCheckedItems,
      setUncheckAllItems,
      setNoteAsListUndoChanges,
      setImageViewerVisible,
      setImageViewerImages,
      setImageViewerInitialIndex,
      setRemoveNoteImageConfirmationDialogVisible,
      setRemoveImageId,
    },
    navigation,
    localDispatch,
    dispatch,
  };
};

export default useNoteModel;

// import {
//   useState,
//   useEffect,
//   useLayoutEffect,
//   useReducer,
//   useCallback,
// } from 'react';
// import {useNavigation, useRoute} from '@react-navigation/native';
// import {useDispatch, useSelector} from 'react-redux';
// import noteLocalReducer from '../store/noteLocalReducer';
// import noteLocalState from '../store/noteLocalState';
// import NoteLocalActions from '../store/NoteLocalActions';
// import useTranslation from '../../../utils/common/localization';
// import AppActions from '../../../store/actions/AppActions';
// import {SystemEventsHandler} from '../../../utils/common/system-events-handler/SystemEventsHandler';
// import useOpenNoteRequestsHandler from '../../../utils/common/hooks/useOpenNoteRequestsHandler';
// import AppRoutes from '../../../data/common/routes/AppRoutes';
//
// const useNoteModel = () => {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const {note} = route.params;
//
//   const {t} = useTranslation();
//
//   const dispatch = useDispatch();
//
//   const [localState, localDispatch] = useReducer(
//     noteLocalReducer,
//     noteLocalState,
//   );
//   const {note: localStateNote} = localState;
//   const {
//     category: {id: categoryId},
//   } = localStateNote;
//
//   // ===
//   // =====
//   const openNoteCallback = useCallback(noteToOpen => {
//     if (noteToOpen) {
//       // if (noteToOpen.id === note.id) {
//       //   return;
//       // }
//
//       localDispatch(
//         NoteLocalActions.actions.setInitialNoteData({
//           id: noteToOpen.id,
//           title: noteToOpen.title,
//           isList: noteToOpen.isList,
//           noteText: noteToOpen.noteText,
//           textSize: noteToOpen.textSize,
//           moveCheckedToBottom: noteToOpen.moveCheckedToBottom,
//           reminder: {...noteToOpen.reminder},
//           images: [...noteToOpen.images],
//           deleted: noteToOpen.deleted,
//           deleteDateTimestamp: noteToOpen.deleteDateTimestamp,
//           creationDateTimestamp: noteToOpen.creationDateTimestamp,
//           updateDateTimestamp: noteToOpen.updateDateTimestamp,
//           categoryId: noteToOpen.category.id,
//           orderPos: noteToOpen.orderPos,
//         }),
//       );
//     }
//   }, []);
//
//   useOpenNoteRequestsHandler({
//     routeName: AppRoutes.Note,
//     dispatch,
//     openNoteCallback,
//   });
//   // =====
//   // ===
//
//   const [noteMenuVisible, setNoteMenuVisible] = useState(false);
//   const [categoryColor, setCategoryColor] = useState('#FFFFFF');
//   const [noteReminderExpired, setNoteReminderExpired] = useState(false);
//   const [
//     sortNoteItemsAlphabetically,
//     setSortNoteItemsAlphabetically,
//   ] = useState(false);
//   const [removeCheckedItems, setRemoveCheckedItems] = useState(false);
//   const [uncheckAllItems, setUncheckAllItems] = useState(false);
//   const [noteAsListUndoChanges, setNoteAsListUndoChanges] = useState(false);
//   // const [updatedNote, setUpdatedNote] = useState(null);
//   const [imageViewerVisible, setImageViewerVisible] = useState(false);
//   const [imageViewerImages, setImageViewerImages] = useState([]);
//   const [imageViewerInitialIndex, setImageViewerInitialIndex] = useState(0);
//
//   const categoriesList = useSelector(
//     store => store.categories.categoriesList.categories,
//   );
//   const shareServiceAvailabilityMap = useSelector(
//     store => store.share.availability.shareServiceAvailabilityMap,
//   );
//   const noteImageQuality = useSelector(
//     store => store.appSettings.notes.noteImageQuality,
//   );
//   // const notesList = useSelector(store => store.notes.notesList.notes);
//
//   useLayoutEffect(() => {
//     if (note) {
//       // ===
//       // SystemEventsHandler.onInfo({
//       //   info: 'useNoteModel(): ' + JSON.stringify(note),
//       // });
//       // ===
//
//       localDispatch(
//         NoteLocalActions.actions.setInitialNoteData({
//           id: note.id,
//           title: note.title,
//           isList: note.isList,
//           noteText: note.noteText,
//           textSize: note.textSize,
//           moveCheckedToBottom: note.moveCheckedToBottom,
//           reminder: {...note.reminder},
//           images: [...note.images],
//           deleted: note.deleted,
//           deleteDateTimestamp: note.deleteDateTimestamp,
//           creationDateTimestamp: note.creationDateTimestamp,
//           updateDateTimestamp: note.updateDateTimestamp,
//           categoryId: note.category.id,
//           orderPos: note.orderPos,
//         }),
//       );
//     }
//   }, [note]);
//
//   // useEffect(() => {
//   //   if (updatedNote) {
//   //     // SystemEventsHandler.onInfo({
//   //     //   info:
//   //     //     'useNoteModel()->UPDATED_NOTE_EFFECT: ' + JSON.stringify(updatedNote),
//   //     // });
//   //
//   //     localDispatch(
//   //       NoteLocalActions.actions.setInitialNoteData({
//   //         id: updatedNote.id,
//   //         title: updatedNote.title,
//   //         isList: updatedNote.isList,
//   //         noteText: updatedNote.noteText,
//   //         textSize: updatedNote.textSize,
//   //         moveCheckedToBottom: updatedNote.moveCheckedToBottom,
//   //         reminder: {...updatedNote.reminder},
//   //         images: updatedNote.images,
//   //         deleted: updatedNote.deleted,
//   //         deleteDateTimestamp: updatedNote.deleteDateTimestamp,
//   //         creationDateTimestamp: updatedNote.creationDateTimestamp,
//   //         updateDateTimestamp: updatedNote.updateDateTimestamp,
//   //         categoryId: updatedNote.category.id,
//   //         orderPos: updatedNote.orderPos,
//   //       }),
//   //     );
//   //     setUpdatedNote(null);
//   //   }
//   // }, [updatedNote]);
//
//   // useAppStateChangeCallback({
//   //   callback: async () => {
//   //     const serviceUpdatedNote = await Services.services().notesService.getNote(
//   //       {
//   //         noteId: note.id,
//   //       },
//   //     );
//   //     setUpdatedNote(serviceUpdatedNote);
//   //   },
//   //   runOnGoingToForeground: true,
//   // });
//
//   useEffect(() => {
//     if (categoryId >= 0) {
//       for (let i = 0; i < categoriesList.length; ++i) {
//         if (categoriesList[i].id === categoryId) {
//           setCategoryColor(categoriesList[i].color);
//           break;
//         }
//       }
//     }
//   }, [categoryId, categoriesList]);
//
//   useEffect(() => {
//     if (note) {
//       const {updateDateTimestamp: initialNoteUpdateTimestamp} = note;
//       const {updateDateTimestamp: localNoteUpdateTimestamp} = localStateNote;
//
//       if (
//         localNoteUpdateTimestamp > 0 &&
//         localNoteUpdateTimestamp !== initialNoteUpdateTimestamp
//       ) {
//         SystemEventsHandler.onInfo({info: 'useNoteModel()->WILL_UPDATE_NOTE'});
//
//         dispatch(AppActions.notes.actions.updateNote({note: localStateNote}));
//       }
//     }
//   }, [localStateNote, note, dispatch]);
//
//   useEffect(() => {
//     const {
//       reminder: {selectedDateInMilliseconds, repeatOption},
//     } = localStateNote;
//
//     if (selectedDateInMilliseconds > 0) {
//       const currentDateInMilliseconds = Date.now();
//       if (selectedDateInMilliseconds < currentDateInMilliseconds) {
//         setNoteReminderExpired(true);
//       } else {
//         setNoteReminderExpired(false);
//       }
//     } else {
//       setNoteReminderExpired(false);
//     }
//   }, [localStateNote]);
//
//   // ===
//   // =====
//   // const previousLocalNoteState = usePreviousState({
//   //   currentState: localStateNote,
//   //   updateDelay: 500,
//   // });
//
//   // useEffect(() => {
//   //   if (previousLocalNoteState) {
//   //     SystemEventsHandler.onInfo({
//   //       info: 'useNoteModel(): ' + previousLocalNoteState.noteText,
//   //     });
//   //   }
//   //   // SystemEventsHandler.onInfo({
//   //   //   info: 'PREV: ' + JSON.stringify(previousLocalNoteState),
//   //   // });
//   // }, [previousLocalNoteState]);
//
//   // useEffect(() => {
//   //   let timeoutHandler = null;
//   //   if (localStateNote && localStateNote.id) {
//   //     timeoutHandler = setTimeout(() => {
//   //       SystemEventsHandler.onInfo({
//   //         info: 'useNoteModel->WILL_UPDATE_PREVIOUS_STATE',
//   //       });
//   //       setNotePreviousState({...localStateNote});
//   //     }, 1500);
//   //   }
//   //
//   //   return () => {
//   //     if (timeoutHandler) {
//   //       clearTimeout(timeoutHandler);
//   //     }
//   //   };
//   // }, [localStateNote]);
//   // =====
//   // ===
//
//   return {
//     data: {
//       noteMenuVisible,
//       localState,
//       // previousLocalNoteState,
//       noteReminderExpired,
//       categoryColor,
//       sortNoteItemsAlphabetically,
//       removeCheckedItems,
//       uncheckAllItems,
//       noteAsListUndoChanges,
//       shareServiceAvailabilityMap,
//       noteImageQuality,
//       imageViewerVisible,
//       imageViewerImages,
//       imageViewerInitialIndex,
//     },
//     setters: {
//       setNoteMenuVisible,
//       setSortNoteItemsAlphabetically,
//       setRemoveCheckedItems,
//       setUncheckAllItems,
//       setNoteAsListUndoChanges,
//       setImageViewerVisible,
//       setImageViewerImages,
//       setImageViewerInitialIndex,
//     },
//     navigation,
//     localDispatch,
//     dispatch,
//   };
// };
//
// export default useNoteModel;

// import {useState, useEffect, useLayoutEffect, useReducer, useCallback} from 'react';
// import {useNavigation, useRoute} from '@react-navigation/native';
// import {useDispatch, useSelector} from 'react-redux';
// import noteLocalReducer from '../store/noteLocalReducer';
// import noteLocalState from '../store/noteLocalState';
// import NoteLocalActions from '../store/NoteLocalActions';
// import useTranslation from '../../../utils/common/localization';
// import AppActions from '../../../store/actions/AppActions';
// import {SystemEventsHandler} from '../../../utils/common/system-events-handler/SystemEventsHandler';
// import ShareAppTypes from '../../../data/common/share-app-types/ShareAppTypes';
// import useAppStateChangeCallback from '../../../utils/common/hooks/useAppStateChangeCallback';
//
// const useNoteModel = () => {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const {note} = route.params;
//
//   const {t} = useTranslation();
//
//   const dispatch = useDispatch();
//
//   const [noteMenuVisible, setNoteMenuVisible] = useState(false);
//   const [categoryColor, setCategoryColor] = useState('#FFFFFF');
//   const [noteReminderExpired, setNoteReminderExpired] = useState(false);
//   const [
//     sortNoteItemsAlphabetically,
//     setSortNoteItemsAlphabetically,
//   ] = useState(false);
//   const [removeCheckedItems, setRemoveCheckedItems] = useState(false);
//   const [uncheckAllItems, setUncheckAllItems] = useState(false);
//
//   const [localState, localDispatch] = useReducer(
//     noteLocalReducer,
//     noteLocalState,
//   );
//   const {note: localStateNote} = localState;
//   const {
//     category: {id: categoryId},
//   } = localStateNote;
//
//   const categoriesList = useSelector(
//     store => store.categories.categoriesList.categories,
//   );
//   const shareServiceAvailabilityMap = useSelector(
//     store => store.share.availability.shareServiceAvailabilityMap,
//   );
//   const notesList = useSelector(store => store.notes.notesList.notes);
//
//   // ===
//   // =====
//   // useEffect(() => {
//   //   SystemEventsHandler.onInfo({
//   //     info:
//   //       'useNoteModel->' +
//   //       JSON.stringify(shareServiceAvailabilityMap.get(ShareAppTypes.SMS)),
//   //   });
//   // }, [shareServiceAvailabilityMap]);
//   // =====
//   // ===
//
//   useLayoutEffect(() => {
//     if (note) {
//       // ===
//       // SystemEventsHandler.onInfo({
//       //   info: 'useNoteModel(): ' + JSON.stringify(note),
//       // });
//       // ===
//
//       localDispatch(
//         NoteLocalActions.actions.setInitialNoteData({
//           id: note.id,
//           title: note.title,
//           isList: note.isList,
//           noteText: note.noteText,
//           textSize: note.textSize,
//           moveCheckedToBottom: note.moveCheckedToBottom,
//           reminder: {...note.reminder},
//           images: note.images,
//           deleted: note.deleted,
//           deleteDateTimestamp: note.deleteDateTimestamp,
//           creationDateTimestamp: note.creationDateTimestamp,
//           updateDateTimestamp: note.updateDateTimestamp,
//           categoryId: note.category.id,
//           orderPos: note.orderPos,
//         }),
//       );
//     }
//   }, [note]);
//
//   // ===
//   // =====
//   // const updateNote = useCallback(() => {
//   //   SystemEventsHandler.onInfo({info: 'useNoteModel()->updateNote()'});
//   // }, []);
//   //
//   // useAppStateChangeCallback({
//   //   callback: updateNote,
//   //   runOnGoingToForeground: true,
//   // });
//   // =====
//   // ===
//
//   useEffect(() => {
//     if (categoryId >= 0) {
//       for (let i = 0; i < categoriesList.length; ++i) {
//         if (categoriesList[i].id === categoryId) {
//           setCategoryColor(categoriesList[i].color);
//           break;
//         }
//       }
//     }
//   }, [categoryId, categoriesList]);
//
//   useEffect(() => {
//     if (note) {
//       const {updateDateTimestamp: initialNoteUpdateTimestamp} = note;
//       const {updateDateTimestamp: localNoteUpdateTimestamp} = localStateNote;
//
//       if (
//         localNoteUpdateTimestamp > 0 &&
//         localNoteUpdateTimestamp !== initialNoteUpdateTimestamp
//       ) {
//         dispatch(AppActions.notes.actions.updateNote({note: localStateNote}));
//       }
//     }
//   }, [localStateNote, note, dispatch]);
//
//   useEffect(() => {
//     const {
//       reminder: {selectedDateInMilliseconds, repeatOption},
//     } = localStateNote;
//
//     if (selectedDateInMilliseconds > 0) {
//       const currentDateInMilliseconds = Date.now();
//       if (selectedDateInMilliseconds < currentDateInMilliseconds) {
//         setNoteReminderExpired(true);
//       } else {
//         setNoteReminderExpired(false);
//       }
//     } else {
//       setNoteReminderExpired(false);
//     }
//   }, [localStateNote]);
//
//   return {
//     data: {
//       noteMenuVisible,
//       localState,
//       noteReminderExpired,
//       categoryColor,
//       sortNoteItemsAlphabetically,
//       removeCheckedItems,
//       uncheckAllItems,
//       shareServiceAvailabilityMap,
//     },
//     setters: {
//       setNoteMenuVisible,
//       setSortNoteItemsAlphabetically,
//       setRemoveCheckedItems,
//       setUncheckAllItems,
//     },
//     navigation,
//     localDispatch,
//     dispatch,
//   };
// };
//
// export default useNoteModel;
