import {useCallback} from 'react';
import NoteLocalActions from '../../store/NoteLocalActions';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Services from '../../../../services/Services';
import NoteImageQuality from '../../../../data/common/note-image-quality/NoteImageQuality';
import AppEvents from '../../../../events/AppEvents';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';

const useSelectImageSourceDialogNoteController = model => {
  const {
    data: {
      noteImageQuality,
      localState: {
        note: {id},
      },
    },
    localDispatch,
  } = model;

  const selectImageSourceDialogCancelPressHandler = useCallback(() => {
    localDispatch(
      NoteLocalActions.actions.setSelectImageSourceDialogVisibility({
        visible: false,
      }),
    );
  }, [localDispatch]);

  const selectImageSourceDialogPickFromGalleryPressHandler = useCallback(() => {
    localDispatch(
      NoteLocalActions.actions.setSelectImageSourceDialogVisibility({
        visible: false,
      }),
    );

    AppEvents.emit(AppEvents.events.OPEN_IMAGE_PICKER);

    const {width, height} = NoteImageQuality.toImageSize(noteImageQuality);

    const options = {
      mediaType: 'photo',
      quality: 1,
      includeBase64: true,
      maxWidth: width,
      maxHeight: height,
    };
    launchImageLibrary(options, async response => {
      if (response && response.assets && response.assets.length > 0) {
        const asset = response.assets[0];
        const base64 = asset.base64;
        const type = asset.type;

        SystemEventsHandler.onInfo({info: 'WIDTH: ' + asset.width});
        SystemEventsHandler.onInfo({info: 'SIZE: ' + asset.fileSize});

        const typedBase64 = 'data:' + type + ';base64,' + base64;

        if (base64) {
          const imageId = await Services.services().notesService.saveNoteImage({
            noteId: id,
            imageBase64String: typedBase64,
          });
          if (imageId) {
            localDispatch(NoteLocalActions.actions.addImage({id: imageId}));
          }
        }
      }
    });
  }, [id, noteImageQuality, localDispatch]);

  const selectImageSourceDialogTakePhotoPressHandler = useCallback(() => {
    localDispatch(
      NoteLocalActions.actions.setSelectImageSourceDialogVisibility({
        visible: false,
      }),
    );
    localDispatch(
      NoteLocalActions.actions.setPhotoCameraActive({
        active: true,
      }),
    );
  }, [localDispatch]);
  // const selectImageSourceDialogTakePhotoPressHandler = useCallback(() => {
  //   localDispatch(
  //     NoteLocalActions.actions.setSelectImageSourceDialogVisibility({
  //       visible: false,
  //     }),
  //   );
  //
  //   AppEvents.emit(AppEvents.events.OPEN_IMAGE_PICKER);
  //
  //   const {width, height} = NoteImageQuality.toImageSize(noteImageQuality);
  //
  //   const options = {
  //     mediaType: 'photo',
  //     quality: 1,
  //     includeBase64: true,
  //     maxWidth: width,
  //     maxHeight: height,
  //     saveToPhotos: false,
  //   };
  //   launchCamera(options, async response => {
  //     if (response && response.assets && response.assets.length > 0) {
  //       const asset = response.assets[0];
  //       const base64 = asset.base64;
  //       const type = asset.type;
  //
  //       SystemEventsHandler.onInfo({info: 'WIDTH: ' + asset.width});
  //       SystemEventsHandler.onInfo({info: 'SIZE: ' + asset.fileSize});
  //
  //       const typedBase64 = 'data:' + type + ';base64,' + base64;
  //
  //       if (base64) {
  //         const imageId = await Services.services().notesService.saveNoteImage({
  //           noteId: id,
  //           imageBase64String: typedBase64,
  //         });
  //         if (imageId) {
  //           localDispatch(NoteLocalActions.actions.addImage({id: imageId}));
  //         }
  //       }
  //     }
  //   });
  // }, [id, noteImageQuality, localDispatch]);

  const photoCameraGoBackPressHandler = useCallback(() => {
    localDispatch(
      NoteLocalActions.actions.setPhotoCameraActive({
        active: false,
      }),
    );
  }, [localDispatch]);

  return {
    selectImageSourceDialogCancelPressHandler,
    selectImageSourceDialogPickFromGalleryPressHandler,
    selectImageSourceDialogTakePhotoPressHandler,
    photoCameraGoBackPressHandler,
  };
};

export default useSelectImageSourceDialogNoteController;
