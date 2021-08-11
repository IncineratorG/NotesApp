import React, {useCallback, useMemo} from 'react';
import {BackHandler} from 'react-native';
import BackupView from './views/BackupView';
import useBackupModel from './models/useBackupModel';
import useBackupRootController from './controllers/useBackupRootController';
import {useFocusEffect} from '@react-navigation/core';
import BackupHeaderMenuButton from '../../components/specific/backup/header-menu-button/BackupHeaderMenuButton';
import BackupHeaderMenu from '../../components/specific/backup/header-menu/BackupHeaderMenu';
import {HeaderBackButton} from '@react-navigation/stack';

const Backup = () => {
  const model = useBackupModel();
  const controller = useBackupRootController(model);

  const {
    backupController: {backButtonPressHandler},
    headerController: {
      headerMenuButtonPressHandler,
      headerMenuCloseHandler,
      headerMenuLogInPressHandler,
      headerMenuLogOutPressHandler,
      headerMenuRefreshPressHandler,
    },
  } = controller;

  const {
    navigation,
    data: {headerMenuVisible, loggedIn},
  } = model;

  const headerMenuComponent = useMemo(() => {
    return (
      <BackupHeaderMenu
        visible={headerMenuVisible}
        isLoggedIn={loggedIn}
        onRefresh={headerMenuRefreshPressHandler}
        onLogOut={headerMenuLogOutPressHandler}
        onLogIn={headerMenuLogInPressHandler}
        onClose={headerMenuCloseHandler}
      />
    );
  }, [
    headerMenuVisible,
    loggedIn,
    headerMenuLogInPressHandler,
    headerMenuLogOutPressHandler,
    headerMenuCloseHandler,
    headerMenuRefreshPressHandler,
  ]);

  const setScreenHeaderBar = useCallback(() => {
    navigation.setOptions({
      headerRight: props => {
        return (
          <BackupHeaderMenuButton
            optionsMenuComponent={headerMenuComponent}
            onPress={headerMenuButtonPressHandler}
          />
        );
      },
      headerLeft: props => {
        return <HeaderBackButton {...props} onPress={backButtonPressHandler} />;
      },
    });
  }, [
    headerMenuComponent,
    headerMenuButtonPressHandler,
    backButtonPressHandler,
    navigation,
  ]);

  useFocusEffect(setScreenHeaderBar);

  const setBackButtonPressHandler = useCallback(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backButtonPressHandler,
    );

    return () => {
      backHandler.remove();
    };
  }, [backButtonPressHandler]);
  useFocusEffect(setBackButtonPressHandler);

  return <BackupView model={model} controller={controller} />;
};

export default React.memo(Backup);
