import React, {useCallback} from 'react';
import DeletedNoteView from './views/DeletedNoteView';
import {useFocusEffect} from '@react-navigation/native';
import useDeletedNoteModel from './models/useDeletedNoteModel';
import useDeletedNoteController from './controllers/useDeletedNoteController';
import DeletedNoteHeaderButtonsContainer from '../../components/specific/deleted-note/header-buttons-container/DeletedNoteHeaderButtonsContainer';

const DeletedNote = () => {
  const model = useDeletedNoteModel();
  const controller = useDeletedNoteController(model);

  const {
    navigation,
    data: {deleteNoteConfirmationDialogVisible},
  } = model;

  const {
    deleteNoteHandler,
    restoreNoteHandler,
    deleteNoteConfirmationDialogDeleteHandler,
    deleteNoteConfirmationDialogCancelHandler,
  } = controller;

  const setScreenHeaderBar = useCallback(() => {
    navigation.setOptions({
      headerRight: props => {
        return (
          <DeletedNoteHeaderButtonsContainer
            onRestore={restoreNoteHandler}
            onDelete={deleteNoteHandler}
          />
        );
      },
    });
  }, [navigation, restoreNoteHandler, deleteNoteHandler]);

  useFocusEffect(() => {
    setScreenHeaderBar();
  });

  return <DeletedNoteView model={model} controller={controller} />;
};

export default React.memo(DeletedNote);
