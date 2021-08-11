import React, {useCallback} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import VaultNoteItem from './item/VaultNoteItem';

const VaultNoteItemsList = ({
  notesList,
  categoriesList,
  useCompactView,
  onNotePress,
  onNoteRemove,
  onMoveFromVault,
}) => {
  const notePressHandler = useCallback(
    ({note}) => {
      onNotePress({note});
    },
    [onNotePress],
  );

  const renderItem = useCallback(
    ({item}) => {
      return (
        <VaultNoteItem
          note={item}
          categoriesList={categoriesList}
          useCompactView={useCompactView}
          onNotePress={notePressHandler}
          onNoteRemove={onNoteRemove}
          onMoveFromVault={onMoveFromVault}
        />
      );
    },
    [
      categoriesList,
      useCompactView,
      notePressHandler,
      onNoteRemove,
      onMoveFromVault,
    ],
  );

  const keyExtractor = useCallback(item => {
    return item.id.toString();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <FlatList
        style={styles.list}
        showsVerticalScrollIndicator={false}
        data={notesList}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: 4,
    paddingLeft: 4,
    paddingRight: 4,
  },
  list: {},
});

export default React.memo(VaultNoteItemsList);
