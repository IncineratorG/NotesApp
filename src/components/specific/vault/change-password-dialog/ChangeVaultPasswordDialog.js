import React, {useCallback, useState, useEffect, useRef} from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';
import {Dialog, Button, Portal} from 'react-native-paper';
import useTranslation from '../../../../utils/common/localization';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';

const ChangeVaultPasswordDialog = ({
  visible,
  currentPassword,
  onChange,
  onCancel,
}) => {
  const {t} = useTranslation();

  const newPasswordInputRef = useRef(null);
  const newPasswordConfirmationInputRef = useRef(null);

  const [currentPasswordText, setCurrentPasswordText] = useState('');
  const [newPasswordText, setNewPasswordText] = useState('');
  const [
    newPasswordConfirmationText,
    setNewPasswordConfirmationText,
  ] = useState('');
  const [wrongCurrentPasswordError, setWrongCurrentPasswordError] = useState(
    false,
  );
  const [emptyPasswordError, setEmptyPasswordError] = useState(false);
  const [passwordConfirmationError, setPasswordConfirmationError] = useState(
    false,
  );

  const changePasswordHandler = useCallback(() => {
    if (currentPasswordText !== currentPassword) {
      setWrongCurrentPasswordError(true);
    } else if (!newPasswordText) {
      setEmptyPasswordError(true);
    } else if (newPasswordText !== newPasswordConfirmationText) {
      setPasswordConfirmationError(true);
    } else {
      if (onChange) {
        onChange({password: newPasswordText});
      }
    }
  }, [
    currentPasswordText,
    newPasswordText,
    newPasswordConfirmationText,
    currentPassword,
    onChange,
  ]);

  const currentPasswordTextChangeHandler = useCallback(text => {
    setWrongCurrentPasswordError(false);
    setEmptyPasswordError(false);
    setPasswordConfirmationError(false);
    setCurrentPasswordText(text);
  }, []);

  const currentPasswordSubmitEditingPressHandler = useCallback(() => {
    newPasswordInputRef.current.focus();
  }, []);

  const newPasswordTextChangeHandler = useCallback(text => {
    setWrongCurrentPasswordError(false);
    setEmptyPasswordError(false);
    setPasswordConfirmationError(false);
    setNewPasswordText(text);
  }, []);

  const newPasswordSubmitEditingPressHandler = useCallback(() => {
    newPasswordConfirmationInputRef.current.focus();
  }, []);

  const newPasswordConfirmationTextChangeHandler = useCallback(text => {
    setWrongCurrentPasswordError(false);
    setEmptyPasswordError(false);
    setPasswordConfirmationError(false);
    setNewPasswordConfirmationText(text);
  }, []);

  const newPasswordConfirmationSubmitEditingPressHandler = useCallback(() => {
    SystemEventsHandler.onInfo({
      info: 'newPasswordConfirmationSubmitEditingPressHandler()',
    });
  }, []);

  useEffect(() => {
    if (!visible) {
      setCurrentPasswordText('');
      setNewPasswordText('');
      setNewPasswordConfirmationText('');
      setWrongCurrentPasswordError(false);
      setEmptyPasswordError(false);
      setPasswordConfirmationError(false);
    }
  }, [visible]);

  const wrongCurrentPasswordErrorComponent = wrongCurrentPasswordError ? (
    <View style={styles.wrongCurrentPasswordErrorContainer}>
      <Text style={styles.wrongCurrentPasswordErrorText}>
        {t('ChangeVaultPasswordDialog_wrongCurrentPasswordError')}
      </Text>
    </View>
  ) : null;

  const emptyPasswordErrorComponent = emptyPasswordError ? (
    <View style={styles.emptyPasswordErrorContainer}>
      <Text style={styles.emptyPasswordErrorText}>
        {t('CreateVaultPasswordDialog_emptyPasswordError')}
      </Text>
    </View>
  ) : null;

  const passwordConfirmationErrorComponent = passwordConfirmationError ? (
    <View style={styles.passwordConfirmationErrorContainer}>
      <Text style={styles.passwordConfirmationErrorText}>
        {t('CreateVaultPasswordDialog_passwordConfirmationError')}
      </Text>
    </View>
  ) : null;

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onCancel}>
        <Dialog.Title>{t('ChangeVaultPasswordDialog_title')}</Dialog.Title>
        <Dialog.Content>
          <View style={styles.mainContainer}>
            <View style={styles.currentPasswordInputContainer}>
              <TextInput
                style={{fontSize: 18, color: '#000000'}}
                secureTextEntry={true}
                placeholder={t(
                  'ChangeVaultPasswordDialog_currentPasswordPlaceholder',
                )}
                defaultValue={currentPasswordText}
                onChangeText={currentPasswordTextChangeHandler}
                onSubmitEditing={currentPasswordSubmitEditingPressHandler}
              />
              {wrongCurrentPasswordErrorComponent}
            </View>
            <View style={styles.underline} />
            <View style={styles.newPasswordInputContainer}>
              <TextInput
                ref={newPasswordInputRef}
                style={{fontSize: 18, color: '#000000'}}
                secureTextEntry={true}
                placeholder={t(
                  'ChangeVaultPasswordDialog_newPasswordPlaceholder',
                )}
                defaultValue={newPasswordText}
                onChangeText={newPasswordTextChangeHandler}
                onSubmitEditing={newPasswordSubmitEditingPressHandler}
              />
              {emptyPasswordErrorComponent}
            </View>
            <View style={styles.underline} />
            <View style={styles.confirmNewPasswordInputContainer}>
              <TextInput
                ref={newPasswordConfirmationInputRef}
                style={{fontSize: 18, color: '#000000'}}
                secureTextEntry={true}
                placeholder={t(
                  'ChangeVaultPasswordDialog_confirmPasswordPlaceholder',
                )}
                defaultValue={newPasswordConfirmationText}
                onChangeText={newPasswordConfirmationTextChangeHandler}
                onSubmitEditing={
                  newPasswordConfirmationSubmitEditingPressHandler
                }
              />
              {passwordConfirmationErrorComponent}
            </View>
            <View style={styles.underline} />
            <View style={styles.warningMessageContainer}>
              <Text style={styles.warningMessageText}>
                {t('ChangeVaultPasswordDialog_message')}
              </Text>
            </View>
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={changePasswordHandler}>
            {t('ChangeVaultPasswordDialog_okButton')}
          </Button>
          <Button onPress={onCancel}>
            {t('ChangeVaultPasswordDialog_cancelButton')}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    minHeight: 200,
  },
  underline: {
    height: 1,
    backgroundColor: 'black',
  },
  currentPasswordInputContainer: {
    minHeight: 50,
  },
  newPasswordInputContainer: {
    minHeight: 50,
  },
  confirmNewPasswordInputContainer: {
    minHeight: 50,
  },
  warningMessageContainer: {
    minHeight: 70,
    justifyContent: 'center',
  },
  warningMessageText: {
    fontSize: 13,
    color: 'grey',
  },
  wrongCurrentPasswordErrorContainer: {
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
  wrongCurrentPasswordErrorText: {
    color: 'white',
    fontSize: 14,
  },
  emptyPasswordErrorContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -42,
    height: 40,
    backgroundColor: 'black',
    zIndex: 100,
    padding: 4,
    justifyContent: 'center',
    borderTopColor: 'red',
    borderTopWidth: 2,
  },
  emptyPasswordErrorText: {
    color: 'white',
    fontSize: 14,
  },
  passwordConfirmationErrorContainer: {
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
  passwordConfirmationErrorText: {
    color: 'white',
    fontSize: 14,
  },
});

export default React.memo(ChangeVaultPasswordDialog);
