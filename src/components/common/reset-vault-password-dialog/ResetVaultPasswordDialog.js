import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button, Dialog, Portal} from 'react-native-paper';
import useTranslation from '../../../utils/common/localization';
import AppStyles from '../../../assets/styles/AppStyles';

const ResetVaultPasswordDialog = ({visible, onResetPress, onCancelPress}) => {
  const {t} = useTranslation();

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onCancelPress}>
        <Dialog.Title>{t('ResetVaultPasswordDialog_title')}</Dialog.Title>
        <Dialog.Content>
          <View style={styles.mainContainer}>
            <Text style={styles.message}>
              {t('ResetVaultPasswordDialog_message')}
            </Text>
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onResetPress}>
            {t('ResetVaultPasswordDialog_resetButton')}
          </Button>
          <Button onPress={onCancelPress}>
            {t('ResetVaultPasswordDialog_cancelButton')}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    minHeight: 50,
    justifyContent: 'center',
  },
  message: {
    fontSize: AppStyles.dialogMessageFontSize,
  },
});

export default React.memo(ResetVaultPasswordDialog);
