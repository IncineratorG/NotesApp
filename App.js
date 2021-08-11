import React from 'react';
import {Provider as StoreProvider} from 'react-redux';
import {MenuProvider} from 'react-native-popup-menu';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import AppLoader from './src/components/common/app-loader/AppLoader';
import store from './src/store';
import MainErrorBoundary from './src/components/common/main-error-boundary/MainErrorBoundary';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    mode: 'exact',
    // primary: '#3498db',
    // accent: '#f1c40f',
    // text: '#000000',
  },
};

const App: () => Node = () => {
  return (
    <StoreProvider store={store}>
      <PaperProvider theme={theme}>
        <MenuProvider>
          <MainErrorBoundary>
            <AppLoader />
          </MainErrorBoundary>
        </MenuProvider>
      </PaperProvider>
    </StoreProvider>
  );
};

export default React.memo(App);
