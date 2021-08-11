import React, {useState, useCallback, useEffect} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {Button, Dialog, Portal} from 'react-native-paper';
import useTranslation from '../../../utils/common/localization';

const UnlockingVaultDialog = ({
  visible,
  resetPasswordOptionEnabled,
  password,
  onCorrectPasswordEntered,
  onResetPasswordPress,
  onCancelPress,
}) => {
  const {t} = useTranslation();

  const [passwordText, setPasswordText] = useState('');
  const [wrongPasswordError, setWrongPasswordError] = useState(false);

  const okPressHandler = useCallback(() => {
    if (passwordText === password) {
      onCorrectPasswordEntered();
    } else {
      setWrongPasswordError(true);
    }
  }, [passwordText, password, onCorrectPasswordEntered]);

  const changePasswordTextHandler = useCallback(text => {
    setWrongPasswordError(false);
    setPasswordText(text);
  }, []);

  const onSubmitEditing = useCallback(() => {
    if (passwordText === password) {
      onCorrectPasswordEntered();
    } else {
      setWrongPasswordError(true);
    }
  }, [passwordText, password, onCorrectPasswordEntered]);

  useEffect(() => {
    if (!visible) {
      setPasswordText('');
      setWrongPasswordError(false);
    }
  }, [visible]);

  const wrongPasswordErrorComponent = wrongPasswordError ? (
    <View style={styles.wrongPasswordErrorContainer}>
      <Text style={styles.wrongPasswordErrorText}>
        {t('UnlockingVaultDialog_wrongPasswordError')}
      </Text>
    </View>
  ) : null;

  const resetPasswordButton = resetPasswordOptionEnabled ? (
    <Button onPress={onResetPasswordPress}>
      {t('UnlockingVaultDialog_reset')}
    </Button>
  ) : null;

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onCancelPress}>
        <Dialog.Title>{t('UnlockingVaultDialog_dialogTitle')}</Dialog.Title>
        <Dialog.Content>
          <View style={styles.mainContainer}>
            <View style={styles.passwordInputContainer}>
              <TextInput
                style={{fontSize: 18, color: '#000000'}}
                secureTextEntry={true}
                // autoFocus={true}
                placeholder={t('UnlockingVaultDialog_placeholder')}
                defaultValue={passwordText}
                onChangeText={changePasswordTextHandler}
                onSubmitEditing={onSubmitEditing}
              />
              {wrongPasswordErrorComponent}
            </View>
            <View style={styles.underline} />
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          {resetPasswordButton}
          <View style={{flex: 1}} />
          <Button onPress={okPressHandler}>
            {t('UnlockingVaultDialog_okButton')}
          </Button>
          <Button onPress={onCancelPress}>
            {t('UnlockingVaultDialog_cancelButton')}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    minHeight: 50,
    justifyContent: 'center',
  },
  passwordInputContainer: {
    minHeight: 50,
  },
  underline: {
    height: 1,
    backgroundColor: 'black',
  },
  wrongPasswordErrorContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -42,
    minHeight: 40,
    backgroundColor: 'black',
    zIndex: 100,
    padding: 4,
    justifyContent: 'center',
    borderTopColor: 'red',
    borderTopWidth: 2,
  },
  wrongPasswordErrorText: {
    color: 'white',
    fontSize: 14,
  },
});

export default React.memo(UnlockingVaultDialog);
