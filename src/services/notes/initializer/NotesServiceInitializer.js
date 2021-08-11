const NotesServiceInitializer = () => {
  const REMOVE_DATE_INTERVAL = 1000 * 60 * 60 * 24 * 21;

  const removeDeletedNotes = ({notesList}) => {
    const currentDateInMilliseconds = Date.now();

    const noteIdsToRemove = [];
    notesList.forEach(note => {
      if (note.deleted) {
        const noteDeletedTimestamp = note.deleteDateTimestamp;
        const millisecondsPassed =
          currentDateInMilliseconds - noteDeletedTimestamp;
        if (millisecondsPassed > REMOVE_DATE_INTERVAL) {
          noteIdsToRemove.push(note.id);
        }
      }
    });

    return noteIdsToRemove;
  };

  const initialize = ({notesList, appSettings}) => {
    let noteIdsToRemove = [];

    const {
      other: {
        trash: {automaticCleaning},
      },
    } = appSettings;
    if (automaticCleaning) {
      noteIdsToRemove = removeDeletedNotes({notesList});
    }

    return {
      noteIdsToRemove,
    };
  };

  return {
    initialize,
  };
};

export default NotesServiceInitializer;
