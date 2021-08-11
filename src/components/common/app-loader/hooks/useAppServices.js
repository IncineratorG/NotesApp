import {useState, useEffect} from 'react';
import Services from '../../../../services/Services';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';

const useAppServices = () => {
  const [servicesReady, setServicesReady] = useState(false);

  useEffect(() => {
    const startAppServices = async () => {
      try {
        await Services.init();
        setServicesReady(true);
      } catch (e) {
        SystemEventsHandler.onError({
          err: 'useAppServices()->startAppServices()->ERROR: ' + e.toString(),
        });
      }
    };

    startAppServices();

    return () => {
      SystemEventsHandler.onInfo({info: 'useAppServices->WILL_DISPOSE'});

      Services.dispose();
      setServicesReady(false);
    };
  }, []);

  return {
    servicesReady,
  };
};

export default useAppServices;
