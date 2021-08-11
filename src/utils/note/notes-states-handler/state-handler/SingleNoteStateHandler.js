const SingleNoteStateHandler = () => {
  const limit = 10;
  let currentIndex = -1;
  let noteStates;

  const clear = () => {
    noteStates = Array.from(Array(limit), () => null);
    currentIndex = 0;

    return noteStates;
  };

  const push = ({state}) => {
    ++currentIndex;
    if (currentIndex === limit) {
      currentIndex = 0;
    }

    noteStates[currentIndex] = {...state, updateDateTimestamp: Date.now()};
  };

  const getLast = () => {
    if (!noteStates[currentIndex]) {
      return {lastState: null};
    }

    const lastState = {...noteStates[currentIndex]};
    noteStates[currentIndex] = null;
    --currentIndex;
    if (currentIndex < 0) {
      currentIndex = limit - 1;
    }

    return {lastState};
  };

  return {
    clear,
    push,
    getLast,
  };
};

export default SingleNoteStateHandler;
