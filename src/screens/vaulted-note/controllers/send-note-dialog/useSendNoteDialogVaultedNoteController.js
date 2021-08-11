import {useCallback} from 'react';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import AppActions from '../../../../store/actions/AppActions';
import VaultedNoteLocalActions from '../../store/VaultedNoteLocalActions';
import AppEvents from '../../../../events/AppEvents';

const useSendNoteDialogVaultedNoteController = model => {
  const {
    localDispatch,
    dispatch,
    data: {
      localState: {note},
    },
  } = model;

  const sendNoteDialogCancelHandler = useCallback(() => {
    localDispatch(
      VaultedNoteLocalActions.actions.setSendNoteDialogVisibility({
        visible: false,
      }),
    );
  }, [localDispatch]);

  const sendNoteDialogShareNoteViaAppHandler = useCallback(
    ({appType}) => {
      SystemEventsHandler.onInfo({
        info:
          'useSendNoteDialogVaultedNoteController->sendNoteDialogShareNoteViaAppHandler(): ' +
          appType,
      });

      AppEvents.emit(AppEvents.events.OPEN_SHARE_APP);

      dispatch(AppActions.share.actions.shareNoteViaApp({appType, note}));

      localDispatch(
        VaultedNoteLocalActions.actions.setSendNoteDialogVisibility({
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

export default useSendNoteDialogVaultedNoteController;
