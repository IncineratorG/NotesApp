import {useCallback} from 'react';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import AppActions from '../../../../store/actions/AppActions';
import NotesListSortTypes from '../../../../data/common/notes-list-sort-types/NotesListSortTypes';

const useSortOptionsMenuNoteListController = model => {
  const {
    data: {useCompactView, groupByCategories},
    setters: {setSortOptionsMenuVisible},
    dispatch,
  } = model;

  const sortOptionsButtonPressHandler = useCallback(() => {
    SystemEventsHandler.onInfo({
      info:
        'useSortOptionsMenuNoteListController()->sortOptionsButtonPressHandler()',
    });

    setSortOptionsMenuVisible(true);
  }, [setSortOptionsMenuVisible]);

  const sortOptionsMenuCloseHandler = useCallback(() => {
    SystemEventsHandler.onInfo({
      info:
        'useSortOptionsMenuNoteListController()->sortOptionsMenuCloseHandler()',
    });

    setSortOptionsMenuVisible(false);
  }, [setSortOptionsMenuVisible]);

  const sortManuallyPressHandler = useCallback(() => {
    SystemEventsHandler.onInfo({
      info:
        'useSortOptionsMenuNoteListController()->sortManuallyPressHandler()',
    });

    dispatch(
      AppActions.notes.actions.changeSortType({
        sortType: NotesListSortTypes.MANUAL,
      }),
    );

    setSortOptionsMenuVisible(false);
  }, [setSortOptionsMenuVisible, dispatch]);

  const sortAlphabeticallyPressHandler = useCallback(() => {
    SystemEventsHandler.onInfo({
      info:
        'useSortOptionsMenuNoteListController()->sortAlphabeticallyPressHandler()',
    });

    dispatch(
      AppActions.notes.actions.changeSortType({
        sortType: NotesListSortTypes.ALPHABETICAL,
      }),
    );

    setSortOptionsMenuVisible(false);
  }, [setSortOptionsMenuVisible, dispatch]);

  const sortByLastUpdateDatePressHandler = useCallback(() => {
    SystemEventsHandler.onInfo({
      info:
        'useSortOptionsMenuNoteListController()->sortByLastUpdateDatePressHandler()',
    });

    dispatch(
      AppActions.notes.actions.changeSortType({
        sortType: NotesListSortTypes.LAST_UPDATE_DATE,
      }),
    );

    setSortOptionsMenuVisible(false);
  }, [setSortOptionsMenuVisible, dispatch]);

  const sortByCreationDatePressHandler = useCallback(() => {
    SystemEventsHandler.onInfo({
      info:
        'useSortOptionsMenuNoteListController()->sortByCreationDatePressHandler()',
    });

    dispatch(
      AppActions.notes.actions.changeSortType({
        sortType: NotesListSortTypes.CREATION_DATE,
      }),
    );

    setSortOptionsMenuVisible(false);
  }, [setSortOptionsMenuVisible, dispatch]);

  const sortByReminderDatePressHandler = useCallback(() => {
    SystemEventsHandler.onInfo({
      info:
        'useSortOptionsMenuNoteListController()->sortByReminderDatePressHandler()',
    });

    dispatch(
      AppActions.notes.actions.changeSortType({
        sortType: NotesListSortTypes.REMINDER_DATE,
      }),
    );

    setSortOptionsMenuVisible(false);
  }, [setSortOptionsMenuVisible, dispatch]);

  const groupByCategoriesPressHandler = useCallback(() => {
    SystemEventsHandler.onInfo({
      info:
        'useSortOptionsMenuNoteListController()->groupByCategoriesPressHandler()',
    });

    dispatch(
      AppActions.notes.actions.setGroupByCategories({
        groupByCategories: !groupByCategories,
      }),
    );

    setSortOptionsMenuVisible(false);
  }, [groupByCategories, setSortOptionsMenuVisible, dispatch]);

  const compactViewPressHandler = useCallback(() => {
    SystemEventsHandler.onInfo({
      info: 'useSortOptionsMenuNoteListController()->compactViewPressHandler()',
    });

    dispatch(
      AppActions.notes.actions.setUseCompactView({
        useCompactView: !useCompactView,
      }),
    );

    setSortOptionsMenuVisible(false);
  }, [setSortOptionsMenuVisible, useCompactView, dispatch]);

  return {
    sortOptionsButtonPressHandler,
    sortOptionsMenuCloseHandler,
    sortManuallyPressHandler,
    sortAlphabeticallyPressHandler,
    sortByLastUpdateDatePressHandler,
    sortByCreationDatePressHandler,
    sortByReminderDatePressHandler,
    groupByCategoriesPressHandler,
    compactViewPressHandler,
  };
};

export default useSortOptionsMenuNoteListController;
