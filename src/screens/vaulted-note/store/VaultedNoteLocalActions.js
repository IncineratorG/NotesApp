const VaultedNoteLocalActions = () => {
  const types = {
    SET_INITIAL_NOTE_DATA: 'VNLA_SET_INITIAL_NOTE_DATA',
    UPDATE_TITLE_TEXT: 'VNLA_UPDATE_TITLE_TEXT',
    CHANGE_NOTE_TYPE: 'VNLA_CHANGE_NOTE_TYPE',
    CHANGE_NOTE_TEXT: 'VNLA_CHANGE_NOTE_TEXT',
    SET_SELECT_CATEGORY_DIALOG_VISIBILITY:
      'VNLA_SET_SELECT_CATEGORY_DIALOG_VISIBILITY',
    SET_SELECTED_CATEGORY: 'VNLA_SET_SELECTED_CATEGORY',
    SET_REMINDER_DIALOG_VISIBILITY: 'VNLA_SET_REMINDER_DIALOG_VISIBILITY',
    SET_REMINDER_DATE: 'VNLA_SET_REMINDER_DATE',
    CLEAR_REMINDER_DATE: 'VNLA_CLEAR_REMINDER_DATE',
    SET_SELECT_TEXT_SIZE_DIALOG_VISIBILITY:
      'VNLA_SET_SELECT_TEXT_SIZE_DIALOG_VISIBILITY',
    SET_SELECTED_TEXT_SIZE: 'VNLA_SET_SELECTED_TEXT_SIZE',
    CHANGE_MOVE_CHECKED_TO_BOTTOM: 'VNLA_CHANGE_MOVE_CHECKED_TO_BOTTOM',
    SET_SEND_NOTE_DIALOG_VISIBILITY: 'VNLA_SET_SEND_NOTE_DIALOG_VISIBILITY',
    UNDO_CHANGES: 'VNLA_UNDO_CHANGES',
    ADD_IMAGE: 'VNLA_ADD_IMAGE',
    REMOVE_IMAGE: 'VNLA_REMOVE_IMAGE',
    SET_SELECT_IMAGE_SOURCE_DIALOG_VISIBILITY:
      'VNLA_SET_SELECT_IMAGE_SOURCE_DIALOG_VISIBILITY',
    SET_PHOTO_CAMERA_ACTIVE: 'VNLA_SET_PHOTO_CAMERA_ACTIVE',
    SET_REMOVE_NOTE_CONFIRMATION_DIALOG_VISIBILITY:
      'VNLA_SET_REMOVE_NOTE_CONFIRMATION_DIALOG_VISIBILITY',
    SET_REMOVE_NOTE_ID: 'VNLA_SET_REMOVE_NOTE_ID',
  };

  const setInitialNoteData = ({
    id,
    title,
    isList,
    noteText,
    textSize,
    moveCheckedToBottom,
    reminder,
    images,
    deleted,
    vaultedDateTimestamp,
    deleteDateTimestamp,
    creationDateTimestamp,
    updateDateTimestamp,
    categoryId,
    orderPos,
  }) => {
    return {
      type: types.SET_INITIAL_NOTE_DATA,
      payload: {
        id,
        title,
        isList,
        noteText,
        textSize,
        moveCheckedToBottom,
        reminder,
        images,
        deleted,
        vaultedDateTimestamp,
        deleteDateTimestamp,
        creationDateTimestamp,
        updateDateTimestamp,
        categoryId,
        orderPos,
      },
    };
  };

  const updateTitleText = ({title}) => {
    return {
      type: types.UPDATE_TITLE_TEXT,
      payload: {title},
    };
  };

  const changeNoteType = ({noteIsList}) => {
    return {
      type: types.CHANGE_NOTE_TYPE,
      payload: {noteIsList},
    };
  };

  const changeNoteText = ({noteText}) => {
    return {
      type: types.CHANGE_NOTE_TEXT,
      payload: {noteText},
    };
  };

  const setSelectCategoryDialogVisibility = ({visible}) => {
    return {
      type: types.SET_SELECT_CATEGORY_DIALOG_VISIBILITY,
      payload: {visible},
    };
  };

  const setSelectedCategory = ({category}) => {
    return {
      type: types.SET_SELECTED_CATEGORY,
      payload: {category},
    };
  };

  const setReminderDialogVisibility = ({visible}) => {
    return {
      type: types.SET_REMINDER_DIALOG_VISIBILITY,
      payload: {visible},
    };
  };

  const setReminderDate = ({dateInMilliseconds, repeatOption}) => {
    return {
      type: types.SET_REMINDER_DATE,
      payload: {dateInMilliseconds, repeatOption},
    };
  };

  const clearReminderDate = () => {
    return {
      type: types.CLEAR_REMINDER_DATE,
    };
  };

  const setSelectTextSizeDialogVisibility = ({visible}) => {
    return {
      type: types.SET_SELECT_TEXT_SIZE_DIALOG_VISIBILITY,
      payload: {visible},
    };
  };

  const setSelectedTextSize = ({textSizeType}) => {
    return {
      type: types.SET_SELECTED_TEXT_SIZE,
      payload: {textSizeType},
    };
  };

  const setMoveCheckedToBottom = ({moveCheckedToBottom}) => {
    return {
      type: types.CHANGE_MOVE_CHECKED_TO_BOTTOM,
      payload: {moveCheckedToBottom},
    };
  };

  const setSendNoteDialogVisibility = ({visible}) => {
    return {
      type: types.SET_SEND_NOTE_DIALOG_VISIBILITY,
      payload: {visible},
    };
  };

  const undoChanges = () => {
    return {
      type: types.UNDO_CHANGES,
    };
  };

  const addImage = ({id}) => {
    return {
      type: types.ADD_IMAGE,
      payload: {id},
    };
  };

  const removeImage = ({id}) => {
    return {
      type: types.REMOVE_IMAGE,
      payload: {id},
    };
  };

  const setSelectImageSourceDialogVisibility = ({visible}) => {
    return {
      type: types.SET_SELECT_IMAGE_SOURCE_DIALOG_VISIBILITY,
      payload: {visible},
    };
  };

  const setPhotoCameraActive = ({active}) => {
    return {
      type: types.SET_PHOTO_CAMERA_ACTIVE,
      payload: {active},
    };
  };

  const setRemoveNoteConfirmationDialogVisibility = ({visible}) => {
    return {
      type: types.SET_REMOVE_NOTE_CONFIRMATION_DIALOG_VISIBILITY,
      payload: {visible},
    };
  };

  const setRemoveNoteId = ({id}) => {
    return {
      type: types.SET_REMOVE_NOTE_ID,
      payload: {id},
    };
  };

  return {
    types,
    actions: {
      setInitialNoteData,
      updateTitleText,
      changeNoteType,
      changeNoteText,
      setSelectCategoryDialogVisibility,
      setSelectedCategory,
      setReminderDialogVisibility,
      setReminderDate,
      clearReminderDate,
      setSelectTextSizeDialogVisibility,
      setSelectedTextSize,
      setMoveCheckedToBottom,
      setSendNoteDialogVisibility,
      undoChanges,
      addImage,
      removeImage,
      setSelectImageSourceDialogVisibility,
      setPhotoCameraActive,
      setRemoveNoteConfirmationDialogVisibility,
      setRemoveNoteId,
    },
  };
};

export default VaultedNoteLocalActions();
