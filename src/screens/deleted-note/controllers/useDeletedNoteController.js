import {useCallback} from 'react';
import {SystemEventsHandler} from '../../../utils/common/system-events-handler/SystemEventsHandler';
import useTranslation from '../../../utils/common/localization';
import AppActions from '../../../store/actions/AppActions';
import Snackbar from 'react-native-snackbar';

const useDeletedNoteController = model => {
  const {t} = useTranslation();

  const {
    navigation,
    dispatch,
    data: {note},
    setters: {setDeleteNoteConfirmationDialogVisible},
  } = model;

  const restoreNoteHandler = useCallback(() => {
    dispatch(AppActions.notes.actions.restoreNoteFromTrash({note}));

    Snackbar.show({
      text: t('DeletedNote_restoreSnackbarText'),
      duration: Snackbar.LENGTH_SHORT,
    });

    navigation.goBack();
  }, [navigation, dispatch, note, t]);

  const deleteNoteHandler = useCallback(() => {
    SystemEventsHandler.onInfo({
      info: 'useDeletedNoteController()->deleteNoteHandler()',
    });

    setDeleteNoteConfirmationDialogVisible(true);
  }, [setDeleteNoteConfirmationDialogVisible]);

  const deleteNoteConfirmationDialogDeleteHandler = useCallback(() => {
    dispatch(AppActions.notes.actions.removeNoteCompletely({id: note.id}));

    Snackbar.show({
      text: t('DeletedNote_deleteNoteSnackbar'),
      duration: Snackbar.LENGTH_SHORT,
    });

    navigation.goBack();

    setDeleteNoteConfirmationDialogVisible(false);
  }, [setDeleteNoteConfirmationDialogVisible, dispatch, navigation, note, t]);

  const deleteNoteConfirmationDialogCancelHandler = useCallback(() => {
    setDeleteNoteConfirmationDialogVisible(false);
  }, [setDeleteNoteConfirmationDialogVisible]);

  return {
    deleteNoteHandler,
    restoreNoteHandler,
    deleteNoteConfirmationDialogDeleteHandler,
    deleteNoteConfirmationDialogCancelHandler,
  };
};

export default useDeletedNoteController;
