import {useCallback} from 'react';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import AppRoutes from '../../../../data/common/routes/AppRoutes';
import IdGenerator from '../../../../utils/common/id_generator/IdGenerator';
import AppActions from '../../../../store/actions/AppActions';
import Snackbar from 'react-native-snackbar';
import useTranslation from '../../../../utils/common/localization';

const useNotesListController = model => {
  const {t} = useTranslation();

  const {
    data: {
      noteTemplate,
      defaultCategory,
      selectedCategory,
      allNotesList,
      noteToRemove,
      movingToVaultNote,
      vaultPassword,
      correctVaultPasswordEntered,
      notesSettings: {noteTextDefaultSize, moveCheckedToBottom},
    },
    setters: {
      setRemoveNoteConfirmationDialogVisible,
      setNoteToRemove,
      setMovingToVaultNote,
      setUnlockingVaultDialogVisible,
      setCreateVaultPasswordDialogVisible,
      setResetVaultPasswordDialogVisible,
    },
    navigation,
    dispatch,
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
      creationDateTimestamp: Date.now(),
      updateDateTimestamp: Date.now(),
      orderPos: currentMaxOrderPos + 1,
    };

    navigation.navigate(AppRoutes.Note, {note, newNote: true});
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
      navigation.navigate(AppRoutes.Note, {note, newNote: false});
    },
    [navigation],
  );

  // const noteLongPressHandler = useCallback(
  //   ({note}) => {
  //     setNoteToRemove(note);
  //     setRemoveNoteConfirmationDialogVisible(true);
  //   },
  //   [setRemoveNoteConfirmationDialogVisible, setNoteToRemove],
  // );

  const noteRemoveHandler = useCallback(
    ({note}) => {
      dispatch(AppActions.notes.actions.moveNoteToTrash({note}));

      Snackbar.show({
        text: t('Notes_snackbarText'),
        duration: Snackbar.LENGTH_LONG,
        action: {
          text: t('Notes_snackbarCancelButton'),
          textColor: '#64DD17',
          onPress: () => {
            dispatch(AppActions.notes.actions.restoreNoteFromTrash({note}));
          },
        },
      });
    },
    [dispatch, t],
  );

  const noteMoveToVaultHandler = useCallback(
    ({note}) => {
      if (vaultPassword && correctVaultPasswordEntered) {
        dispatch(AppActions.vault.actions.moveNoteToVault({note: {...note}}));
      } else if (vaultPassword && !correctVaultPasswordEntered) {
        setMovingToVaultNote(note);
        setUnlockingVaultDialogVisible(true);
      } else {
        setMovingToVaultNote(note);
        setCreateVaultPasswordDialogVisible(true);
      }
    },
    [
      vaultPassword,
      correctVaultPasswordEntered,
      setMovingToVaultNote,
      setUnlockingVaultDialogVisible,
      setCreateVaultPasswordDialogVisible,
      dispatch,
    ],
  );

  const removeNoteConfirmationDialogRemoveHandler = useCallback(() => {
    setRemoveNoteConfirmationDialogVisible(false);
    noteRemoveHandler({note: {...noteToRemove}});
  }, [noteToRemove, noteRemoveHandler, setRemoveNoteConfirmationDialogVisible]);

  const removeNoteConfirmationDialogCancelHandler = useCallback(() => {
    setRemoveNoteConfirmationDialogVisible(false);
    setNoteToRemove(null);
  }, [setRemoveNoteConfirmationDialogVisible, setNoteToRemove]);

  const noteItemDragEndHandler = useCallback(
    ({data, from, to}) => {
      dispatch(AppActions.notes.actions.swapListItems({from, to, data}));
    },
    [dispatch],
  );

  const noteRestoreHandler = useCallback(({note}) => {
    if (!note) {
      return;
    }

    SystemEventsHandler.onInfo({
      info: 'noteRestoreHandler->' + JSON.stringify(note),
    });
  }, []);

  const unlockingVaultDialogCancelHandler = useCallback(() => {
    setUnlockingVaultDialogVisible(false);
    setMovingToVaultNote(null);
  }, [setUnlockingVaultDialogVisible, setMovingToVaultNote]);

  const unlockingVaultDialogResetPasswordHandler = useCallback(() => {
    setUnlockingVaultDialogVisible(false);
    setResetVaultPasswordDialogVisible(true);
  }, [setUnlockingVaultDialogVisible, setResetVaultPasswordDialogVisible]);

  const unlockingVaultDialogCorrectPasswordEnteredHandler = useCallback(() => {
    setUnlockingVaultDialogVisible(false);
    dispatch(
      AppActions.vault.actions.setCorrectPasswordEntered({
        isCorrect: true,
      }),
    );

    if (movingToVaultNote) {
      dispatch(
        AppActions.vault.actions.moveNoteToVault({
          note: {...movingToVaultNote},
        }),
      );
      setMovingToVaultNote(null);
    } else {
      SystemEventsHandler.onInfo({
        info:
          'useNotesListController()->unlockingVaultDialogCorrectPasswordEnteredHandler(): NOTE_IS_NULL',
      });
    }
  }, [
    movingToVaultNote,
    dispatch,
    setUnlockingVaultDialogVisible,
    setMovingToVaultNote,
  ]);

  const createVaultPasswordDialogCancelHandler = useCallback(() => {
    setCreateVaultPasswordDialogVisible(false);
  }, [setCreateVaultPasswordDialogVisible]);

  const createVaultPasswordDialogPasswordSetHandler = useCallback(
    ({password}) => {
      if (password) {
        setCreateVaultPasswordDialogVisible(false);
        dispatch(AppActions.vault.actions.setNewVaultPassword({password}));

        if (movingToVaultNote) {
          dispatch(
            AppActions.vault.actions.moveNoteToVault({
              note: {...movingToVaultNote},
            }),
          );
          setMovingToVaultNote(null);
        } else {
          SystemEventsHandler.onInfo({
            info:
              'useNotesListController()->createVaultPasswordDialogPasswordSetHandler(): NOTE_IS_NULL',
          });
        }
      }
    },
    [
      movingToVaultNote,
      dispatch,
      setCreateVaultPasswordDialogVisible,
      setMovingToVaultNote,
    ],
  );

  const resetVaultPasswordDialogCancelHandler = useCallback(() => {
    setResetVaultPasswordDialogVisible(false);
  }, [setResetVaultPasswordDialogVisible]);

  const resetVaultPasswordDialogResetHandler = useCallback(() => {
    setResetVaultPasswordDialogVisible(false);
    dispatch(AppActions.vault.actions.resetVaultPassword());
    setCreateVaultPasswordDialogVisible(true);
  }, [
    setResetVaultPasswordDialogVisible,
    setCreateVaultPasswordDialogVisible,
    dispatch,
  ]);

  return {
    addNotePressHandler,
    notePressHandler,
    noteRemoveHandler,
    noteMoveToVaultHandler,
    noteItemDragEndHandler,
    noteRestoreHandler,
    removeNoteConfirmationDialogRemoveHandler,
    removeNoteConfirmationDialogCancelHandler,
    unlockingVaultDialogCancelHandler,
    unlockingVaultDialogResetPasswordHandler,
    unlockingVaultDialogCorrectPasswordEnteredHandler,
    createVaultPasswordDialogCancelHandler,
    createVaultPasswordDialogPasswordSetHandler,
    resetVaultPasswordDialogCancelHandler,
    resetVaultPasswordDialogResetHandler,
  };
};

export default useNotesListController;
