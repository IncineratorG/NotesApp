import React, {useCallback} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import BackupItem from './item/BackupItem';

const BackupItemsList = ({backupsList, onRemovePress, onRestorePress}) => {
  const renderItem = useCallback(
    ({item}) => {
      return (
        <BackupItem
          backupItem={item}
          onRemovePress={onRemovePress}
          onRestorePress={onRestorePress}
        />
      );
    },
    [onRemovePress, onRestorePress],
  );

  const keyExtractor = useCallback(item => {
    return item.driveId;
  }, []);

  return (
    <View style={styles.mainContainer}>
      <FlatList
        style={styles.list}
        showsVerticalScrollIndicator={false}
        data={backupsList}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  itemSeparator: {
    height: 4,
  },
  list: {},
});

export default React.memo(BackupItemsList);
