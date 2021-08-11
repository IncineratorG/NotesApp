import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Dialog, Button, Portal} from 'react-native-paper';
import useTranslation from '../../../../utils/common/localization';
import AppStyles from '../../../../assets/styles/AppStyles';

const RestoreFromBackupConfirmationDialog = ({
  visible,
  note,
  timestamp,
  driveId,
  onRestore,
  onCancel,
}) => {
  const {t} = useTranslation();

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onCancel}>
        <Dialog.Title>
          {t('RestoreFromBackupConfirmationDialog_title')}
        </Dialog.Title>
        <Dialog.Content>
          <View style={styles.mainContainer}>
            <Text style={styles.message} numberOfLines={5}>
              {t('RestoreFromBackupConfirmationDialog_message')}
            </Text>
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={() => {
              onRestore({driveId});
            }}>
            {t('RestoreFromBackupConfirmationDialog_restoreButton')}
          </Button>
          <Button onPress={onCancel}>
            {t('RestoreFromBackupConfirmationDialog_cancelButton')}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    minHeight: 110,
  },
  message: {
    fontSize: AppStyles.dialogMessageFontSize,
  },
});

export default React.memo(RestoreFromBackupConfirmationDialog);
