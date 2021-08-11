import {useCallback} from 'react';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import VaultedNoteLocalActions from '../../store/VaultedNoteLocalActions';

const useHeaderVaultedNoteController = model => {
  const {
    data: {
      localState: {
        note: {isList},
      },
    },
    setters: {setNoteMenuVisible},
    localDispatch,
  } = model;

  const changeNoteTypePressHandler = useCallback(() => {
    SystemEventsHandler.onInfo({
      info:
        'useHeaderVaultedNoteController()->changeNoteTypePressHandler(): ' +
        isList,
    });

    localDispatch(
      VaultedNoteLocalActions.actions.changeNoteType({noteIsList: !isList}),
    );
  }, [isList, localDispatch]);

  const changeCategoryPressHandler = useCallback(() => {
    localDispatch(
      VaultedNoteLocalActions.actions.setSelectCategoryDialogVisibility({
        visible: true,
      }),
    );
  }, [localDispatch]);

  const clipToStatusBarPressHandler = useCallback(() => {
    SystemEventsHandler.onInfo({
      info: 'useHeaderVaultedNoteController()->clipToStatusBarPressHandler()',
    });
  }, []);

  const pickImagePressHandler = useCallback(() => {
    localDispatch(
      VaultedNoteLocalActions.actions.setSelectImageSourceDialogVisibility({
        visible: true,
      }),
    );
  }, [localDispatch]);

  const menuPressHandler = useCallback(() => {
    SystemEventsHandler.onInfo({
      info: 'useHeaderVaultedNoteController()->menuPressHandler()',
    });

    setNoteMenuVisible(true);
  }, [setNoteMenuVisible]);

  const menuCloseHandler = useCallback(() => {
    SystemEventsHandler.onInfo({
      info: 'useHeaderVaultedNoteController()->menuCloseHandler()',
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

export default useHeaderVaultedNoteController;
