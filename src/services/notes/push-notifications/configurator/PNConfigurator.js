import PushNotification from 'react-native-push-notification';
import PNHandler from '../handler/PNHandler';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';

const PNConfigurator = () => {
  const DEFAULT_CHANNEL_ID = 'notes-channel-id';
  const DEFAULT_CHANNEL_NAME = 'notes-chanel-name';
  const DEFAULT_CHANNEL_DESCRIPTION = 'Notes channel';

  const configure = () => {
    PushNotification.configure({
      onRegister: PNHandler.onRegisterHandler,

      onNotification: PNHandler.onNotificationHandler,

      onAction: PNHandler.onActionHandler,

      onRegistrationError: PNHandler.onRegistrationErrorHandler,

      requestPermissions: false,
      popInitialNotification: true,
    });

    PushNotification.createChannel(
      {
        channelId: DEFAULT_CHANNEL_ID, // (required)
        channelName: DEFAULT_CHANNEL_NAME, // (required)
        channelDescription: DEFAULT_CHANNEL_DESCRIPTION, // (optional) default: undefined.
        playSound: true, // (optional) default: true
        soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
      created =>
        SystemEventsHandler.onInfo({
          info:
            'PNConfigurator->configure()->createChannel()->CREATED: ' + created,
        }),
    );
  };

  const channelId = () => {
    return DEFAULT_CHANNEL_ID;
  };

  return {
    configure,
    channelId,
  };
};

export default PNConfigurator();
