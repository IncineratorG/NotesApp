import React from 'react';
import {View, StyleSheet} from 'react-native';
import DeletedNotesList from '../../../components/specific/recycle-bin/deleted-notes-list/DeletedNotesList';
import RemoveAllNotesConfirmationDialog from '../../../components/specific/recycle-bin/remove-all-notes-confirmation-dialog/RemoveAllNotesConfirmationDialog';

const RecycleBinView = ({model, controller}) => {
  const {
    data: {
      deletedNotesList,
      categoriesList,
      removeAllNotesConfirmationDialogVisible,
    },
  } = model;

  const {
    notePressHandler,
    removeAllNotesConfirmationDialogCancelHandler,
    removeAllNotesConfirmationDialogRemoveHandler,
  } = controller;

  const removeAllNotesConfirmationDialog = (
    <RemoveAllNotesConfirmationDialog
      visible={removeAllNotesConfirmationDialogVisible}
      onRemove={removeAllNotesConfirmationDialogRemoveHandler}
      onCancel={removeAllNotesConfirmationDialogCancelHandler}
    />
  );

  return (
    <View style={styles.mainContainer}>
      <DeletedNotesList
        notesList={deletedNotesList}
        categoriesList={categoriesList}
        onNotePress={notePressHandler}
      />
      {removeAllNotesConfirmationDialog}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default React.memo(RecycleBinView);
