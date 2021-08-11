import React, {useCallback} from 'react';
import {View, TouchableNativeFeedback, Text, StyleSheet} from 'react-native';
import useTranslation from '../../../../../../utils/common/localization';

const SelectCategoryDialogCategoriesListItem = ({
  category,
  onCategoryPress,
}) => {
  const {t} = useTranslation();

  const categoryName = category.translation_mark
    ? t(category.translation_mark)
    : category.name;

  const categoryPressHandler = useCallback(() => {
    onCategoryPress({category});
  }, [category, onCategoryPress]);

  return (
    <TouchableNativeFeedback onPress={categoryPressHandler}>
      <View style={styles.mainContainer}>
        <View style={styles.selectMarkContainer} />
        <View style={styles.categoryColorContainer}>
          <View
            style={[styles.categoryColor, {backgroundColor: category.color}]}
          />
        </View>
        <View style={styles.categoryNameContainer}>
          <Text style={styles.categoryName}>{categoryName}</Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    minHeight: 50,
    flexDirection: 'row',
  },
  selectMarkContainer: {
    backgroundColor: 'black',
  },
  categoryColorContainer: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryColor: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: 'green',
  },
  categoryNameContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  categoryName: {
    fontSize: 16,
  },
});

export default React.memo(SelectCategoryDialogCategoriesListItem);
