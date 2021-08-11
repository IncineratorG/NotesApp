import {useCallback} from 'react';
import VaultedNoteLocalActions from '../../store/VaultedNoteLocalActions';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import AppActions from '../../../../store/actions/AppActions';
import Snackbar from 'react-native-snackbar';
import useTranslation from '../../../../utils/common/localization';

const useRemoveNoteConfirmationDialogVaultedNoteController = model => {
  const {
    data: {
      localState: {
        removeNoteConfirmationDialog: {
          noteId: removeNoteConfirmationDialogNoteId,
        },
      },
    },
    dispatch,
    localDispatch,
    navigation,
  } = model;

  const {t} = useTranslation();

  const removeNoteConfirmationDialogCancelHandler = useCallback(() => {
    localDispatch(
      VaultedNoteLocalActions.actions.setRemoveNoteConfirmationDialogVisibility(
        {visible: false},
      ),
    );
  }, [localDispatch]);

  const removeNoteConfirmationDialogRemoveHandler = useCallback(() => {
    SystemEventsHandler.onInfo({
      info: 'REMOVED_NOTE_ID: ' + removeNoteConfirmationDialogNoteId,
    });

    navigation.goBack();

    dispatch(
      AppActions.notes.actions.removeNoteCompletely({
        id: removeNoteConfirmationDialogNoteId,
      }),
    );

    localDispatch(VaultedNoteLocalActions.actions.setRemoveNoteId({id: -1}));
    localDispatch(
      VaultedNoteLocalActions.actions.setRemoveNoteConfirmationDialogVisibility(
        {visible: false},
      ),
    );

    Snackbar.show({
      text: t('VaultedNote_deleteNoteSnackbar'),
      duration: Snackbar.LENGTH_SHORT,
    });
  }, [
    removeNoteConfirmationDialogNoteId,
    navigation,
    t,
    dispatch,
    localDispatch,
  ]);

  return {
    removeNoteConfirmationDialogCancelHandler,
    removeNoteConfirmationDialogRemoveHandler,
  };
};

export default useRemoveNoteConfirmationDialogVaultedNoteController;
