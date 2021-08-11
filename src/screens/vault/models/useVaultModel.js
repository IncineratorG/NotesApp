import {useState, useEffect, useCallback, useReducer} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import vaultLocalReducer from '../store/vaultLocalReducer';
import vaultLocalState from '../store/vaultLocalState';
import AppActions from '../../../store/actions/AppActions';
import VaultLocalActions from '../store/VaultLocalActions';
import AppRoutes from '../../../data/common/routes/AppRoutes';
import useOpenNoteRequestsHandler from '../../../utils/common/hooks/useOpenNoteRequestsHandler';
import useAppStateChangeCallback from '../../../utils/common/hooks/useAppStateChangeCallback';
import {SystemEventsHandler} from '../../../utils/common/system-events-handler/SystemEventsHandler';

const useVaultModel = () => {
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const [localState, localDispatch] = useReducer(
    vaultLocalReducer,
    vaultLocalState,
  );

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
    routeName: AppRoutes.Vault,
    dispatch,
    openNoteCallback,
  });
  // =====
  // ===

  const [selectedCategoryColor, setSelectedCategoryColor] = useState('#FFF59D');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [headerMenuVisible, setHeaderMenuVisible] = useState(false);
  const [
    changePasswordDialogVisible,
    setChangePasswordDialogVisible,
  ] = useState(false);
  const [vaultLocked, setVaultLocked] = useState(false);

  const noteTemplate = useSelector(store => store.notes.noteTemplate);
  const defaultCategory = useSelector(
    store => store.categories.defaultCategory,
  );
  const categoriesList = useSelector(
    store => store.categories.categoriesList.categories,
  );
  const notesSettings = useSelector(store => store.appSettings.notes);
  const {
    allNotes: allNotesList,
    vaulted: notesList,
    settings: {sortType, groupByCategories, useCompactView, selectedCategoryId},
  } = useSelector(store => store.notes.notesList);
  const vaultPassword = useSelector(store => store.vault.vaultPassword);
  const passwordEntered = useSelector(
    store => store.vault.correctPasswordEntered,
  );

  const updateNoteListStoreData = useCallback(() => {
    dispatch(AppActions.global.actions.loadCoreAppData());
  }, [dispatch]);
  useFocusEffect(updateNoteListStoreData);

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
    localDispatch(
      VaultLocalActions.actions.setVaultedNotesList({
        vaultedNotesList: notesList,
        sortType,
        groupByCategories,
        useCompactView,
        selectedCategoryId,
      }),
    );
  }, [
    notesList,
    sortType,
    groupByCategories,
    useCompactView,
    selectedCategoryId,
  ]);

  useEffect(() => {
    if (!passwordEntered) {
      setVaultLocked(true);
    } else {
      setVaultLocked(false);
    }
  }, [passwordEntered]);

  return {
    data: {
      localState,
      noteTemplate,
      allNotesList,
      notesSettings,
      categoriesList,
      defaultCategory,
      selectedCategoryColor,
      selectedCategory,
      headerMenuVisible,
      changePasswordDialogVisible,
      vaultPassword,
      vaultLocked,
    },
    setters: {
      setHeaderMenuVisible,
      setChangePasswordDialogVisible,
      setVaultLocked,
    },
    navigation,
    localDispatch,
    dispatch,
  };
};

export default useVaultModel;
