import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';

const NotesCache = () => {
  let cachedNotesList = null;
  const cachedNotesMap = new Map();
  let cleared = true;

  const set = ({notesList}) => {
    if (cachedNotesMap.size > 0) {
      SystemEventsHandler.onError({
        err: 'NotesCache->ATTEMPT_TO_CALL_SET_ON_NOT_EMPTY_CACHE',
      });
      return;
    }

    cachedNotesMap.clear();
    notesList.forEach(note => cachedNotesMap.set(note.id, note));

    cleared = false;
  };

  const get = () => {
    return [...cachedNotesMap.values()];
  };

  const updateNote = ({note}) => {
    if (cleared) {
      SystemEventsHandler.onError({
        err: 'NotesCache->updateNote()->ATTEMPT_TO_UPDATE_NOTES_WITHOUT_SET',
      });
      return;
    }
    cachedNotesMap.set(note.id, note);
  };

  const updateMultipleNotes = ({notesList}) => {
    if (cleared) {
      SystemEventsHandler.onError({
        err:
          'NotesCache->updateMultipleNotes()->ATTEMPT_TO_UPDATE_NOTES_WITHOUT_SET',
      });
      return;
    }

    notesList.forEach(note => {
      cachedNotesMap.set(note.id, note);
    });
  };

  const removeNote = ({id}) => {
    cachedNotesMap.delete(id);
  };

  const removeMultipleNotes = ({idsArray}) => {
    idsArray.forEach(id => cachedNotesMap.delete(id));
  };

  const empty = () => {
    return cachedNotesMap.size <= 0;
  };

  const clear = () => {
    cachedNotesMap.clear();
    cleared = true;
  };

  return {
    set,
    get,
    updateNote,
    updateMultipleNotes,
    removeNote,
    removeMultipleNotes,
    empty,
    clear,
  };
};

export default NotesCache;
