import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import Services from '../../../../services/Services';

const ns_noteServiceDisposedEventHandler = emit => {
  const noteServiceDisposedEventHandler = ({noteId}) => {
    emit('CLOSE_CHANNEL');
  };

  const notesService = Services.services().notesService;

  const noteServiceDisposedEventUnsubscribe = notesService.subscribe({
    event: notesService.events.SERVICE_DISPOSED,
    handler: noteServiceDisposedEventHandler,
  });

  return () => {
    SystemEventsHandler.onInfo({
      info: 'ns_noteServiceDisposedEventHandler->UNSUBSCRIBE',
    });

    noteServiceDisposedEventUnsubscribe();
  };
};

export default ns_noteServiceDisposedEventHandler;
