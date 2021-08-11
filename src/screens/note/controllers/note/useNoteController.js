import {useCallback} from 'react';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import NoteLocalActions from '../../store/NoteLocalActions';
import Services from '../../../../services/Services';

const useNoteController = model => {
  const {
    localDispatch,
    data: {
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

  const noteTitleChangeTextHandler = useCallback(
    titleText => {
      localDispatch(
        NoteLocalActions.actions.updateTitleText({title: titleText}),
      );
    },
    [localDispatch],
  );

  const noteTitleSubmitEditingPressHandler = useCallback(() => {
    SystemEventsHandler.onInfo({
      info: 'useNoteController()->noteTitleSubmitEditingPressHandler()',
    });
  }, []);

  const noteTextChangeTextHandler = useCallback(
    noteText => {
      localDispatch(NoteLocalActions.actions.changeNoteText({noteText}));
    },
    [localDispatch],
  );

  const noteReminderPressHandler = useCallback(() => {
    localDispatch(
      NoteLocalActions.actions.setReminderDialogVisibility({visible: true}),
    );
  }, [localDispatch]);

  const removeReminderPressHandler = useCallback(() => {
    localDispatch(NoteLocalActions.actions.clearReminderDate());
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
        info: 'useNoteController->noteImagePressHandler(): ' + imageId,
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
      info: 'useNoteController->noteImageMoreImagesPressHandler()',
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
          'useNoteController->noteImageRemovePressHandler(): ' +
          imageId +
          ' - ' +
          typeof imageId,
      });

      setRemoveNoteImageConfirmationDialogVisible(true);
      setRemoveImageId(imageId);
    },
    [setRemoveNoteImageConfirmationDialogVisible, setRemoveImageId],
  );
  // const noteImageRemovePressHandler = useCallback(
  //   // eslint-disable-next-line no-shadow
  //   async ({noteId, imageId}) => {
  //     SystemEventsHandler.onInfo({
  //       info: 'useNoteController->noteImageRemovePressHandler(): ' + imageId,
  //     });
  //
  //     await Services.services().notesService.removeNoteImage({
  //       noteId,
  //       imageId,
  //     });
  //     localDispatch(NoteLocalActions.actions.removeImage({id: imageId}));
  //   },
  //   [localDispatch],
  // );

  const removeNoteImageConfirmationDialogRemoveHandler = useCallback(async () => {
    SystemEventsHandler.onInfo({
      info:
        'useNoteController->removeNoteImageConfirmationDialogRemoveHandler(): ' +
        noteId +
        ' - ' +
        removeImageId,
    });

    await Services.services().notesService.removeNoteImage({
      noteId,
      imageId: removeImageId,
    });
    localDispatch(NoteLocalActions.actions.removeImage({id: removeImageId}));

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

export default useNoteController;

// const noteImageMoreImagesPressHandler = useCallback(async () => {
//   SystemEventsHandler.onInfo({
//     info: 'useNoteController->noteImageMoreImagesPressHandler()',
//   });
//
//   let imageViewerInitialIndex = 2;
//   const imageViewerImages = await Promise.all(
//     images.map(async (image, index) => {
//       const imageData = await Services.services().notesService.getNoteImage({
//         noteId,
//         imageId: image,
//       });
//
//       return {url: imageData, imageId: image};
//     }),
//   );
//
//   setImageViewerImages(imageViewerImages);
//   setImageViewerInitialIndex(imageViewerInitialIndex);
//   setImageViewerVisible(true);
// }, [
//   images,
//   noteId,
//   setImageViewerImages,
//   setImageViewerVisible,
//   setImageViewerInitialIndex,
// ]);

// const noteImagePressHandler = useCallback(
//   async ({imageId}) => {
//     SystemEventsHandler.onInfo({
//       info: 'useNoteController->noteImagePressHandler(): ' + imageId,
//     });
//
//     let imageViewerInitialIndex = 0;
//     // const imageViewerImages = await Promise.all(
//     //   images.map(async (image, index) => {
//     //     if (image === imageId) {
//     //       imageViewerInitialIndex = index;
//     //     }
//     //
//     //     const imageData = await Services.services().notesService.getNoteImage(
//     //       {
//     //         noteId,
//     //         imageId: image,
//     //       },
//     //     );
//     //
//     //     return {url: imageData, imageId: image};
//     //   }),
//     // );
//
//     const imageData = await Services.services().notesService.getNoteImage({
//       noteId,
//       imageId,
//     });
//
//     const imagesData = [];
//     for (let i = 0; i < images.length; ++i) {
//       if (images[i] === imageId) {
//         imageViewerInitialIndex = i;
//         imagesData.push({url: imageData, imageId});
//       } else {
//         imagesData.push({url: null, imageId: images[i]});
//       }
//     }
//
//     setImageViewerImages(imagesData);
//     setImageViewerInitialIndex(imageViewerInitialIndex);
//     setImageViewerVisible(true);
//   },
//   [
//     images,
//     noteId,
//     setImageViewerImages,
//     setImageViewerVisible,
//     setImageViewerInitialIndex,
//   ],
// );

// const noteImageViewerRemoveImageHandler = useCallback(
//   async imageId => {
//     SystemEventsHandler.onInfo({
//       info:
//         'useNoteController->noteImageViewerRemoveImageHandler(): ' + imageId,
//     });
//
//     await Services.services().notesService.removeNoteImage({
//       noteId,
//       imageId,
//     });
//     localDispatch(NoteLocalActions.actions.removeImage({id: imageId}));
//
//     // let updatedInitialImageIndex = 0;
//     // let needCloseImageViewer = false;
//     // setImageViewerImages(prevImages => {
//     //   return prevImages.filter((imageData, index) => {
//     //     if (imageData.imageId === imageId) {
//     //       updatedInitialImageIndex = index - 1;
//     //
//     //
//     //       return false;
//     //     }
//     //     return true;
//     //   });
//     // });
//
//     setImageViewerVisible(false);
//     setImageViewerImages([]);
//     setImageViewerInitialIndex(0);
//   },
//   [
//     noteId,
//     localDispatch,
//     setImageViewerVisible,
//     setImageViewerImages,
//     setImageViewerInitialIndex,
//   ],
// );
