import React, {useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import {Dialog, Button, Portal} from 'react-native-paper';
import useTranslation from '../../../../utils/common/localization';
import NoteTextSize from '../../../../data/common/note-text-size/NoteTextSize';
import VaultedNoteSelectTextSizeItem from './item/VaultedNoteSelectTextSizeItem';

const VaultedNoteSelectTextSizeDialog = ({
  visible,
  currentTextSizeType,
  onTextSizeTypeSelect,
  onCancel,
}) => {
  const {t} = useTranslation();

  const textSizeItemPressHandler = useCallback(
    ({textSizeType}) => {
      onTextSizeTypeSelect({textSizeType});
    },
    [onTextSizeTypeSelect],
  );

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onCancel}>
        <Dialog.Title>
          {t('VaultedNoteSelectTextSizeDialog_title')}
        </Dialog.Title>
        <Dialog.Content>
          <View style={styles.mainContainer}>
            <VaultedNoteSelectTextSizeItem
              textSizeType={NoteTextSize.TINY}
              text={t('tinyTextSize')}
              isSelected={currentTextSizeType === NoteTextSize.TINY}
              onPress={textSizeItemPressHandler}
            />
            <VaultedNoteSelectTextSizeItem
              textSizeType={NoteTextSize.SMALL}
              text={t('smallTextSize')}
              isSelected={currentTextSizeType === NoteTextSize.SMALL}
              onPress={textSizeItemPressHandler}
            />
            <VaultedNoteSelectTextSizeItem
              textSizeType={NoteTextSize.NORMAL}
              text={t('normalTextSize')}
              isSelected={currentTextSizeType === NoteTextSize.NORMAL}
              onPress={textSizeItemPressHandler}
            />
            <VaultedNoteSelectTextSizeItem
              textSizeType={NoteTextSize.LARGE}
              text={t('largeTextSize')}
              isSelected={currentTextSizeType === NoteTextSize.LARGE}
              onPress={textSizeItemPressHandler}
            />
            <VaultedNoteSelectTextSizeItem
              textSizeType={NoteTextSize.HUGE}
              text={t('hugeTextSize')}
              isSelected={currentTextSizeType === NoteTextSize.HUGE}
              onPress={textSizeItemPressHandler}
            />
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onCancel}>
            {t('VaultedNoteSelectTextSizeDialog_cancelButton')}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    minHeight: 250,
  },
});

export default React.memo(VaultedNoteSelectTextSizeDialog);
