import React from 'react';
import {View, Text} from 'react-native';
import {SystemEventsHandler} from '../../../utils/common/system-events-handler/SystemEventsHandler';

class MainErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hasError: false, error: '', errorInfo: ''};
  }

  static getDerivedStateFromError(error) {
    return {hasError: true, error: error.toString()};
  }

  componentDidCatch(error, errorInfo) {
    // SystemEventsHandler.onError({
    //   err:
    //     'MainErrorBoundary->ERROR: ' +
    //     error.toString() +
    //     ' - ' +
    //     errorInfo.toString(),
    // });
    // console.log(
    //   'MainErrorBoundary->ERROR: ' +
    //     error.toString() +
    //     ' - ' +
    //     errorInfo.toString(),
    // );
  }

  render() {
    if (this.state.hasError) {
      console.log('MainErrorBoundary->ERROR: ' + this.state.error);

      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontSize: 20}}>{'Error\n' + this.state.error}</Text>
        </View>
      );
    }

    return this.props.children;
  }
}

export default React.memo(MainErrorBoundary);
