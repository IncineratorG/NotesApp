import React, {useMemo, useEffect, useState} from 'react';
import {View, Text, TouchableNativeFeedback, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import useTranslation from '../../../../utils/common/localization';
import ReminderRepeatOption from '../../../../data/common/reminder-repeat-options/ReminderRepeatOptions';
import invert from 'invert-color';
import DateToTextConverter from '../../../../utils/common/date-to-text-converter/DateToTextConverter';

const NoteReminderField = ({
  categoryColor,
  dateInMilliseconds,
  noteReminderExpired,
  repeatOption,
  onPress,
  onRemovePress,
}) => {
  const {t} = useTranslation();

  const [reminderText, setReminderText] = useState(
    t('NoteReminderField_setReminder'),
  );

  const isSet = dateInMilliseconds > 0;

  const bellIcon = useMemo(() => {
    if (isSet) {
      return (
        <Icon
          name={'notifications'}
          size={24}
          color={invert(categoryColor, {
            // black: '#757575',
            black: '#21212177',
            white: '#fafafa66',
          })}
        />
      );
    } else {
      return (
        <Icon
          name={'add-alert'}
          size={24}
          color={invert(categoryColor, {
            black: '#21212155',
            white: '#fafafa66',
          })}
        />
      );
    }
  }, [isSet, categoryColor]);

  const repeatIconComponent = useMemo(() => {
    return repeatOption !== ReminderRepeatOption.NO_REPEAT ? (
      <View style={styles.repeatIconContainer}>
        <Icon
          name={'repeat'}
          size={24}
          color={invert(categoryColor, {
            // black: '#757575',
            black: '#21212166',
            white: '#fafafa66',
          })}
        />
      </View>
    ) : null;
  }, [repeatOption, categoryColor]);

  const deleteIconComponent = useMemo(() => {
    if (isSet) {
      return (
        <TouchableNativeFeedback onPress={onRemovePress}>
          <View style={styles.deleteIconContainer}>
            <Icon
              name={'clear'}
              size={24}
              color={invert(categoryColor, {
                black: '#21212166',
                white: '#fafafa66',
              })}
            />
          </View>
        </TouchableNativeFeedback>
      );
    } else {
      return null;
    }
  }, [isSet, categoryColor, onRemovePress]);

  useEffect(() => {
    if (dateInMilliseconds <= 0) {
      setReminderText(t('NoteReminderField_setReminder'));
    } else {
      const dateObject = new Date(dateInMilliseconds);
      setReminderText(
        DateToTextConverter.toText({
          t,
          dateObject,
        }),
      );
    }
  }, [dateInMilliseconds, t]);

  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={styles.mainContainer}>
        <View style={styles.bellIconContainer}>{bellIcon}</View>
        {repeatIconComponent}
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.text,
              {
                color: invert(categoryColor, {
                  // black: isSet ? '#757575' : '#21212166',
                  black: isSet ? '#21212177' : '#21212166',
                  white: '#fafafa66',
                }),
                textDecorationLine: noteReminderExpired
                  ? 'line-through'
                  : 'none',
              },
            ]}>
            {reminderText}
          </Text>
        </View>
        {deleteIconComponent}
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  bellIconContainer: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  repeatIconContainer: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  text: {
    fontSize: 17,
    fontWeight: '100',
    color: '#21212166',
  },
  deleteIconContainer: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default React.memo(NoteReminderField);
