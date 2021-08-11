import React, {useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import {Dialog, Button, Portal} from 'react-native-paper';
import useTranslation from '../../../../utils/common/localization';
import NoteTextSize from '../../../../data/common/note-text-size/NoteTextSize';
import TextSizeDialogItem from './text-size-item/TextSizeDialogItem';

const TextSizeDialog = ({
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
        <Dialog.Title>{t('TextSizeDialog_title')}</Dialog.Title>
        <Dialog.Content>
          <View style={styles.mainContainer}>
            <TextSizeDialogItem
              textSizeType={NoteTextSize.TINY}
              text={t('tinyTextSize')}
              isSelected={currentTextSizeType === NoteTextSize.TINY}
              onPress={textSizeItemPressHandler}
            />
            <TextSizeDialogItem
              textSizeType={NoteTextSize.SMALL}
              text={t('smallTextSize')}
              isSelected={currentTextSizeType === NoteTextSize.SMALL}
              onPress={textSizeItemPressHandler}
            />
            <TextSizeDialogItem
              textSizeType={NoteTextSize.NORMAL}
              text={t('normalTextSize')}
              isSelected={currentTextSizeType === NoteTextSize.NORMAL}
              onPress={textSizeItemPressHandler}
            />
            <TextSizeDialogItem
              textSizeType={NoteTextSize.LARGE}
              text={t('largeTextSize')}
              isSelected={currentTextSizeType === NoteTextSize.LARGE}
              onPress={textSizeItemPressHandler}
            />
            <TextSizeDialogItem
              textSizeType={NoteTextSize.HUGE}
              text={t('hugeTextSize')}
              isSelected={currentTextSizeType === NoteTextSize.HUGE}
              onPress={textSizeItemPressHandler}
            />
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onCancel}>{t('TextSizeDialog_cancelButton')}</Button>
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

export default React.memo(TextSizeDialog);
