import React, {useMemo} from 'react';
import {View, TouchableNativeFeedback, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ReminderDialogField = ({text, onPress}) => {
  const arrowDropDownIcon = useMemo(() => {
    return <Icon name="arrow-drop-down" size={24} color={'black'} />;
  }, []);

  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={styles.mainContainer}>
        <View style={styles.contentContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{text}</Text>
          </View>
          <View style={styles.iconContainer}>{arrowDropDownIcon}</View>
        </View>
        <View style={styles.underline} />
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  textContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
  },
  iconContainer: {
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  underline: {
    height: 1,
    backgroundColor: 'lightgrey',
  },
});

export default React.memo(ReminderDialogField);
