import React, {useCallback, useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Dialog, Button, Portal} from 'react-native-paper';
import useTranslation from '../../../../utils/common/localization';
import ShareAppTypes from '../../../../data/common/share-app-types/ShareAppTypes';
import SendOptionItem from './send-option-item/SendOptionItem';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';

const SendNoteDialog = ({
  visible,
  shareServiceAvailabilityMap,
  onSendOptionPress,
  onCancel,
}) => {
  const {t} = useTranslation();

  const [smsShareSupported, setSmsShareSupported] = useState(true);
  const [whatsAppShareSupported, setWhatsAppShareSupported] = useState(true);
  const [telegramShareSupported, setTelegramShareSupported] = useState(true);
  const [supportedAppsCount, setSupportedAppsCount] = useState(3);

  const smsOptionPressHandler = useCallback(() => {
    onSendOptionPress({appType: ShareAppTypes.SMS});
  }, [onSendOptionPress]);
  const whatsAppOptionPressHandler = useCallback(() => {
    onSendOptionPress({appType: ShareAppTypes.WHATS_APP});
  }, [onSendOptionPress]);
  const telegramOptionPressHandler = useCallback(() => {
    onSendOptionPress({appType: ShareAppTypes.TELEGRAM});
  }, [onSendOptionPress]);

  const smsOptionComponent = smsShareSupported ? (
    <SendOptionItem
      text={t('sms')}
      isSelected={true}
      onPress={smsOptionPressHandler}
    />
  ) : null;
  const whatsAppOptionComponent = whatsAppShareSupported ? (
    <SendOptionItem text={t('whatsApp')} onPress={whatsAppOptionPressHandler} />
  ) : null;
  const telegramOptionComponent = telegramShareSupported ? (
    <SendOptionItem text={t('telegram')} onPress={telegramOptionPressHandler} />
  ) : null;

  useEffect(() => {
    setSmsShareSupported(shareServiceAvailabilityMap.get(ShareAppTypes.SMS));
    setWhatsAppShareSupported(
      shareServiceAvailabilityMap.get(ShareAppTypes.WHATS_APP),
    );
    setTelegramShareSupported(
      shareServiceAvailabilityMap.get(ShareAppTypes.TELEGRAM),
    );

    let supportedAppsCountTemp = 0;
    if (shareServiceAvailabilityMap.get(ShareAppTypes.SMS)) {
      ++supportedAppsCountTemp;
    }
    if (shareServiceAvailabilityMap.get(ShareAppTypes.WHATS_APP)) {
      ++supportedAppsCountTemp;
    }
    if (shareServiceAvailabilityMap.get(ShareAppTypes.TELEGRAM)) {
      ++supportedAppsCountTemp;
    }
    setSupportedAppsCount(supportedAppsCountTemp);
  }, [shareServiceAvailabilityMap]);

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onCancel}>
        <Dialog.Title>{t('SendNoteDialog_title')}</Dialog.Title>
        <Dialog.Content>
          <View
            style={[
              styles.mainContainer,
              {
                height: 50 * supportedAppsCount,
              },
            ]}>
            {smsOptionComponent}
            {whatsAppOptionComponent}
            {telegramOptionComponent}
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onCancel}>{t('SendNoteDialog_cancelButton')}</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    minHeight: 150,
  },
});

export default React.memo(SendNoteDialog);
