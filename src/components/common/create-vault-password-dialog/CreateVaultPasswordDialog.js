import React, {useState, useCallback, useRef, useEffect} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {Button, Dialog, Portal} from 'react-native-paper';
import useTranslation from '../../../utils/common/localization';
import {SystemEventsHandler} from '../../../utils/common/system-events-handler/SystemEventsHandler';
import AppStyles from '../../../assets/styles/AppStyles';

const CreateVaultPasswordDialog = ({
  visible,
  onNewPasswordSet,
  onCancelPress,
}) => {
  const {t} = useTranslation();

  const passwordConfirmationDialogRef = useRef(null);

  const [passwordText, setPasswordText] = useState('');
  const [passwordConfirmationText, setPasswordConfirmationText] = useState('');
  const [emptyPasswordError, setEmptyPasswordError] = useState(false);
  const [passwordConfirmationError, setPasswordConfirmationError] = useState(
    false,
  );

  const createPressHandler = useCallback(() => {
    if (!passwordText) {
      setEmptyPasswordError(true);
    } else if (passwordText !== passwordConfirmationText) {
      setPasswordConfirmationError(true);
    } else {
      if (onNewPasswordSet) {
        onNewPasswordSet({password: passwordText});
      }
    }
  }, [passwordText, passwordConfirmationText, onNewPasswordSet]);

  const passwordInputChangeTextHandler = useCallback(text => {
    setEmptyPasswordError(false);
    setPasswordConfirmationError(false);
    setPasswordText(text);
  }, []);

  const passwordInputSubmitEditingPressHandler = useCallback(() => {
    passwordConfirmationDialogRef.current.focus();
  }, []);

  const passwordConfirmationInputChangeTextHandler = useCallback(text => {
    setEmptyPasswordError(false);
    setPasswordConfirmationError(false);
    setPasswordConfirmationText(text);
  }, []);

  const passwordConfirmationInputSubmitEditingPressHandler = useCallback(() => {
    SystemEventsHandler.onInfo({
      info:
        'CreateVaultPasswordDialog->passwordConfirmationInputSubmitEditingPressHandler()',
    });
  }, []);

  useEffect(() => {
    if (!visible) {
      setPasswordText('');
      setPasswordConfirmationText('');
      setEmptyPasswordError(false);
      setPasswordConfirmationError(false);
    }
  }, [visible]);

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
      <Dialog visible={visible} onDismiss={onCancelPress}>
        <Dialog.Title>
          {t('CreateVaultPasswordDialog_dialogTitle')}
        </Dialog.Title>
        <Dialog.Content>
          <View style={styles.mainContainer}>
            <View style={styles.infoMessageContainer}>
              <Text style={styles.infoMessageText}>
                {t('CreateVaultPasswordDialog_infoMessage')}
              </Text>
            </View>
            <View style={styles.passwordInputContainer}>
              <TextInput
                style={{fontSize: 18, color: '#000000'}}
                secureTextEntry={true}
                placeholder={t('CreateVaultPasswordDialog_passwordPlaceholder')}
                defaultValue={passwordText}
                onChangeText={passwordInputChangeTextHandler}
                onSubmitEditing={passwordInputSubmitEditingPressHandler}
              />
              {emptyPasswordErrorComponent}
            </View>
            <View style={styles.underline} />
            <View style={styles.passwordConfirmationInputContainer}>
              <TextInput
                ref={passwordConfirmationDialogRef}
                style={{fontSize: 18, color: '#000000'}}
                secureTextEntry={true}
                placeholder={t(
                  'CreateVaultPasswordDialog_passwordConfirmationPlaceholder',
                )}
                defaultValue={passwordConfirmationText}
                onChangeText={passwordConfirmationInputChangeTextHandler}
                onSubmitEditing={
                  passwordConfirmationInputSubmitEditingPressHandler
                }
              />
              {passwordConfirmationErrorComponent}
            </View>
            <View style={styles.underline} />
            <View style={styles.warningMessageContainer}>
              <Text style={styles.warningMessageText}>
                {t('CreateVaultPasswordDialog_warningMessage')}
              </Text>
            </View>
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={createPressHandler}>
            {t('CreateVaultPasswordDialog_createButton')}
          </Button>
          <Button onPress={onCancelPress}>
            {t('CreateVaultPasswordDialog_cancelButton')}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    minHeight: 240,
    justifyContent: 'center',
  },
  underline: {
    height: 1,
    backgroundColor: 'black',
  },
  infoMessageContainer: {
    minHeight: 70,
    justifyContent: 'center',
  },
  infoMessageText: {
    fontSize: AppStyles.dialogMessageFontSize,
    color: 'grey',
  },
  passwordInputContainer: {
    minHeight: 50,
  },
  passwordConfirmationInputContainer: {
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

export default React.memo(CreateVaultPasswordDialog);
