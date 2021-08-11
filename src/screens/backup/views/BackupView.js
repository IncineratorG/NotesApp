import React from 'react';
import {View, Button, StyleSheet} from 'react-native';
import useTranslation from '../../../utils/common/localization';
import CreateBackupDialog from '../../../components/specific/backup/create-backup-dialog/CreateBackupDialog';
import ReceivingBackupsDialog from '../../../components/specific/backup/receiving-backups-dialog/ReceivingBackupsDialog';
import BackupItemsList from '../../../components/specific/backup/backup-items-list/BackupItemsList';
import EmptyBackupsListView from '../../../components/specific/backup/empty-backups-list-view/EmptyBackupsListView';
import RemoveBackupConfirmationDialog from '../../../components/specific/backup/remove-backup-confirmation-dialog/RemoveBackupConfirmationDialog';
import RemovingBackupDialog from '../../../components/specific/backup/removing-backup-dialog/RemovingBackupDialog';
import CreatingBackupDialog from '../../../components/specific/backup/creating-backup-dialog/CreatingBackupDialog';
import RestoreFromBackupConfirmationDialog from '../../../components/specific/backup/restore-from-backup-confirmation-dialog/RestoreFromBackupConfirmationDialog';
import RestoringFromBackupDialog from '../../../components/specific/backup/restoring-from-backup-dialog/RestoringFromBackupDialog';

const BackupView = ({model, controller}) => {
  const {t} = useTranslation();

  const {
    data: {
      localState: {
        connected,
        receivingBackupsDialog: {visible: receivingBackupsDialogVisible},
        removeBackupConfirmationDialog: {
          visible: removeBackupConfirmationDialogVisible,
          driveId: removeBackupConfirmationDialogDriveId,
          note: removeBackupConfirmationDialogNote,
          timestamp: removeBackupConfirmationDialogTimestamp,
        },
        removingBackupDialog: {visible: removingBackupDialogVisible},
        creatingBackupDialog: {
          visible: creatingBackupDialogVisible,
          progressText: creatingBackupDialogProgressText,
        },
        restoreFromBackupConfirmationDialog: {
          visible: restoreFromBackupConfirmationDialogVisible,
          driveId: restoreFromBackupConfirmationDialogDriveId,
          note: restoreFromBackupConfirmationDialogNote,
          timestamp: restoreFromBackupConfirmationDialogTimestamp,
        },
        restoringFromBackupDialog: {
          visible: restoringFromBackupDialogVisible,
          progressText: restoringFromBackupDialogProgressText,
        },
      },
      loggedIn,
      createBackupDialogVisible,
      backupNoteText,
      needSaveImages,
      backupInfoAcquiring,
      notesImagesSizeInBytes,
      backupsList,
    },
  } = model;

  const {
    backupController: {
      loginPressHandler,
      openCreateBackupDialogPressHandler,
      receivingBackupDialogCancelPressHandler,
      backupItemRemovePressHandler,
      backupItemRestorePressHandler,
      removeBackupConfirmationDialogCancelHandler,
      removeBackupConfirmationDialogRemoveHandler,
      removingBackupDialogCancelHandler,
      creatingBackupDialogCancelHandler,
      restoreFromBackupConfirmationDialogCancelHandler,
      restoreFromBackupConfirmationDialogRestoreHandler,
      restoringFromBackupDialogCancelHandler,
    },
    createBackupDialogController: {
      createBackupDialogCreateHandler,
      createBackupDialogCancelHandler,
      createBackupDialogChangeBackupNoteTextHandler,
      createBackupDialogSaveImagesPressHandler,
    },
  } = controller;

  const receivingBackupsListDialog = (
    <ReceivingBackupsDialog
      visible={receivingBackupsDialogVisible}
      onCancelPress={receivingBackupDialogCancelPressHandler}
    />
  );

  const createBackupDialog = (
    <CreateBackupDialog
      visible={createBackupDialogVisible}
      backupNoteText={backupNoteText}
      needSaveImages={needSaveImages}
      imagesSizeAcquiring={backupInfoAcquiring}
      imagesSizeInBytes={notesImagesSizeInBytes}
      onNeedSaveImagesChanged={createBackupDialogSaveImagesPressHandler}
      onBackupNoteTextChanged={createBackupDialogChangeBackupNoteTextHandler}
      onCreatePress={createBackupDialogCreateHandler}
      onCancelPress={createBackupDialogCancelHandler}
    />
  );

  const creatingBackupDialog = (
    <CreatingBackupDialog
      visible={creatingBackupDialogVisible}
      progressText={creatingBackupDialogProgressText}
      onCancelPress={creatingBackupDialogCancelHandler}
    />
  );

  const removeBackupConfirmationDialog = (
    <RemoveBackupConfirmationDialog
      visible={removeBackupConfirmationDialogVisible}
      note={removeBackupConfirmationDialogNote}
      timestamp={removeBackupConfirmationDialogTimestamp}
      driveId={removeBackupConfirmationDialogDriveId}
      onRemove={removeBackupConfirmationDialogRemoveHandler}
      onCancel={removeBackupConfirmationDialogCancelHandler}
    />
  );

  const removingBackupDialog = (
    <RemovingBackupDialog
      visible={removingBackupDialogVisible}
      onCancelPress={removingBackupDialogCancelHandler}
    />
  );

  const restoreFromBackupConfirmationDialog = (
    <RestoreFromBackupConfirmationDialog
      visible={restoreFromBackupConfirmationDialogVisible}
      note={restoreFromBackupConfirmationDialogNote}
      timestamp={restoreFromBackupConfirmationDialogTimestamp}
      driveId={restoreFromBackupConfirmationDialogDriveId}
      onRestore={restoreFromBackupConfirmationDialogRestoreHandler}
      onCancel={restoreFromBackupConfirmationDialogCancelHandler}
    />
  );

  const restoringFromBackupDialog = (
    <RestoringFromBackupDialog
      visible={restoringFromBackupDialogVisible}
      progressText={restoringFromBackupDialogProgressText}
      onCancelPress={restoringFromBackupDialogCancelHandler}
    />
  );

  const backupsContent =
    backupsList && backupsList.length ? (
      <BackupItemsList
        backupsList={backupsList}
        onRemovePress={backupItemRemovePressHandler}
        onRestorePress={backupItemRestorePressHandler}
      />
    ) : (
      <EmptyBackupsListView connected={connected} />
    );

  return (
    <View style={styles.mainContainer}>
      <View style={styles.backupsContainer}>{backupsContent}</View>
      <View style={styles.buttonsContainer}>
        <Button
          onPress={
            loggedIn ? openCreateBackupDialogPressHandler : loginPressHandler
          }
          title={
            loggedIn
              ? t('BackupScreen_createBackupButton')
              : t('BackupScreen_logInButton')
          }
        />
      </View>
      {receivingBackupsListDialog}
      {createBackupDialog}
      {creatingBackupDialog}
      {removeBackupConfirmationDialog}
      {removingBackupDialog}
      {restoreFromBackupConfirmationDialog}
      {restoringFromBackupDialog}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  backupsContainer: {
    flex: 1,
    margin: 4,
  },
  buttonsContainer: {
    margin: 4,
  },

  imagesBlock: {
    flex: 1,
  },
  localImageContainer: {
    flex: 1,
    margin: 4,
    borderWidth: 1,
    borderColor: 'black',
  },
  localImage: {
    flex: 1,
  },
  remoteImageContainer: {
    flex: 1,
    margin: 4,
    borderWidth: 1,
    borderColor: 'black',
  },
  remoteImage: {
    flex: 1,
  },
});

export default React.memo(BackupView);
