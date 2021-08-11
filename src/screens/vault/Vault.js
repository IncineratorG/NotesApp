import React, {useCallback, useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import {useFocusEffect} from '@react-navigation/core';
import VaultView from './views/VaultView';
import useVaultModel from './models/useVaultModel';
import useVaultRootController from './controllers/useVaultRootController';
import VaultHeaderMenu from '../../components/specific/vault/header-menu/VaultHeaderMenu';
import VaultHeaderMenuButton from '../../components/specific/vault/header-menu-button/VaultHeaderMenuButton';
import ChangeVaultPasswordDialog from '../../components/specific/vault/change-password-dialog/ChangeVaultPasswordDialog';
import UnlockVaultView from '../../components/common/unlock-vault-view/UnlockVaultView';

const Vault = () => {
  const model = useVaultModel();
  const controller = useVaultRootController(model);

  const {
    navigation,
    data: {
      headerMenuVisible,
      changePasswordDialogVisible,
      vaultPassword,
      vaultLocked,
    },
  } = model;

  const {
    headerController: {
      headerMenuButtonPressHandler,
      headerMenuCloseHandler,
      headerMenuChangePasswordHandler,
      headerMenuExitHandler,
    },
    changeVaultPasswordController: {
      changeVaultPasswordDialogChangePasswordHandler,
      changeVaultPasswordDialogCancelHandler,
    },
    vaultController: {
      unlockingVaultDialogCancelPressHandler,
      unlockingVaultDialogCorrectPasswordEnteredHandler,
    },
  } = controller;

  const headerMenuComponent = useMemo(() => {
    return (
      <VaultHeaderMenu
        visible={headerMenuVisible}
        onChangePassword={headerMenuChangePasswordHandler}
        onExit={headerMenuExitHandler}
        onClose={headerMenuCloseHandler}
      />
    );
  }, [
    headerMenuVisible,
    headerMenuChangePasswordHandler,
    headerMenuExitHandler,
    headerMenuCloseHandler,
  ]);

  const changePasswordDialog = (
    <ChangeVaultPasswordDialog
      visible={changePasswordDialogVisible}
      currentPassword={vaultPassword}
      onChange={changeVaultPasswordDialogChangePasswordHandler}
      onCancel={changeVaultPasswordDialogCancelHandler}
    />
  );

  const setScreenHeaderBar = useCallback(() => {
    navigation.setOptions({
      headerRight: props => {
        return (
          <VaultHeaderMenuButton
            optionsMenuComponent={headerMenuComponent}
            onPress={headerMenuButtonPressHandler}
          />
        );
      },
    });
  }, [headerMenuComponent, headerMenuButtonPressHandler, navigation]);
  useFocusEffect(setScreenHeaderBar);

  if (vaultLocked) {
    return (
      <UnlockVaultView
        password={vaultPassword}
        resetPasswordOptionEnabled={false}
        onCorrectPasswordEntered={
          unlockingVaultDialogCorrectPasswordEnteredHandler
        }
        onResetPasswordPress={null}
        onCancelPress={unlockingVaultDialogCancelPressHandler}
      />
    );
  } else {
    return (
      <View style={styles.mainContainer}>
        <VaultView model={model} controller={controller} />
        {changePasswordDialog}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});

export default React.memo(Vault);
