import {useCallback} from 'react';
import AppRoutes from '../../../data/common/routes/AppRoutes';
import AppActions from '../../../store/actions/AppActions';
import Snackbar from 'react-native-snackbar';
import useTranslation from '../../../utils/common/localization';
import {SystemEventsHandler} from '../../../utils/common/system-events-handler/SystemEventsHandler';

const useRecycleBinController = model => {
  const {t} = useTranslation();

  const {
    data: {deletedNotesList},
    setters: {setHeaderMenuVisible, setRemoveAllNotesConfirmationDialogVisible},
    navigation,
    dispatch,
  } = model;

  const headerMenuButtonPressHandler = useCallback(() => {
    setHeaderMenuVisible(true);
  }, [setHeaderMenuVisible]);

  const headerMenuCloseHandler = useCallback(() => {
    setHeaderMenuVisible(false);
  }, [setHeaderMenuVisible]);

  const headerMenuClearAllHandler = useCallback(() => {
    SystemEventsHandler.onInfo({
      info: 'useRecycleBinController->headerMenuClearAllHandler()',
    });

    setRemoveAllNotesConfirmationDialogVisible(true);
    setHeaderMenuVisible(false);
  }, [setRemoveAllNotesConfirmationDialogVisible, setHeaderMenuVisible]);

  const notePressHandler = useCallback(
    ({note}) => {
      navigation.navigate(AppRoutes.DeletedNote, {note});
    },
    [navigation],
  );

  const removeAllNotesConfirmationDialogCancelHandler = useCallback(() => {
    setRemoveAllNotesConfirmationDialogVisible(false);
  }, [setRemoveAllNotesConfirmationDialogVisible]);

  const removeAllNotesConfirmationDialogRemoveHandler = useCallback(() => {
    const idsArray = [];
    deletedNotesList.forEach(note => idsArray.push(note.id));
    dispatch(
      AppActions.notes.actions.removeMultipleNotesCompletely({idsArray}),
    );

    Snackbar.show({
      text: t('RecycleBin_clearRecycleBinSnackbarText'),
      duration: Snackbar.LENGTH_SHORT,
    });

    setRemoveAllNotesConfirmationDialogVisible(false);
  }, [
    setRemoveAllNotesConfirmationDialogVisible,
    deletedNotesList,
    t,
    dispatch,
  ]);

  return {
    headerMenuCloseHandler,
    headerMenuButtonPressHandler,
    headerMenuClearAllHandler,
    notePressHandler,
    removeAllNotesConfirmationDialogCancelHandler,
    removeAllNotesConfirmationDialogRemoveHandler,
  };
};

export default useRecycleBinController;
