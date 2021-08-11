import {useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {SystemEventsHandler} from '../../../utils/common/system-events-handler/SystemEventsHandler';
import AppRoutes from '../../../data/common/routes/AppRoutes';
import useOpenNoteRequestsHandler from '../../../utils/common/hooks/useOpenNoteRequestsHandler';

const useEditCategoriesModel = () => {
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
    routeName: AppRoutes.EditCategories,
    dispatch,
    openNoteCallback,
  });
  // =====
  // ===

  const [editCategoryDialogVisible, setEditCategoryDialogVisible] = useState(
    false,
  );
  const [editableCategory, setEditableCategory] = useState(null);
  const [
    createCategoryDialogVisible,
    setCreateCategoryDialogVisible,
  ] = useState(false);
  const [
    removeCategoryWarningDialogVisible,
    setRemoveCategoryWarningDialogVisible,
  ] = useState(false);
  const [removableCategory, setRemovableCategory] = useState(null);

  const categoriesList = useSelector(
    store => store.categories.categoriesList.categories,
  );
  const defaultCategoryColor = useSelector(
    store => store.categories.categoryTemplate.color,
  );
  const categoryTemplate = useSelector(
    store => store.categories.categoryTemplate,
  );

  return {
    data: {
      categoriesList,
      editCategoryDialogVisible,
      editableCategory,
      createCategoryDialogVisible,
      defaultCategoryColor,
      categoryTemplate,
      removeCategoryWarningDialogVisible,
      removableCategory,
    },
    setters: {
      setEditCategoryDialogVisible,
      setEditableCategory,
      setCreateCategoryDialogVisible,
      setRemoveCategoryWarningDialogVisible,
      setRemovableCategory,
    },
    navigation,
    dispatch,
  };
};

export default useEditCategoriesModel;
