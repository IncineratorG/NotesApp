import {useCallback} from 'react';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import AppActions from '../../../../store/actions/AppActions';

const useCreateBackupDialogBackupController = model => {
  const {
    data: {backupNoteText, needSaveImages},
    setters: {
      setCreateBackupDialogVisible,
      setBackupNoteText,
      setNeedSaveImages,
    },
    dispatch,
  } = model;

  const createBackupDialogCreateHandler = useCallback(() => {
    setCreateBackupDialogVisible(false);
    dispatch(
      AppActions.backup.actions.createBackup({
        backupNote: backupNoteText,
        needSaveImages,
      }),
    );
  }, [backupNoteText, needSaveImages, dispatch, setCreateBackupDialogVisible]);

  const createBackupDialogCancelHandler = useCallback(() => {
    dispatch(AppActions.backup.actions.cancelAllBackupTasks());
    setCreateBackupDialogVisible(false);
  }, [setCreateBackupDialogVisible, dispatch]);

  const createBackupDialogChangeBackupNoteTextHandler = useCallback(
    text => {
      setBackupNoteText(text);
    },
    [setBackupNoteText],
  );

  const createBackupDialogSaveImagesPressHandler = useCallback(() => {
    setNeedSaveImages(prev => !prev);
  }, [setNeedSaveImages]);

  return {
    createBackupDialogCreateHandler,
    createBackupDialogCancelHandler,
    createBackupDialogChangeBackupNoteTextHandler,
    createBackupDialogSaveImagesPressHandler,
  };
};

export default useCreateBackupDialogBackupController;
