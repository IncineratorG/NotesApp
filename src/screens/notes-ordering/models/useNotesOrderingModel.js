import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/core';
import AppRoutes from '../../../data/common/routes/AppRoutes';
import useOpenNoteRequestsHandler from '../../../utils/common/hooks/useOpenNoteRequestsHandler';

const useNotesOrderingModel = () => {
  const dispatch = useDispatch();

  const navigation = useNavigation();

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
    routeName: AppRoutes.NotesOrdering,
    dispatch,
    openNoteCallback,
  });
  // =====
  // ===

  const [
    notesRemindersExpirationObject,
    setNotesRemindersExpirationObject,
  ] = useState({});

  const useCompactView = useSelector(
    store => store.notes.notesList.settings.useCompactView,
  );
  const categoriesList = useSelector(
    store => store.categories.categoriesList.categories,
  );
  const notesList = useSelector(store => store.notes.notesList.notes);

  useEffect(() => {
    const currentDateInMilliseconds = Date.now();
    const updatedNotesRemindersExpirationObject = {};

    notesList.forEach(note => {
      updatedNotesRemindersExpirationObject[note.id] =
        note.reminder.selectedDateInMilliseconds < currentDateInMilliseconds;
    });
    setNotesRemindersExpirationObject(updatedNotesRemindersExpirationObject);
  }, [notesList]);

  return {
    data: {
      notesList,
      categoriesList,
      notesRemindersExpirationObject,
      useCompactView,
    },
    dispatch,
  };
};

export default useNotesOrderingModel;
