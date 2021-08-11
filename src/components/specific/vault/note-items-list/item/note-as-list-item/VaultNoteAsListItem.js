import React, {useCallback, useMemo} from 'react';
import {View, TouchableNativeFeedback, StyleSheet, Text} from 'react-native';
import NoteTextSize from '../../../../../../data/common/note-text-size/NoteTextSize';
import invert from 'invert-color';
import TextTransformer from '../../../../../../utils/note/text-transformer/TextTransformer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import useTranslation from '../../../../../../utils/common/localization';

const VaultNoteAsListItem = ({
  note,
  categoriesList,
  menu,
  onNotePress,
  onNoteLongPress,
}) => {
  const {t} = useTranslation();

  const {
    noteText,
    category: {id: categoryId},
  } = note;

  const notesList = useMemo(() => {
    return TextTransformer.toList({text: noteText});
  }, [noteText]);
  const reducedNotesList = useMemo(() => {
    return notesList.slice(0, 3);
  }, [notesList]);

  const notePressHandler = useCallback(() => {
    onNotePress({note});
  }, [note, onNotePress]);

  const noteLongPressHandler = useCallback(() => {
    onNoteLongPress({note});
  }, [note, onNoteLongPress]);

  const noteCategoryColor = useMemo(() => {
    const category = categoriesList.find(c => {
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
    <View
      style={[styles.titleContainer, {marginBottom: note.noteText ? 0 : 8}]}>
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

  const noteListComponent = note.noteText ? (
    <View style={styles.noteListContainer}>
      {reducedNotesList.map((noteListItem, index) => {
        const isChecked = TextTransformer.isTextChecked({
          text: noteListItem.text,
        });
        const text = isChecked
          ? TextTransformer.makeTextUnchecked({text: noteListItem.text})
          : noteListItem.text;
        const key = text + index.toString();

        return (
          <View key={key} style={styles.noteListItemContainer}>
            <View style={styles.noteListItemCheckmarkIconContainer}>
              <Icon
                name={isChecked ? 'check-box' : 'check-box-outline-blank'}
                size={20}
                color={invert(noteCategoryColor, {
                  black: '#21212166',
                  white: '#fafafa66',
                })}
              />
            </View>
            <View style={styles.noteListItemTextContainer}>
              <Text
                style={[
                  styles.noteListItemText,
                  {
                    fontSize: NoteTextSize.toFontSize(note.textSize),
                    color: invert(noteCategoryColor, {
                      black: '#3a3a3a',
                      white: '#fafafa',
                    }),
                  },
                ]}
                numberOfLines={1}>
                {text}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  ) : null;

  const hasMoteItemsComponent =
    notesList.length > reducedNotesList.length ? (
      <View style={[styles.hasMoreItemsContainer]}>
        <Text
          style={[
            styles.hasMoteItemsText,
            {
              fontSize: NoteTextSize.toFontSize(note.textSize),
              color: invert(noteCategoryColor, {
                black: '#3a3a3a',
                white: '#fafafa',
              }),
            },
          ]}>
          {'...'}
        </Text>
      </View>
    ) : null;

  return (
    <TouchableNativeFeedback
      onPress={notePressHandler}
      onLongPress={noteLongPressHandler}>
      <View
        style={[styles.mainContainer, {backgroundColor: noteCategoryColor}]}>
        {titleComponent}
        {noteListComponent}
        {hasMoteItemsComponent}
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
  noteListContainer: {
    margin: 8,
  },
  noteListItemContainer: {
    flexDirection: 'row',
    padding: 4,
  },
  noteListItemCheckmarkIconContainer: {
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noteListItemTextContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 8,
    paddingRight: 8,
  },
  noteListItemText: {},
  hasMoreItemsContainer: {
    paddingLeft: 50,
    paddingBottom: 10,
  },
  hasMoteItemsText: {},
});

export default React.memo(VaultNoteAsListItem);
