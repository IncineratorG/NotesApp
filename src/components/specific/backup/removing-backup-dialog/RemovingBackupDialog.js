import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button, Dialog, Portal} from 'react-native-paper';
import useTranslation from '../../../../utils/common/localization';
import Icon from 'react-native-vector-icons/Feather';
import AppStyles from '../../../../assets/styles/AppStyles';

const RemovingBackupDialog = ({visible, onCancelPress}) => {
  const {t} = useTranslation();

  return (
    <Portal>
      <Dialog visible={visible} dismissable={false} onDismiss={onCancelPress}>
        <Dialog.Content>
          <View style={styles.mainContainer}>
            <View style={styles.messageContainer}>
              <View style={styles.progressIconContainer}>
                <Icon name="loader" size={24} color={'grey'} />
              </View>
              <View style={styles.messageTextContainer}>
                <Text style={styles.messageText}>
                  {t('RemovingBackupDialog_message')}
                </Text>
              </View>
            </View>
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onCancelPress}>
            {t('RemovingBackupDialog_cancelButton')}
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
  messageContainer: {
    minHeight: 50,
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  progressIconContainer: {
    width: 50,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageTextContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageText: {
    fontSize: AppStyles.dialogMessageFontSize,
  },
});

export default React.memo(RemovingBackupDialog);
