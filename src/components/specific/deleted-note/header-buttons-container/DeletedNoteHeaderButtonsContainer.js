import React, {useCallback} from 'react';
import {View, Text, TouchableNativeFeedback, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import useTranslation from '../../../../utils/common/localization';

const DeletedNoteHeaderButtonsContainer = ({onRestore, onDelete}) => {
  const {t} = useTranslation();

  const restorePressHandler = useCallback(() => {
    onRestore();
  }, [onRestore]);

  const deletePressHandler = useCallback(() => {
    onDelete();
  }, [onDelete]);

  return (
    <View style={styles.main}>
      <View style={styles.buttonsContainer}>
        <TouchableNativeFeedback onPress={restorePressHandler}>
          <View style={styles.restoreButtonContainer}>
            <Text style={styles.restoreText}>
              {t('DeletedNote_headerRestoreButton')}
            </Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback onPress={deletePressHandler}>
          <View style={styles.deleteButtonContainer}>
            <Icon name="delete-forever" size={26} color="white" />
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: 150,
  },
  buttonsContainer: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
  },
  restoreButtonContainer: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  restoreText: {
    color: 'white',
    fontWeight: 'bold',
  },
  deleteButtonContainer: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default React.memo(DeletedNoteHeaderButtonsContainer);
