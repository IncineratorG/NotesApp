import {useCallback} from 'react';
import {SystemEventsHandler} from '../../../utils/common/system-events-handler/SystemEventsHandler';
import AppActions from '../../../store/actions/AppActions';

const useSettingsController = model => {
  const {
    dispatch,
    data: {automaticCleaning},
    setters: {
      setTextSizeDialogVisible,
      setDefaultNotesListBehaviorDialogVisible,
      setNoteImageQualityDialogVisible,
    },
  } = model;

  const defaultNoteTextSizePressHandler = useCallback(() => {
    setTextSizeDialogVisible(true);
  }, [setTextSizeDialogVisible]);

  const defaultListBehaviorPressHandler = useCallback(() => {
    setDefaultNotesListBehaviorDialogVisible(true);
  }, [setDefaultNotesListBehaviorDialogVisible]);

  const noteImageQualityPressHandler = useCallback(() => {
    setNoteImageQualityDialogVisible(true);
  }, [setNoteImageQualityDialogVisible]);

  const trashClearingPressHandler = useCallback(() => {
    dispatch(
      AppActions.appSettings.actions.setAutoTrashClearing({
        clear: !automaticCleaning,
      }),
    );
  }, [automaticCleaning, dispatch]);

  const textSizeDialogCancelHandler = useCallback(() => {
    setTextSizeDialogVisible(false);
  }, [setTextSizeDialogVisible]);

  const textSizeDialogTextSizeSelectHandler = useCallback(
    ({textSizeType}) => {
      dispatch(
        AppActions.appSettings.actions.setDefaultNoteTextSize({
          noteTextSize: textSizeType,
        }),
      );
      setTextSizeDialogVisible(false);
    },
    [dispatch, setTextSizeDialogVisible],
  );

  const defaultNotesListBehaviorDialogCancelHandler = useCallback(() => {
    setDefaultNotesListBehaviorDialogVisible(false);
  }, [setDefaultNotesListBehaviorDialogVisible]);

  const defaultNotesListBehaviorDialogChangeMoveCheckedListItemsToBottomHandler = useCallback(
    ({moveCheckedToBottom}) => {
      dispatch(
        AppActions.appSettings.actions.setMoveCheckedListItemsToBottom({
          moveCheckedToBottom,
        }),
      );
      setDefaultNotesListBehaviorDialogVisible(false);
    },
    [setDefaultNotesListBehaviorDialogVisible, dispatch],
  );

  const imageQualityDialogCancelHandler = useCallback(() => {
    setNoteImageQualityDialogVisible(false);
  }, [setNoteImageQualityDialogVisible]);

  const imageQualityDialogImageQualitySelectHandler = useCallback(
    ({imageQualityType}) => {
      dispatch(
        AppActions.appSettings.actions.setNoteImageQuality({
          imageQuality: imageQualityType,
        }),
      );
      setNoteImageQualityDialogVisible(false);
    },
    [setNoteImageQualityDialogVisible, dispatch],
  );

  return {
    defaultNoteTextSizePressHandler,
    defaultListBehaviorPressHandler,
    noteImageQualityPressHandler,
    trashClearingPressHandler,
    textSizeDialogCancelHandler,
    textSizeDialogTextSizeSelectHandler,
    defaultNotesListBehaviorDialogCancelHandler,
    defaultNotesListBehaviorDialogChangeMoveCheckedListItemsToBottomHandler,
    imageQualityDialogCancelHandler,
    imageQualityDialogImageQualitySelectHandler,
  };
};

export default useSettingsController;
