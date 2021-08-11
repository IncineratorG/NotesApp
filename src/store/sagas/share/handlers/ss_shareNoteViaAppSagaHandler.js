import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import Services from '../../../../services/Services';
import NoteToMessageConverter from '../../../../utils/note/note-to-message-converter/NoteToMessageConverter';

function* ss_shareNoteViaAppSagaHandler(action) {
  const {appType, note} = action.payload;

  const noteTextForm = NoteToMessageConverter.convert({note});

  try {
    Services.services().shareService.shareViaApp({appType, text: noteTextForm});
  } catch (e) {
    SystemEventsHandler.onError({
      err: 'ss_shareNoteViaAppSagaHandler()->ERROR: ' + e.toString(),
    });
  }
}

export default ss_shareNoteViaAppSagaHandler;
