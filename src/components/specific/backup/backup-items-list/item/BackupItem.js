import React, {useState, useCallback, useEffect} from 'react';
import {View, Text, TouchableNativeFeedback, StyleSheet} from 'react-native';
import DateToTextConverter from '../../../../../utils/common/date-to-text-converter/DateToTextConverter';
import useTranslation from '../../../../../utils/common/localization';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BackupItemMenu from '../../backup-item-menu/BackupItemMenu';

const BackupItem = ({backupItem, onRemovePress, onRestorePress}) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [backupSize, setBackupSize] = useState('');
  const [backupSizeUnit, setBackupSizeUnit] = useState('');

  const {t} = useTranslation();

  const {driveId, note, sizeInBytes, timestamp} = backupItem;
  const dateText = DateToTextConverter.toText({
    t,
    dateObject: new Date(Number(timestamp)),
  });

  const itemPressHandler = () => {
    setMenuVisible(prev => !prev);
  };

  const menuCloseHandler = useCallback(() => {
    setMenuVisible(false);
  }, []);

  const menuRemoveOptionPressHandler = () => {
    setMenuVisible(false);
    onRemovePress({driveId, note, timestamp});
  };

  const menuRestoreOptionPressHandler = () => {
    setMenuVisible(false);
    onRestorePress({driveId, note, timestamp});
  };

  useEffect(() => {
    const sizeInBytesNumber = Number(sizeInBytes);
    const sizeInKBytesNumber = Math.round(sizeInBytesNumber / 1024);
    const sizeInKBytesString = sizeInKBytesNumber.toString();
    if (sizeInKBytesString.length <= 3) {
      setBackupSize(sizeInKBytesString);
      setBackupSizeUnit(t('backupSizeUnitKb'));
    } else {
      const sizeInMBytesNumber =
        Math.round((sizeInBytesNumber / 1024 / 1024) * 100) / 100;
      setBackupSize(sizeInMBytesNumber.toString());
      setBackupSizeUnit(t('backupSizeUnitMb'));
    }
  }, [sizeInBytes, t]);

  const optionsIconComponent = <Icon name="more-vert" size={24} color="grey" />;

  const backupNoteComponent = note ? (
    <View style={styles.backupNoteContainer}>
      <Text style={styles.backupNoteText}>{note}</Text>
    </View>
  ) : null;

  const backupItemMenu = (
    <BackupItemMenu
      visible={menuVisible}
      onRemovePress={menuRemoveOptionPressHandler}
      onRestorePress={menuRestoreOptionPressHandler}
      onClose={menuCloseHandler}
    />
  );

  return (
    <TouchableNativeFeedback onPress={itemPressHandler}>
      <View style={styles.mainContainer}>
        <View style={styles.backupInfoContainer}>
          <View style={styles.backupDateContainer}>
            <Text
              style={styles.backupDateText}
              numberOfLines={1}
              ellipsizeMode="tail">
              {dateText + ' \u00B7 ' + backupSize + ' ' + backupSizeUnit}
            </Text>
          </View>
          {backupNoteComponent}
        </View>
        <View style={styles.optionIconContainer}>{optionsIconComponent}</View>
        {backupItemMenu}
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    alignSelf: 'stretch',
    height: 60,
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
    padding: 4,
    flexDirection: 'row',
  },
  backupInfoContainer: {
    flex: 1,
    alignSelf: 'stretch',
  },
  optionIconContainer: {
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 8,
  },
  backupDateContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  backupDateText: {
    fontSize: 16,
  },
  backupNoteContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  backupNoteText: {
    fontSize: 14,
    color: 'grey',
  },
});

export default React.memo(BackupItem);
