import React, {useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import OrderedNote from './item/OrderedNote';

const OrderedNotesList = ({
  notesList,
  notesRemindersExpirationObject,
  categoriesList,
  useCompactView,
  onNoteItemDragEnd,
}) => {
  const renderItem = useCallback(
    ({item, drag}) => {
      return (
        <OrderedNote
          note={item}
          expired={notesRemindersExpirationObject[item.id]}
          categoriesList={categoriesList}
          useCompactView={useCompactView}
          onNoteLongPress={drag}
        />
      );
    },
    [notesRemindersExpirationObject, categoriesList, useCompactView],
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
        layoutInvalidationKey={notesList.length.toString()}
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

export default React.memo(OrderedNotesList);
