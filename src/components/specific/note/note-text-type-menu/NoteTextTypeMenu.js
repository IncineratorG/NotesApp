import React, {useCallback, useState, useEffect} from 'react';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import useTranslation from '../../../../utils/common/localization';
import NoteTextTypeMenuItem from './item/NoteTextTypeMenuItem';
import NoteTextSize from '../../../../data/common/note-text-size/NoteTextSize';

const NoteTextTypeMenu = ({
  visible,
  textSize,
  onClose,
  onSendPressed,
  onRemovePressed,
  onUndoPressed,
  onTextSizePressed,
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

  const sendOptionComponent = (
    <NoteTextTypeMenuItem text={t('NoteTextTypeMenu_send')} />
  );
  const removeOptionComponent = (
    <NoteTextTypeMenuItem text={t('NoteTextTypeMenu_remove')} />
  );
  const undoOptionComponent = (
    <NoteTextTypeMenuItem text={t('NoteTextTypeMenu_undo')} />
  );
  const textSizeOptionComponent = (
    <NoteTextTypeMenuItem
      text={t('NoteTextTypeMenu_textSize') + ': ' + textSizeName}
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

  return (
    <Menu opened={visible} onBackdropPress={onClose}>
      <MenuTrigger text="" />
      <MenuOptions optionsContainerStyle={{width: 250}}>
        <MenuOption
          disableTouchable={false}
          children={sendOptionComponent}
          onSelect={sendPressHandler}
        />
        <MenuOption
          disableTouchable={false}
          children={removeOptionComponent}
          onSelect={removePressHandler}
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
      </MenuOptions>
    </Menu>
  );
  // return (
  //   <Menu opened={visible} onBackdropPress={onClose}>
  //     <MenuTrigger text="" />
  //     <MenuOptions optionsContainerStyle={{width: 250}}>
  //       <MenuOption
  //         disableTouchable={false}
  //         children={sendOptionComponent}
  //         onSelect={sendPressHandler}
  //       />
  //       <MenuOption
  //         disableTouchable={false}
  //         children={removeOptionComponent}
  //         onSelect={removePressHandler}
  //       />
  //       <MenuOption
  //         disableTouchable={false}
  //         children={undoOptionComponent}
  //         onSelect={undoChangesPressHandler}
  //       />
  //       <MenuOption
  //         disableTouchable={false}
  //         children={textSizeOptionComponent}
  //         onSelect={textSizePressHandler}
  //       />
  //     </MenuOptions>
  //   </Menu>
  // );
};

export default React.memo(NoteTextTypeMenu);
