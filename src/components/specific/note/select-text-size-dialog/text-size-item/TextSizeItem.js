import React, {useMemo, useCallback} from 'react';
import {View, Text, TouchableNativeFeedback, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NoteTextSize from '../../../../../data/common/note-text-size/NoteTextSize';

const TextSizeItem = ({text, textSizeType, isSelected, onPress}) => {
  const onPressHandler = useCallback(() => {
    onPress({textSizeType});
  }, [textSizeType, onPress]);

  const radioButtonCheckedIcon = useMemo(() => {
    return <Icon name="radio-button-checked" size={24} color={'#018786'} />;
  }, []);
  const radioButtonUncheckedIcon = useMemo(() => {
    return <Icon name="radio-button-unchecked" size={24} color={'grey'} />;
  }, []);

  return (
    <TouchableNativeFeedback onPress={onPressHandler}>
      <View style={styles.mainContainer}>
        <View style={styles.checkmarkIconContainer}>
          {isSelected ? radioButtonCheckedIcon : radioButtonUncheckedIcon}
        </View>
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.text,
              {fontSize: NoteTextSize.toFontSize(textSizeType)},
            ]}>
            {text}
          </Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: 50,
    flexDirection: 'row',
  },
  checkmarkIconContainer: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {},
});

export default React.memo(TextSizeItem);
