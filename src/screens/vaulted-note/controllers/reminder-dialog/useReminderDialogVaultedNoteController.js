import {useCallback} from 'react';
import VaultedNoteLocalActions from '../../store/VaultedNoteLocalActions';

const useReminderDialogVaultedNoteController = model => {
  const {localDispatch} = model;

  const reminderDialogCancelPressHandler = useCallback(() => {
    localDispatch(
      VaultedNoteLocalActions.actions.setReminderDialogVisibility({
        visible: false,
      }),
    );
  }, [localDispatch]);

  const reminderDialogOkPressHandler = useCallback(
    ({dateObject, repeatOption}) => {
      localDispatch(
        VaultedNoteLocalActions.actions.setReminderDate({
          dateInMilliseconds: dateObject.getTime(),
          repeatOption,
        }),
      );
      localDispatch(
        VaultedNoteLocalActions.actions.setReminderDialogVisibility({
          visible: false,
        }),
      );
    },
    [localDispatch],
  );

  return {
    reminderDialogCancelPressHandler,
    reminderDialogOkPressHandler,
  };
};

export default useReminderDialogVaultedNoteController;
