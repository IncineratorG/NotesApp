import {useCallback} from 'react';
import {useNavigation} from '@react-navigation/core';
import {useDispatch} from 'react-redux';
import AppRoutes from '../../../data/common/routes/AppRoutes';
import useOpenNoteRequestsHandler from '../../../utils/common/hooks/useOpenNoteRequestsHandler';

const useAboutModel = () => {
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
    routeName: AppRoutes.About,
    dispatch,
    openNoteCallback,
  });
  // =====
  // ===

  return {
    navigation,
    dispatch,
  };
};

export default useAboutModel;
