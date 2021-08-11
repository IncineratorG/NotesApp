import NativeStorageLib from '../lib/NativeStorageLib';

const NativeStorageServiceConstants = () => {
  const {
    actionTypes: {
      SAVE_STRINGIFIED_OBJECT,
      GET_STRINGIFIED_OBJECT,
      REMOVE_STRINGIFIED_OBJECT,
    },
  } = NativeStorageLib.getConstants();

  return {
    actionTypes: {
      SAVE_STRINGIFIED_OBJECT,
      GET_STRINGIFIED_OBJECT,
      REMOVE_STRINGIFIED_OBJECT,
    },
  };
};

export default NativeStorageServiceConstants();
