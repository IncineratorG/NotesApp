import React, {useState, useCallback} from 'react';
import VaultNoteAsListItemCompact from './note-as-list-item-compact/VaultNoteAsListItemCompact';
import VaultNoteAsTextItemCompact from './note-as-text-item-compact/VaultNoteAsTextItemCompact';
import VaultNoteAsListItem from './note-as-list-item/VaultNoteAsListItem';
import VaultNoteAsTextItem from './note-as-text-item/VaultNoteAsTextItem';
import VaultNoteItemMenu from '../../note-item-menu/VaultNoteItemMenu';

const VaultNoteItem = ({
  note,
  categoriesList,
  useCompactView,
  onNotePress,
  onNoteRemove,
  onMoveFromVault,
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

  const menuFromVaultOptionHandler = useCallback(() => {
    setNoteMenuVisible(false);
    onMoveFromVault({note: {...note}});
  }, [note, onMoveFromVault]);

  const noteItemMenu = (
    <VaultNoteItemMenu
      visible={noteMenuVisible}
      onRemovePress={menuRemoveNoteOptionHandler}
      onMoveFromVault={menuFromVaultOptionHandler}
      onClose={menuCloseHandler}
    />
  );

  if (useCompactView) {
    if (note.isList) {
      return (
        <VaultNoteAsListItemCompact
          note={note}
          categoriesList={categoriesList}
          menu={noteItemMenu}
          onNotePress={onNotePress}
          onNoteLongPress={menuOpenHandler}
        />
      );
    } else {
      return (
        <VaultNoteAsTextItemCompact
          note={note}
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
        <VaultNoteAsListItem
          note={note}
          categoriesList={categoriesList}
          menu={noteItemMenu}
          onNotePress={onNotePress}
          onNoteLongPress={menuOpenHandler}
        />
      );
    } else {
      return (
        <VaultNoteAsTextItem
          note={note}
          categoriesList={categoriesList}
          menu={noteItemMenu}
          onNotePress={onNotePress}
          onNoteLongPress={menuOpenHandler}
        />
      );
    }
  }
};

export default React.memo(VaultNoteItem);
