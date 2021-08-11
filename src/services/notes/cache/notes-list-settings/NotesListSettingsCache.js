const NotesListSettingsCache = () => {
  let cachedNotesListSettings = null;

  const set = ({notesListSettings}) => {
    cachedNotesListSettings = {...notesListSettings};
  };

  const get = () => {
    return cachedNotesListSettings;
  };

  const empty = () => {
    return cachedNotesListSettings === null;
  };

  const clear = () => {
    cachedNotesListSettings = null;
  };

  return {
    set,
    get,
    empty,
    clear,
  };
};

export default NotesListSettingsCache;
