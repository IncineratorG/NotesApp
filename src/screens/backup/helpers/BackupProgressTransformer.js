import Services from '../../../services/Services';

const BackupProgressTransformer = () => {
  const backupService = Services.services().backupService;

  const preparingDataStage =
    backupService.constants.createBackupTaskStagesTypes.PREPARING_DATA_STAGE;
  const savingAppSettingsStage =
    backupService.constants.createBackupTaskStagesTypes
      .SAVING_APP_SETTINGS_STAGE;
  const savingNotesTextStage =
    backupService.constants.createBackupTaskStagesTypes.SAVING_NOTES_TEXT_STAGE;
  const savingNotesImagesStage =
    backupService.constants.createBackupTaskStagesTypes
      .SAVING_NOTES_IMAGES_STAGE;

  const preparingBackupDataStage =
    backupService.constants.restoreFromBackupTaskStagesTypes
      .PREPARING_BACKUP_DATA_STAGE;
  const restoringAppSettingsStage =
    backupService.constants.restoreFromBackupTaskStagesTypes
      .RESTORING_APP_SETTINGS_STAGE;
  const restoringNotesTextStage =
    backupService.constants.restoreFromBackupTaskStagesTypes
      .RESTORING_NOTES_TEXT_STAGE;
  const restoringNotesImagesStage =
    backupService.constants.restoreFromBackupTaskStagesTypes
      .RESTORING_NOTES_IMAGES_STAGE;
  const finishingStage =
    backupService.constants.restoreFromBackupTaskStagesTypes.FINISHING_STAGE;

  const simpleProgressType = backupService.constants.taskProgressTypes.SIMPLE;
  const complexProgressType = backupService.constants.taskProgressTypes.COMPLEX;

  const toText = ({
    t,
    stageType,
    stageDescription,
    currentProgressItem,
    totalProgressItems,
  }) => {
    let progressText = '';

    switch (stageDescription) {
      case preparingDataStage: {
        progressText = t('progressStagePreparingData');
        break;
      }

      case savingAppSettingsStage: {
        progressText = t('progressStageSavingAppSettings');
        break;
      }

      case savingNotesTextStage: {
        progressText = t('progressStageSavingNotesText');
        break;
      }

      case savingNotesImagesStage: {
        progressText = t('progressStageSavingNotesImages');
        break;
      }

      case preparingBackupDataStage: {
        progressText = t('progressStagePreparingBackupData');
        break;
      }

      case restoringAppSettingsStage: {
        progressText = t('progressStageRestoringAppSettings');
        break;
      }

      case restoringNotesTextStage: {
        progressText = t('progressStageRestoringNotesText');
        break;
      }

      case restoringNotesImagesStage: {
        progressText = t('progressStageRestoringNotesImages');
        break;
      }

      case finishingStage: {
        progressText = t('progressStageRestoringFinishing');
        break;
      }

      default: {
        progressText = t('progressStageDefault');
      }
    }

    if (stageType === complexProgressType) {
      const currentProgressItemNumber = Number(currentProgressItem);
      const totalProgressItemsNumber = Number(totalProgressItems);
      if (currentProgressItem >= 0 && totalProgressItems >= 0) {
        progressText =
          progressText +
          ': ' +
          currentProgressItemNumber +
          ' ' +
          t('progressStageFromSentencePart') +
          ' ' +
          totalProgressItemsNumber;
      }
    }

    return progressText;
  };

  return {
    toText,
  };
};

export default BackupProgressTransformer();
