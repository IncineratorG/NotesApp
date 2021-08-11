import React, {useCallback, useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import useTranslation from '../../../../utils/common/localization';
import invert from 'invert-color';

const DeletedNoteUpdateDateField = ({updateDateTimestamp, categoryColor}) => {
  const {t} = useTranslation();

  const date = useMemo(() => {
    return new Date();
  }, []);

  const toDateString = useCallback(
    ({timestamp, dateObject}) => {
      dateObject.setTime(timestamp);

      return (
        t('calendar_days')[dateObject.getDay()] +
        ', ' +
        dateObject.getDate() +
        ' ' +
        t('calendar_months')[dateObject.getMonth()] +
        ', ' +
        dateObject.getHours() +
        ':' +
        (dateObject.getMinutes() < 10
          ? '0' + dateObject.getMinutes().toString()
          : dateObject.getMinutes())
      ).toLowerCase();
    },
    [t],
  );

  return (
    <View style={styles.mainContainer}>
      <Text
        style={[
          styles.updateDateText,
          {
            color: invert(categoryColor, {
              black: '#21212166',
              white: '#fafafa66',
            }),
          },
        ]}>
        {t('NoteUpdateDateField_changePrefix') +
          toDateString({timestamp: updateDateTimestamp, dateObject: date})}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  updateDateText: {
    fontSize: 14,
    color: '#757575',
  },
});

export default React.memo(DeletedNoteUpdateDateField);
