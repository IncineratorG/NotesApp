import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import useTranslation from '../../../../utils/common/localization';
import NoteTextSize from '../../../../data/common/note-text-size/NoteTextSize';
import invert from 'invert-color';

const DeletedNoteAsTextField = ({noteText, categoryColor, textSize}) => {
  const {t} = useTranslation();

  return (
    <View style={styles.mainContainer}>
      <TextInput
        style={[
          styles.noteText,
          {
            fontSize: NoteTextSize.toFontSize(textSize),
            color: invert(categoryColor, {black: '#3a3a3a', white: '#fafafa'}),
          },
        ]}
        editable={false}
        value={noteText}
        placeholder={t('NoteAsTextField_placeholder')}
        placeholderTextColor={invert(categoryColor, {
          black: '#21212166',
          white: '#fafafa66',
        })}
        multiline={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  noteText: {
    fontSize: 20,
  },
});

export default React.memo(DeletedNoteAsTextField);
