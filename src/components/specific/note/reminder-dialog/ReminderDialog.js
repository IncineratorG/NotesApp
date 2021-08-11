import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Dialog, Button, Portal} from 'react-native-paper';
import useTranslation from '../../../../utils/common/localization';
import ReminderDialogField from './field/ReminderDialogField';
import DatePicker from './date-picker/DatePicker';
import RepeatOptionsDialog from './repeat-options-dialog/RepeatOptionsDialog';
import ReminderRepeatOption from '../../../../data/common/reminder-repeat-options/ReminderRepeatOptions';

const ReminderDialog = ({
  visible,
  selectedDateInMilliseconds,
  onOkPress,
  onCancelPress,
}) => {
  const {t} = useTranslation();

  const [dateObject, setDateObject] = useState(new Date());
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [datePickerMode, setDatePickerMode] = useState('date');
  const [repeatOptionsDialogVisible, setRepeatOptionsDialogVisible] = useState(
    false,
  );
  const [selectedRepeatOption, setSelectedRepeatOption] = useState(
    ReminderRepeatOption.NO_REPEAT,
  );

  const okPressHandler = useCallback(() => {
    onOkPress({dateObject, repeatOption: selectedRepeatOption});
  }, [dateObject, selectedRepeatOption, onOkPress]);

  const dateFieldPressHandler = useCallback(() => {
    setDatePickerMode('date');
    setDatePickerVisible(true);
  }, []);

  const timeFieldPressHandler = useCallback(() => {
    setDatePickerMode('time');
    setDatePickerVisible(true);
  }, []);

  const repeatFieldPressHandler = useCallback(() => {
    setRepeatOptionsDialogVisible(true);
  }, []);

  const datePickerCloseHandler = useCallback(() => {
    setDatePickerVisible(false);
  }, []);

  const datePickerDateSelectedHandler = useCallback(selectedDate => {
    setDatePickerVisible(false);
    setDateObject(selectedDate);
  }, []);

  const repeatOptionsDialogCancelPressHandler = useCallback(() => {
    setRepeatOptionsDialogVisible(false);
  }, []);

  const repeatOptionsDialogRepeatOptionSelectedHandler = useCallback(
    ({repeatOption}) => {
      setSelectedRepeatOption(repeatOption);
      setRepeatOptionsDialogVisible(false);
    },
    [],
  );

  const dateFieldComponent = (
    <ReminderDialogField
      text={date.toLowerCase()}
      onPress={dateFieldPressHandler}
    />
  );
  const timeFieldComponent = (
    <ReminderDialogField
      text={time.toLowerCase()}
      onPress={timeFieldPressHandler}
    />
  );
  const repeatFieldComponent = null;
  // const repeatFieldComponent = (
  //   <ReminderDialogField
  //     text={ReminderTextBuilder.repeatText({
  //       t,
  //       dateObject,
  //       repeatOption: selectedRepeatOption,
  //     })}
  //     onPress={repeatFieldPressHandler}
  //   />
  // );

  const datePickerComponent = (
    <DatePicker
      visible={datePickerVisible}
      mode={datePickerMode}
      date={dateObject}
      onClose={datePickerCloseHandler}
      onDateSelected={datePickerDateSelectedHandler}
    />
  );

  const repeatOptionsDialogComponent = (
    <RepeatOptionsDialog
      visible={repeatOptionsDialogVisible}
      selectedRepeatOption={selectedRepeatOption}
      selectedDateObject={dateObject}
      onOptionSelected={repeatOptionsDialogRepeatOptionSelectedHandler}
      onCancel={repeatOptionsDialogCancelPressHandler}
    />
  );

  useEffect(() => {
    setDate(
      t('calendar_days')[dateObject.getDay()] +
        ', ' +
        dateObject.getDate() +
        ' ' +
        t('calendar_months')[dateObject.getMonth()],
    );
    setTime(
      dateObject.getHours() +
        ':' +
        (dateObject.getMinutes() < 10
          ? '0' + dateObject.getMinutes().toString()
          : dateObject.getMinutes()),
    );
  }, [dateObject, t]);

  useEffect(() => {
    if (selectedDateInMilliseconds > 0) {
      setDateObject(new Date(selectedDateInMilliseconds));
    } else {
      setDateObject(new Date());
    }
  }, [selectedDateInMilliseconds]);

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onCancelPress}>
        <Dialog.Title>{t('ReminderDialog_title')}</Dialog.Title>
        <Dialog.Content>
          <View style={styles.mainContainer}>
            <View style={styles.dateTimeContainer}>
              <View style={styles.dateContainer}>{dateFieldComponent}</View>
              <View style={styles.timeContainer}>{timeFieldComponent}</View>
            </View>
            <View style={styles.repeatContainer}>{repeatFieldComponent}</View>
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={okPressHandler}>
            {t('ReminderDialog_okButton')}
          </Button>
          <Button onPress={onCancelPress}>
            {t('ReminderDialog_cancelButton')}
          </Button>
        </Dialog.Actions>
      </Dialog>
      {datePickerComponent}
      {repeatOptionsDialogComponent}
    </Portal>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: 50,
  },
  dateTimeContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  dateContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingRight: 10,
  },
  timeContainer: {
    paddingLeft: 10,
    width: 100,
    flexDirection: 'row',
  },
  repeatContainer: {
    // backgroundColor: 'green',
    // flex: 1,
  },
});

export default React.memo(ReminderDialog);
