import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import AppActions from '../../../store/actions/AppActions';
import useAppStateChangeCallback from '../../../utils/common/hooks/useAppStateChangeCallback';
import useOpenNoteRequestsHandler from '../../../utils/common/hooks/useOpenNoteRequestsHandler';
import AppRoutes from '../../../data/common/routes/AppRoutes';
import {SystemEventsHandler} from '../../../utils/common/system-events-handler/SystemEventsHandler';
import AppEvents from '../../../events/AppEvents';

const useNotesListModel = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  // ===
  // =====
  const openNoteCallback = useCallback(
    noteToOpen => {
      if (noteToOpen) {
        navigation.navigate(AppRoutes.Note, {note: noteToOpen});
      }
    },
    [navigation],
  );

  useOpenNoteRequestsHandler({
    routeName: AppRoutes.NotesList,
    dispatch,
    openNoteCallback,
  });
  // =====
  // ===

  const [sortOptionsMenuVisible, setSortOptionsMenuVisible] = useState(false);
  const [selectedCategoryColor, setSelectedCategoryColor] = useState('#FFF59D');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [
    notesRemindersExpirationObject,
    setNotesRemindersExpirationObject,
  ] = useState({});
  const [
    removeNoteConfirmationDialogVisible,
    setRemoveNoteConfirmationDialogVisible,
  ] = useState(false);
  const [noteToRemove, setNoteToRemove] = useState(null);
  const [
    skipNextAppStateChangeEvent,
    setSkipNextAppStateChangeEvent,
  ] = useState(false);
  const [searchBarVisible, setSearchBarVisible] = useState(false);
  const [searchBarText, setSearchBarText] = useState('');
  const [movingToVaultNote, setMovingToVaultNote] = useState(null);
  const [
    unlockingVaultDialogVisible,
    setUnlockingVaultDialogVisible,
  ] = useState(false);
  const [
    createVaultPasswordDialogVisible,
    setCreateVaultPasswordDialogVisible,
  ] = useState(false);
  const [
    resetVaultPasswordDialogVisible,
    setResetVaultPasswordDialogVisible,
  ] = useState(false);

  const sortType = useSelector(
    store => store.notes.notesList.settings.sortType,
  );
  const useCompactView = useSelector(
    store => store.notes.notesList.settings.useCompactView,
  );
  const groupByCategories = useSelector(
    store => store.notes.notesList.settings.groupByCategories,
  );
  const selectedCategoryId = useSelector(
    store => store.notes.notesList.settings.selectedCategoryId,
  );
  const noteTemplate = useSelector(store => store.notes.noteTemplate);
  const defaultCategory = useSelector(
    store => store.categories.defaultCategory,
  );
  const categoriesList = useSelector(
    store => store.categories.categoriesList.categories,
  );
  const notesList = useSelector(store => store.notes.notesList.notes);
  const allNotesList = useSelector(store => store.notes.notesList.allNotes);
  const notesSettings = useSelector(store => store.appSettings.notes);
  const reducerSearchText = useSelector(store => store.notes.searchText);
  const vaultPassword = useSelector(store => store.vault.vaultPassword);
  const correctVaultPasswordEntered = useSelector(
    store => store.vault.correctPasswordEntered,
  );

  const updateNoteListStoreData = useCallback(() => {
    dispatch(AppActions.global.actions.loadCoreAppData());

    SystemEventsHandler.onInfo({
      info: 'useNotesListModel->updateNoteListStoreData()',
    });
  }, [dispatch]);
  useFocusEffect(updateNoteListStoreData);

  useAppStateChangeCallback({
    callback: () => {
      if (skipNextAppStateChangeEvent) {
        SystemEventsHandler.onInfo({
          info: 'useNotesListModel->WILL_SKIP_CALLBACK',
        });
        setSkipNextAppStateChangeEvent(false);
        return;
      }

      updateNoteListStoreData();
    },
    runOnGoingToForeground: true,
  });

  useEffect(() => {
    if (selectedCategoryId < 0) {
      if (defaultCategory) {
        setSelectedCategory(defaultCategory);
        setSelectedCategoryColor(defaultCategory.color);
      }
    } else {
      const selectedCategoryData = categoriesList.filter(
        category => category.id === selectedCategoryId,
      );
      if (selectedCategoryData.length) {
        setSelectedCategory(selectedCategoryData[0]);
        setSelectedCategoryColor(selectedCategoryData[0].color);
      } else {
        if (defaultCategory) {
          setSelectedCategory(defaultCategory);
          setSelectedCategoryColor(defaultCategory.color);
        }
      }
    }
  }, [categoriesList, defaultCategory, selectedCategoryId]);

  useEffect(() => {
    const currentDateInMilliseconds = Date.now();
    const updatedNotesRemindersExpirationObject = {};

    notesList.forEach(note => {
      updatedNotesRemindersExpirationObject[note.id] =
        note.reminder.selectedDateInMilliseconds < currentDateInMilliseconds;
    });
    setNotesRemindersExpirationObject(updatedNotesRemindersExpirationObject);
  }, [notesList]);

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

  // ===
  useEffect(() => {
    setSearchBarText(reducerSearchText);
    if (reducerSearchText && reducerSearchText.length) {
      setSearchBarVisible(true);
    }
  }, [reducerSearchText]);
  // ===

  return {
    data: {
      sortOptionsMenuVisible,
      sortType,
      useCompactView,
      groupByCategories,
      defaultCategory,
      noteTemplate,
      notesList,
      notesRemindersExpirationObject,
      allNotesList,
      categoriesList,
      selectedCategoryColor,
      selectedCategory,
      notesSettings,
      noteToRemove,
      removeNoteConfirmationDialogVisible,
      searchBarVisible,
      searchBarText,
      vaultPassword,
      correctVaultPasswordEntered,
      movingToVaultNote,
      unlockingVaultDialogVisible,
      createVaultPasswordDialogVisible,
      resetVaultPasswordDialogVisible,
    },
    setters: {
      setSortOptionsMenuVisible,
      setNoteToRemove,
      setRemoveNoteConfirmationDialogVisible,
      setSearchBarVisible,
      setSearchBarText,
      setMovingToVaultNote,
      setUnlockingVaultDialogVisible,
      setCreateVaultPasswordDialogVisible,
      setResetVaultPasswordDialogVisible,
    },
    navigation,
    dispatch,
  };
};

export default useNotesListModel;
