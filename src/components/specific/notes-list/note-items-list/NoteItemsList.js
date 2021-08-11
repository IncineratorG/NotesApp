import React, {useCallback} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import NoteItem from './item/NoteItem';

const NoteItemsList = ({
  notesList,
  notesRemindersExpirationObject,
  categoriesList,
  useCompactView,
  onNotePress,
  onNoteRemove,
  onMoveToVault,
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
        <NoteItem
          note={item}
          expired={notesRemindersExpirationObject[item.id]}
          categoriesList={categoriesList}
          useCompactView={useCompactView}
          onNotePress={notePressHandler}
          onNoteRemove={onNoteRemove}
          onMoveToVault={onMoveToVault}
        />
      );
    },
    [
      notesRemindersExpirationObject,
      categoriesList,
      useCompactView,
      notePressHandler,
      onNoteRemove,
      onMoveToVault,
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

export default React.memo(NoteItemsList);
