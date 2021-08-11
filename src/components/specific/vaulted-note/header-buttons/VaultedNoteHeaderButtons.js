import React from 'react';
import {View, TouchableNativeFeedback, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const VaultedNoteHeaderButtons = ({
  noteIsList,
  noteMenu,
  onMenuPress,
  onPickImagePress,
  onClipToStatusBarPress,
  onChangeCategoryPress,
  onChangeNoteTypePress,
}) => {
  return (
    <View style={styles.mainContainer}>
      {noteMenu}
      <View style={styles.buttonsContainer}>
        <TouchableNativeFeedback onPress={onChangeNoteTypePress}>
          <View style={styles.changeNoteTypeButtonContainer}>
            <Icon
              name={noteIsList ? 'article' : 'format-list-bulleted'}
              size={24}
              color="white"
            />
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback onPress={onChangeCategoryPress}>
          <View style={styles.changeCategoryButtonContainer}>
            <Icon name="palette" size={24} color="white" />
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback onPress={onPickImagePress}>
          <View style={styles.pickImageButtonContainer}>
            <Icon name="image" size={24} color="white" />
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback onPress={onMenuPress}>
          <View style={styles.menuButtonContainer}>
            <Icon name="more-vert" size={24} color="white" />
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: 200,
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  changeNoteTypeButtonContainer: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  changeCategoryButtonContainer: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clipToStatusBarButtonContainer: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickImageButtonContainer: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuButtonContainer: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default React.memo(VaultedNoteHeaderButtons);
