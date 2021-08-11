import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';

const PNHandler = () => {
  const onNotificationListeners = new Map();
  const onActionListeners = new Map();

  const onRegisterHandler = token => {
    SystemEventsHandler.onInfo({
      info: 'PNHandler->onRegisterHandler(): ' + JSON.stringify(token),
    });
  };

  const onRegistrationErrorHandler = err => {
    SystemEventsHandler.onInfo({
      info: 'PNHandler->onRegistrationErrorHandler(): ' + JSON.stringify(err),
    });
  };

  const onNotificationHandler = notification => {
    SystemEventsHandler.onInfo({
      info:
        'PNHandler->onNotificationHandler(): ' + JSON.stringify(notification),
    });
    SystemEventsHandler.onInfo({
      info:
        'PNHandler->onNotificationHandler()->SIZE: ' +
        onNotificationListeners.size,
    });

    onNotificationListeners.forEach((value, key) => {
      value(notification);
    });
  };

  const onActionHandler = notification => {
    SystemEventsHandler.onInfo({
      info: 'PNHandler->onAction(): ' + JSON.stringify(notification),
    });

    onActionListeners.forEach((value, key) => {
      value(notification);
    });
  };

  const addOnNotificationListener = ({id, handler}) => {
    onNotificationListeners.set(id, handler);
  };

  const removeOnNotificationListener = ({id}) => {
    onNotificationListeners.delete(id);
  };

  const addOnActionListener = ({id, handler}) => {
    onActionListeners.set(id, handler);
  };

  const removeOnActionListener = ({id}) => {
    onActionListeners.delete(id);
  };

  return {
    onRegisterHandler,
    onRegistrationErrorHandler,
    onNotificationHandler,
    onActionHandler,
    addOnNotificationListener,
    removeOnNotificationListener,
    addOnActionListener,
    removeOnActionListener,
  };
};

export default PNHandler();
