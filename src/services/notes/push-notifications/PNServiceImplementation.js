import PNConfigurator from './configurator/PNConfigurator';
import PNHandler from './handler/PNHandler';
import NativeStorage from '../../native-libs/native-storage/NativeStorage';
import PushNotification from 'react-native-push-notification';
import {SystemEventsHandler} from '../../../utils/common/system-events-handler/SystemEventsHandler';

const PNServiceImplementation = () => {
  const SERVICE_ID = 'PNServiceImplementationId';
  const nativeStorage = NativeStorage();
  const storageKeys = {
    NOTIFICATIONS_DATA: 'NOTIFICATIONS_DATA_STORAGE_KEY',
  };

  let notificationsServiceData = {
    notificationIdsCounter: 1,
    noteIdToNotificationIdMap: {},
    firedNotificationDates: {},
  };

  const onOpenNoteRequestListeners = new Map();

  const onNotificationHandler = notification => {
    if (!notification) {
      SystemEventsHandler.onInfo({
        info:
          'PNServiceImplementation->onNotificationHandler(): NOTIFICATION_IS_NULL',
      });
      return;
    }

    const {fireDate} = notification;
    if (notificationsServiceData.firedNotificationDates[fireDate]) {
      SystemEventsHandler.onInfo({
        info:
          'PNServiceImplementation->onNotificationHandler()->NOTIFICATION_ALREADY_FIRED: ' +
          fireDate,
      });
      return;
    }

    notificationsServiceData.firedNotificationDates[fireDate] = true;
    nativeStorage.saveStringifiedObject({
      key: storageKeys.NOTIFICATIONS_DATA,
      stringifiedObject: JSON.stringify(notificationsServiceData),
    });

    SystemEventsHandler.onInfo({
      info:
        'PNServiceImplementation->onNotificationHandler->NOTIFICATION: ' +
        JSON.stringify(notification),
    });

    const notificationId = Number(notification.data.id);
    let noteId = -1;

    const noteIdToNotificationIdMapEntries = Object.entries(
      notificationsServiceData.noteIdToNotificationIdMap,
    );
    for (let i = 0; i < noteIdToNotificationIdMapEntries.length; ++i) {
      const entry = noteIdToNotificationIdMapEntries[i];
      const entryNoteId = entry[0];
      const entryNotificationId = entry[1];

      if (entryNotificationId === notificationId) {
        noteId = Number(entryNoteId);
        break;
      }
    }

    SystemEventsHandler.onInfo({
      info:
        'PNServiceImplementation->onNotificationHandler->MAP_SIZE: ' +
        onOpenNoteRequestListeners.size,
    });
    if (noteId >= 0) {
      SystemEventsHandler.onInfo({
        info:
          'PNServiceImplementation->onNotificationHandler->NEED_OPEN_NOTE: ' +
          noteId,
      });
      onOpenNoteRequestListeners.forEach((value, key) => {
        value({noteId});
      });
    } else {
      SystemEventsHandler.onInfo({
        info:
          'PNServiceImplementation->onNotificationHandler->BAD_NOTE_ID: ' +
          noteId +
          ' - ' +
          notificationId,
      });
    }
  };

  const init = async () => {
    PNConfigurator.configure();
    PNHandler.addOnNotificationListener({
      id: SERVICE_ID,
      handler: onNotificationHandler,
    });

    const stringifiedNotificationsServiceData = await nativeStorage.getStringifiedObject(
      {
        key: storageKeys.NOTIFICATIONS_DATA,
      },
    );
    if (stringifiedNotificationsServiceData) {
      notificationsServiceData = JSON.parse(
        stringifiedNotificationsServiceData,
      );
    }

    PushNotification.popInitialNotification(onNotificationHandler);
  };

  const dispose = () => {};

  const setNotification = async ({noteId, title, body, dateInMilliseconds}) => {
    SystemEventsHandler.onInfo({
      info:
        'PNServiceImplementation->setNotification(): ' +
        noteId +
        ' - ' +
        ' - ' +
        title +
        ' - ' +
        body +
        ' - ' +
        dateInMilliseconds,
    });

    let notificationId =
      notificationsServiceData.noteIdToNotificationIdMap[noteId];
    if (!notificationId) {
      notificationId = ++notificationsServiceData.notificationIdsCounter;
      notificationsServiceData.noteIdToNotificationIdMap[
        noteId
      ] = notificationId;

      await nativeStorage.saveStringifiedObject({
        key: storageKeys.NOTIFICATIONS_DATA,
        stringifiedObject: JSON.stringify(notificationsServiceData),
      });
    }

    PushNotification.localNotificationSchedule({
      autoCancel: true,
      channelId: PNConfigurator.channelId(),
      bigLargeIcon: 'ic_launcher',
      smallIcon: 'ic_stat_n',
      color: 'white',

      title,
      message: body, // (required)
      date: new Date(dateInMilliseconds),
      id: notificationId,
      allowWhileIdle: true, // (optional) set notification to work while on doze, default: false
    });
  };

  const cancelNotification = async ({noteId}) => {
    SystemEventsHandler.onInfo({
      info: 'PNServiceImplementation->cancelNotification()',
    });

    const notificationId =
      notificationsServiceData.noteIdToNotificationIdMap[noteId];
    if (notificationId) {
      PushNotification.cancelLocalNotifications({id: notificationId});
      delete notificationsServiceData.noteIdToNotificationIdMap[noteId];
      await nativeStorage.saveStringifiedObject({
        key: storageKeys.NOTIFICATIONS_DATA,
        stringifiedObject: JSON.stringify(notificationsServiceData),
      });
    } else {
      SystemEventsHandler.onError({
        err:
          'PNServiceImplementation->cancelNotification()->BAD_ID: ' +
          noteId +
          ' - ' +
          notificationId,
      });
    }
  };

  const hasNotificationForNote = ({noteId}) => {
    return (
      notificationsServiceData.noteIdToNotificationIdMap[noteId] !== undefined
    );
  };

  const addOnOpenNoteRequestListener = ({id, handler}) => {
    onOpenNoteRequestListeners.set(id, handler);
  };

  const removeOnOpenNoteRequestListener = ({id}) => {
    onOpenNoteRequestListeners.delete(id);
  };

  return {
    init,
    dispose,
    addOnOpenNoteRequestListener,
    removeOnOpenNoteRequestListener,
    setNotification,
    cancelNotification,
    hasNotificationForNote,
  };
};

export default PNServiceImplementation;
