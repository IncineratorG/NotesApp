import {useCallback} from 'react';
import NoteLocalActions from '../../store/NoteLocalActions';

const useReminderDialogNoteController = model => {
  const {localDispatch} = model;

  const reminderDialogCancelPressHandler = useCallback(() => {
    localDispatch(
      NoteLocalActions.actions.setReminderDialogVisibility({visible: false}),
    );
  }, [localDispatch]);

  const reminderDialogOkPressHandler = useCallback(
    ({dateObject, repeatOption}) => {
      localDispatch(
        NoteLocalActions.actions.setReminderDate({
          dateInMilliseconds: dateObject.getTime(),
          repeatOption,
        }),
      );
      localDispatch(
        NoteLocalActions.actions.setReminderDialogVisibility({visible: false}),
      );
    },
    [localDispatch],
  );

  return {
    reminderDialogCancelPressHandler,
    reminderDialogOkPressHandler,
  };
};

export default useReminderDialogNoteController;
