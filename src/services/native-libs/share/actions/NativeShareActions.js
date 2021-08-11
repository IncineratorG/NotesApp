import NativeShareConstants from '../constants/NativeShareConstants';

const NativeShareActions = () => {
  const {
    actionTypes: {
      CHECK_SERVICE_AVAILABILITY,
      SEND_SMS_MESSAGE,
      SEND_TELEGRAM_MESSAGE,
      SEND_WHATS_APP_MESSAGE,
    },
  } = NativeShareConstants;

  const checkMessagingServicesAvailabilityAction = () => {
    return {
      type: CHECK_SERVICE_AVAILABILITY,
    };
  };

  const sendSmsMessageAction = ({text}) => {
    return {
      type: SEND_SMS_MESSAGE,
      payload: {text},
    };
  };

  const sendWhatsAppMessageAction = ({text}) => {
    return {
      type: SEND_WHATS_APP_MESSAGE,
      payload: {text},
    };
  };

  const sendTelegramMessageAction = ({text}) => {
    return {
      type: SEND_TELEGRAM_MESSAGE,
      payload: {text},
    };
  };

  return {
    checkMessagingServicesAvailabilityAction,
    sendSmsMessageAction,
    sendWhatsAppMessageAction,
    sendTelegramMessageAction,
  };
};

export default NativeShareActions();
