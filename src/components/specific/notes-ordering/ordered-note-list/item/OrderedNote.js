import React from 'react';
import OrderedNoteAsListItemCompact from './note-as-list-item-compact/OrderedNoteAsListItemCompact';
import OrderedNoteAsTextItemCompact from './note-as-text-item-compact/OrderedNoteAsTextItemCompact';
import OrderedNoteAsListItem from './note-as-list-item/OrderedNoteAsListItem';
import OrderedNoteAsTextItem from './note-as-text-item/OrderedNoteAsTextItem';

const OrderedNote = ({
  note,
  expired,
  categoriesList,
  useCompactView,
  onNoteLongPress,
}) => {
  if (useCompactView) {
    if (note.isList) {
      return (
        <OrderedNoteAsListItemCompact
          note={note}
          expired={expired}
          categoriesList={categoriesList}
          onNoteLongPress={onNoteLongPress}
        />
      );
    } else {
      return (
        <OrderedNoteAsTextItemCompact
          note={note}
          expired={expired}
          categoriesList={categoriesList}
          onNoteLongPress={onNoteLongPress}
        />
      );
    }
  } else {
    if (note.isList) {
      return (
        <OrderedNoteAsListItem
          note={note}
          expired={expired}
          categoriesList={categoriesList}
          onNoteLongPress={onNoteLongPress}
        />
      );
    } else {
      return (
        <OrderedNoteAsTextItem
          note={note}
          expired={expired}
          categoriesList={categoriesList}
          onNoteLongPress={onNoteLongPress}
        />
      );
    }
  }
};

export default React.memo(OrderedNote);
