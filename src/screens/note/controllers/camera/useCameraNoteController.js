import {useCallback} from 'react';
import NoteLocalActions from '../../store/NoteLocalActions';
import Services from '../../../../services/Services';

const useCameraNoteController = model => {
  const {
    data: {
      localState: {
        note: {id},
      },
    },
    localDispatch,
  } = model;

  const cameraCancelHandler = useCallback(() => {
    localDispatch(
      NoteLocalActions.actions.setPhotoCameraActive({active: false}),
    );
  }, [localDispatch]);

  const cameraPhotoAcceptedHandler = useCallback(
    async ({typedBase64Image}) => {
      if (typedBase64Image) {
        const imageId = await Services.services().notesService.saveNoteImage({
          noteId: id,
          imageBase64String: typedBase64Image,
        });
        if (imageId) {
          localDispatch(NoteLocalActions.actions.addImage({id: imageId}));
        }
      }

      localDispatch(
        NoteLocalActions.actions.setPhotoCameraActive({active: false}),
      );
    },
    [id, localDispatch],
  );

  return {
    cameraCancelHandler,
    cameraPhotoAcceptedHandler,
  };
};

export default useCameraNoteController;
