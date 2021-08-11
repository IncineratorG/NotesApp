import {useCallback} from 'react';
import useAppStateChangeCallback from '../../../../utils/common/hooks/useAppStateChangeCallback';
import Services from '../../../../services/Services';
import AppActions from '../../../../store/actions/AppActions';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';

const useWidgetRequestsHandler = ({dispatch}) => {
  const getRequestedToOpenNoteId = useCallback(async () => {
    const noteToOpenId = await Services.services().notesService.getNoteToOpenId();

    if (noteToOpenId) {
      SystemEventsHandler.onInfo({
        info: 'useWidgetRequestsHandler()->NOTE_TO_OPEN_ID: ' + noteToOpenId,
      });

      dispatch(
        AppActions.notes.actions.setRequestedToOpenNoteId({
          noteId: Number(noteToOpenId),
        }),
      );
    }
  }, [dispatch]);

  useAppStateChangeCallback({
    callback: getRequestedToOpenNoteId,
    runOnGoingToForeground: true,
    runOnAppStart: true,
  });
};

export default useWidgetRequestsHandler;
