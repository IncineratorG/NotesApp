import {useCallback} from 'react';
import NoteLocalActions from '../../store/NoteLocalActions';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import AppActions from '../../../../store/actions/AppActions';
import AppEvents from '../../../../events/AppEvents';

const useSendNoteDialogNoteController = model => {
  const {
    localDispatch,
    dispatch,
    data: {
      localState: {note},
    },
  } = model;

  const sendNoteDialogCancelHandler = useCallback(() => {
    localDispatch(
      NoteLocalActions.actions.setSendNoteDialogVisibility({
        visible: false,
      }),
    );
  }, [localDispatch]);

  const sendNoteDialogShareNoteViaAppHandler = useCallback(
    ({appType}) => {
      SystemEventsHandler.onInfo({
        info:
          'useSendNoteDialogNoteController->sendNoteDialogShareNoteViaAppHandler(): ' +
          appType,
      });

      AppEvents.emit(AppEvents.events.OPEN_SHARE_APP);

      dispatch(AppActions.share.actions.shareNoteViaApp({appType, note}));

      localDispatch(
        NoteLocalActions.actions.setSendNoteDialogVisibility({
          visible: false,
        }),
      );
    },
    [localDispatch, dispatch, note],
  );

  return {
    sendNoteDialogCancelHandler,
    sendNoteDialogShareNoteViaAppHandler,
  };
};

export default useSendNoteDialogNoteController;
