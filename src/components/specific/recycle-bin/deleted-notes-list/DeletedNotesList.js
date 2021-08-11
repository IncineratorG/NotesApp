import React, {useCallback} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import DeletedNoteItem from './item/DeletedNoteItem';

const DeletedNotesList = ({notesList, categoriesList, onNotePress}) => {
  const renderItem = useCallback(
    ({item}) => {
      return (
        <DeletedNoteItem
          note={item}
          categoriesList={categoriesList}
          onNotePress={onNotePress}
        />
      );
    },
    [categoriesList, onNotePress],
  );

  const keyExtractor = useCallback((item, index) => {
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

export default React.memo(DeletedNotesList);
