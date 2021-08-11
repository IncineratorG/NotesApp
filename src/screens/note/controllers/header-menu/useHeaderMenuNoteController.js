import {useCallback} from 'react';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import NoteLocalActions from '../../store/NoteLocalActions';
import AppActions from '../../../../store/actions/AppActions';
import Snackbar from 'react-native-snackbar';
import useTranslation from '../../../../utils/common/localization';

const useHeaderMenuNoteController = model => {
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
    navigation,
    dispatch,
  } = model;

  const {moveCheckedToBottom} = note;

  const {t} = useTranslation();

  const headerMenuTextSizePressHandler = useCallback(() => {
    SystemEventsHandler.onInfo({
      info: 'useHeaderMenuNoteController->headerMenuTextSizePressHandler()',
    });
    setNoteMenuVisible(false);

    localDispatch(
      NoteLocalActions.actions.setSelectTextSizeDialogVisibility({
        visible: true,
      }),
    );
  }, [setNoteMenuVisible, localDispatch]);

  const headerMenuSendNotePressHandler = useCallback(() => {
    SystemEventsHandler.onInfo({
      info: 'useHeaderMenuNoteController->headerMenuSendNotePressHandler()',
    });
    setNoteMenuVisible(false);

    localDispatch(
      NoteLocalActions.actions.setSendNoteDialogVisibility({
        visible: true,
      }),
    );
  }, [setNoteMenuVisible, localDispatch]);

  const headerMenuRemoveNotePressHandler = useCallback(() => {
    setNoteMenuVisible(false);

    dispatch(AppActions.notes.actions.moveNoteToTrash({note}));

    setTimeout(() => {
      navigation.goBack();

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
    }, 100);
  }, [setNoteMenuVisible, note, navigation, dispatch, t]);

  // ===
  // =====
  const headerMenuUndoPressHandler = useCallback(() => {
    SystemEventsHandler.onInfo({
      info: 'useHeaderMenuNoteController->headerMenuUndoPressHandler()',
    });
    setNoteMenuVisible(false);

    localDispatch(NoteLocalActions.actions.undoChanges());

    if (isList) {
      setNoteAsListUndoChanges(true);
    }
  }, [setNoteMenuVisible, setNoteAsListUndoChanges, isList, localDispatch]);
  // =====
  // ===

  const headerMenuSortItemsAlphabeticallyPressHandler = useCallback(() => {
    SystemEventsHandler.onInfo({
      info:
        'useHeaderMenuNoteController->headerMenuSortItemsAlphabeticallyPressHandler()',
    });
    setNoteMenuVisible(false);

    setSortNoteItemsAlphabetically(true);
  }, [setNoteMenuVisible, setSortNoteItemsAlphabetically]);

  const headerMenuUnselectAllPressHandler = useCallback(() => {
    SystemEventsHandler.onInfo({
      info: 'useHeaderMenuNoteController->headerMenuUnselectAllPressHandler()',
    });
    setNoteMenuVisible(false);

    setUncheckAllItems(true);
  }, [setNoteMenuVisible, setUncheckAllItems]);

  const headerMenuRemoveSelectedItemsPressHandler = useCallback(() => {
    SystemEventsHandler.onInfo({
      info:
        'useHeaderMenuNoteController->headerMenuRemoveSelectedItemsPressHandler()',
    });
    setNoteMenuVisible(false);

    setRemoveCheckedItems(true);
  }, [setNoteMenuVisible, setRemoveCheckedItems]);

  const headerMenuChangeMoveCheckedToBottomPressHandler = useCallback(() => {
    SystemEventsHandler.onInfo({
      info:
        'useHeaderMenuNoteController->headerMenuChangeMoveCheckedToBottomPressHandler()',
    });
    setNoteMenuVisible(false);

    localDispatch(
      NoteLocalActions.actions.setMoveCheckedToBottom({
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

export default useHeaderMenuNoteController;
