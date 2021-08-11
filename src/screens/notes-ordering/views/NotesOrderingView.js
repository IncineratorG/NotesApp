import React from 'react';
import {View, StyleSheet} from 'react-native';
import EmptyNotesOrderingView from '../../../components/specific/notes-ordering/empty-notes-ordering-view/EmptyNotesOrderingView';
import OrderedNotesList from '../../../components/specific/notes-ordering/ordered-note-list/OrderedNotesList';

const NotesOrderingView = ({model, controller}) => {
  const {
    data: {
      notesList,
      categoriesList,
      notesRemindersExpirationObject,
      useCompactView,
    },
  } = model;

  const {noteItemDragEndHandler} = controller;

  const notesListComponent =
    notesList && notesList.length > 0 ? (
      <OrderedNotesList
        notesList={notesList}
        notesRemindersExpirationObject={notesRemindersExpirationObject}
        categoriesList={categoriesList}
        useCompactView={useCompactView}
        onNoteItemDragEnd={noteItemDragEndHandler}
      />
    ) : (
      <EmptyNotesOrderingView />
    );

  return <View style={styles.mainContainer}>{notesListComponent}</View>;
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default React.memo(NotesOrderingView);
