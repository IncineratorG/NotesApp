import {NativeEventEmitter} from 'react-native';
import NativeBackupLib from '../lib/NativeBackupLib';
import NativeBackupConstants from '../constants/NativeBackupConstants';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';

const NativeBackupEvents = () => {
  const eventEmitter = new NativeEventEmitter(NativeBackupLib);

  const loginResultEventPayload = data => {
    const {successful, email, error} = data;
    return {successful, email, error};
  };

  const logoutResultEventPayload = data => {
    const {successful, error} = data;
    return {successful, error};
  };

  const createBackupResultEventPayload = data => {
    const {successful, error, image} = data;
    return {successful, error, image};
  };

  const getNotesImagesSizeInBytesResultEventPayload = data => {
    const {notesImagesSizeInBytes} = data;
    return {sizeInBytes: notesImagesSizeInBytes};
  };

  const createBackupProgressChangedEventPayload = data => {
    const {
      stageType,
      stageDescription,
      currentProgressItem,
      totalProgressItems,
    } = data;
    return {
      stageType,
      stageDescription,
      currentProgressItem,
      totalProgressItems,
    };
  };

  const createBackupFinishedEventPayload = data => {
    return null;
  };

  const createBackupCancelledEventPayload = data => {
    return null;
  };

  const createBackupErrorEventPayload = data => {
    const {code, message} = data;
    return {code, message};
  };

  const getBackupsListResultEventPayload = data => {
    if (!data || !data.length) {
      return [];
    }
    return data;
  };

  const getBackupsListErrorEventPayload = data => {
    const {code, message} = data;
    return {code, message};
  };

  const removeBackupFinishedEventPayload = data => {
    return null;
  };

  const removeBackupErrorEventPayload = data => {
    const {code, message} = data;
    return {code, message};
  };

  const restoreFromBackupProgressChangedEventPayload = data => {
    const {
      stageType,
      stageDescription,
      currentProgressItem,
      totalProgressItems,
    } = data;
    return {
      stageType,
      stageDescription,
      currentProgressItem,
      totalProgressItems,
    };
  };

  const restoreFromBackupFinishedEventPayload = data => {
    return null;
  };

  const restoreFromBackupCancelledEventPayload = data => {
    return null;
  };

  const restoreFromBackupErrorEventPayload = data => {
    const {code, message} = data;
    return {code, message};
  };

  return {
    types: NativeBackupConstants.eventTypes,
    eventEmitter,
    payloads: {
      loginResultEventPayload,
      logoutResultEventPayload,
      createBackupResultEventPayload,
      getNotesImagesSizeInBytesResultEventPayload,
      createBackupProgressChangedEventPayload,
      createBackupFinishedEventPayload,
      createBackupCancelledEventPayload,
      createBackupErrorEventPayload,
      getBackupsListResultEventPayload,
      getBackupsListErrorEventPayload,
      removeBackupFinishedEventPayload,
      removeBackupErrorEventPayload,
      restoreFromBackupProgressChangedEventPayload,
      restoreFromBackupFinishedEventPayload,
      restoreFromBackupCancelledEventPayload,
      restoreFromBackupErrorEventPayload,
    },
  };
};

export default NativeBackupEvents();
