import React, {useCallback, useState, useEffect} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import EditableCategoriesListItem from './item/EditableCategoriesListItem';
import DraggableFlatList from 'react-native-draggable-flatlist';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';

const EditableCategoriesList = ({
  categoriesList,
  onCategoryPress,
  onOrderChanged,
  onRemove,
}) => {
  const renderItem = useCallback(
    ({item, drag}) => {
      return (
        <EditableCategoriesListItem
          category={item}
          onDragMarkerPress={drag}
          onCategoryPress={onCategoryPress}
          onRemovePress={onRemove}
        />
      );
    },
    [onCategoryPress, onRemove],
  );

  const keyExtractor = useCallback(item => {
    return item.id.toString();
  }, []);

  const dragEndHandler = useCallback(
    ({data, from, to}) => {
      onOrderChanged({updatedCategoriesList: data});
    },
    [onOrderChanged],
  );

  return (
    <View style={styles.mainContainer}>
      <DraggableFlatList
        style={styles.list}
        showsVerticalScrollIndicator={false}
        data={categoriesList}
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
    elevation: 4,
  },
  list: {},
});

export default React.memo(EditableCategoriesList);
