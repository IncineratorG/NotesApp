import {SystemEventsHandler} from '../system-events-handler/SystemEventsHandler';

const Notifier = () => {
  let idsCounter = 0;
  let subscriptions = [];

  const subscribe = ({event, handler}) => {
    // SystemEventsHandler.onInfo({
    //   info:
    //     'Notifier->WILL_SUBSCRIBE: ' +
    //     event +
    //     ' - ' +
    //     subscriptions.length +
    //     ' - ' +
    //     idsCounter,
    // });

    const subscriptionId = ++idsCounter;
    const subscription = {
      id: subscriptionId,
      event: event,
      handler: handler,
    };

    subscriptions.push(subscription);

    return () => {
      // SystemEventsHandler.onInfo({info: 'Notifier->WILL_UNSUBSCRIBE'});

      subscriptions = subscriptions.filter(s => s.id !== subscription.id);
    };
  };

  const notify = ({event, data}) => {
    subscriptions.forEach(subscription => {
      if (subscription.event === event && subscription.handler) {
        subscription.handler(data);
      }
    });
  };

  const clear = () => {
    SystemEventsHandler.onInfo({info: 'Notifier->clear()'});

    subscriptions = [];
  };

  return {
    subscribe,
    notify,
    clear,
    subscriptions,
  };
};

export default Notifier;
