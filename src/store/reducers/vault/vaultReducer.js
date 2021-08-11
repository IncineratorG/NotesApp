import AppActions from '../../actions/AppActions';

const initialState = {
  vaultPassword: null,
  correctPasswordEntered: false,
  loading: {
    inProgress: false,
    error: {
      hasError: false,
      code: '',
      message: '',
    },
  },
};

const vaultReducer = (state = initialState, action) => {
  switch (action.type) {
    case AppActions.vault.types.LOAD_VAULT_PASSWORD_BEGIN: {
      return {
        ...state,
        loading: {
          ...state.loading,
          inProgress: true,
          error: {
            ...state.loading.error,
            hasError: false,
            code: '',
            message: '',
          },
        },
      };
    }

    case AppActions.vault.types.LOAD_VAULT_PASSWORD_FINISHED: {
      return {
        ...state,
        vaultPassword: action.payload.password,
        loading: {
          ...state.loading,
          inProgress: false,
          error: {
            ...state.loading.error,
            hasError: false,
            code: '',
            message: '',
          },
        },
      };
    }

    case AppActions.vault.types.LOAD_VAULT_PASSWORD_ERROR: {
      const {code, message} = action.payload;

      return {
        ...state,
        loading: {
          ...state.loading,
          inProgress: false,
          error: {
            ...state.loading.error,
            hasError: true,
            code,
            message,
          },
        },
      };
    }

    case AppActions.vault.types.SET_NEW_VAULT_PASSWORD: {
      return {
        ...state,
        vaultPassword: action.payload.password,
        correctPasswordEntered: true,
      };
    }

    case AppActions.vault.types.RESET_VAULT_PASSWORD: {
      return {
        ...state,
        vaultPassword: null,
        correctPasswordEntered: false,
      };
    }

    case AppActions.vault.types.SET_CORRECT_PASSWORD_ENTERED: {
      return {
        ...state,
        correctPasswordEntered: action.payload.isCorrect,
      };
    }

    default: {
      return state;
    }
  }
};

export default vaultReducer;
