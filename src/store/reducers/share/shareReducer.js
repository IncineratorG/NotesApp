import AppActions from '../../actions/AppActions';

const initialState = {
  availability: {
    checking: false,
    checkingError: {
      hasError: false,
      description: '',
    },
    shareServiceAvailabilityMap: new Map(),
  },
};

const shareReducer = (state = initialState, action) => {
  switch (action.type) {
    case AppActions.share.types.SET_SHARE_AVAILABILITY: {
      return {
        ...state,
        availability: {
          ...state.availability,
          checking: false,
          checkingError: {
            hasError: false,
            description: '',
          },
          shareServiceAvailabilityMap: new Map(
            action.payload.shareServiceAvailabilityMap,
          ),
        },
      };
    }

    default: {
      return state;
    }
  }
};

export default shareReducer;
