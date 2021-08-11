import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Dialog, Button, Portal} from 'react-native-paper';
import useTranslation from '../../../../utils/common/localization';
import AppStyles from '../../../../assets/styles/AppStyles';

const VaultRemoveNoteConfirmationDialog = ({visible, onRemove, onCancel}) => {
  const {t} = useTranslation();

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onCancel}>
        <Dialog.Title>
          {t('VaultRemoveNoteConfirmationDialog_title')}
        </Dialog.Title>
        <Dialog.Content>
          <View style={styles.mainContainer}>
            <Text style={styles.message}>
              {t('VaultRemoveNoteConfirmationDialog_warningMessage')}
            </Text>
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onRemove}>
            {t('VaultRemoveNoteConfirmationDialog_removeButton')}
          </Button>
          <Button onPress={onCancel}>
            {t('VaultRemoveNoteConfirmationDialog_cancelButton')}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    minHeight: 75,
  },
  message: {
    fontSize: AppStyles.dialogMessageFontSize,
  },
});

export default React.memo(VaultRemoveNoteConfirmationDialog);
