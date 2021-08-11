import {useCallback} from 'react';
import {Linking} from 'react-native';
import {SystemEventsHandler} from '../../../utils/common/system-events-handler/SystemEventsHandler';
import useTranslation from '../../../utils/common/localization';

const useAboutController = model => {
  const {t} = useTranslation();

  const authorPressHandler = useCallback(async () => {
    const email = t('AboutView_email');
    const subject = t('AboutView_emailSubject');
    const body = t('AboutView_emailBody');

    const url = 'mailto:' + email + '?subject=' + subject + '&body=' + body;

    try {
      await Linking.openURL(url);
    } catch (e) {
      SystemEventsHandler.onError({
        err: 'useAboutController->authorPressHandler()->ERROR: ' + e.toString(),
      });
    }
  }, [t]);

  return {
    authorPressHandler,
  };
};

export default useAboutController;
