import React, {useCallback, useMemo} from 'react';
import {View, Text, TouchableNativeFeedback, StyleSheet} from 'react-native';
import useTranslation from '../../../../../../utils/common/localization';
import NoteTextSize from '../../../../../../data/common/note-text-size/NoteTextSize';
import invert from 'invert-color';

const VaultNoteAsTextItemCompact = ({
  note,
  categoriesList,
  menu,
  onNotePress,
  onNoteLongPress,
}) => {
  const {t} = useTranslation();

  const {
    category: {id: categoryId},
  } = note;

  const notePressHandler = useCallback(() => {
    onNotePress({note});
  }, [note, onNotePress]);

  const noteLongPressHandler = useCallback(() => {
    onNoteLongPress({note});
  }, [note, onNoteLongPress]);

  const noteCategoryColor = useMemo(() => {
    let category = categoriesList.find(c => {
      if (c.id === categoryId) {
        return c.color;
      }
    });

    if (category) {
      return category.color;
    }

    return '#FFF59D';
  }, [categoriesList, categoryId]);

  const titleComponent = note.title ? (
    <View style={[styles.titleContainer, {marginBottom: 8}]}>
      <Text
        style={[
          styles.title,
          {
            fontSize: NoteTextSize.toFontSize(note.textSize),
            color: invert(noteCategoryColor, {
              black: '#3a3a3a',
              white: '#fafafa',
            }),
          },
        ]}
        numberOfLines={1}
        ellipsizeMode={'tail'}>
        {note.title}
      </Text>
    </View>
  ) : null;

  const noteTextComponent = note.noteText ? (
    <View style={styles.noteTextContainer}>
      <Text
        style={[
          styles.noteText,
          {
            fontSize: NoteTextSize.toFontSize(note.textSize),
            color: invert(noteCategoryColor, {
              black: '#3a3a3a',
              white: '#fafafa',
            }),
          },
        ]}
        numberOfLines={1}
        ellipsizeMode={'tail'}>
        {note.noteText}
      </Text>
    </View>
  ) : null;

  return (
    <TouchableNativeFeedback
      onPress={notePressHandler}
      onLongPress={noteLongPressHandler}>
      <View
        style={[
          styles.mainContainer,
          {
            backgroundColor: noteCategoryColor,
            height: !titleComponent && !noteTextComponent ? 40 : undefined,
          },
        ]}>
        {titleComponent
          ? titleComponent
          : noteTextComponent
          ? noteTextComponent
          : null}
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}} />
          {menu}
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    minHeight: 40,
    marginBottom: 4,
    elevation: 2,
  },
  titleContainer: {
    marginTop: 8,
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 0,
  },
  title: {
    fontWeight: 'bold',
  },
  noteTextContainer: {
    margin: 8,
  },
  noteText: {},
});

export default React.memo(VaultNoteAsTextItemCompact);
