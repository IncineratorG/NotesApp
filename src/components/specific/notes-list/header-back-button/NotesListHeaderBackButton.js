import React from 'react';
import {View, TouchableNativeFeedback, StyleSheet} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const NotesListHeaderBackButton = ({onPress}) => {
  return (
    <View style={styles.mainContainer}>
      <TouchableNativeFeedback onPress={onPress}>
        <View style={styles.iconContainer}>
          <MaterialIcon name="arrow-back" size={24} color="white" />
        </View>
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
  iconContainer: {
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default React.memo(NotesListHeaderBackButton);
