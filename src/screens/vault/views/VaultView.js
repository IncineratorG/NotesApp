import React from 'react';
import {View, StyleSheet} from 'react-native';
import VaultNoteItemsList from '../../../components/specific/vault/note-items-list/VaultNoteItemsList';
import EmptyVaultNotesListView from '../../../components/specific/vault/empty-vault-notes-list-view/EmptyVaultNotesListView';
import {FAB} from 'react-native-paper';
import VaultRemoveNoteConfirmationDialog from '../../../components/specific/vault/remove-note-confirmation-dialog/VaultRemoveNoteConfirmationDialog';

const VaultView = ({model, controller}) => {
  const {
    data: {
      categoriesList,
      selectedCategoryColor,
      localState: {
        vaultedNotesList: {notes: notesList},
        removeNoteConfirmationDialog: {
          visible: removeNoteConfirmationDialogVisible,
        },
      },
    },
  } = model;

  const {
    vaultController: {
      addNotePressHandler,
      notePressHandler,
      noteRemoveHandler,
      noteMoveFromVaultHandler,
      removeNoteConfirmationDialogCancelHandler,
      removeNoteConfirmationDialogRemoveHandler,
    },
  } = controller;

  const noteItemsListComponent =
    notesList && notesList.length > 0 ? (
      <VaultNoteItemsList
        notesList={notesList}
        categoriesList={categoriesList}
        useCompactView={false}
        onNotePress={notePressHandler}
        onNoteRemove={noteRemoveHandler}
        onMoveFromVault={noteMoveFromVaultHandler}
      />
    ) : (
      <EmptyVaultNotesListView />
    );

  const removeNoteConfirmationDialog = (
    <VaultRemoveNoteConfirmationDialog
      visible={removeNoteConfirmationDialogVisible}
      onRemove={removeNoteConfirmationDialogRemoveHandler}
      onCancel={removeNoteConfirmationDialogCancelHandler}
    />
  );

  return (
    <View style={styles.mainContainer}>
      {noteItemsListComponent}
      {removeNoteConfirmationDialog}
      <FAB
        style={[
          styles.fab,
          {
            backgroundColor: selectedCategoryColor,
          },
        ]}
        icon="plus"
        onPress={addNotePressHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default React.memo(VaultView);
