import NativeShareLib from './lib/NativeShareLib';
import NativeShareActions from './actions/NativeShareActions';

const NativeShare = () => {
  const nativeShareService = NativeShareLib;

  const checkServicesAvailability = async () => {
    const action = NativeShareActions.checkMessagingServicesAvailabilityAction();
    return await nativeShareService.execute(action);
  };

  const sendSmsMessage = async ({text}) => {
    const action = NativeShareActions.sendSmsMessageAction({text});
    return await nativeShareService.execute(action);
  };

  const sendWhatsAppMessage = async ({text}) => {
    const action = NativeShareActions.sendWhatsAppMessageAction({text});
    return await nativeShareService.execute(action);
  };

  const sendTelegramMessage = async ({text}) => {
    const action = NativeShareActions.sendTelegramMessageAction({text});
    return await nativeShareService.execute(action);
  };

  return {
    checkServicesAvailability,
    sendSmsMessage,
    sendWhatsAppMessage,
    sendTelegramMessage,
  };
};

export default NativeShare;
