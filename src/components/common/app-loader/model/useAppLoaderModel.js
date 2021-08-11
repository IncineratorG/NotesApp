import {useEffect, useState} from 'react';
import useAppServices from '../hooks/useAppServices';
import useAppState from '../../../../utils/common/hooks/useAppState';
import {useDispatch} from 'react-redux';
import AppActions from '../../../../store/actions/AppActions';
import Services from '../../../../services/Services';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import useAppStateChangeCallback from '../../../../utils/common/hooks/useAppStateChangeCallback';
import AppEvents from '../../../../events/AppEvents';

const useAppLoaderModel = () => {
  const dispatch = useDispatch();

  const {servicesReady} = useAppServices();
  const {appInForeground} = useAppState();

  const [
    skipNextAppStateChangeCallback,
    setSkipNextAppStateChangeCallback,
  ] = useState(false);

  useEffect(() => {
    if (servicesReady) {
      dispatch(AppActions.global.actions.loadCoreAppData());
    }
  }, [dispatch, servicesReady]);

  useEffect(() => {
    if (!appInForeground) {
      Services.services().notesService.invalidateCaches();
    }
  }, [appInForeground, dispatch]);

  useAppStateChangeCallback({
    callback: () => {
      if (skipNextAppStateChangeCallback) {
        setSkipNextAppStateChangeCallback(false);
        return;
      }

      SystemEventsHandler.onInfo({info: 'AppLoader->WILL_CLEAR_PASSWORD'});
      dispatch(
        AppActions.vault.actions.setCorrectPasswordEntered({
          isCorrect: false,
        }),
      );
    },
    runOnGoingToBackground: true,
  });

  useEffect(() => {
    const openImagePickerSubscription = AppEvents.addListener({
      event: AppEvents.events.OPEN_IMAGE_PICKER,
      listener: () => {
        setSkipNextAppStateChangeCallback(true);
      },
    });
    const openShareAppSubscription = AppEvents.addListener({
      event: AppEvents.events.OPEN_SHARE_APP,
      listener: () => {
        setSkipNextAppStateChangeCallback(true);
      },
    });

    return () => {
      openImagePickerSubscription.remove();
      openShareAppSubscription.remove();
    };
  }, []);

  return {
    data: {
      servicesReady,
      appInForeground,
    },
    dispatch,
  };
};

export default useAppLoaderModel;
