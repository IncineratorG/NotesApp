import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const NoteTextTypeMenuItem = ({text}) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{text}</Text>
      </View>
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
});

export default React.memo(NoteTextTypeMenuItem);
