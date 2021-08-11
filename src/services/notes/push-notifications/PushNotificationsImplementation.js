import PushNotification from 'react-native-push-notification';
import {SystemEventsHandler} from '../../../utils/common/system-events-handler/SystemEventsHandler';
import NativeStorage from '../../native-libs/native-storage/NativeStorage';
import Notifier from '../../../utils/common/notifier/Notifier';

const PushNotificationsImplementation = () => {
  const events = {
    OPEN_NOTE_REQUEST: 'OPEN_NOTE_REQUEST',
  };
  const notifier = Notifier();

  const nativeStorage = NativeStorage();
  let notificationIdsCounter = 1;
  let noteIdToNotificationIdMap = {};

  const DEFAULT_CHANNEL_ID = 'notes-channel-id';
  const DEFAULT_CHANNEL_NAME = 'notes-chanel-name';
  const DEFAULT_CHANNEL_DESCRIPTION = 'Notes channel';

  const NOTIFICATION_ID_COUNTER_STORAGE_KEY =
    'NOTIFICATION_ID_COUNTER_STORAGE_KEY';
  const NOTE_ID_TO_NOTIFICATION_ID_MAP_STORAGE_KEY =
    'NOTE_ID_TO_NOTIFICATION_ID_MAP_STORAGE_KEY';

  const onRegisterHandler = token => {};

  const onRegistrationErrorHandler = err => {
    SystemEventsHandler.onInfo({
      info:
        'NotificationsService->onRegistrationErrorHandler->ERR: ' +
        JSON.stringify(err),
    });
  };

  const onActionHandler = notification => {
    SystemEventsHandler.onInfo({
      info:
        'NotificationsService->onActionHandler->NOTIFICATION: ' +
        JSON.stringify(notification),
    });
  };

  const onNotificationHandler = notification => {
    SystemEventsHandler.onInfo({
      info:
        'NotificationsService->onNotificationHandler->NOTIFICATION: ' +
        JSON.stringify(notification),
    });

    const notificationId = Number(notification.data.id);
    let noteId = -1;

    const noteIdToNotificationIdMapEntries = Object.entries(
      noteIdToNotificationIdMap,
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

    if (noteId >= 0) {
      SystemEventsHandler.onInfo({info: 'NEED_OPEN_NOTE: ' + noteId});

      // dispatch(AppActions.notes.actions.testAction());

      // SystemEventsHandler.onInfo({
      //   info:
      //     'NotificationsService->onNotificationHandler->NOTE_ID: ' +
      //     noteId +
      //     ' - ' +
      //     notifier.subscriptions.length,
      // });
      // notifier.notify({event: events.OPEN_NOTE_REQUEST, data: {noteId}});
    }
  };

  const init = async () => {
    const stringifiedSavedNotificationIdsCounter = await nativeStorage.getStringifiedObject(
      {key: NOTIFICATION_ID_COUNTER_STORAGE_KEY},
    );
    if (!stringifiedSavedNotificationIdsCounter) {
      notificationIdsCounter = 1;
    } else {
      notificationIdsCounter = Number(stringifiedSavedNotificationIdsCounter);
    }

    const stringifiedNoteIdToNotificationIdMap = await nativeStorage.getStringifiedObject(
      {key: NOTE_ID_TO_NOTIFICATION_ID_MAP_STORAGE_KEY},
    );
    if (!stringifiedNoteIdToNotificationIdMap) {
      noteIdToNotificationIdMap = {};
    } else {
      noteIdToNotificationIdMap = JSON.parse(
        stringifiedNoteIdToNotificationIdMap,
      );
    }

    // PushNotification.configure({
    //   // (optional) Called when Token is generated (iOS and Android)
    //   onRegister: onRegisterHandler,
    //
    //   // (required) Called when a remote or local notification is opened or received
    //   onNotification: onNotificationHandler,
    //
    //   // (optional) Called when Action is pressed (Android)
    //   onAction: onActionHandler,
    //
    //   // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    //   onRegistrationError: onRegistrationErrorHandler,
    //
    //   // IOS ONLY (optional): default: all - Permissions to register.
    //   // permissions: {
    //   //   alert: true,
    //   //   badge: true,
    //   //   sound: true,
    //   // },
    //
    //   // Should the initial notification be popped automatically
    //   // default: true
    //   // popInitialNotification: true,
    //
    //   /**
    //    * (optional) default: true
    //    * - Specified if permissions (ios) and token (android and ios) will requested or not,
    //    * - if not, you must call PushNotificationsHandler.requestPermissions() later
    //    */
    //   requestPermissions: false,
    //   popInitialNotification: true,
    //   // requestPermissions: Platform.OS === 'ios',
    // });

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
            'PushNotificationsImplementation->init()->createChannel()->CREATED: ' +
            created,
        }),
    );

    // ===
    PushNotification.getScheduledLocalNotifications(result => {
      SystemEventsHandler.onInfo({
        info: 'SCHEDULED: ' + JSON.stringify(result),
      });
    });
    // ===

    // ===
    // =====
    PushNotification.popInitialNotification(notification => {
      SystemEventsHandler.onInfo({
        info:
          'PushNotification.popInitialNotification: ' +
          JSON.stringify(notification),
      });
    });

    PushNotification.getDeliveredNotifications(notifcations => {
      SystemEventsHandler.onInfo({
        info:
          'PushNotification.getDeliveredNotifications: ' +
          JSON.stringify(notifcations),
      });
    });
    // =====
    // ===
  };

  const dispose = () => {
    notifier.clear();
  };

  const subscribe = ({event, handler}) => {
    return notifier.subscribe({event, handler});
  };

  const hasNotificationForNote = ({noteId}) => {
    return noteIdToNotificationIdMap[noteId] !== undefined;
  };

  const setNotification = async ({noteId, title, body, dateInMilliseconds}) => {
    SystemEventsHandler.onInfo({
      info:
        'PushNotificationsImplementation->setNotification(): ' +
        noteId +
        ' - ' +
        ' - ' +
        title +
        ' - ' +
        body +
        ' - ' +
        dateInMilliseconds,
    });

    let notificationId = noteIdToNotificationIdMap[noteId];
    if (!notificationId) {
      notificationId = ++notificationIdsCounter;
      noteIdToNotificationIdMap[noteId] = notificationId;

      await nativeStorage.saveStringifiedObject({
        key: NOTIFICATION_ID_COUNTER_STORAGE_KEY,
        stringifiedObject: JSON.stringify(notificationIdsCounter),
      });
      await nativeStorage.saveStringifiedObject({
        key: NOTE_ID_TO_NOTIFICATION_ID_MAP_STORAGE_KEY,
        stringifiedObject: JSON.stringify(noteIdToNotificationIdMap),
      });
    }

    PushNotification.localNotificationSchedule({
      autoCancel: true,
      channelId: DEFAULT_CHANNEL_ID,
      bigLargeIcon: 'ic_launcher',
      smallIcon: 'ic_notification',
      color: 'white',

      title,
      message: body, // (required)
      date: new Date(dateInMilliseconds),
      id: notificationId,
      allowWhileIdle: true, // (optional) set notification to work while on doze, default: false
    });
  };

  const cancelNotification = async ({noteId}) => {
    const notificationId = noteIdToNotificationIdMap[noteId];
    if (notificationId) {
      PushNotification.cancelLocalNotifications({id: notificationId});
      delete noteIdToNotificationIdMap[noteId];
      await nativeStorage.saveStringifiedObject({
        key: NOTE_ID_TO_NOTIFICATION_ID_MAP_STORAGE_KEY,
        stringifiedObject: JSON.stringify(noteIdToNotificationIdMap),
      });
    } else {
      SystemEventsHandler.onError({
        err:
          'PushNotificationsImplementation->cancelNotification()->BAD_ID: ' +
          noteId +
          ' - ' +
          notificationId,
      });
    }
  };

  return {
    events,
    init,
    dispose,
    subscribe,
    setNotification,
    cancelNotification,
    hasNotificationForNote,
  };
};

export default PushNotificationsImplementation;

// SystemEventsHandler.onInfo({
//   info: 'NotificationsService->onNotificationHandler)->noteId: ' + noteId,
// });
// noteIdToNotificationIdMapEntries.forEach(entry => {
//   SystemEventsHandler.onInfo({info: 'ENTRY: ' + JSON.stringify(entry)});
// });

// SystemEventsHandler.onInfo({
//   info:
//     'NotificationsService->init()->onNotification(): ' +
//     JSON.stringify(noteIdToNotificationIdMapEntries),
// });

// PushNotification.cancelLocalNotifications()
// PushNotification.removeAllDeliveredNotifications();
// PushNotification.cancelLocalNotifications({id: notification.data.id});
// try {
//   SystemEventsHandler.onInfo({info: 1});
//   const id = '2';
//   PushNotification.clearLocalNotification({tag: '', id});
//   SystemEventsHandler.onInfo({info: 2});
// } catch (e) {
//   SystemEventsHandler.onError({
//     err: 'PushNotification.clearLocalNotification();: ' + e.toString(),
//   });
// }
// PushNotification.cancelAllLocalNotifications();

// import PushNotification from 'react-native-push-notification';
// import {SystemEventsHandler} from '../../../utils/common/system-events-handler/SystemEventsHandler';
// import NativeStorage from '../../native-libs/native-storage/NativeStorage';
// import Notifier from '../../../utils/common/notifier/Notifier';
//
// const PushNotificationsImplementation = () => {
//   const events = {
//     OPEN_NOTE_REQUEST: 'OPEN_NOTE_REQUEST',
//   };
//   const notifier = Notifier();
//
//   const nativeStorage = NativeStorage();
//   let notificationIdsCounter = 1;
//   let noteIdToNotificationIdMap = {};
//
//   const DEFAULT_CHANNEL_ID = 'notes-channel-id';
//   const DEFAULT_CHANNEL_NAME = 'notes-chanel-name';
//   const DEFAULT_CHANNEL_DESCRIPTION = 'Notes channel';
//
//   const NOTIFICATION_ID_COUNTER_STORAGE_KEY =
//     'NOTIFICATION_ID_COUNTER_STORAGE_KEY';
//   const NOTE_ID_TO_NOTIFICATION_ID_MAP_STORAGE_KEY =
//     'NOTE_ID_TO_NOTIFICATION_ID_MAP_STORAGE_KEY';
//
//   const onRegisterHandler = token => {};
//
//   const onRegistrationErrorHandler = err => {
//     SystemEventsHandler.onInfo({
//       info:
//         'NotificationsService->onRegistrationErrorHandler->ERR: ' +
//         JSON.stringify(err),
//     });
//   };
//
//   const onActionHandler = notification => {
//     SystemEventsHandler.onInfo({
//       info:
//         'NotificationsService->onActionHandler->NOTIFICATION: ' +
//         JSON.stringify(notification),
//     });
//   };
//
//   const onNotificationHandler = notification => {
//     SystemEventsHandler.onInfo({
//       info:
//         'NotificationsService->onNotificationHandler->NOTIFICATION: ' +
//         JSON.stringify(notification),
//     });
//
//     const notificationId = Number(notification.data.id);
//     let noteId = -1;
//
//     const noteIdToNotificationIdMapEntries = Object.entries(
//       noteIdToNotificationIdMap,
//     );
//     for (let i = 0; i < noteIdToNotificationIdMapEntries.length; ++i) {
//       const entry = noteIdToNotificationIdMapEntries[i];
//       const entryNoteId = entry[0];
//       const entryNotificationId = entry[1];
//
//       if (entryNotificationId === notificationId) {
//         noteId = Number(entryNoteId);
//         break;
//       }
//     }
//
//     if (noteId >= 0) {
//       SystemEventsHandler.onInfo({info: 'NEED_OPEN_NOTE: ' + noteId});
//
//       // dispatch(AppActions.notes.actions.testAction());
//
//       // SystemEventsHandler.onInfo({
//       //   info:
//       //     'NotificationsService->onNotificationHandler->NOTE_ID: ' +
//       //     noteId +
//       //     ' - ' +
//       //     notifier.subscriptions.length,
//       // });
//       // notifier.notify({event: events.OPEN_NOTE_REQUEST, data: {noteId}});
//     }
//   };
//
//   const init = async () => {
//     const stringifiedSavedNotificationIdsCounter = await nativeStorage.getStringifiedObject(
//       {key: NOTIFICATION_ID_COUNTER_STORAGE_KEY},
//     );
//     if (!stringifiedSavedNotificationIdsCounter) {
//       notificationIdsCounter = 1;
//     } else {
//       notificationIdsCounter = Number(stringifiedSavedNotificationIdsCounter);
//     }
//
//     const stringifiedNoteIdToNotificationIdMap = await nativeStorage.getStringifiedObject(
//       {key: NOTE_ID_TO_NOTIFICATION_ID_MAP_STORAGE_KEY},
//     );
//     if (!stringifiedNoteIdToNotificationIdMap) {
//       noteIdToNotificationIdMap = {};
//     } else {
//       noteIdToNotificationIdMap = JSON.parse(
//         stringifiedNoteIdToNotificationIdMap,
//       );
//     }
//
//     // PushNotification.configure({
//     //   // (optional) Called when Token is generated (iOS and Android)
//     //   onRegister: onRegisterHandler,
//     //
//     //   // (required) Called when a remote or local notification is opened or received
//     //   onNotification: onNotificationHandler,
//     //
//     //   // (optional) Called when Action is pressed (Android)
//     //   onAction: onActionHandler,
//     //
//     //   // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
//     //   onRegistrationError: onRegistrationErrorHandler,
//     //
//     //   // IOS ONLY (optional): default: all - Permissions to register.
//     //   // permissions: {
//     //   //   alert: true,
//     //   //   badge: true,
//     //   //   sound: true,
//     //   // },
//     //
//     //   // Should the initial notification be popped automatically
//     //   // default: true
//     //   // popInitialNotification: true,
//     //
//     //   /**
//     //    * (optional) default: true
//     //    * - Specified if permissions (ios) and token (android and ios) will requested or not,
//     //    * - if not, you must call PushNotificationsHandler.requestPermissions() later
//     //    */
//     //   requestPermissions: false,
//     //   popInitialNotification: true,
//     //   // requestPermissions: Platform.OS === 'ios',
//     // });
//
//     PushNotification.createChannel(
//       {
//         channelId: DEFAULT_CHANNEL_ID, // (required)
//         channelName: DEFAULT_CHANNEL_NAME, // (required)
//         channelDescription: DEFAULT_CHANNEL_DESCRIPTION, // (optional) default: undefined.
//         playSound: true, // (optional) default: true
//         soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
//         importance: 4, // (optional) default: 4. Int value of the Android notification importance
//         vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
//       },
//       created =>
//         SystemEventsHandler.onInfo({
//           info:
//             'PushNotificationsImplementation->init()->createChannel()->CREATED: ' +
//             created,
//         }),
//     );
//
//     // ===
//     PushNotification.getScheduledLocalNotifications(result => {
//       SystemEventsHandler.onInfo({
//         info: 'SCHEDULED: ' + JSON.stringify(result),
//       });
//     });
//     // ===
//
//     // ===
//     // =====
//     PushNotification.popInitialNotification(notification => {
//       SystemEventsHandler.onInfo({
//         info:
//           'PushNotification.popInitialNotification: ' +
//           JSON.stringify(notification),
//       });
//     });
//
//     PushNotification.getDeliveredNotifications(notifcations => {
//       SystemEventsHandler.onInfo({
//         info:
//           'PushNotification.getDeliveredNotifications: ' +
//           JSON.stringify(notifcations),
//       });
//     });
//     // =====
//     // ===
//   };
//
//   const dispose = () => {
//     notifier.clear();
//   };
//
//   const subscribe = ({event, handler}) => {
//     // notifier.clear();
//     return notifier.subscribe({event, handler});
//   };
//
//   const hasNotificationForNote = ({noteId}) => {
//     return noteIdToNotificationIdMap[noteId] !== undefined;
//   };
//
//   const setNotification = async ({noteId, title, body, dateInMilliseconds}) => {
//     SystemEventsHandler.onInfo({
//       info:
//         'PushNotificationsImplementation->setNotification(): ' +
//         noteId +
//         ' - ' +
//         ' - ' +
//         title +
//         ' - ' +
//         body +
//         ' - ' +
//         dateInMilliseconds,
//     });
//
//     let notificationId = noteIdToNotificationIdMap[noteId];
//     if (!notificationId) {
//       notificationId = ++notificationIdsCounter;
//       noteIdToNotificationIdMap[noteId] = notificationId;
//
//       await nativeStorage.saveStringifiedObject({
//         key: NOTIFICATION_ID_COUNTER_STORAGE_KEY,
//         stringifiedObject: JSON.stringify(notificationIdsCounter),
//       });
//       await nativeStorage.saveStringifiedObject({
//         key: NOTE_ID_TO_NOTIFICATION_ID_MAP_STORAGE_KEY,
//         stringifiedObject: JSON.stringify(noteIdToNotificationIdMap),
//       });
//     }
//
//     PushNotification.localNotificationSchedule({
//       autoCancel: true,
//
//       channelId: DEFAULT_CHANNEL_ID,
//
//       // bigText:
//       //   'This is local notification demo in React Native app. Only shown, when expanded.',
//       // subText: 'Local Notification Demo',
//       // title: 'Local Notification Title',
//       // message: '<b>Expand me to see more</b>',
//
//       // largeIcon: 'ic_launcher',
//       // smallIcon: 'ic_launcher',
//       bigLargeIcon: 'ic_launcher',
//       smallIcon: 'ic_notification',
//       color: 'white',
//
//       title,
//       message: body, // (required)
//       date: new Date(dateInMilliseconds),
//       id: notificationId,
//       allowWhileIdle: true, // (optional) set notification to work while on doze, default: false
//       // userInfo: {
//       //   notificationId,
//       // },
//     });
//   };
//
//   const cancelNotification = async ({noteId}) => {
//     const notificationId = noteIdToNotificationIdMap[noteId];
//     if (notificationId) {
//       PushNotification.cancelLocalNotifications({id: notificationId});
//       delete noteIdToNotificationIdMap[noteId];
//       await nativeStorage.saveStringifiedObject({
//         key: NOTE_ID_TO_NOTIFICATION_ID_MAP_STORAGE_KEY,
//         stringifiedObject: JSON.stringify(noteIdToNotificationIdMap),
//       });
//     } else {
//       SystemEventsHandler.onError({
//         err:
//           'PushNotificationsImplementation->cancelNotification()->BAD_ID: ' +
//           noteId +
//           ' - ' +
//           notificationId,
//       });
//     }
//   };
//
//   return {
//     events,
//     init,
//     dispose,
//     subscribe,
//     setNotification,
//     cancelNotification,
//     hasNotificationForNote,
//   };
// };
//
// export default PushNotificationsImplementation;
//
// // SystemEventsHandler.onInfo({
// //   info: 'NotificationsService->onNotificationHandler)->noteId: ' + noteId,
// // });
// // noteIdToNotificationIdMapEntries.forEach(entry => {
// //   SystemEventsHandler.onInfo({info: 'ENTRY: ' + JSON.stringify(entry)});
// // });
//
// // SystemEventsHandler.onInfo({
// //   info:
// //     'NotificationsService->init()->onNotification(): ' +
// //     JSON.stringify(noteIdToNotificationIdMapEntries),
// // });
//
// // PushNotification.cancelLocalNotifications()
// // PushNotification.removeAllDeliveredNotifications();
// // PushNotification.cancelLocalNotifications({id: notification.data.id});
// // try {
// //   SystemEventsHandler.onInfo({info: 1});
// //   const id = '2';
// //   PushNotification.clearLocalNotification({tag: '', id});
// //   SystemEventsHandler.onInfo({info: 2});
// // } catch (e) {
// //   SystemEventsHandler.onError({
// //     err: 'PushNotification.clearLocalNotification();: ' + e.toString(),
// //   });
// // }
// // PushNotification.cancelAllLocalNotifications();
