import React, {useCallback} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import SelectCategoryDialogCategoriesListItem from './item/SelectCategoryDialogCategoriesListItem';

const SelectCategoryDialogCategoriesList = ({
  categoriesList,
  onCategoryPress,
}) => {
  const renderItem = useCallback(
    ({item}) => {
      return (
        <SelectCategoryDialogCategoriesListItem
          category={item}
          onCategoryPress={onCategoryPress}
        />
      );
    },
    [onCategoryPress],
  );

  const keyExtractor = useCallback(item => {
    return item.id.toString();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <FlatList
        style={styles.list}
        showsVerticalScrollIndicator={false}
        data={categoriesList}
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
  list: {},
});

export default React.memo(SelectCategoryDialogCategoriesList);
