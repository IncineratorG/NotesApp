import {useState, useLayoutEffect, useCallback} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import AppRoutes from '../../../data/common/routes/AppRoutes';
import useOpenNoteRequestsHandler from '../../../utils/common/hooks/useOpenNoteRequestsHandler';

const useDeletedNoteModel = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {note} = route.params;

  const dispatch = useDispatch();

  // ===
  // =====
  const openNoteCallback = useCallback(
    noteToOpen => {
      if (noteToOpen) {
        navigation.goBack();
        navigation.goBack();
        navigation.navigate(AppRoutes.Note, {note: noteToOpen});
      }
    },
    [navigation],
  );

  useOpenNoteRequestsHandler({
    routeName: AppRoutes.DeletedNote,
    dispatch,
    openNoteCallback,
  });
  // =====
  // ===

  const [categoryColor, setCategoryColor] = useState('#FFFFFF');
  const [
    deleteNoteConfirmationDialogVisible,
    setDeleteNoteConfirmationDialogVisible,
  ] = useState(false);

  const categoriesList = useSelector(
    store => store.categories.categoriesList.categories,
  );

  useLayoutEffect(() => {
    if (note && note.category && note.category.id >= 0) {
      for (let i = 0; i < categoriesList.length; ++i) {
        if (categoriesList[i].id === note.category.id) {
          setCategoryColor(categoriesList[i].color);
          break;
        }
      }
    }
  }, [note, categoriesList]);

  return {
    data: {
      categoryColor,
      note,
      deleteNoteConfirmationDialogVisible,
    },
    setters: {
      setDeleteNoteConfirmationDialogVisible,
    },
    navigation,
    dispatch,
  };
};

export default useDeletedNoteModel;
