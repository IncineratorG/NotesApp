import {useCallback} from 'react';
import AppActions from '../../../store/actions/AppActions';

const useNotesOrderingController = model => {
  const {dispatch} = model;

  const noteItemDragEndHandler = useCallback(
    ({data, from, to}) => {
      dispatch(AppActions.notes.actions.swapListItems({from, to, data}));
    },
    [dispatch],
  );

  return {
    noteItemDragEndHandler,
  };
};

export default useNotesOrderingController;
