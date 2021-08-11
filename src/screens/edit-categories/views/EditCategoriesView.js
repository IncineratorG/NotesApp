import React from 'react';
import {View, StyleSheet} from 'react-native';
import {FAB} from 'react-native-paper';
import EditableCategoriesList from '../../../components/specific/edit-categories/editable-categories-list/EditableCategoriesList';
import EditCategoryDialog from '../../../components/specific/edit-categories/edit-category-dialog/EditCategoryDialog';
import CreateCategoryDialog from '../../../components/specific/edit-categories/create-category-dialog/CreateCategoryDialog';
import RemoveCategoryWarningDialog from '../../../components/specific/edit-categories/remove-category-warning-dialog/RemoveCategoryWarningDialog';

const EditCategoriesView = ({model, controller}) => {
  const {
    data: {
      categoriesList,
      editCategoryDialogVisible,
      editableCategory,
      createCategoryDialogVisible,
      defaultCategoryColor,
      removeCategoryWarningDialogVisible,
      removableCategory,
    },
  } = model;

  const {
    editCategoriesController: {
      addCategoryPressHandler,
      categoriesOrderChangedHandler,
      categoryPressHandler,
      removeCategoryHandler,
    },
    editCategoryDialogController: {
      editCategoryDialogCancelPressHandler,
      editCategoryDialogOkPressHandler,
    },
    createCategoryDialogController: {
      createCategoryDialogCancelPressHandler,
      createCategoryDialogOkPressHandler,
    },
    removeCategoryWarningDialogController: {
      removeCategoryWarningDialogOnCancel,
      removeCategoryWarningDialogRemovePressHandler,
    },
  } = controller;

  const editCategoryDialogComponent = (
    <EditCategoryDialog
      visible={editCategoryDialogVisible}
      category={editableCategory}
      onOkPress={editCategoryDialogOkPressHandler}
      onCancelPress={editCategoryDialogCancelPressHandler}
    />
  );

  const createCategoryDialogComponent = (
    <CreateCategoryDialog
      visible={createCategoryDialogVisible}
      defaultColor={defaultCategoryColor}
      onOkPress={createCategoryDialogOkPressHandler}
      onCancelPress={createCategoryDialogCancelPressHandler}
    />
  );

  const removeCategoryWarningDialog = (
    <RemoveCategoryWarningDialog
      visible={removeCategoryWarningDialogVisible}
      category={removableCategory}
      onCancel={removeCategoryWarningDialogOnCancel}
      onRemove={removeCategoryWarningDialogRemovePressHandler}
    />
  );

  return (
    <View style={styles.mainContainer}>
      <EditableCategoriesList
        categoriesList={categoriesList}
        onOrderChanged={categoriesOrderChangedHandler}
        onCategoryPress={categoryPressHandler}
        onRemove={removeCategoryHandler}
      />
      <FAB style={styles.fab} icon="plus" onPress={addCategoryPressHandler} />
      {editCategoryDialogComponent}
      {createCategoryDialogComponent}
      {removeCategoryWarningDialog}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default React.memo(EditCategoriesView);
