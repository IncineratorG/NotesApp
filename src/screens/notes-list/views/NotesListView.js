import React from 'react';
import {View, StyleSheet} from 'react-native';
import {FAB} from 'react-native-paper';
import EmptyNotesListView from '../../../components/specific/notes-list/empty-notes-list-view/EmptyNotesListView';
import NoteItemsList from '../../../components/specific/notes-list/note-items-list/NoteItemsList';
import RemoveNoteConfirmationDialog from '../../../components/specific/notes-list/remove-note-confirmation-dialog/RemoveNoteConfirmationDialog';
import UnlockingVaultDialog from '../../../components/common/unlocking-vault-dialog/UnlockingVaultDialog';
import CreateVaultPasswordDialog from '../../../components/common/create-vault-password-dialog/CreateVaultPasswordDialog';
import ResetVaultPasswordDialog from '../../../components/common/reset-vault-password-dialog/ResetVaultPasswordDialog';

const NotesListView = ({model, controller}) => {
  const {
    data: {
      notesList,
      notesRemindersExpirationObject,
      categoriesList,
      useCompactView,
      selectedCategoryColor,
      noteToRemove,
      removeNoteConfirmationDialogVisible,
      vaultPassword,
      correctVaultPasswordEntered,
      unlockingVaultDialogVisible,
      createVaultPasswordDialogVisible,
      resetVaultPasswordDialogVisible,
    },
  } = model;

  const {notesListController} = controller;
  const {
    addNotePressHandler,
    notePressHandler,
    noteRemoveHandler,
    noteMoveToVaultHandler,
    removeNoteConfirmationDialogRemoveHandler,
    removeNoteConfirmationDialogCancelHandler,
    unlockingVaultDialogCancelHandler,
    unlockingVaultDialogResetPasswordHandler,
    unlockingVaultDialogCorrectPasswordEnteredHandler,
    createVaultPasswordDialogCancelHandler,
    createVaultPasswordDialogPasswordSetHandler,
    resetVaultPasswordDialogCancelHandler,
    resetVaultPasswordDialogResetHandler,
  } = notesListController;

  const noteItemsListComponent =
    notesList && notesList.length > 0 ? (
      <NoteItemsList
        notesList={notesList}
        notesRemindersExpirationObject={notesRemindersExpirationObject}
        categoriesList={categoriesList}
        useCompactView={useCompactView}
        onNotePress={notePressHandler}
        onNoteRemove={noteRemoveHandler}
        onMoveToVault={noteMoveToVaultHandler}
      />
    ) : (
      <EmptyNotesListView />
    );

  const removeNoteConfirmationDialogComponent = (
    <RemoveNoteConfirmationDialog
      visible={removeNoteConfirmationDialogVisible}
      note={noteToRemove}
      onRemove={removeNoteConfirmationDialogRemoveHandler}
      onCancel={removeNoteConfirmationDialogCancelHandler}
    />
  );

  const unlockingVaultDialog = (
    <UnlockingVaultDialog
      visible={unlockingVaultDialogVisible}
      resetPasswordOptionEnabled={true}
      password={vaultPassword}
      onCorrectPasswordEntered={
        unlockingVaultDialogCorrectPasswordEnteredHandler
      }
      onResetPasswordPress={unlockingVaultDialogResetPasswordHandler}
      onCancelPress={unlockingVaultDialogCancelHandler}
    />
  );

  const createVaultPasswordDialog = (
    <CreateVaultPasswordDialog
      visible={createVaultPasswordDialogVisible}
      onNewPasswordSet={createVaultPasswordDialogPasswordSetHandler}
      onCancelPress={createVaultPasswordDialogCancelHandler}
    />
  );

  const resetVaultPasswordDialog = (
    <ResetVaultPasswordDialog
      visible={resetVaultPasswordDialogVisible}
      onResetPress={resetVaultPasswordDialogResetHandler}
      onCancelPress={resetVaultPasswordDialogCancelHandler}
    />
  );

  return (
    <View style={styles.mainContainer}>
      {noteItemsListComponent}
      {removeNoteConfirmationDialogComponent}
      {unlockingVaultDialog}
      {createVaultPasswordDialog}
      {resetVaultPasswordDialog}
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

export default React.memo(NotesListView);
