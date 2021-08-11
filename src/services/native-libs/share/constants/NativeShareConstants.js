import NativeShareLib from '../lib/NativeShareLib';

const NativeShareConstants = () => {
  const {
    actionTypes: {
      CHECK_SERVICE_AVAILABILITY,
      SEND_SMS_MESSAGE,
      SEND_TELEGRAM_MESSAGE,
      SEND_WHATS_APP_MESSAGE,
    },
  } = NativeShareLib.getConstants();

  return {
    actionTypes: {
      CHECK_SERVICE_AVAILABILITY,
      SEND_SMS_MESSAGE,
      SEND_TELEGRAM_MESSAGE,
      SEND_WHATS_APP_MESSAGE,
    },
  };
};

export default NativeShareConstants();
