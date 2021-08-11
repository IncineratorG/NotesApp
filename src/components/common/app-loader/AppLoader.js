import React from 'react';
import AppNavigation from '../app-navigation/AppNavigation';
import AppLoading from '../app-loading/AppLoading';
import useAppLoaderModel from './model/useAppLoaderModel';

const AppLoader = () => {
  const model = useAppLoaderModel();
  const {
    data: {servicesReady},
  } = model;

  if (servicesReady) {
    return <AppNavigation />;
  } else {
    return <AppLoading />;
  }
};

export default React.memo(AppLoader);

// import React, {useEffect} from 'react';
// import AppNavigation from '../app-navigation/AppNavigation';
// import AppLoading from '../app-loading/AppLoading';
// import useAppServices from './hooks/useAppServices';
// import {useDispatch} from 'react-redux';
// import AppActions from '../../../store/actions/AppActions';
// import useAppState from '../../../utils/common/hooks/useAppState';
// import Services from '../../../services/Services';
//
// const AppLoader = () => {
//   const {servicesReady} = useAppServices();
//   const {appInForeground} = useAppState();
//
//   const dispatch = useDispatch();
//
//   useEffect(() => {
//     if (servicesReady) {
//       dispatch(AppActions.global.actions.loadCoreAppData());
//     }
//   }, [dispatch, servicesReady]);
//
//   useEffect(() => {
//     if (!appInForeground) {
//       Services.services().notesService.invalidateCaches();
//       // dispatch(
//       //   AppActions.vault.actions.setCorrectPasswordEntered({
//       //     isCorrect: false,
//       //   }),
//       // );
//     }
//   }, [appInForeground, dispatch]);
//
//   if (servicesReady) {
//     return <AppNavigation />;
//   } else {
//     return <AppLoading />;
//   }
// };
//
// export default React.memo(AppLoader);
