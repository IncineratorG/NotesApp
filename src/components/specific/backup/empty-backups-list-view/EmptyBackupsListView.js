import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import useTranslation from '../../../../utils/common/localization';

const EmptyBackupsListView = ({connected}) => {
  const {t} = useTranslation();

  return (
    <View style={styles.mainContainer}>
      <View style={styles.messageContainer}>
        <Text style={styles.message}>
          {connected
            ? t('EmptyBackupsListView_message')
            : t('EmptyBackupsListView_notConnected')}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageContainer: {},
  message: {
    fontSize: 16,
    color: '#21212166',
  },
});

export default React.memo(EmptyBackupsListView);
