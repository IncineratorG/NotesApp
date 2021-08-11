import {useState, useEffect} from 'react';
import {AppState} from 'react-native';

const useAppState = () => {
  const [appInForeground, setAppInForeground] = useState(
    AppState.currentState === 'active',
  );

  useEffect(() => {
    const appStateChangeHandler = nextAppState => {
      if (nextAppState === 'active') {
        setAppInForeground(true);
      } else {
        setAppInForeground(false);
      }
    };

    AppState.addEventListener('change', appStateChangeHandler);

    return () => {
      AppState.removeEventListener('change', appStateChangeHandler);
    };
  }, []);

  return {
    appInForeground,
  };
};

export default useAppState;
