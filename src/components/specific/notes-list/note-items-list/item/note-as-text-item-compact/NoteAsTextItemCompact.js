import React, {useCallback, useMemo} from 'react';
import {View, Text, TouchableNativeFeedback, StyleSheet} from 'react-native';
import useTranslation from '../../../../../../utils/common/localization';
import NoteTextSize from '../../../../../../data/common/note-text-size/NoteTextSize';
import invert from 'invert-color';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ReminderRepeatOption from '../../../../../../data/common/reminder-repeat-options/ReminderRepeatOptions';
import DateToTextConverter from '../../../../../../utils/common/date-to-text-converter/DateToTextConverter';

const NoteAsTextItemCompact = ({
  note,
  expired,
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
        {reminderComponent}
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

export default React.memo(NoteAsTextItemCompact);

// import React, {useCallback, useMemo} from 'react';
// import {View, Text, TouchableNativeFeedback, StyleSheet} from 'react-native';
// import useTranslation from '../../../../../../utils/common/localization';
// import NoteTextSize from '../../../../../../data/common/note-text-size/NoteTextSize';
// import invert from 'invert-color';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import ReminderRepeatOption from '../../../../../../data/common/reminder-repeat-options/ReminderRepeatOptions';
// import ReminderTextBuilder from '../../../../../../utils/note/reminder-text-builder/ReminderTextBuilder';
//
// const NoteAsTextItemCompact = ({
//   note,
//   expired,
//   categoriesList,
//   onNotePress,
//   onNoteLongPress,
//   onNoteRemove,
// }) => {
//   const {t} = useTranslation();
//
//   const {
//     category: {id: categoryId},
//   } = note;
//
//   const notePressHandler = useCallback(() => {
//     onNotePress({note});
//   }, [note, onNotePress]);
//
//   const noteCategoryColor = useMemo(() => {
//     let category = categoriesList.find(c => {
//       if (c.id === categoryId) {
//         return c.color;
//       }
//     });
//
//     if (category) {
//       return category.color;
//     }
//
//     return '#FFF59D';
//   }, [categoriesList, categoryId]);
//
//   const titleComponent = note.title ? (
//     <View style={[styles.titleContainer, {marginBottom: 8}]}>
//       <Text
//         style={[
//           styles.title,
//           {
//             fontSize: NoteTextSize.toFontSize(note.textSize),
//             color: invert(noteCategoryColor, {
//               black: '#3a3a3a',
//               white: '#fafafa',
//             }),
//           },
//         ]}
//         numberOfLines={1}
//         ellipsizeMode={'tail'}>
//         {note.title}
//       </Text>
//     </View>
//   ) : null;
//
//   const noteTextComponent = note.noteText ? (
//     <View style={styles.noteTextContainer}>
//       <Text
//         style={[
//           styles.noteText,
//           {
//             fontSize: NoteTextSize.toFontSize(note.textSize),
//             color: invert(noteCategoryColor, {
//               black: '#3a3a3a',
//               white: '#fafafa',
//             }),
//           },
//         ]}
//         numberOfLines={1}
//         ellipsizeMode={'tail'}>
//         {note.noteText}
//       </Text>
//     </View>
//   ) : null;
//
//   const reminderComponent =
//     note.reminder.selectedDateInMilliseconds > 0 ? (
//       <View style={styles.reminderContainer}>
//         <View style={styles.reminderBellIconContainer}>
//           <Icon
//             name={'notifications'}
//             size={18}
//             color={invert(noteCategoryColor, {
//               black: '#757575',
//               white: '#fafafa66',
//             })}
//           />
//         </View>
//         {note.reminder.repeatOption !== ReminderRepeatOption.NO_REPEAT ? (
//           <View style={styles.reminderRepeatIconContainer}>
//             <Icon
//               name={'repeat'}
//               size={18}
//               color={invert(noteCategoryColor, {
//                 black: '#757575',
//                 white: '#fafafa66',
//               })}
//             />
//           </View>
//         ) : null}
//         <View style={styles.reminderTextContainer}>
//           <Text
//             style={[
//               styles.reminderText,
//               {
//                 color: invert(noteCategoryColor, {
//                   black: '#757575',
//                   white: '#fafafa',
//                 }),
//                 textDecorationLine: expired ? 'line-through' : 'none',
//               },
//             ]}>
//             {ReminderTextBuilder.reminderText({
//               t,
//               dateObject: new Date(note.reminder.selectedDateInMilliseconds),
//             })}
//           </Text>
//         </View>
//       </View>
//     ) : null;
//
//   return (
//     <TouchableNativeFeedback
//       onPress={notePressHandler}
//       onLongPress={onNoteLongPress}>
//       <View
//         style={[
//           styles.mainContainer,
//           {
//             backgroundColor: noteCategoryColor,
//             height: !titleComponent && !noteTextComponent ? 40 : undefined,
//           },
//         ]}>
//         {titleComponent
//           ? titleComponent
//           : noteTextComponent
//           ? noteTextComponent
//           : null}
//         {reminderComponent}
//       </View>
//     </TouchableNativeFeedback>
//   );
// };
//
// const styles = StyleSheet.create({
//   mainContainer: {
//     minHeight: 40,
//     marginBottom: 4,
//     elevation: 2,
//   },
//   titleContainer: {
//     marginTop: 8,
//     marginLeft: 8,
//     marginRight: 8,
//     marginBottom: 0,
//   },
//   title: {
//     fontWeight: 'bold',
//   },
//   noteTextContainer: {
//     margin: 8,
//   },
//   noteText: {},
//   reminderContainer: {
//     height: 25,
//     justifyContent: 'center',
//     flexDirection: 'row',
//   },
//   reminderBellIconContainer: {
//     width: 30,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   reminderRepeatIconContainer: {
//     width: 30,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   reminderTextContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     paddingLeft: 4,
//   },
//   reminderText: {
//     fontSize: 12,
//   },
// });
//
// export default React.memo(NoteAsTextItemCompact);
