import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Dialog, Button, Portal} from 'react-native-paper';
import useTranslation from '../../../../utils/common/localization';
import TextTransformer from '../../../../utils/note/text-transformer/TextTransformer';
import AppStyles from '../../../../assets/styles/AppStyles';

const RemoveNoteConfirmationDialog = ({visible, note, onRemove, onCancel}) => {
  const {t} = useTranslation();

  const [noteName, setNoteName] = useState('');

  useEffect(() => {
    if (note) {
      if (note.title) {
        setNoteName(note.title);
      } else if (!note.isList) {
        setNoteName(note.noteText);
      } else {
        const noteItemsList = TextTransformer.toList({text: note.noteText});
        let noteText = '';
        if (noteItemsList.length > 0) {
          let textItem = noteItemsList[0].text;
          if (TextTransformer.isTextChecked({text: textItem})) {
            textItem = TextTransformer.makeTextUnchecked({text: textItem});
          }
          noteText = noteText + textItem;
        }
        if (noteItemsList.length > 1) {
          let textItem = noteItemsList[1].text;
          if (TextTransformer.isTextChecked({text: textItem})) {
            textItem = TextTransformer.makeTextUnchecked({text: textItem});
          }
          noteText = noteText + ', ' + textItem;
        }
        if (noteItemsList.length > 2) {
          let textItem = noteItemsList[2].text;
          if (TextTransformer.isTextChecked({text: textItem})) {
            textItem = TextTransformer.makeTextUnchecked({text: textItem});
          }
          noteText = noteText + ', ' + textItem;
        }

        setNoteName(noteText);
      }
    }
  }, [note]);

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onCancel}>
        <Dialog.Title numberOfLines={2}>
          {t('RemoveNoteConfirmationDialog_title') + ' ' + noteName}
        </Dialog.Title>
        <Dialog.Content>
          <View style={styles.mainContainer}>
            <Text style={styles.message}>
              {t('RemoveNoteConfirmationDialog_warningMessage')}
            </Text>
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onRemove}>
            {t('RemoveNoteConfirmationDialog_removeButton')}
          </Button>
          <Button onPress={onCancel}>
            {t('RemoveNoteConfirmationDialog_cancelButton')}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    minHeight: 30,
  },
  message: {
    fontSize: AppStyles.dialogMessageFontSize,
  },
});

export default React.memo(RemoveNoteConfirmationDialog);
