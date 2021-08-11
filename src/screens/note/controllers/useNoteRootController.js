import useHeaderNoteController from './header/useHeaderNoteController';
import useNoteController from './note/useNoteController';
import useSelectCategoryDialogNoteController from './select-category-dialog/useSelectCategoryDialogNoteController';
import useReminderDialogNoteController from './reminder-dialog/useReminderDialogNoteController';
import useHeaderMenuNoteController from './header-menu/useHeaderMenuNoteController';
import useSelectTextSizeDialogNoteController from './select-text-size-dialog/useSelectTextSizeDialogNoteController';
import useSendNoteDialogNoteController from './send-note-dialog/useSendNoteDialogNoteController';
import useImageViewerNoteController from './image-viewer/useImageViewerNoteController';
import useSelectImageSourceDialogNoteController from './select-image-source-dialog/useSelectImageSourceDialogNoteController';
import useCameraNoteController from './camera/useCameraNoteController';

const useNoteRootController = model => {
  const headerController = useHeaderNoteController(model);
  const headerMenuController = useHeaderMenuNoteController(model);
  const noteController = useNoteController(model);
  const selectCategoryDialogController = useSelectCategoryDialogNoteController(
    model,
  );
  const reminderDialogController = useReminderDialogNoteController(model);
  const selectTextSizeDialogController = useSelectTextSizeDialogNoteController(
    model,
  );
  const sendNoteDialogController = useSendNoteDialogNoteController(model);
  const imageViewerController = useImageViewerNoteController(model);
  const selectImageSourceDialogController = useSelectImageSourceDialogNoteController(
    model,
  );
  const cameraController = useCameraNoteController(model);

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
  };
};

export default useNoteRootController;
