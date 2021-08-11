import React, {useCallback, useState, useEffect} from 'react';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import useTranslation from '../../../../utils/common/localization';
import NoteTextSize from '../../../../data/common/note-text-size/NoteTextSize';
import VaultedNoteListTypeMenuItem from './item/VaultedNoteListTypeMenuItem';

const VaultedNoteListTypeMenu = ({
  visible,
  textSize,
  moveSelectedToBottom,
  onClose,
  onSendPressed,
  onRemovePressed,
  onUndoPressed,
  onTextSizePressed,
  onSortAlphabeticallyPressed,
  onUnselectAllPressed,
  onRemoveSelectedItemsPressed,
  onMoveSelectedToBottomPressed,
}) => {
  const {t} = useTranslation();

  const [textSizeName, setTextSizeName] = useState(t('normalTextSize'));

  const sendPressHandler = useCallback(() => {
    if (onSendPressed) {
      onSendPressed();
    }
    return true;
  }, [onSendPressed]);

  const removePressHandler = useCallback(() => {
    if (onRemovePressed) {
      onRemovePressed();
    }
    return true;
  }, [onRemovePressed]);

  const undoChangesPressHandler = useCallback(() => {
    if (onUndoPressed) {
      onUndoPressed();
    }
    return true;
  }, [onUndoPressed]);

  const textSizePressHandler = useCallback(() => {
    if (onTextSizePressed) {
      onTextSizePressed();
    }
    return true;
  }, [onTextSizePressed]);

  const sortAlphabeticallyPressHandler = useCallback(() => {
    if (onSortAlphabeticallyPressed) {
      onSortAlphabeticallyPressed();
    }
    return true;
  }, [onSortAlphabeticallyPressed]);

  const unselectAllPressHandler = useCallback(() => {
    if (onUnselectAllPressed) {
      onUnselectAllPressed();
    }
    return true;
  }, [onUnselectAllPressed]);

  const removeSelectedItemsPressHandler = useCallback(() => {
    if (onRemoveSelectedItemsPressed) {
      onRemoveSelectedItemsPressed();
    }
    return true;
  }, [onRemoveSelectedItemsPressed]);

  const moveSelectedToBottomPressHandler = useCallback(() => {
    if (onMoveSelectedToBottomPressed) {
      onMoveSelectedToBottomPressed();
    }
    return true;
  }, [onMoveSelectedToBottomPressed]);

  const sendOptionComponent = (
    <VaultedNoteListTypeMenuItem
      text={t('VaultedNoteListTypeMenu_send')}
      type={'text'}
    />
  );
  const removeOptionComponent = (
    <VaultedNoteListTypeMenuItem
      text={t('VaultedNoteListTypeMenu_remove')}
      type={'text'}
    />
  );
  const undoOptionComponent = (
    <VaultedNoteListTypeMenuItem
      text={t('VaultedNoteListTypeMenu_undo')}
      type={'text'}
    />
  );
  const textSizeOptionComponent = (
    <VaultedNoteListTypeMenuItem
      text={t('VaultedNoteListTypeMenu_textSize') + ': ' + textSizeName}
      type={'text'}
    />
  );
  const sortAlphabeticallyOptionComponent = (
    <VaultedNoteListTypeMenuItem
      text={t('VaultedNoteListTypeMenu_sortAlphabetically')}
      type={'text'}
    />
  );
  const unselectAllOptionComponent = (
    <VaultedNoteListTypeMenuItem
      text={t('VaultedNoteListTypeMenu_unselectAll')}
      type={'text'}
    />
  );
  const removeSelectedItemsOptionComponent = (
    <VaultedNoteListTypeMenuItem
      text={t('VaultedNoteListTypeMenu_removeSelectedItems')}
      type={'text'}
    />
  );
  const moveSelectedToBottomOptionComponent = (
    <VaultedNoteListTypeMenuItem
      text={t('VaultedNoteListTypeMenu_moveSelectedToBottom')}
      type={'checkbox'}
      checked={moveSelectedToBottom}
    />
  );

  useEffect(() => {
    switch (textSize) {
      case NoteTextSize.TINY: {
        setTextSizeName(t('tinyTextSize'));
        return;
      }

      case NoteTextSize.SMALL: {
        setTextSizeName(t('smallTextSize'));
        return;
      }

      case NoteTextSize.NORMAL: {
        setTextSizeName(t('normalTextSize'));
        return;
      }

      case NoteTextSize.LARGE: {
        setTextSizeName(t('largeTextSize'));
        return;
      }

      case NoteTextSize.HUGE: {
        setTextSizeName(t('hugeTextSize'));
        return;
      }
    }
  }, [textSize, t]);

  /*
          <MenuOption
          disableTouchable={false}
          children={removeOptionComponent}
          onSelect={removePressHandler}
        />
   */

  return (
    <Menu opened={visible} onBackdropPress={onClose}>
      <MenuTrigger text="" />
      <MenuOptions optionsContainerStyle={{width: 270}}>
        <MenuOption
          disableTouchable={false}
          children={sendOptionComponent}
          onSelect={sendPressHandler}
        />
        <MenuOption
          disableTouchable={false}
          children={undoOptionComponent}
          onSelect={undoChangesPressHandler}
        />
        <MenuOption
          disableTouchable={false}
          children={textSizeOptionComponent}
          onSelect={textSizePressHandler}
        />
        <MenuOption
          disableTouchable={false}
          children={sortAlphabeticallyOptionComponent}
          onSelect={sortAlphabeticallyPressHandler}
        />
        <MenuOption
          disableTouchable={false}
          children={unselectAllOptionComponent}
          onSelect={unselectAllPressHandler}
        />
        <MenuOption
          disableTouchable={false}
          children={removeSelectedItemsOptionComponent}
          onSelect={removeSelectedItemsPressHandler}
        />
        <MenuOption
          disableTouchable={false}
          children={moveSelectedToBottomOptionComponent}
          onSelect={moveSelectedToBottomPressHandler}
        />
      </MenuOptions>
    </Menu>
  );
};

export default React.memo(VaultedNoteListTypeMenu);
