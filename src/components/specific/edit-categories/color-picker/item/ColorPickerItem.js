import React, {useCallback} from 'react';
import {View, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Color from '../../../../../utils/common/color/Color';

const ColorPickerItem = ({color, isSelected, onPress}) => {
  const colorPressHandler = useCallback(() => {
    onPress({color});
  }, [color, onPress]);

  return (
    <TouchableWithoutFeedback onPress={colorPressHandler}>
      <View style={styles.mainContainer}>
        <View style={[styles.color, {backgroundColor: color ? color : 'red'}]}>
          {isSelected ? (
            <Icon
              name="done"
              size={24}
              color={Color.visibleOnBackground(color)}
            />
          ) : null}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: 50,
    height: 50,
  },
  color: {
    width: 40,
    height: 40,
    backgroundColor: 'red',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default React.memo(ColorPickerItem);
