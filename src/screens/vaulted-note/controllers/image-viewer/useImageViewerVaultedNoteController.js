import {useCallback} from 'react';
import {Alert} from 'react-native';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import Services from '../../../../services/Services';
import useTranslation from '../../../../utils/common/localization';
import VaultedNoteLocalActions from '../../store/VaultedNoteLocalActions';

const useImageViewerVaultedNoteController = model => {
  const {t} = useTranslation();

  const {
    localDispatch,
    data: {
      localState: {
        note: {id: noteId},
      },
    },
    setters: {
      setImageViewerVisible,
      setImageViewerImages,
      setImageViewerInitialIndex,
    },
  } = model;

  const noteImageViewerCancelHandler = useCallback(() => {
    SystemEventsHandler.onInfo({
      info:
        'useImageViewerVaultedNoteController->noteImageViewerCancelHandler()',
    });
    setImageViewerVisible(false);
  }, [setImageViewerVisible]);

  const noteImageViewerRemoveImageHandler = useCallback(
    async imageId => {
      SystemEventsHandler.onInfo({
        info:
          'useImageViewerVaultedNoteController->noteImageViewerRemoveImageHandler(): ' +
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
                VaultedNoteLocalActions.actions.removeImage({id: imageId}),
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

  return {
    noteImageViewerCancelHandler,
    noteImageViewerRemoveImageHandler,
  };
};

export default useImageViewerVaultedNoteController;
