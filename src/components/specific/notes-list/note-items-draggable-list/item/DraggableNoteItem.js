import React from 'react';
import DraggableNoteAsListItemCompact from './note-as-list-item-compact/DraggableNoteAsListItemCompact';
import DraggableNoteAsTextItemCompact from './note-as-text-item-compact/DraggableNoteAsTextItemCompact';
import DraggableNoteAsListItem from './note-as-list-item/DraggableNoteAsListItem';
import DraggableNoteAsTextItem from './note-as-text-item/DraggableNoteAsTextItem';

const DraggableNoteItem = ({
  note,
  expired,
  categoriesList,
  useCompactView,
  onNotePress,
  onNoteLongPress,
  onNoteRemove,
}) => {
  if (useCompactView) {
    if (note.isList) {
      return (
        <DraggableNoteAsListItemCompact
          note={note}
          expired={expired}
          categoriesList={categoriesList}
          onNotePress={onNotePress}
          onNoteLongPress={onNoteLongPress}
          onNoteRemove={onNoteRemove}
        />
      );
    } else {
      return (
        <DraggableNoteAsTextItemCompact
          note={note}
          expired={expired}
          categoriesList={categoriesList}
          onNotePress={onNotePress}
          onNoteLongPress={onNoteLongPress}
          onNoteRemove={onNoteRemove}
        />
      );
    }
  } else {
    if (note.isList) {
      return (
        <DraggableNoteAsListItem
          note={note}
          expired={expired}
          categoriesList={categoriesList}
          onNotePress={onNotePress}
          onNoteLongPress={onNoteLongPress}
          onNoteRemove={onNoteRemove}
        />
      );
    } else {
      return (
        <DraggableNoteAsTextItem
          note={note}
          expired={expired}
          categoriesList={categoriesList}
          onNotePress={onNotePress}
          onNoteLongPress={onNoteLongPress}
          onNoteRemove={onNoteRemove}
        />
      );
    }
  }
};

export default React.memo(DraggableNoteItem);
