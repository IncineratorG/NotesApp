import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const NoteListTypeMenuItem = ({text, type, checked}) => {
  let checkboxComponent = null;
  if (type === 'checkbox') {
    if (checked) {
      checkboxComponent = (
        <View style={styles.checkboxContainer}>
          <Icon name="check-box" size={20} color={'#018786'} />
        </View>
      );
    } else {
      checkboxComponent = (
        <View style={styles.checkboxContainer}>
          <Icon name="check-box-outline-blank" size={20} color={'grey'} />
        </View>
      );
    }
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{text}</Text>
      </View>
      {checkboxComponent}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
  },
  textContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    paddingLeft: 4,
  },
  text: {},
  checkboxContainer: {
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default React.memo(NoteListTypeMenuItem);
