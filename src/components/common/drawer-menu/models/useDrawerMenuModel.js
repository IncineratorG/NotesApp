import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import NotesListSortTypes from '../../../../data/common/notes-list-sort-types/NotesListSortTypes';

const useDrawerMenuModel = ({navigation}) => {
  const dispatch = useDispatch();

  const [notesOrderingAvailable, setNotesOrderingAvailable] = useState(false);
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

  const categoriesList = useSelector(
    store => store.categories.categoriesList.categories,
  );
  const selectedCategoryId = useSelector(
    store => store.notes.notesList.settings.selectedCategoryId,
  );
  const sortType = useSelector(
    store => store.notes.notesList.settings.sortType,
  );
  const vaultPassword = useSelector(store => store.vault.vaultPassword);
  const correctVaultPasswordEntered = useSelector(
    store => store.vault.correctPasswordEntered,
  );

  useEffect(() => {
    if (sortType === NotesListSortTypes.MANUAL) {
      setNotesOrderingAvailable(true);
    } else {
      setNotesOrderingAvailable(false);
    }
  }, [sortType]);

  return {
    data: {
      categoriesList,
      selectedCategoryId,
      notesOrderingAvailable,
      unlockingVaultDialogVisible,
      createVaultPasswordDialogVisible,
      vaultPassword,
      correctVaultPasswordEntered,
      resetVaultPasswordDialogVisible,
    },
    setters: {
      setUnlockingVaultDialogVisible,
      setCreateVaultPasswordDialogVisible,
      setResetVaultPasswordDialogVisible,
    },
    navigation,
    dispatch,
  };
};

export default useDrawerMenuModel;
