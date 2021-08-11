import React, {useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import SwipeableItem from 'react-native-swipeable-item';
import NotesListSortTypes from '../../../../data/common/notes-list-sort-types/NotesListSortTypes';
import DraggableNoteItem from './item/DraggableNoteItem';

const NoteItemsDraggableList = ({
  notesList,
  notesRemindersExpirationObject,
  categoriesList,
  useCompactView,
  sortType,
  onNotePress,
  onNoteRemove,
  onNoteItemDragEnd,
}) => {
  const notePressHandler = useCallback(
    ({note}) => {
      onNotePress({note});
    },
    [onNotePress],
  );

  const noteRemoveHandler = useCallback(
    ({note}) => {
      onNoteRemove({note});
    },
    [onNoteRemove],
  );

  const renderItem = useCallback(
    ({item, drag}) => {
      return (
        <SwipeableItem
          key={item.key}
          item={item}
          activationThreshold={5}
          overSwipe={20}
          snapPointsLeft={[500]}
          onChange={params => {
            if (params && params.open && params.open !== 0) {
              setTimeout(() => {
                noteRemoveHandler({note: item});
              }, 0);
            }
          }}>
          <DraggableNoteItem
            note={item}
            expired={notesRemindersExpirationObject[item.id]}
            categoriesList={categoriesList}
            useCompactView={useCompactView}
            onNotePress={notePressHandler}
            onNoteLongPress={
              sortType === NotesListSortTypes.MANUAL ? drag : null
            }
          />
        </SwipeableItem>
      );
    },
    [
      notesRemindersExpirationObject,
      categoriesList,
      sortType,
      useCompactView,
      notePressHandler,
      noteRemoveHandler,
    ],
  );

  const keyExtractor = useCallback((item, index) => {
    return item.id.toString();
  }, []);

  const dragEndHandler = useCallback(
    ({data, from, to}) => {
      onNoteItemDragEnd({data, from, to});
    },
    [onNoteItemDragEnd],
  );

  return (
    <View style={styles.mainContainer}>
      <DraggableFlatList
        style={styles.list}
        showsVerticalScrollIndicator={false}
        data={notesList}
        layoutInvalidationKey={sortType + notesList.length.toString()}
        autoscrollSpeed={500}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onDragEnd={dragEndHandler}
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

export default React.memo(NoteItemsDraggableList);
