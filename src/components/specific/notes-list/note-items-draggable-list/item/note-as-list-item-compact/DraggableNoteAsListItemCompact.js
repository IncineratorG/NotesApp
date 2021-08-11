import React, {useCallback, useMemo} from 'react';
import {View, TouchableNativeFeedback, StyleSheet, Text} from 'react-native';
import NoteTextSize from '../../../../../../data/common/note-text-size/NoteTextSize';
import invert from 'invert-color';
import {SystemEventsHandler} from '../../../../../../utils/common/system-events-handler/SystemEventsHandler';
import TextTransformer from '../../../../../../utils/note/text-transformer/TextTransformer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ReminderRepeatOption from '../../../../../../data/common/reminder-repeat-options/ReminderRepeatOptions';
import useTranslation from '../../../../../../utils/common/localization';
import DateToTextConverter from '../../../../../../utils/common/date-to-text-converter/DateToTextConverter';

const DraggableNoteAsListItemCompact = ({
  note,
  expired,
  categoriesList,
  onNotePress,
  onNoteLongPress,
  onNoteRemove,
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
    return notesList.slice(0, 1);
  }, [notesList]);

  const notePressHandler = useCallback(() => {
    onNotePress({note});
  }, [note, onNotePress]);

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

  const reminderComponent =
    note.reminder.selectedDateInMilliseconds > 0 ? (
      <View style={styles.reminderContainer}>
        <View style={styles.reminderBellIconContainer}>
          <Icon
            name={'notifications'}
            size={18}
            color={invert(noteCategoryColor, {
              black: '#757575',
              white: '#fafafa66',
            })}
          />
        </View>
        {note.reminder.repeatOption !== ReminderRepeatOption.NO_REPEAT ? (
          <View style={styles.reminderRepeatIconContainer}>
            <Icon
              name={'repeat'}
              size={18}
              color={invert(noteCategoryColor, {
                black: '#757575',
                white: '#fafafa66',
              })}
            />
          </View>
        ) : null}
        <View style={styles.reminderTextContainer}>
          <Text
            style={[
              styles.reminderText,
              {
                color: invert(noteCategoryColor, {
                  black: '#757575',
                  white: '#fafafa',
                }),
                textDecorationLine: expired ? 'line-through' : 'none',
              },
            ]}>
            {DateToTextConverter.toText({
              t,
              dateObject: new Date(note.reminder.selectedDateInMilliseconds),
            })}
          </Text>
        </View>
      </View>
    ) : null;

  return (
    <TouchableNativeFeedback
      onPress={notePressHandler}
      onLongPress={onNoteLongPress}>
      <View
        style={[styles.mainContainer, {backgroundColor: noteCategoryColor}]}>
        {titleComponent
          ? titleComponent
          : noteListComponent
          ? noteListComponent
          : null}
        {reminderComponent}
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    minHeight: 40,

    // marginTop: 2,
    // marginLeft: 8,
    // marginRight: 8,
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
  reminderContainer: {
    height: 25,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  reminderBellIconContainer: {
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reminderRepeatIconContainer: {
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reminderTextContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 4,
  },
  reminderText: {
    fontSize: 12,
  },
});

export default React.memo(DraggableNoteAsListItemCompact);
