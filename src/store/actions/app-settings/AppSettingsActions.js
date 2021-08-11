const AppSettingsActions = () => {
  const types = {
    LOAD_APP_SETTINGS: 'ASA_LOAD_APP_SETTINGS',
    LOAD_APP_SETTINGS_BEGIN: 'ASA_LOAD_APP_SETTINGS_BEGIN',
    LOAD_APP_SETTINGS_FINISHED: 'ASA_LOAD_APP_SETTINGS_FINISHED',
    LOAD_APP_SETTINGS_ERROR: 'ASA_LOAD_APP_SETTINGS_ERROR',
    SET_AUTO_TRASH_CLEARING: 'ASA_SET_AUTO_TRASH_CLEARING',
    SET_DEFAULT_NOTE_TEXT_SIZE: 'ASA_SET_DEFAULT_NOTE_TEXT_SIZE',
    SET_MOVE_CHECKED_LIST_ITEMS_TO_BOTTOM:
      'ASA_SET_MOVE_CHECKED_LIST_ITEMS_TO_BOTTOM',
    SET_NOTE_IMAGE_QUALITY: 'ASA_SET_NOTE_IMAGE_QUALITY',
  };

  const loadAppSettings = () => {
    return {
      type: types.LOAD_APP_SETTINGS,
    };
  };

  const loadAppSettingsBegin = () => {
    return {
      type: types.LOAD_APP_SETTINGS_BEGIN,
    };
  };

  const loadAppSettingsFinished = ({appSettings}) => {
    return {
      type: types.LOAD_APP_SETTINGS_FINISHED,
      payload: {appSettings},
    };
  };

  const loadAppSettingsError = () => {
    return {
      type: types.LOAD_APP_SETTINGS_ERROR,
    };
  };

  const setAutoTrashClearing = ({clear}) => {
    return {
      type: types.SET_AUTO_TRASH_CLEARING,
      payload: {clear},
    };
  };

  const setDefaultNoteTextSize = ({noteTextSize}) => {
    return {
      type: types.SET_DEFAULT_NOTE_TEXT_SIZE,
      payload: {noteTextSize},
    };
  };

  const setMoveCheckedListItemsToBottom = ({moveCheckedToBottom}) => {
    return {
      type: types.SET_MOVE_CHECKED_LIST_ITEMS_TO_BOTTOM,
      payload: {moveCheckedToBottom},
    };
  };

  const setNoteImageQuality = ({imageQuality}) => {
    return {
      type: types.SET_NOTE_IMAGE_QUALITY,
      payload: {imageQuality},
    };
  };

  return {
    types,
    actions: {
      loadAppSettings,
      loadAppSettingsBegin,
      loadAppSettingsFinished,
      loadAppSettingsError,
      setAutoTrashClearing,
      setDefaultNoteTextSize,
      setMoveCheckedListItemsToBottom,
      setNoteImageQuality,
    },
  };
};

export default AppSettingsActions;
