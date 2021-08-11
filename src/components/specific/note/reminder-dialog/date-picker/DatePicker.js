import React, {useCallback} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

const DatePicker = ({visible, mode, date, onClose, onDateSelected}) => {
  const changeHandler = useCallback(
    (event, selectedDate) => {
      if (!selectedDate) {
        onClose();
      } else {
        onDateSelected(selectedDate);
      }
    },
    [onClose, onDateSelected],
  );

  return visible ? (
    <DateTimePicker
      testID="dateTimePicker"
      value={date}
      mode={mode}
      is24Hour={true}
      display={'default'}
      onChange={changeHandler}
    />
  ) : null;
};

export default React.memo(DatePicker);
