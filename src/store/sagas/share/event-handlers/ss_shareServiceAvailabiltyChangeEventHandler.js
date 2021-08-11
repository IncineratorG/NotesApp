import Services from '../../../../services/Services';
import AppActions from '../../../actions/AppActions';

const ss_shareServiceAvailabilityChangeEventHandler = emit => {
  const shareServiceAvailabilityChangeEventHandler = ({
    shareServiceAvailabilityMap,
  }) => {
    emit(
      AppActions.share.actions.setShareAvailability({
        shareServiceAvailabilityMap,
      }),
    );
  };

  Services.services().shareService.addOnShareServiceAvailabilityChangeListener({
    id: 'ss_shareServiceAvailabilityChangeEventHandler',
    handler: shareServiceAvailabilityChangeEventHandler,
  });

  return () => {
    Services.services().shareService.removeOnShareServiceAvailabilityChangeListener(
      {id: 'ss_shareServiceAvailabilityChangeEventHandler'},
    );
  };
};

export default ss_shareServiceAvailabilityChangeEventHandler;
