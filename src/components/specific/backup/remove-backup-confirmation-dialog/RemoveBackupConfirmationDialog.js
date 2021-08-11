import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Dialog, Button, Portal} from 'react-native-paper';
import useTranslation from '../../../../utils/common/localization';
import DateToTextConverter from '../../../../utils/common/date-to-text-converter/DateToTextConverter';
import AppStyles from '../../../../assets/styles/AppStyles';

const RemoveBackupConfirmationDialog = ({
  visible,
  note,
  timestamp,
  driveId,
  onRemove,
  onCancel,
}) => {
  const {t} = useTranslation();

  const {
    dateString,
    isToday,
    isTomorrow,
    isYesterday,
  } = DateToTextConverter.toTextWithInfo({
    t,
    dateObject: new Date(timestamp),
  });

  const onSentencePart =
    isToday || isTomorrow || isYesterday
      ? ''
      : t('RemoveBackupConfirmationDialog_warningMessageOnSentencePart');

  const backupNoteTextComponent = note ? (
    <Text>
      {t('RemoveBackupConfirmationDialog_warningMessageNoteSentencePart')}
      <Text style={{fontWeight: 'bold'}}>{note}</Text>
      <Text>
        {t('RemoveBackupConfirmationDialog_warningMessageQuestionMark')}
      </Text>
    </Text>
  ) : (
    <Text>
      {t('RemoveBackupConfirmationDialog_warningMessageQuestionMark')}
    </Text>
  );

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onCancel}>
        <Dialog.Title>{t('RemoveBackupConfirmationDialog_title')}</Dialog.Title>
        <Dialog.Content>
          <View style={styles.mainContainer}>
            <Text style={styles.message}>
              {t('RemoveBackupConfirmationDialog_warningMessageStart') +
                onSentencePart}
              <Text style={{fontWeight: 'bold'}}>{dateString}</Text>
              {backupNoteTextComponent}
              <Text>
                {t(
                  'RemoveBackupConfirmationDialog_warningMessageIrreversiblePart',
                )}
              </Text>
            </Text>
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={() => {
              onRemove({driveId});
            }}>
            {t('RemoveBackupConfirmationDialog_removeButton')}
          </Button>
          <Button onPress={onCancel}>
            {t('RemoveBackupConfirmationDialog_cancelButton')}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    minHeight: 120,
  },
  message: {
    fontSize: AppStyles.dialogMessageFontSize,
  },
});

export default React.memo(RemoveBackupConfirmationDialog);
