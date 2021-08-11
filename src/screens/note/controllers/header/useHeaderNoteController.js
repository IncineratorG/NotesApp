import {useCallback} from 'react';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import NoteLocalActions from '../../store/NoteLocalActions';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Services from '../../../../services/Services';
import NoteImageQuality from '../../../../data/common/note-image-quality/NoteImageQuality';
import AppEvents from '../../../../events/AppEvents';

// import {DeviceEventEmitter} from 'react-native';

const useHeaderNoteController = model => {
  const {
    data: {
      noteImageQuality,
      localState: {
        note: {id, isList},
      },
    },
    setters: {setNoteMenuVisible},
    localDispatch,
  } = model;

  const changeNoteTypePressHandler = useCallback(() => {
    SystemEventsHandler.onInfo({
      info:
        'useHeaderNoteController()->changeNoteTypePressHandler(): ' + isList,
    });

    localDispatch(
      NoteLocalActions.actions.changeNoteType({noteIsList: !isList}),
    );
  }, [isList, localDispatch]);

  const changeCategoryPressHandler = useCallback(() => {
    localDispatch(
      NoteLocalActions.actions.setSelectCategoryDialogVisibility({
        visible: true,
      }),
    );
  }, [localDispatch]);

  const clipToStatusBarPressHandler = useCallback(() => {
    SystemEventsHandler.onInfo({
      info: 'useHeaderNoteController()->clipToStatusBarPressHandler()',
    });
  }, []);

  const pickImagePressHandler = useCallback(() => {
    localDispatch(
      NoteLocalActions.actions.setSelectImageSourceDialogVisibility({
        visible: true,
      }),
    );
  }, [localDispatch]);
  // const pickImagePressHandler = useCallback(() => {
  //   SystemEventsHandler.onInfo({
  //     info:
  //       'useHeaderNoteController()->pickImagePressHandler(): ' +
  //       noteImageQuality,
  //   });
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
  //   };
  //   launchImageLibrary(options, async response => {
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

  const menuPressHandler = useCallback(() => {
    SystemEventsHandler.onInfo({
      info: 'useHeaderNoteController()->menuPressHandler()',
    });

    setNoteMenuVisible(true);
  }, [setNoteMenuVisible]);

  const menuCloseHandler = useCallback(() => {
    SystemEventsHandler.onInfo({
      info: 'useHeaderNoteController()->menuCloseHandler()',
    });

    setNoteMenuVisible(false);
  }, [setNoteMenuVisible]);

  return {
    changeNoteTypePressHandler,
    changeCategoryPressHandler,
    clipToStatusBarPressHandler,
    pickImagePressHandler,
    menuPressHandler,
    menuCloseHandler,
  };
};

export default useHeaderNoteController;
