import {useCallback} from 'react';
import AppActions from '../../../../store/actions/AppActions';
import VaultLocalActions from '../../store/VaultLocalActions';
import Snackbar from 'react-native-snackbar';
import useTranslation from '../../../../utils/common/localization';
import AppRoutes from '../../../../data/common/routes/AppRoutes';
import IdGenerator from '../../../../utils/common/id_generator/IdGenerator';

const useVaultController = model => {
  const {t} = useTranslation();

  const {
    dispatch,
    localDispatch,
    navigation,
    data: {
      noteTemplate,
      defaultCategory,
      selectedCategory,
      allNotesList,
      notesSettings: {noteTextDefaultSize, moveCheckedToBottom},
      localState: {
        removeNoteConfirmationDialog: {
          noteId: removeNoteConfirmationDialogNoteId,
        },
      },
    },
    setters: {setVaultLocked},
  } = model;

  const addNotePressHandler = useCallback(() => {
    let currentMaxOrderPos = 0;
    allNotesList.forEach(note => {
      if (currentMaxOrderPos < note.orderPos) {
        currentMaxOrderPos = note.orderPos;
      }
    });

    const note = {
      ...noteTemplate,
      id: IdGenerator.generate(),
      textSize: noteTextDefaultSize,
      moveCheckedToBottom,
      category: {
        id: selectedCategory ? selectedCategory.id : defaultCategory.id,
      },
      vaultedDateTimestamp: Date.now(),
      creationDateTimestamp: Date.now(),
      updateDateTimestamp: Date.now(),
      orderPos: currentMaxOrderPos + 1,
    };

    navigation.navigate(AppRoutes.VaultedNote, {note, newNote: true});
  }, [
    noteTextDefaultSize,
    moveCheckedToBottom,
    noteTemplate,
    allNotesList,
    defaultCategory,
    selectedCategory,
    navigation,
  ]);

  const notePressHandler = useCallback(
    ({note}) => {
      navigation.navigate(AppRoutes.VaultedNote, {note, newNote: false});
    },
    [navigation],
  );

  const noteRemoveHandler = useCallback(
    ({note}) => {
      localDispatch(VaultLocalActions.actions.setRemoveNoteId({id: note.id}));
      localDispatch(
        VaultLocalActions.actions.setRemoveNoteConfirmationDialogVisibility({
          visible: true,
        }),
      );
    },
    [localDispatch],
  );

  const noteMoveFromVaultHandler = useCallback(
    ({note}) => {
      dispatch(AppActions.vault.actions.moveNoteFromVault({note: {...note}}));
    },
    [dispatch],
  );

  const removeNoteConfirmationDialogCancelHandler = useCallback(() => {
    localDispatch(
      VaultLocalActions.actions.setRemoveNoteConfirmationDialogVisibility({
        visible: false,
      }),
    );
    localDispatch(
      VaultLocalActions.actions.setRemoveNoteId({
        id: -1,
      }),
    );
  }, [localDispatch]);

  const removeNoteConfirmationDialogRemoveHandler = useCallback(() => {
    dispatch(
      AppActions.notes.actions.removeNoteCompletely({
        id: removeNoteConfirmationDialogNoteId,
      }),
    );

    localDispatch(
      VaultLocalActions.actions.setRemoveNoteConfirmationDialogVisibility({
        visible: false,
      }),
    );
    localDispatch(
      VaultLocalActions.actions.setRemoveNoteId({
        id: -1,
      }),
    );

    Snackbar.show({
      text: t('Vault_deleteNoteSnackbar'),
      duration: Snackbar.LENGTH_SHORT,
    });
  }, [removeNoteConfirmationDialogNoteId, t, localDispatch, dispatch]);

  const unlockingVaultDialogCancelPressHandler = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const unlockingVaultDialogCorrectPasswordEnteredHandler = useCallback(() => {
    dispatch(
      AppActions.vault.actions.setCorrectPasswordEntered({isCorrect: true}),
    );
  }, [dispatch]);

  return {
    addNotePressHandler,
    notePressHandler,
    noteRemoveHandler,
    noteMoveFromVaultHandler,
    removeNoteConfirmationDialogCancelHandler,
    removeNoteConfirmationDialogRemoveHandler,
    unlockingVaultDialogCancelPressHandler,
    unlockingVaultDialogCorrectPasswordEnteredHandler,
  };
};

export default useVaultController;
