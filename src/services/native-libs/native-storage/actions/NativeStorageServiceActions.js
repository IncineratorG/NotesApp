import NativeStorageServiceConstants from '../constants/NativeStorageServiceConstants';

const NativeStorageServiceActions = () => {
  const {
    actionTypes: {
      SAVE_STRINGIFIED_OBJECT,
      GET_STRINGIFIED_OBJECT,
      REMOVE_STRINGIFIED_OBJECT,
    },
  } = NativeStorageServiceConstants;

  const saveObject = ({key, stringifiedObject}) => {
    return {
      type: SAVE_STRINGIFIED_OBJECT,
      payload: {key, stringifiedObject},
    };
  };

  const getObject = ({key}) => {
    return {
      type: GET_STRINGIFIED_OBJECT,
      payload: {key},
    };
  };

  const removeObject = ({key}) => {
    return {
      type: REMOVE_STRINGIFIED_OBJECT,
      payload: {key},
    };
  };

  return {
    saveObject,
    getObject,
    removeObject,
  };
};

export default NativeStorageServiceActions();
