import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import Services from '../../../../services/Services';
import AppActions from '../../../actions/AppActions';

const ns_openNoteRequestEventHandler = emit => {
  const openNoteRequestEventHandler = ({noteId}) => {
    SystemEventsHandler.onInfo({
      info:
        'ns_openNoteRequestEventHandler->openNoteRequestEventHandler()->NOTE_ID: ' +
        noteId,
    });

    emit(AppActions.notes.actions.setRequestedToOpenNoteId({noteId}));
  };

  Services.services().notesService.addOnOpenNoteRequestListener({
    id: 'ns_openNoteRequestEventHandler',
    handler: openNoteRequestEventHandler,
  });

  return () => {
    SystemEventsHandler.onInfo({
      info: 'ns_openNoteRequestEventHandler->UNSUBSCRIBE',
    });

    Services.services().notesService.removeOnOpenNoteRequestListener({
      id: 'ns_openNoteRequestEventHandler',
    });
  };
};

export default ns_openNoteRequestEventHandler;
