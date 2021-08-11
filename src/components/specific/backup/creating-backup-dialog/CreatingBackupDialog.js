import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button, Dialog, Portal} from 'react-native-paper';
import useTranslation from '../../../../utils/common/localization';
import Icon from 'react-native-vector-icons/Feather';
import AppStyles from '../../../../assets/styles/AppStyles';

const CreatingBackupDialog = ({visible, progressText, onCancelPress}) => {
  const {t} = useTranslation();

  return (
    <Portal>
      <Dialog visible={visible} dismissable={false} onDismiss={onCancelPress}>
        <Dialog.Title>{t('CreatingBackupDialog_title')}</Dialog.Title>
        <Dialog.Content>
          <View style={styles.mainContainer}>
            <View style={styles.iconContainer}>
              <Icon name="loader" size={24} color={'grey'} />
            </View>
            <View style={styles.messageContainer}>
              <Text style={{fontSize: AppStyles.dialogMessageFontSize}}>
                {progressText}
              </Text>
            </View>
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onCancelPress}>
            {t('CreatingBackupDialog_cancelButton')}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    minHeight: 75,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  iconContainer: {
    width: 50,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageContainer: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default React.memo(CreatingBackupDialog);
