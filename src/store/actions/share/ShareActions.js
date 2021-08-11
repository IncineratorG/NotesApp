const ShareActions = () => {
  const types = {
    SET_SHARE_AVAILABILITY: 'SA_SET_SHARE_AVAILABILITY',
    SHARE_NOTE_VIA_APP: 'SA_SHARE_NOTE_VIA_APP',
  };

  const setShareAvailability = ({shareServiceAvailabilityMap}) => {
    return {
      type: types.SET_SHARE_AVAILABILITY,
      payload: {
        shareServiceAvailabilityMap,
      },
    };
  };

  const shareNoteViaApp = ({appType, note}) => {
    return {
      type: types.SHARE_NOTE_VIA_APP,
      payload: {appType, note},
    };
  };

  return {
    types,
    actions: {
      setShareAvailability,
      shareNoteViaApp,
    },
  };
};

export default ShareActions;
