import {useCallback} from 'react';
import {Alert} from 'react-native';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import Services from '../../../../services/Services';
import NoteLocalActions from '../../store/NoteLocalActions';
import useTranslation from '../../../../utils/common/localization';

const useImageViewerNoteController = model => {
  const {t} = useTranslation();

  const {
    localDispatch,
    data: {
      localState: {
        note: {id: noteId},
      },
      imageViewerImages,
    },
    setters: {
      setImageViewerVisible,
      setImageViewerImages,
      setImageViewerInitialIndex,
      setRemoveNoteImageConfirmationDialogVisible,
      setRemoveImageId,
    },
  } = model;

  const noteImageViewerCancelHandler = useCallback(() => {
    SystemEventsHandler.onInfo({
      info: 'useImageViewerNoteController->noteImageViewerCancelHandler()',
    });
    setImageViewerVisible(false);
  }, [setImageViewerVisible]);

  const noteImageViewerRemoveImageHandler = useCallback(
    async imageId => {
      SystemEventsHandler.onInfo({
        info:
          'useImageViewerNoteController->noteImageViewerRemoveImageHandler(): ' +
          imageId,
      });

      Alert.alert(
        '',
        t('RemoveNoteImageConfirmationDialog_message'),
        [
          {
            text: t('RemoveNoteImageConfirmationDialog_removeButton'),
            onPress: async () => {
              await Services.services().notesService.removeNoteImage({
                noteId,
                imageId,
              });
              localDispatch(
                NoteLocalActions.actions.removeImage({id: imageId}),
              );

              setImageViewerVisible(false);
              setImageViewerImages([]);
              setImageViewerInitialIndex(0);
            },
          },
          {
            text: t('RemoveNoteImageConfirmationDialog_cancelButton'),
            onPress: () => {},
            style: 'cancel',
          },
        ],
        {cancelable: true},
      );

      // setRemoveNoteImageConfirmationDialogVisible(true);
      // setRemoveImageId(imageId);

      // await Services.services().notesService.removeNoteImage({
      //   noteId,
      //   imageId,
      // });
      // localDispatch(NoteLocalActions.actions.removeImage({id: imageId}));
      //
      // setImageViewerVisible(false);
      // setImageViewerImages([]);
      // setImageViewerInitialIndex(0);
    },
    [
      noteId,
      localDispatch,
      setImageViewerVisible,
      setImageViewerImages,
      setImageViewerInitialIndex,
      t,
    ],
  );
  // const noteImageViewerRemoveImageHandler = useCallback(
  //   async imageId => {
  //     SystemEventsHandler.onInfo({
  //       info:
  //         'useImageViewerNoteController->noteImageViewerRemoveImageHandler(): ' +
  //         imageId,
  //     });
  //
  //     await Services.services().notesService.removeNoteImage({
  //       noteId,
  //       imageId,
  //     });
  //     localDispatch(NoteLocalActions.actions.removeImage({id: imageId}));
  //
  //     let currentImageIndex = -1;
  //     const updatedImageViewerImages = imageViewerImages.filter(
  //       (imageData, index) => {
  //         if (imageData.imageId === imageId) {
  //           currentImageIndex = index;
  //           return false;
  //         }
  //         return true;
  //       },
  //     );
  //
  //     if (updatedImageViewerImages.length <= 0) {
  //       setImageViewerVisible(false);
  //       setImageViewerImages([]);
  //       setImageViewerInitialIndex(0);
  //       return;
  //     }
  //
  //     if (currentImageIndex >= updatedImageViewerImages.length) {
  //       currentImageIndex = currentImageIndex - 1;
  //     }
  //
  //     const prevImageIndex = currentImageIndex - 1;
  //     const nextImageIndex = currentImageIndex + 1;
  //     let needLoadPrevImageData = false;
  //     let needLoadCurrentImageData = false;
  //     let needLoadNextImageData = false;
  //
  //     if (
  //       prevImageIndex >= 0 &&
  //       !updatedImageViewerImages[prevImageIndex].url
  //     ) {
  //       needLoadPrevImageData = true;
  //     }
  //     if (!updatedImageViewerImages[currentImageIndex].url) {
  //       needLoadCurrentImageData = true;
  //     }
  //     if (
  //       nextImageIndex < updatedImageViewerImages.length &&
  //       !updatedImageViewerImages[nextImageIndex].url
  //     ) {
  //       needLoadNextImageData = true;
  //     }
  //
  //     if (needLoadPrevImageData) {
  //       updatedImageViewerImages[
  //         prevImageIndex
  //       ].url = await Services.services().notesService.getNoteImage({
  //         noteId,
  //         imageId: updatedImageViewerImages[prevImageIndex].imageId,
  //       });
  //     }
  //     if (needLoadCurrentImageData) {
  //       updatedImageViewerImages[
  //         currentImageIndex
  //       ].url = await Services.services().notesService.getNoteImage({
  //         noteId,
  //         imageId: updatedImageViewerImages[currentImageIndex].imageId,
  //       });
  //     }
  //     if (needLoadNextImageData) {
  //       updatedImageViewerImages[
  //         nextImageIndex
  //       ].url = await Services.services().notesService.getNoteImage({
  //         noteId,
  //         imageId: updatedImageViewerImages[nextImageIndex].imageId,
  //       });
  //     }
  //
  //     // ===
  //     SystemEventsHandler.onInfo({
  //       info:
  //         'useImageViewerNoteController->noteImageViewerRemoveImageHandler()->WILL_SET: ' +
  //         updatedImageViewerImages.length +
  //         ' - ' +
  //         currentImageIndex,
  //     });
  //     // ===
  //
  //     setImageViewerVisible(true);
  //     setImageViewerImages(updatedImageViewerImages);
  //     setImageViewerInitialIndex(currentImageIndex);
  //   },
  //   [
  //     noteId,
  //     localDispatch,
  //     imageViewerImages,
  //     setImageViewerVisible,
  //     setImageViewerImages,
  //     setImageViewerInitialIndex,
  //   ],
  // );

  return {
    noteImageViewerCancelHandler,
    noteImageViewerRemoveImageHandler,
  };
};

export default useImageViewerNoteController;
