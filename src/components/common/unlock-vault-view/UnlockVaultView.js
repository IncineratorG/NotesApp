import React, {useState, useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import UnlockingVaultDialog from '../unlocking-vault-dialog/UnlockingVaultDialog';

const UnlockVaultView = ({
  password,
  resetPasswordOptionEnabled,
  onCorrectPasswordEntered,
  onResetPasswordPress,
  onCancelPress,
}) => {
  const [dialogVisible, setDialogVisible] = useState(false);

  const dialogCorrectPasswordEnteredHandler = useCallback(() => {
    setDialogVisible(false);
    if (onCorrectPasswordEntered) {
      onCorrectPasswordEntered();
    }
  }, [onCorrectPasswordEntered]);

  const dialogResetPasswordPressHandler = useCallback(() => {
    setDialogVisible(false);
    if (onResetPasswordPress) {
      onResetPasswordPress();
    }
  }, [onResetPasswordPress]);

  const dialogCancelPressHandler = useCallback(() => {
    setDialogVisible(false);
    if (onCancelPress) {
      onCancelPress();
    }
  }, [onCancelPress]);

  const unlockingVaultDialog = (
    <UnlockingVaultDialog
      visible={dialogVisible}
      resetPasswordOptionEnabled={resetPasswordOptionEnabled}
      password={password}
      onCorrectPasswordEntered={dialogCorrectPasswordEnteredHandler}
      onResetPasswordPress={dialogResetPasswordPressHandler}
      onCancelPress={dialogCancelPressHandler}
    />
  );

  const viewVisibilityCallback = useCallback(() => {
    setDialogVisible(true);
    return () => {
      setDialogVisible(false);
    };
  }, []);
  useFocusEffect(viewVisibilityCallback);

  return <View style={styles.mainContainer}>{unlockingVaultDialog}</View>;
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: 'white',
  },
});

export default React.memo(UnlockVaultView);
