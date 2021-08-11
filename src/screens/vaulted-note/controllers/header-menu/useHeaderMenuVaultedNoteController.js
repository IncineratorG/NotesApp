import {useCallback} from 'react';
import VaultedNoteLocalActions from '../../store/VaultedNoteLocalActions';

const useHeaderMenuVaultedNoteController = model => {
  const {
    setters: {
      setNoteMenuVisible,
      setSortNoteItemsAlphabetically,
      setRemoveCheckedItems,
      setUncheckAllItems,
      setNoteAsListUndoChanges,
    },
    data: {
      localState: {
        note,
        note: {isList},
      },
    },
    localDispatch,
  } = model;

  const {moveCheckedToBottom} = note;

  const headerMenuTextSizePressHandler = useCallback(() => {
    setNoteMenuVisible(false);

    localDispatch(
      VaultedNoteLocalActions.actions.setSelectTextSizeDialogVisibility({
        visible: true,
      }),
    );
  }, [setNoteMenuVisible, localDispatch]);

  const headerMenuSendNotePressHandler = useCallback(() => {
    setNoteMenuVisible(false);

    localDispatch(
      VaultedNoteLocalActions.actions.setSendNoteDialogVisibility({
        visible: true,
      }),
    );
  }, [setNoteMenuVisible, localDispatch]);

  const headerMenuRemoveNotePressHandler = useCallback(() => {
    setNoteMenuVisible(false);

    localDispatch(
      VaultedNoteLocalActions.actions.setRemoveNoteId({id: note.id}),
    );
    localDispatch(
      VaultedNoteLocalActions.actions.setRemoveNoteConfirmationDialogVisibility(
        {visible: true},
      ),
    );

    // dispatch(AppActions.notes.actions.moveNoteToTrash({note}));
    //
    // setTimeout(() => {
    //   navigation.goBack();
    //
    //   Snackbar.show({
    //     text: t('Notes_snackbarText'),
    //     duration: Snackbar.LENGTH_LONG,
    //     action: {
    //       text: t('Notes_snackbarCancelButton'),
    //       textColor: '#64DD17',
    //       onPress: () => {
    //         dispatch(AppActions.notes.actions.restoreNoteFromTrash({note}));
    //       },
    //     },
    //   });
    // }, 100);
  }, [setNoteMenuVisible, note, localDispatch]);

  const headerMenuUndoPressHandler = useCallback(() => {
    setNoteMenuVisible(false);

    localDispatch(VaultedNoteLocalActions.actions.undoChanges());

    if (isList) {
      setNoteAsListUndoChanges(true);
    }
  }, [setNoteMenuVisible, setNoteAsListUndoChanges, isList, localDispatch]);

  const headerMenuSortItemsAlphabeticallyPressHandler = useCallback(() => {
    setNoteMenuVisible(false);

    setSortNoteItemsAlphabetically(true);
  }, [setNoteMenuVisible, setSortNoteItemsAlphabetically]);

  const headerMenuUnselectAllPressHandler = useCallback(() => {
    setNoteMenuVisible(false);

    setUncheckAllItems(true);
  }, [setNoteMenuVisible, setUncheckAllItems]);

  const headerMenuRemoveSelectedItemsPressHandler = useCallback(() => {
    setNoteMenuVisible(false);

    setRemoveCheckedItems(true);
  }, [setNoteMenuVisible, setRemoveCheckedItems]);

  const headerMenuChangeMoveCheckedToBottomPressHandler = useCallback(() => {
    setNoteMenuVisible(false);

    localDispatch(
      VaultedNoteLocalActions.actions.setMoveCheckedToBottom({
        moveCheckedToBottom: !moveCheckedToBottom,
      }),
    );
  }, [setNoteMenuVisible, moveCheckedToBottom, localDispatch]);

  return {
    headerMenuTextSizePressHandler,
    headerMenuSendNotePressHandler,
    headerMenuRemoveNotePressHandler,
    headerMenuUndoPressHandler,
    headerMenuSortItemsAlphabeticallyPressHandler,
    headerMenuUnselectAllPressHandler,
    headerMenuRemoveSelectedItemsPressHandler,
    headerMenuChangeMoveCheckedToBottomPressHandler,
  };
};

export default useHeaderMenuVaultedNoteController;
