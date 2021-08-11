import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SortOptionsMenuItem = ({text, type, checked, active}) => {
  const radioUncheckedIconComponent = (
    <Icon
      name="radio-button-unchecked"
      size={20}
      color={active ? 'grey' : 'lightgrey'}
    />
  );
  const radioCheckedIconComponent = (
    <Icon
      name="radio-button-checked"
      size={20}
      color={active ? '#018786' : 'lightgrey'}
    />
  );
  const checkboxUncheckedIconComponent = (
    <Icon
      name="check-box-outline-blank"
      size={20}
      color={active ? 'grey' : 'lightgrey'}
    />
  );
  const checkboxCheckedIconComponent = (
    <Icon name="check-box" size={20} color={active ? '#018786' : 'lightgrey'} />
  );

  let checkmarkComponent = null;
  if (type === 'radio') {
    if (checked) {
      checkmarkComponent = radioCheckedIconComponent;
    } else {
      checkmarkComponent = radioUncheckedIconComponent;
    }
  } else if (type === 'checkbox') {
    if (checked) {
      checkmarkComponent = checkboxCheckedIconComponent;
    } else {
      checkmarkComponent = checkboxUncheckedIconComponent;
    }
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.textContainer}>
        <Text style={[styles.text, {color: active ? 'black' : 'lightgrey'}]}>
          {text}
        </Text>
      </View>
      <View style={styles.checkmarkContainer}>{checkmarkComponent}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: 40,
    flex: 1,
    // alignSelf: 'stretch',
    // backgroundColor: 'black',
    flexDirection: 'row',
  },
  textContainer: {
    flex: 1,
    alignSelf: 'stretch',
    // backgroundColor: 'red',
    justifyContent: 'center',
    paddingLeft: 4,
  },
  text: {},
  checkmarkContainer: {
    width: 30,
    // backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default React.memo(SortOptionsMenuItem);
