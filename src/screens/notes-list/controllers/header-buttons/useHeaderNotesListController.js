import {useCallback} from 'react';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import AppActions from '../../../../store/actions/AppActions';

const useHeaderNotesListController = model => {
  const {
    navigation,
    dispatch,
    setters: {setSortOptionsMenuVisible, setSearchBarVisible, setSearchBarText},
  } = model;

  const appMenuButtonPressHandler = useCallback(() => {
    SystemEventsHandler.onInfo({
      info: 'useHeaderNotesListController()->appMenuButtonPressHandler()',
    });

    navigation.openDrawer();
  }, [navigation]);

  const sortOptionsButtonPressHandler = useCallback(() => {
    SystemEventsHandler.onInfo({
      info: 'useHeaderNotesListController()->sortOptionsButtonPressHandler()',
    });

    setSortOptionsMenuVisible(true);
  }, [setSortOptionsMenuVisible]);

  const searchButtonPressHandler = useCallback(() => {
    SystemEventsHandler.onInfo({
      info: 'useHeaderNotesListController()->searchButtonPressHandler()',
    });

    setSearchBarVisible(prev => !prev);
  }, [setSearchBarVisible]);

  const searchBarBackButtonPressHandler = useCallback(() => {
    SystemEventsHandler.onInfo({
      info: 'useHeaderNotesListController()->searchBarBackButtonPressHandler()',
    });

    setSearchBarVisible(false);
    setSearchBarText('');
    dispatch(AppActions.notes.actions.clearNoteSearchText());
  }, [setSearchBarVisible, setSearchBarText, dispatch]);

  const searchBarClearButtonPressHandler = useCallback(() => {
    SystemEventsHandler.onInfo({
      info:
        'useHeaderNotesListController()->searchBarClearButtonPressHandler()',
    });

    setSearchBarText('');
    dispatch(AppActions.notes.actions.clearNoteSearchText());
  }, [setSearchBarText, dispatch]);

  const searchBarChangeTextHandler = useCallback(
    text => {
      setSearchBarText(text);
      dispatch(AppActions.notes.actions.setNoteSearchText({text}));
    },
    [setSearchBarText, dispatch],
  );

  return {
    appMenuButtonPressHandler,
    sortOptionsButtonPressHandler,
    searchButtonPressHandler,
    searchBarBackButtonPressHandler,
    searchBarClearButtonPressHandler,
    searchBarChangeTextHandler,
  };
};

export default useHeaderNotesListController;
