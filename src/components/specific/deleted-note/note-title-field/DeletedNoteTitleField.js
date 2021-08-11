import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import useTranslation from '../../../../utils/common/localization';
import NoteTextSize from '../../../../data/common/note-text-size/NoteTextSize';
import invert from 'invert-color';

const DeletedNoteTitleField = ({title, categoryColor, textSize}) => {
  const {t} = useTranslation();

  return (
    <View style={styles.mainContainer}>
      <TextInput
        style={[
          styles.title,
          {
            fontSize: NoteTextSize.toFontSize(textSize),
            color: invert(categoryColor, {black: '#3a3a3a', white: '#fafafa'}),
          },
        ]}
        defaultValue={title}
        placeholder={t('NoteTitleField_placeholder')}
        placeholderTextColor={invert(categoryColor, {
          black: '#21212166',
          white: '#fafafa66',
        })}
        multiline={true}
        editable={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlignVertical: 'center',
  },
});

export default React.memo(DeletedNoteTitleField);
