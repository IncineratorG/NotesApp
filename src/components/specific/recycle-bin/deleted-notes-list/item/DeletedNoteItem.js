import React from 'react';
import DeletedNoteAsListItem from './note-as-list-item/DeletedNoteAsListItem';
import DeletedNoteAsTextItem from './note-as-text-item/DeletedNoteAsTextItem';

const DeletedNoteItem = ({note, categoriesList, onNotePress}) => {
  if (note.isList) {
    return (
      <DeletedNoteAsListItem
        note={note}
        categoriesList={categoriesList}
        onNotePress={onNotePress}
      />
    );
  } else {
    return (
      <DeletedNoteAsTextItem
        note={note}
        categoriesList={categoriesList}
        onNotePress={onNotePress}
      />
    );
  }
};

export default React.memo(DeletedNoteItem);
