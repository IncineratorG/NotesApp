import {DeviceEventEmitter} from 'react-native';

const AppEvents = () => {
  const events = {
    OPEN_IMAGE_PICKER: 'OPEN_IMAGE_PICKER',
    OPEN_SHARE_APP: 'OPEN_SHARE_APP',
  };

  const addListener = ({event, listener}) => {
    return DeviceEventEmitter.addListener(event, listener);
  };

  const emit = event => {
    DeviceEventEmitter.emit(event);
  };

  return {
    events,
    addListener,
    emit,
  };
};

export default AppEvents();
