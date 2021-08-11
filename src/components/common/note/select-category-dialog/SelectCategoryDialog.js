import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {Dialog, Portal} from 'react-native-paper';
import SelectCategoryDialogCategoriesList from './categories-list/SelectCategoryDialogCategoriesList';

const SelectCategoryDialog = ({visible, onCategoryPress, onCancel}) => {
  const categoriesList = useSelector(
    state => state.categories.categoriesList.categories,
  );

  const categoriesListComponent = (
    <SelectCategoryDialogCategoriesList
      categoriesList={categoriesList}
      onCategoryPress={onCategoryPress}
    />
  );

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onCancel}>
        <Dialog.Content>
          <View style={styles.mainContainer}>{categoriesListComponent}</View>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: 250,
  },
});

export default React.memo(SelectCategoryDialog);
