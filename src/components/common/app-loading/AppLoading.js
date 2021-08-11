import React from 'react';
import {View, StyleSheet} from 'react-native';

const AppLoading = () => {
  return <View style={styles.mainContainer} />;
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});

export default React.memo(AppLoading);
