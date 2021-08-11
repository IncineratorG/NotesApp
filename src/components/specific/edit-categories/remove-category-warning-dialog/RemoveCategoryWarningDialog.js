import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Dialog, Button, Portal} from 'react-native-paper';
import useTranslation from '../../../../utils/common/localization';
import AppStyles from '../../../../assets/styles/AppStyles';

const RemoveCategoryWarningDialog = ({
  visible,
  category,
  onRemove,
  onCancel,
}) => {
  const {t} = useTranslation();

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onCancel}>
        <Dialog.Title>{category ? category.name : ''}</Dialog.Title>
        <Dialog.Content>
          <View style={styles.mainContainer}>
            <Text style={styles.message}>
              {t('RemoveCategoryWarningDialog_warningMessage')}
            </Text>
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onRemove}>
            {t('RemoveCategoryWarningDialog_removeButton')}
          </Button>
          <Button onPress={onCancel}>
            {t('RemoveCategoryWarningDialog_cancelButton')}
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

export default React.memo(RemoveCategoryWarningDialog);
