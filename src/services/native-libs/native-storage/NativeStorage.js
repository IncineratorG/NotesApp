import NativeStorageLib from './lib/NativeStorageLib';
import NativeStorageServiceActions from './actions/NativeStorageServiceActions';

const NativeStorage = () => {
  const nativeStorageModule = NativeStorageLib;

  const saveStringifiedObject = async ({key, stringifiedObject}) => {
    const action = NativeStorageServiceActions.saveObject({
      key,
      stringifiedObject,
    });
    return await nativeStorageModule.execute(action);
  };

  const getStringifiedObject = async ({key}) => {
    const action = NativeStorageServiceActions.getObject({key});
    return await nativeStorageModule.execute(action);
  };

  const removeObject = async ({key}) => {
    const action = NativeStorageServiceActions.removeObject({key});
    return await nativeStorageModule.execute(action);
  };

  return {
    saveStringifiedObject,
    getStringifiedObject,
    removeObject,
  };
};

export default NativeStorage;
