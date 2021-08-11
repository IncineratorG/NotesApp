import React from 'react';
import {View, StyleSheet} from 'react-native';
import {List} from 'react-native-paper';
import useTranslation from '../../../utils/common/localization';

const AboutView = ({model, controller}) => {
  const {t} = useTranslation();

  const {authorPressHandler} = controller;

  return (
    <View style={styles.mainContainer}>
      <List.Section>
        <List.Item
          style={{borderBottomColor: 'lightgrey', borderBottomWidth: 1}}
          title={t('About_versionTitle')}
          description={'1.24'}
        />
        <List.Item
          style={{borderBottomColor: 'lightgrey', borderBottomWidth: 1}}
          title={t('About_authorTitle')}
          description={'Alexander.V.Dorokhov@gmail.com'}
          onPress={authorPressHandler}
        />
      </List.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default React.memo(AboutView);
