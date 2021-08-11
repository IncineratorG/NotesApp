import React from 'react';
import {View, StyleSheet} from 'react-native';
import invert from 'invert-color';
import DeletedNoteTitleField from '../../../components/specific/deleted-note/note-title-field/DeletedNoteTitleField';
import DeletedNoteAsListField from '../../../components/specific/deleted-note/note-as-list-field/DeletedNoteAsListField';
import DeletedNoteAsTextField from '../../../components/specific/deleted-note/note-as-text-field/DeletedNoteAsTextField';
import DeletedNoteUpdateDateField from '../../../components/specific/deleted-note/note-update-date-field/DeletedNoteUpdateDateField';
import DeleteNoteConfirmationDialog from '../../../components/specific/deleted-note/delete-note-confirmation-dialog/DeleteNoteConfirmationDialog';

const DeletedNoteView = ({model, controller}) => {
  const {
    data: {categoryColor, note, deleteNoteConfirmationDialogVisible},
  } = model;

  const {
    deleteNoteConfirmationDialogDeleteHandler,
    deleteNoteConfirmationDialogCancelHandler,
  } = controller;

  const noteComponent = note.isList ? (
    <DeletedNoteAsListField
      noteText={note.noteText}
      categoryColor={categoryColor}
      textSize={note.textSize}
    />
  ) : (
    <DeletedNoteAsTextField
      noteText={note.noteText}
      categoryColor={categoryColor}
      textSize={note.textSize}
    />
  );

  const deleteNoteConfirmationDialog = (
    <DeleteNoteConfirmationDialog
      visible={deleteNoteConfirmationDialogVisible}
      onRemove={deleteNoteConfirmationDialogDeleteHandler}
      onCancel={deleteNoteConfirmationDialogCancelHandler}
    />
  );

  return (
    <View style={[styles.mainContainer, {backgroundColor: categoryColor}]}>
      <View style={styles.noteContentContainer}>
        <DeletedNoteTitleField
          title={note.title}
          textSize={note.textSize}
          categoryColor={categoryColor}
        />
        <View style={styles.noteContainer}>{noteComponent}</View>
      </View>
      <View
        style={[
          styles.underline,
          {
            backgroundColor: invert(categoryColor, {
              black: '#80757575',
              white: '#fafafa66',
            }),
          },
        ]}
      />
      <View style={styles.footerContainer}>
        <View style={styles.lastUpdateDateContainer}>
          <DeletedNoteUpdateDateField
            updateDateTimestamp={note.updateDateTimestamp}
            categoryColor={categoryColor}
          />
        </View>
      </View>
      {deleteNoteConfirmationDialog}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 8,
  },
  noteContentContainer: {
    flex: 1,
  },
  noteContainer: {
    flex: 1,
  },
  underline: {
    height: 1,
    backgroundColor: '#80757575',
    marginBottom: 4,
  },
  footerContainer: {
    height: 30,
  },
  lastUpdateDateContainer: {
    height: 30,
  },
});

export default React.memo(DeletedNoteView);
