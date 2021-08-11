import React, {useMemo} from 'react';
import {View, Text, TouchableNativeFeedback, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const RepeatOptionsDialogOptionItem = ({text, isSelected, onPress}) => {
  const radioButtonCheckedIcon = useMemo(() => {
    return <Icon name="radio-button-checked" size={24} color={'#018786'} />;
  }, []);
  const radioButtonUncheckedIcon = useMemo(() => {
    return <Icon name="radio-button-unchecked" size={24} color={'grey'} />;
  }, []);

  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={styles.mainContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{text}</Text>
        </View>
        <View style={styles.iconContainer}>
          {isSelected ? radioButtonCheckedIcon : radioButtonUncheckedIcon}
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    minHeight: 50,
    flexDirection: 'row',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {fontSize: 16},
  iconContainer: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default React.memo(RepeatOptionsDialogOptionItem);
