import React, {useEffect, useState} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import useTranslation from '../../../../utils/common/localization';
import NoteTextSize from '../../../../data/common/note-text-size/NoteTextSize';
import invert from 'invert-color';

const NoteAsTextField = ({
  noteText,
  categoryColor,
  textSize,
  focused,
  onChangeText,
}) => {
  const [internalFocused, setInternalFocused] = useState(false);
  const [focusWasSet, setFocusWasSet] = useState(false);

  const {t} = useTranslation();

  useEffect(() => {
    if (focused && !focusWasSet) {
      setInternalFocused(true);
      setFocusWasSet(true);
    }
  }, [focused, focusWasSet, internalFocused]);

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
        // value={noteText}
        defaultValue={noteText}
        placeholder={t('NoteAsTextField_placeholder')}
        placeholderTextColor={invert(categoryColor, {
          black: '#21212166',
          white: '#fafafa66',
        })}
        autoFocus={internalFocused}
        multiline={true}
        onChangeText={onChangeText}
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

export default React.memo(NoteAsTextField);
