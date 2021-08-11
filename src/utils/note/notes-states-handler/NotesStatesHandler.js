import SingleNoteStateHandler from './state-handler/SingleNoteStateHandler';

const NotesStatesHandler = () => {
  const handlers = new Map();

  const get = id => {
    if (handlers.has(id)) {
      return handlers.get(id);
    } else {
      handlers.set(id, SingleNoteStateHandler());
      return handlers.get(id);
    }
  };

  return {
    get,
  };
};

export default NotesStatesHandler();
