import React, {useCallback, useMemo} from 'react';
import NotesListView from './views/NotesListView';
import {useFocusEffect} from '@react-navigation/native';
import {HeaderTitle} from '@react-navigation/stack';
import useNotesListModel from './models/useNotesListModel';
import AppStyles from '../../assets/styles/AppStyles';
import AppMenuButton from '../../components/specific/notes-list/app-menu-button/AppMenuButton';
import SortOptionsMenu from '../../components/specific/notes-list/sort-options-menu/SortOptionsMenu';
import useNotesListRootController from './controllers/useNotesListRootController';
import NotesListHeaderRightButtons from '../../components/specific/notes-list/header-right-buttons/NotesListHeaderRightButtons';
import NotesListHeaderSearchField from '../../components/specific/notes-list/search-field/NotesListHeaderSearchField';
import NotesListHeaderBackButton from '../../components/specific/notes-list/header-back-button/NotesListHeaderBackButton';

const NotesList = () => {
  let setScreenHeaderBar: *;
  const model = useNotesListModel();
  const controller = useNotesListRootController(model);

  const {
    navigation,
    data: {
      sortOptionsMenuVisible,
      sortType,
      useCompactView,
      groupByCategories,
      searchBarVisible,
      searchBarText,
    },
  } = model;

  const {sortOptionsMenuController, headerController} = controller;
  const {
    sortOptionsMenuCloseHandler,
    sortManuallyPressHandler,
    sortAlphabeticallyPressHandler,
    sortByLastUpdateDatePressHandler,
    sortByCreationDatePressHandler,
    sortByReminderDatePressHandler,
    groupByCategoriesPressHandler,
    compactViewPressHandler,
  } = sortOptionsMenuController;

  const {
    appMenuButtonPressHandler,
    sortOptionsButtonPressHandler,
    searchButtonPressHandler,
    searchBarBackButtonPressHandler,
    searchBarClearButtonPressHandler,
    searchBarChangeTextHandler,
  } = headerController;

  const sortOptionsMenuComponent = useMemo(() => {
    return (
      <SortOptionsMenu
        visible={sortOptionsMenuVisible}
        selectedSortOption={sortType}
        groupByCategories={groupByCategories}
        useCompactView={useCompactView}
        onSortManuallyPressed={sortManuallyPressHandler}
        onSortAlphabeticallyPressed={sortAlphabeticallyPressHandler}
        onSortByLastUpdatePressed={sortByLastUpdateDatePressHandler}
        onSortByCreationDatePressed={sortByCreationDatePressHandler}
        onSortByReminderDatePressed={sortByReminderDatePressHandler}
        onGroupByCategoriesPressed={groupByCategoriesPressHandler}
        onCompactViewPressed={compactViewPressHandler}
        onClose={sortOptionsMenuCloseHandler}
      />
    );
  }, [
    sortType,
    groupByCategories,
    useCompactView,
    sortOptionsMenuVisible,
    sortOptionsMenuCloseHandler,
    sortManuallyPressHandler,
    sortAlphabeticallyPressHandler,
    sortByLastUpdateDatePressHandler,
    sortByCreationDatePressHandler,
    sortByReminderDatePressHandler,
    groupByCategoriesPressHandler,
    compactViewPressHandler,
  ]);

  setScreenHeaderBar = useCallback(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: AppStyles.headerColor,
      },
      headerTintColor: AppStyles.headerTextColor,
      headerLeft: props => {
        if (searchBarVisible) {
          return (
            <NotesListHeaderBackButton
              onPress={searchBarBackButtonPressHandler}
            />
          );
        } else {
          return <AppMenuButton onPress={appMenuButtonPressHandler} />;
        }
      },
      headerTitle: props => {
        if (searchBarVisible) {
          return (
            <NotesListHeaderSearchField
              text={searchBarText}
              onChangeText={searchBarChangeTextHandler}
              onClearPress={searchBarClearButtonPressHandler}
            />
          );
        } else {
          return <HeaderTitle {...props} />;
        }
      },
      headerRight: props => {
        return (
          <NotesListHeaderRightButtons
            sortType={sortType}
            searchIconVisible={!searchBarVisible}
            optionsMenuComponent={sortOptionsMenuComponent}
            onSortOptionsPress={sortOptionsButtonPressHandler}
            onSearchPress={searchButtonPressHandler}
          />
        );
      },
    });
  }, [
    navigation,
    searchBarVisible,
    searchBarText,
    appMenuButtonPressHandler,
    sortOptionsButtonPressHandler,
    searchBarBackButtonPressHandler,
    searchButtonPressHandler,
    searchBarClearButtonPressHandler,
    searchBarChangeTextHandler,
    sortOptionsMenuComponent,
    sortType,
  ]);

  useFocusEffect(setScreenHeaderBar);

  return <NotesListView model={model} controller={controller} />;
};

export default React.memo(NotesList);
