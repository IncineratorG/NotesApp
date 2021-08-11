import {
  useState,
  useEffect,
  useLayoutEffect,
  useReducer,
  useCallback,
} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import vaultedNoteLocalReducer from '../store/vaultedNoteLocalReducer';
import vaultedNoteLocalState from '../store/vaultedNoteLocalState';
import {SystemEventsHandler} from '../../../utils/common/system-events-handler/SystemEventsHandler';
import VaultedNoteLocalActions from '../store/VaultedNoteLocalActions';
import AppActions from '../../../store/actions/AppActions';
import AppRoutes from '../../../data/common/routes/AppRoutes';
import useOpenNoteRequestsHandler from '../../../utils/common/hooks/useOpenNoteRequestsHandler';

const useVaultedNoteModel = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {note, newNote} = route.params;

  const dispatch = useDispatch();

  const [localState, localDispatch] = useReducer(
    vaultedNoteLocalReducer,
    vaultedNoteLocalState,
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
        navigation.goBack();
        navigation.navigate(AppRoutes.Note, {note: noteToOpen});
      }
    },
    [navigation],
  );

  useOpenNoteRequestsHandler({
    routeName: AppRoutes.VaultedNote,
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
  const [imageViewerVisible, setImageViewerVisible] = useState(false);
  const [imageViewerImages, setImageViewerImages] = useState([]);
  const [imageViewerInitialIndex, setImageViewerInitialIndex] = useState(0);
  const [
    removeNoteImageConfirmationDialogVisible,
    setRemoveNoteImageConfirmationDialogVisible,
  ] = useState(false);
  const [removeImageId, setRemoveImageId] = useState('');
  const [vaultLocked, setVaultLocked] = useState(false);

  const categoriesList = useSelector(
    store => store.categories.categoriesList.categories,
  );
  const shareServiceAvailabilityMap = useSelector(
    store => store.share.availability.shareServiceAvailabilityMap,
  );
  const noteImageQuality = useSelector(
    store => store.appSettings.notes.noteImageQuality,
  );
  const noteTemplate = useSelector(store => store.notes.noteTemplate);
  const vaultPassword = useSelector(store => store.vault.vaultPassword);
  const passwordEntered = useSelector(
    store => store.vault.correctPasswordEntered,
  );

  useLayoutEffect(() => {
    SystemEventsHandler.onInfo({
      info: 'useVaultedNoteModel()->useLayoutEffect()',
    });

    const {note: routeNote, newNote: routeIsNewNote} = route.params;

    if (routeNote) {
      localDispatch(
        VaultedNoteLocalActions.actions.setInitialNoteData({
          id: routeNote.id,
          title: routeNote.title,
          isList: routeNote.isList,
          noteText: routeNote.noteText,
          textSize: routeNote.textSize,
          moveCheckedToBottom: routeNote.moveCheckedToBottom,
          reminder: {...routeNote.reminder},
          images: [...routeNote.images],
          deleted: routeNote.deleted,
          vaultedDateTimestamp: routeNote.vaultedDateTimestamp,
          deleteDateTimestamp: routeNote.deleteDateTimestamp,
          creationDateTimestamp: routeNote.creationDateTimestamp,
          updateDateTimestamp: routeNote.updateDateTimestamp,
          categoryId: routeNote.category.id,
          orderPos: routeNote.orderPos,
        }),
      );
    }

    if (routeIsNewNote) {
      setIsNewNote(true);
    } else {
      setIsNewNote(false);
    }
  }, [route]);

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
        dispatch(
          AppActions.vault.actions.updateVaultedNote({note: localStateNote}),
        );
      }
    }
  }, [localStateNote, note, dispatch]);

  useEffect(() => {
    if (newNote) {
      setIsNewNote(true);
    } else {
      setIsNewNote(false);
    }
  }, [newNote]);

  useEffect(() => {
    if (!passwordEntered) {
      setVaultLocked(true);
    } else {
      setVaultLocked(false);
    }
  }, [passwordEntered]);

  return {
    data: {
      noteTemplate,
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
      vaultPassword,
      vaultLocked,
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

export default useVaultedNoteModel;
