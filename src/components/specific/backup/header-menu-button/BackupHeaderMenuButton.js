import React from 'react';
import {View, TouchableNativeFeedback, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const BackupHeaderMenuButton = ({optionsMenuComponent, onPress}) => {
  return (
    <View style={styles.mainContainer}>
      {optionsMenuComponent}
      <TouchableNativeFeedback onPress={onPress}>
        <Icon name="more-vert" size={24} color="white" />
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default React.memo(BackupHeaderMenuButton);
