import {BackHandler} from 'react-native';
import {useState, useLayoutEffect, useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import useOpenNoteRequestsHandler from '../../../utils/common/hooks/useOpenNoteRequestsHandler';
import AppRoutes from '../../../data/common/routes/AppRoutes';
import {SystemEventsHandler} from '../../../utils/common/system-events-handler/SystemEventsHandler';

const useRecycleBinModel = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

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
    routeName: AppRoutes.RecycleBin,
    dispatch,
    openNoteCallback,
  });
  // =====
  // ===

  const [deletedNotesList, setDeletedNotesList] = useState([]);
  const [headerMenuVisible, setHeaderMenuVisible] = useState(false);
  const [
    removeAllNotesConfirmationDialogVisible,
    setRemoveAllNotesConfirmationDialogVisible,
  ] = useState(false);

  const unsortedDeletedNotesList = useSelector(
    store => store.notes.notesList.deleted,
  );
  const categoriesList = useSelector(
    store => store.categories.categoriesList.categories,
  );

  useLayoutEffect(() => {
    const sortedDeletedNotesList = [...unsortedDeletedNotesList];
    sortedDeletedNotesList.sort((n1, n2) => {
      return n1.deleteDateTimestamp < n2.deleteDateTimestamp;
    });
    setDeletedNotesList(sortedDeletedNotesList);
  }, [unsortedDeletedNotesList]);

  useEffect(() => {
    const backAction = () => {
      setHeaderMenuVisible(false);
      setRemoveAllNotesConfirmationDialogVisible(false);
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return {
    data: {
      headerMenuVisible,
      deletedNotesList,
      categoriesList,
      removeAllNotesConfirmationDialogVisible,
    },
    setters: {setHeaderMenuVisible, setRemoveAllNotesConfirmationDialogVisible},
    navigation,
    dispatch,
  };
};

export default useRecycleBinModel;
