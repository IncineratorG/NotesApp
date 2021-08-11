import NativeShare from '../native-libs/share/NativeShare';
import ShareAppTypes from '../../data/common/share-app-types/ShareAppTypes';
import {SystemEventsHandler} from '../../utils/common/system-events-handler/SystemEventsHandler';

const ShareService = () => {
  const nativeShareService = NativeShare();
  const shareServicesAvailabilityMap = new Map();

  const onShareServiceAvailabilityChangeListeners = new Map();

  const checkAvailability = async () => {
    const {
      sms,
      whatsApp,
      telegram,
    } = await nativeShareService.checkServicesAvailability();

    shareServicesAvailabilityMap.clear();
    shareServicesAvailabilityMap.set(ShareAppTypes.SMS, sms);
    shareServicesAvailabilityMap.set(ShareAppTypes.WHATS_APP, whatsApp);
    shareServicesAvailabilityMap.set(ShareAppTypes.TELEGRAM, telegram);
  };

  const init = async () => {
    await checkAvailability();

    onShareServiceAvailabilityChangeListeners.forEach((value, key) => {
      value({
        shareServiceAvailabilityMap: new Map(shareServicesAvailabilityMap),
      });
    });
  };

  const addOnShareServiceAvailabilityChangeListener = ({id, handler}) => {
    onShareServiceAvailabilityChangeListeners.set(id, handler);
  };

  const removeOnShareServiceAvailabilityChangeListener = ({id}) => {
    onShareServiceAvailabilityChangeListeners.delete(id);
  };

  const getAvailabilityStatus = async () => {
    await checkAvailability();

    return {
      shareServiceAvailabilityMap: new Map(shareServicesAvailabilityMap),
    };
  };

  const shareViaApp = async ({appType, text}) => {
    switch (appType) {
      case ShareAppTypes.SMS: {
        try {
          await nativeShareService.sendSmsMessage({text});
        } catch (e) {
          SystemEventsHandler.onError({
            err:
              'ShareService' +
              '->shareViaApp()->APP_TYPE: ' +
              appType +
              '; ERROR: ' +
              e.toString(),
          });
        }
        break;
      }

      case ShareAppTypes.WHATS_APP: {
        try {
          await nativeShareService.sendWhatsAppMessage({text});
        } catch (e) {
          SystemEventsHandler.onError({
            err:
              'ShareService' + '->shareViaWhatsApp()->ERROR: ' + e.toString(),
          });
        }
        break;
      }

      case ShareAppTypes.TELEGRAM: {
        try {
          await nativeShareService.sendTelegramMessage({text});
        } catch (e) {
          SystemEventsHandler.onError({
            err:
              'ShareService' + '->shareViaTelegram()->ERROR: ' + e.toString(),
          });
        }
        break;
      }

      default: {
        SystemEventsHandler.onError({
          err:
            'ShareService' +
            '->shareViaApp()->ERROR->UNKNOWN_APP_TYPE: ' +
            appType,
        });
      }
    }
  };

  return {
    init,
    addOnShareServiceAvailabilityChangeListener,
    removeOnShareServiceAvailabilityChangeListener,
    checkAvailability,
    getAvailabilityStatus,
    shareViaApp,
  };
};

export default ShareService;
