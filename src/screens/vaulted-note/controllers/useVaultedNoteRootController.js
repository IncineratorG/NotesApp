import useHeaderVaultedNoteController from './header/useHeaderVaultedNoteController';
import useHeaderMenuVaultedNoteController from './header-menu/useHeaderMenuVaultedNoteController';
import useVaultedNoteController from './note/useVaultedNoteController';
import useSelectCategoryDialogVaultedNoteController from './select-category-dialog/useSelectCategoryDialogVaultedNoteController';
import useReminderDialogVaultedNoteController from './reminder-dialog/useReminderDialogVaultedNoteController';
import useSelectTextSizeDialogVaultedNoteController from './select-text-size-dialog/useSelectTextSizeDialogVaultedNoteController';
import useSendNoteDialogVaultedNoteController from './send-note-dialog/useSendNoteDialogVaultedNoteController';
import useImageViewerVaultedNoteController from './image-viewer/useImageViewerVaultedNoteController';
import useSelectImageSourceDialogVaultedNoteController from './select-image-source-dialog/useSelectImageSourceDialogVaultedNoteController';
import useCameraVaultedNoteController from './camera/useCameraVaultedNoteController';
import useRemoveNoteConfirmationDialogVaultedNoteController from './remove-note-confirmation-dialog/useRemoveNoteConfirmationDialogVaultedNoteController';
import useUnlockingVaultDialogVaultedNoteController from './unlocking-vault-dialog/useUnlockingVaultDialogVaultedNoteController';

const useVaultedNoteRootController = model => {
  const headerController = useHeaderVaultedNoteController(model);
  const headerMenuController = useHeaderMenuVaultedNoteController(model);
  const noteController = useVaultedNoteController(model);
  const selectCategoryDialogController = useSelectCategoryDialogVaultedNoteController(
    model,
  );
  const reminderDialogController = useReminderDialogVaultedNoteController(
    model,
  );
  const selectTextSizeDialogController = useSelectTextSizeDialogVaultedNoteController(
    model,
  );
  const sendNoteDialogController = useSendNoteDialogVaultedNoteController(
    model,
  );
  const imageViewerController = useImageViewerVaultedNoteController(model);
  const selectImageSourceDialogController = useSelectImageSourceDialogVaultedNoteController(
    model,
  );
  const cameraController = useCameraVaultedNoteController(model);
  const removeNoteConfirmationDialogController = useRemoveNoteConfirmationDialogVaultedNoteController(
    model,
  );
  const unlockingVaultDialogController = useUnlockingVaultDialogVaultedNoteController(
    model,
  );

  return {
    headerController,
    headerMenuController,
    noteController,
    selectCategoryDialogController,
    reminderDialogController,
    selectTextSizeDialogController,
    sendNoteDialogController,
    imageViewerController,
    selectImageSourceDialogController,
    cameraController,
    removeNoteConfirmationDialogController,
    unlockingVaultDialogController,
  };
};

export default useVaultedNoteRootController;
