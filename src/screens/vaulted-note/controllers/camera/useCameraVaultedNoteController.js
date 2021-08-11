import {useCallback} from 'react';
import Services from '../../../../services/Services';
import VaultedNoteLocalActions from '../../store/VaultedNoteLocalActions';

const useCameraVaultedNoteController = model => {
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
      VaultedNoteLocalActions.actions.setPhotoCameraActive({active: false}),
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
          localDispatch(
            VaultedNoteLocalActions.actions.addImage({id: imageId}),
          );
        }
      }

      localDispatch(
        VaultedNoteLocalActions.actions.setPhotoCameraActive({active: false}),
      );
    },
    [id, localDispatch],
  );

  return {
    cameraCancelHandler,
    cameraPhotoAcceptedHandler,
  };
};

export default useCameraVaultedNoteController;
