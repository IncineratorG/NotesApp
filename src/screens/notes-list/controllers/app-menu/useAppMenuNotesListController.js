import {useCallback} from 'react';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';

const useAppMenuNotesListController = model => {
  const {navigation} = model;

  const appMenuButtonPressHandler = useCallback(() => {
    SystemEventsHandler.onInfo({
      info: 'useAppMenuNotesListController()->appMenuButtonPressHandler()',
    });

    navigation.openDrawer();
  }, [navigation]);

  return {
    appMenuButtonPressHandler,
  };
};

export default useAppMenuNotesListController;
