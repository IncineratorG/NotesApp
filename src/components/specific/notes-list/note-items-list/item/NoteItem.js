import React, {useState, useCallback} from 'react';
import NoteAsListItem from './note-as-list-item/NoteAsListItem';
import NoteAsTextItem from './note-as-text-item/NoteAsTextItem';
import NoteAsTextItemCompact from './note-as-text-item-compact/NoteAsTextItemCompact';
import NoteAsListItemCompact from './note-as-list-item-compact/NoteAsListItemCompact';
import NoteItemMenu from '../../note-item-menu/NoteItemMenu';

const NoteItem = ({
  note,
  expired,
  categoriesList,
  useCompactView,
  onNotePress,
  onNoteRemove,
  onMoveToVault,
}) => {
  const [noteMenuVisible, setNoteMenuVisible] = useState(false);

  const menuOpenHandler = useCallback(() => {
    setNoteMenuVisible(true);
  }, []);

  const menuCloseHandler = useCallback(() => {
    setNoteMenuVisible(false);
  }, []);

  const menuRemoveNoteOptionHandler = useCallback(() => {
    setNoteMenuVisible(false);
    onNoteRemove({note: {...note}});
  }, [note, onNoteRemove]);

  const menuToVaultOptionHandler = useCallback(() => {
    setNoteMenuVisible(false);
    onMoveToVault({note: {...note}});
  }, [note, onMoveToVault]);

  const noteItemMenu = (
    <NoteItemMenu
      visible={noteMenuVisible}
      onRemovePress={menuRemoveNoteOptionHandler}
      onMoveToVault={menuToVaultOptionHandler}
      onClose={menuCloseHandler}
    />
  );

  if (useCompactView) {
    if (note.isList) {
      return (
        <NoteAsListItemCompact
          note={note}
          expired={expired}
          categoriesList={categoriesList}
          menu={noteItemMenu}
          onNotePress={onNotePress}
          onNoteLongPress={menuOpenHandler}
        />
      );
    } else {
      return (
        <NoteAsTextItemCompact
          note={note}
          expired={expired}
          categoriesList={categoriesList}
          menu={noteItemMenu}
          onNotePress={onNotePress}
          onNoteLongPress={menuOpenHandler}
        />
      );
    }
  } else {
    if (note.isList) {
      return (
        <NoteAsListItem
          note={note}
          expired={expired}
          categoriesList={categoriesList}
          menu={noteItemMenu}
          onNotePress={onNotePress}
          onNoteLongPress={menuOpenHandler}
        />
      );
    } else {
      return (
        <NoteAsTextItem
          note={note}
          expired={expired}
          categoriesList={categoriesList}
          menu={noteItemMenu}
          onNotePress={onNotePress}
          onNoteLongPress={menuOpenHandler}
        />
      );
    }
  }
};

export default React.memo(NoteItem);
