import React, {useCallback, useMemo} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import RecycleBinView from './views/RecycleBinView';
import useRecycleBinModel from './models/useRecycleBinModel';
import useRecycleBinController from './controllers/useRecycleBinController';
import RecycleBinHeaderMenuButton from '../../components/specific/recycle-bin/header-menu-button/RecycleBinHeaderMenuButton';
import RecycleBinHeaderMenu from '../../components/specific/recycle-bin/header-menu/RecycleBinHeaderMenu';
import EmptyRecycleBinView from '../../components/specific/recycle-bin/empty-recycle-bin-view/EmptyRecycleBinView';

const RecycleBin = () => {
  const model = useRecycleBinModel();
  const controller = useRecycleBinController(model);

  const {
    navigation,
    data: {headerMenuVisible, deletedNotesList},
  } = model;

  const {
    headerMenuCloseHandler,
    headerMenuButtonPressHandler,
    headerMenuClearAllHandler,
  } = controller;

  const headerMenuComponent = useMemo(() => {
    return (
      <RecycleBinHeaderMenu
        visible={headerMenuVisible}
        clearAllOptionAvailable={deletedNotesList && deletedNotesList.length}
        onClearAll={headerMenuClearAllHandler}
        onClose={headerMenuCloseHandler}
      />
    );
  }, [
    headerMenuVisible,
    headerMenuCloseHandler,
    headerMenuClearAllHandler,
    deletedNotesList,
  ]);

  const setScreenHeaderBar = useCallback(() => {
    navigation.setOptions({
      headerRight: props => {
        return (
          <RecycleBinHeaderMenuButton
            optionsMenuComponent={headerMenuComponent}
            onPress={headerMenuButtonPressHandler}
          />
        );
      },
    });
  }, [headerMenuComponent, headerMenuButtonPressHandler, navigation]);
  useFocusEffect(setScreenHeaderBar);

  return deletedNotesList && deletedNotesList.length ? (
    <RecycleBinView model={model} controller={controller} />
  ) : (
    <EmptyRecycleBinView />
  );
};

export default React.memo(RecycleBin);
