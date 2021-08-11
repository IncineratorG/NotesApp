import {useCallback} from 'react';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import Services from '../../../../services/Services';
import VaultedNoteLocalActions from '../../store/VaultedNoteLocalActions';

const useVaultedNoteController = model => {
  const {
    localDispatch,
    navigation,
    data: {
      noteTemplate,
      localState: {
        note: {id: noteId, images},
      },
      removeImageId,
    },
    setters: {
      setSortNoteItemsAlphabetically,
      setRemoveCheckedItems,
      setUncheckAllItems,
      setNoteAsListUndoChanges,
      setImageViewerVisible,
      setImageViewerImages,
      setImageViewerInitialIndex,
      setRemoveNoteImageConfirmationDialogVisible,
      setRemoveImageId,
    },
  } = model;

  const backButtonPressHandler = useCallback(() => {
    SystemEventsHandler.onInfo({
      info: 'useVaultedNoteController()->backButtonPressHandler()',
    });

    localDispatch(
      VaultedNoteLocalActions.actions.setInitialNoteData({
        id: -1,
        title: noteTemplate.title,
        isList: noteTemplate.isList,
        noteText: noteTemplate.noteText,
        textSize: noteTemplate.textSize,
        moveCheckedToBottom: noteTemplate.moveCheckedToBottom,
        reminder: {...noteTemplate.reminder},
        images: [...noteTemplate.images],
        deleted: noteTemplate.deleted,
        deleteDateTimestamp: noteTemplate.deleteDateTimestamp,
        creationDateTimestamp: noteTemplate.creationDateTimestamp,
        updateDateTimestamp: noteTemplate.updateDateTimestamp,
        categoryId: noteTemplate.category.id,
        orderPos: noteTemplate.orderPos,
      }),
    );
    navigation.goBack();

    return true;
  }, [noteTemplate, localDispatch, navigation]);

  const noteTitleChangeTextHandler = useCallback(
    titleText => {
      localDispatch(
        VaultedNoteLocalActions.actions.updateTitleText({title: titleText}),
      );
    },
    [localDispatch],
  );

  const noteTitleSubmitEditingPressHandler = useCallback(() => {
    SystemEventsHandler.onInfo({
      info: 'useVaultedNoteController()->noteTitleSubmitEditingPressHandler()',
    });
  }, []);

  const noteTextChangeTextHandler = useCallback(
    noteText => {
      localDispatch(VaultedNoteLocalActions.actions.changeNoteText({noteText}));
    },
    [localDispatch],
  );

  const noteReminderPressHandler = useCallback(() => {
    localDispatch(
      VaultedNoteLocalActions.actions.setReminderDialogVisibility({
        visible: true,
      }),
    );
  }, [localDispatch]);

  const removeReminderPressHandler = useCallback(() => {
    localDispatch(VaultedNoteLocalActions.actions.clearReminderDate());
  }, [localDispatch]);

  const noteItemsSortedHandler = useCallback(() => {
    setSortNoteItemsAlphabetically(false);
  }, [setSortNoteItemsAlphabetically]);

  const noteCheckedItemsRemovedHandler = useCallback(() => {
    setRemoveCheckedItems(false);
  }, [setRemoveCheckedItems]);

  const noteAsListChangesUndoneHandler = useCallback(() => {
    setNoteAsListUndoChanges(false);
  }, [setNoteAsListUndoChanges]);

  const allNoteItemsUncheckedHandler = useCallback(() => {
    setUncheckAllItems(false);
  }, [setUncheckAllItems]);

  const noteImagePressHandler = useCallback(
    async ({imageId}) => {
      SystemEventsHandler.onInfo({
        info: 'useVaultedNoteController->noteImagePressHandler(): ' + imageId,
      });

      let initialImageIndex = 0;
      const imagesData = images.map((id, index) => {
        if (id === imageId) {
          initialImageIndex = index;
        }

        return {url: null, imageId: id};
      });
      const prevImageIndex = initialImageIndex - 1;
      const nextImageIndex = initialImageIndex + 1;

      // Загружаем выбранное изображение.
      imagesData[
        initialImageIndex
      ].url = await Services.services().notesService.getNoteImage({
        noteId,
        imageId: imagesData[initialImageIndex].imageId,
      });
      // Загружаем предидущее изображение.
      if (prevImageIndex >= 0) {
        imagesData[
          prevImageIndex
        ].url = await Services.services().notesService.getNoteImage({
          noteId,
          imageId: imagesData[prevImageIndex].imageId,
        });
      }
      // Загружаем следующее изображение.
      if (nextImageIndex < imagesData.length) {
        imagesData[
          nextImageIndex
        ].url = await Services.services().notesService.getNoteImage({
          noteId,
          imageId: imagesData[nextImageIndex].imageId,
        });
      }

      setImageViewerImages(imagesData);
      setImageViewerInitialIndex(initialImageIndex);
      setImageViewerVisible(true);
    },
    [
      images,
      noteId,
      setImageViewerImages,
      setImageViewerVisible,
      setImageViewerInitialIndex,
    ],
  );

  const noteImageMoreImagesPressHandler = useCallback(async () => {
    SystemEventsHandler.onInfo({
      info: 'useVaultedNoteController->noteImageMoreImagesPressHandler()',
    });

    let initialImageIndex = 2;
    const imagesData = images.map((id, index) => {
      return {url: null, imageId: id};
    });
    const prevImageIndex = initialImageIndex - 1;
    const nextImageIndex = initialImageIndex + 1;

    // Загружаем выбранное изображение.
    imagesData[
      initialImageIndex
    ].url = await Services.services().notesService.getNoteImage({
      noteId,
      imageId: imagesData[initialImageIndex].imageId,
    });
    // Загружаем предидущее изображение.
    if (prevImageIndex >= 0) {
      imagesData[
        prevImageIndex
      ].url = await Services.services().notesService.getNoteImage({
        noteId,
        imageId: imagesData[prevImageIndex].imageId,
      });
    }
    // Загружаем следующее изображение.
    if (nextImageIndex < imagesData.length) {
      imagesData[
        nextImageIndex
      ].url = await Services.services().notesService.getNoteImage({
        noteId,
        imageId: imagesData[nextImageIndex].imageId,
      });
    }

    setImageViewerImages(imagesData);
    setImageViewerInitialIndex(initialImageIndex);
    setImageViewerVisible(true);
  }, [
    images,
    noteId,
    setImageViewerImages,
    setImageViewerVisible,
    setImageViewerInitialIndex,
  ]);

  const noteImageRemovePressHandler = useCallback(
    // eslint-disable-next-line no-shadow
    ({noteId, imageId}) => {
      SystemEventsHandler.onInfo({
        info:
          'useVaultedNoteController->noteImageRemovePressHandler(): ' +
          imageId +
          ' - ' +
          typeof imageId,
      });

      setRemoveNoteImageConfirmationDialogVisible(true);
      setRemoveImageId(imageId);
    },
    [setRemoveNoteImageConfirmationDialogVisible, setRemoveImageId],
  );

  const removeNoteImageConfirmationDialogRemoveHandler = useCallback(async () => {
    SystemEventsHandler.onInfo({
      info:
        'useVaultedNoteController->removeNoteImageConfirmationDialogRemoveHandler(): ' +
        noteId +
        ' - ' +
        removeImageId,
    });

    await Services.services().notesService.removeNoteImage({
      noteId,
      imageId: removeImageId,
    });
    localDispatch(
      VaultedNoteLocalActions.actions.removeImage({id: removeImageId}),
    );

    setRemoveNoteImageConfirmationDialogVisible(false);
  }, [
    noteId,
    removeImageId,
    setRemoveNoteImageConfirmationDialogVisible,
    localDispatch,
  ]);

  const removeNoteImageConfirmationDialogCancelHandler = useCallback(() => {
    setRemoveNoteImageConfirmationDialogVisible(false);
    setRemoveImageId('');
  }, [setRemoveNoteImageConfirmationDialogVisible, setRemoveImageId]);

  return {
    backButtonPressHandler,
    noteTitleChangeTextHandler,
    noteTitleSubmitEditingPressHandler,
    noteTextChangeTextHandler,
    noteReminderPressHandler,
    removeReminderPressHandler,
    noteItemsSortedHandler,
    noteCheckedItemsRemovedHandler,
    noteAsListChangesUndoneHandler,
    allNoteItemsUncheckedHandler,
    noteImagePressHandler,
    noteImageMoreImagesPressHandler,
    noteImageRemovePressHandler,
    removeNoteImageConfirmationDialogRemoveHandler,
    removeNoteImageConfirmationDialogCancelHandler,
  };
};

export default useVaultedNoteController;
