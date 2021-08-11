import React, {useCallback, useState, useMemo} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import NotesList from '../../../screens/notes-list/NotesList';
import AppStyles from '../../../assets/styles/AppStyles';
import useTranslation from '../../../utils/common/localization';
import AppMenuButton from '../../specific/notes-list/app-menu-button/AppMenuButton';
import Note from '../../../screens/note/Note';
import HeaderButtonsContainer from '../../specific/note/header-buttons-container/HeaderButtonsContainer';
import About from '../../../screens/about/About';
import Settings from '../../../screens/settings/Settings';
import AppRoutes from '../../../data/common/routes/AppRoutes';
import DrawerMenu from '../drawer-menu/DrawerMenu';
import Backup from '../../../screens/backup/Backup';
import EditCategories from '../../../screens/edit-categories/EditCategories';
import RecycleBin from '../../../screens/recycle-bin/RecycleBin';
import RecycleBinHeaderMenuButton from '../../specific/recycle-bin/header-menu-button/RecycleBinHeaderMenuButton';
import DeletedNote from '../../../screens/deleted-note/DeletedNote';
import DeletedNoteHeaderButtonsContainer from '../../specific/deleted-note/header-buttons-container/DeletedNoteHeaderButtonsContainer';
import useWidgetRequestsHandler from './hooks/useWidgetRequestsHandler';
import {useDispatch} from 'react-redux';
import NotesOrdering from '../../../screens/notes-ordering/NotesOrdering';
import NotesListHeaderRightButtons from '../../specific/notes-list/header-right-buttons/NotesListHeaderRightButtons';
import Vault from '../../../screens/vault/Vault';
import VaultedNote from '../../../screens/vaulted-note/VaultedNote';
import VaultedNoteHeaderButtons from '../../specific/vaulted-note/header-buttons/VaultedNoteHeaderButtons';

const MainStack = createStackNavigator();
const DrawerStack = createDrawerNavigator();

const AppNavigation = () => {
  const {t} = useTranslation();

  const dispatch = useDispatch();

  const navigationRef = React.useRef(null);

  const [navigationReady, setNavigationReady] = useState(false);

  // ===
  // useOpenNoteRequests({navigation: navigationRef.current, navigationReady});
  useWidgetRequestsHandler({dispatch});
  // ===

  const isSwipeEnabledForRoute = useCallback(route => {
    const routeName =
      getFocusedRouteNameFromRoute(route) ?? AppRoutes.NotesList;
    return routeName === AppRoutes.NotesList;
  }, []);

  const navigationReadyHandler = useCallback(() => {
    setNavigationReady(true);
  }, []);

  const mainStack = useCallback(() => {
    return (
      <MainStack.Navigator mode="card">
        <MainStack.Screen
          name={AppRoutes.NotesList}
          component={NotesList}
          options={{
            headerStyle: {
              backgroundColor: AppStyles.headerColor,
            },
            headerTintColor: AppStyles.headerTextColor,
            headerLeft: props => {
              return <AppMenuButton onPress={null} />;
            },
            headerRight: props => {
              return <NotesListHeaderRightButtons />;
            },
            title: t('NoteList_screenTitle'),
            headerStatusBarHeight: 0,
          }}
        />
        <MainStack.Screen
          name={AppRoutes.Note}
          component={Note}
          options={{
            headerStyle: {
              backgroundColor: AppStyles.headerColor,
            },
            headerTintColor: AppStyles.headerTextColor,
            headerRight: props => {
              return <HeaderButtonsContainer />;
            },
            title: t('Note_screenTitle'),
            headerStatusBarHeight: 0,
          }}
        />
      </MainStack.Navigator>
    );
  }, [t]);

  const drawerStack = useMemo(() => {
    return (
      <DrawerStack.Navigator
        initialRouteName={AppRoutes.NotesList}
        drawerContent={props => <DrawerMenu {...props} />}>
        <DrawerStack.Screen
          name={AppRoutes.NotesList}
          component={mainStack}
          options={({route}) => ({
            swipeEnabled: isSwipeEnabledForRoute(route),
          })}
        />
        <DrawerStack.Screen
          name={AppRoutes.About}
          component={About}
          options={({navigation, route}) => ({
            gestureEnabled: false,
            headerShown: true,
            headerStyle: {
              backgroundColor: AppStyles.headerColor,
            },
            headerTintColor: AppStyles.headerTextColor,
            headerLeft: props => {
              return (
                <HeaderBackButton
                  {...props}
                  onPress={() => {
                    navigation.goBack();
                  }}
                />
              );
            },
            title: t('About_screenTitle'),
            headerStatusBarHeight: 0,
          })}
        />
        <DrawerStack.Screen
          name={AppRoutes.Settings}
          component={Settings}
          options={({navigation, route}) => ({
            gestureEnabled: false,
            headerShown: true,
            headerStyle: {
              backgroundColor: AppStyles.headerColor,
            },
            headerTintColor: AppStyles.headerTextColor,
            headerLeft: props => {
              return (
                <HeaderBackButton
                  {...props}
                  onPress={() => {
                    navigation.goBack();
                  }}
                />
              );
            },
            title: t('Settings_screenTitle'),
            headerStatusBarHeight: 0,
          })}
        />
        <DrawerStack.Screen
          name={AppRoutes.Backup}
          component={Backup}
          options={({navigation, route}) => ({
            gestureEnabled: false,
            headerShown: true,
            headerStyle: {
              backgroundColor: AppStyles.headerColor,
            },
            headerTintColor: AppStyles.headerTextColor,
            headerLeft: props => {
              return (
                <HeaderBackButton
                  {...props}
                  onPress={() => {
                    navigation.goBack();
                  }}
                />
              );
            },
            title: t('BackupScreen_title'),
            headerStatusBarHeight: 0,
          })}
          // options={({route}) => ({
          //   swipeEnabled: isSwipeEnabledForRoute(route),
          // })}
        />
        <DrawerStack.Screen
          name={AppRoutes.EditCategories}
          component={EditCategories}
          options={({navigation, route}) => ({
            gestureEnabled: false,
            headerShown: true,
            headerStyle: {
              backgroundColor: AppStyles.headerColor,
            },
            headerTintColor: AppStyles.headerTextColor,
            headerLeft: props => {
              return (
                <HeaderBackButton
                  {...props}
                  onPress={() => {
                    navigation.goBack();
                  }}
                />
              );
            },
            title: t('EditCategoriesScreen_title'),
            headerStatusBarHeight: 0,
          })}
        />
        <DrawerStack.Screen
          name={AppRoutes.RecycleBin}
          component={RecycleBin}
          options={({navigation, route}) => ({
            gestureEnabled: false,
            headerShown: true,
            headerStyle: {
              backgroundColor: AppStyles.headerColor,
            },
            headerTintColor: AppStyles.headerTextColor,
            headerLeft: props => {
              return (
                <HeaderBackButton
                  {...props}
                  onPress={() => {
                    navigation.goBack();
                  }}
                />
              );
            },
            headerRight: props => {
              return <RecycleBinHeaderMenuButton />;
            },
            title: t('RecycleBin_screenTitle'),
            headerStatusBarHeight: 0,
          })}
        />
        <DrawerStack.Screen
          name={AppRoutes.DeletedNote}
          component={DeletedNote}
          options={({navigation, route}) => ({
            gestureEnabled: false,
            headerShown: true,
            headerStyle: {
              backgroundColor: AppStyles.headerColor,
            },
            headerTintColor: AppStyles.headerTextColor,
            headerLeft: props => {
              return (
                <HeaderBackButton
                  {...props}
                  onPress={() => {
                    navigation.goBack();
                  }}
                />
              );
            },
            headerRight: props => {
              return <DeletedNoteHeaderButtonsContainer />;
            },
            title: t('DeletedNote_screenTitle'),
            headerStatusBarHeight: 0,
          })}
        />
        <DrawerStack.Screen
          name={AppRoutes.NotesOrdering}
          component={NotesOrdering}
          options={({navigation, route}) => ({
            gestureEnabled: false,
            headerShown: true,
            headerStyle: {
              backgroundColor: AppStyles.headerColor,
            },
            headerTintColor: AppStyles.headerTextColor,
            headerLeft: props => {
              return (
                <HeaderBackButton
                  {...props}
                  onPress={() => {
                    navigation.goBack();
                  }}
                />
              );
            },
            title: t('NotesOrdering_screenTitle'),
            headerStatusBarHeight: 0,
          })}
        />
        <DrawerStack.Screen
          name={AppRoutes.Vault}
          component={Vault}
          options={({navigation, route}) => ({
            gestureEnabled: false,
            headerShown: true,
            headerStyle: {
              backgroundColor: AppStyles.headerColor,
            },
            headerTintColor: AppStyles.headerTextColor,
            headerLeft: props => {
              return (
                <HeaderBackButton
                  {...props}
                  onPress={() => {
                    navigation.goBack();
                  }}
                />
              );
            },
            title: t('Vault_screenTitle'),
            headerStatusBarHeight: 0,
          })}
        />
        <DrawerStack.Screen
          name={AppRoutes.VaultedNote}
          component={VaultedNote}
          options={({navigation, route}) => ({
            gestureEnabled: false,
            headerShown: true,
            headerStyle: {
              backgroundColor: AppStyles.headerColor,
            },
            headerTintColor: AppStyles.headerTextColor,
            headerRight: props => {
              return <VaultedNoteHeaderButtons />;
            },
            headerLeft: props => {
              return (
                <HeaderBackButton
                  {...props}
                  onPress={() => {
                    navigation.goBack();
                  }}
                />
              );
            },
            title: t('VaultedNote_screenTitle'),
            headerStatusBarHeight: 0,
          })}
        />
      </DrawerStack.Navigator>
    );
  }, [isSwipeEnabledForRoute, t, mainStack]);

  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef} onReady={navigationReadyHandler}>
        {drawerStack}
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default React.memo(AppNavigation);

// import React, {useCallback, useState} from 'react';
// import {SafeAreaProvider} from 'react-native-safe-area-context';
// import {NavigationContainer} from '@react-navigation/native';
// import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
// import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';
// import {createDrawerNavigator} from '@react-navigation/drawer';
// import NotesList from '../../../screens/notes-list/NotesList';
// import AppStyles from '../../../assets/styles/AppStyles';
// import useTranslation from '../../../utils/common/localization';
// import SortOptionsButton from '../../specific/notes-list/sort-options-button/SortOptionsButton';
// import AppMenuButton from '../../specific/notes-list/app-menu-button/AppMenuButton';
// import Note from '../../../screens/note/Note';
// import HeaderButtonsContainer from '../../specific/note/header-buttons-container/HeaderButtonsContainer';
// import About from '../../../screens/about/About';
// import Settings from '../../../screens/settings/Settings';
// import AppRoutes from '../../../data/common/routes/AppRoutes';
// import DrawerMenu from '../drawer-menu/DrawerMenu';
// import Backup from '../../../screens/backup/Backup';
// import EditCategories from '../../../screens/edit-categories/EditCategories';
// import RecycleBin from '../../../screens/recycle-bin/RecycleBin';
// import RecycleBinHeaderMenuButton from '../../specific/recycle-bin/header-menu-button/RecycleBinHeaderMenuButton';
// import DeletedNote from '../../../screens/deleted-note/DeletedNote';
// import DeletedNoteHeaderButtonsContainer from '../../specific/deleted-note/header-buttons-container/DeletedNoteHeaderButtonsContainer';
// import useOpenNoteRequests from './hooks/useOpenNoteRequests';
//
// const MainStack = createStackNavigator();
// const DrawerStack = createDrawerNavigator();
//
// const AppNavigation = () => {
//   const {t} = useTranslation();
//
//   const navigationRef = React.useRef(null);
//
//   const [navigationReady, setNavigationReady] = useState(false);
//
//   useOpenNoteRequests({navigation: navigationRef.current, navigationReady});
//
//   const isSwipeEnabledForRoute = useCallback(route => {
//     const routeName = getFocusedRouteNameFromRoute(route) ?? 'NotesList';
//     return routeName === 'NotesList';
//   }, []);
//
//   const navigationReadyHandler = useCallback(() => {
//     setNavigationReady(true);
//   }, []);
//
//   const mainStack = useCallback(() => {
//     return (
//       <MainStack.Navigator mode="card">
//         <MainStack.Screen
//           name={AppRoutes.NotesList}
//           component={NotesList}
//           options={{
//             headerStyle: {
//               backgroundColor: AppStyles.headerColor,
//             },
//             headerTintColor: AppStyles.headerTextColor,
//             headerLeft: props => {
//               return <AppMenuButton onPress={null} />;
//             },
//             headerRight: props => {
//               return <SortOptionsButton />;
//             },
//             title: t('NoteList_screenTitle'),
//             headerStatusBarHeight: 0,
//           }}
//         />
//         <MainStack.Screen
//           name={AppRoutes.Note}
//           component={Note}
//           options={{
//             headerStyle: {
//               backgroundColor: AppStyles.headerColor,
//             },
//             headerTintColor: AppStyles.headerTextColor,
//             headerRight: props => {
//               return <HeaderButtonsContainer />;
//             },
//             title: t('Note_screenTitle'),
//             headerStatusBarHeight: 0,
//           }}
//         />
//       </MainStack.Navigator>
//     );
//   }, [t]);
//
//   const drawerStack = (
//     <DrawerStack.Navigator
//       initialRouteName={AppRoutes.NotesList}
//       drawerContent={props => <DrawerMenu {...props} />}>
//       <DrawerStack.Screen
//         name={AppRoutes.NotesList}
//         component={mainStack}
//         options={({route}) => ({
//           swipeEnabled: isSwipeEnabledForRoute(route),
//         })}
//       />
//       <DrawerStack.Screen
//         name={AppRoutes.About}
//         component={About}
//         options={({navigation, route}) => ({
//           gestureEnabled: false,
//           headerShown: true,
//           headerStyle: {
//             backgroundColor: AppStyles.headerColor,
//           },
//           headerTintColor: AppStyles.headerTextColor,
//           headerLeft: props => {
//             return (
//               <HeaderBackButton
//                 {...props}
//                 onPress={() => {
//                   navigation.goBack();
//                 }}
//               />
//             );
//           },
//           title: t('About_screenTitle'),
//           headerStatusBarHeight: 0,
//         })}
//       />
//       <DrawerStack.Screen
//         name={AppRoutes.Settings}
//         component={Settings}
//         options={({navigation, route}) => ({
//           gestureEnabled: false,
//           headerShown: true,
//           headerStyle: {
//             backgroundColor: AppStyles.headerColor,
//           },
//           headerTintColor: AppStyles.headerTextColor,
//           headerLeft: props => {
//             return (
//               <HeaderBackButton
//                 {...props}
//                 onPress={() => {
//                   navigation.goBack();
//                 }}
//               />
//             );
//           },
//           title: t('Settings_screenTitle'),
//           headerStatusBarHeight: 0,
//         })}
//       />
//       <DrawerStack.Screen
//         name={AppRoutes.Backup}
//         component={Backup}
//         options={({route}) => ({
//           swipeEnabled: isSwipeEnabledForRoute(route),
//         })}
//       />
//       <DrawerStack.Screen
//         name={AppRoutes.EditCategories}
//         component={EditCategories}
//         options={({navigation, route}) => ({
//           gestureEnabled: false,
//           headerShown: true,
//           headerStyle: {
//             backgroundColor: AppStyles.headerColor,
//           },
//           headerTintColor: AppStyles.headerTextColor,
//           headerLeft: props => {
//             return (
//               <HeaderBackButton
//                 {...props}
//                 onPress={() => {
//                   navigation.goBack();
//                 }}
//               />
//             );
//           },
//           title: t('EditCategoriesScreen_title'),
//           headerStatusBarHeight: 0,
//         })}
//       />
//       <DrawerStack.Screen
//         name={AppRoutes.RecycleBin}
//         component={RecycleBin}
//         options={({navigation, route}) => ({
//           gestureEnabled: false,
//           headerShown: true,
//           headerStyle: {
//             backgroundColor: AppStyles.headerColor,
//           },
//           headerTintColor: AppStyles.headerTextColor,
//           headerLeft: props => {
//             return (
//               <HeaderBackButton
//                 {...props}
//                 onPress={() => {
//                   navigation.goBack();
//                 }}
//               />
//             );
//           },
//           headerRight: props => {
//             return <RecycleBinHeaderMenuButton />;
//           },
//           title: t('RecycleBin_screenTitle'),
//           headerStatusBarHeight: 0,
//         })}
//       />
//       <DrawerStack.Screen
//         name={AppRoutes.DeletedNote}
//         component={DeletedNote}
//         options={({navigation, route}) => ({
//           gestureEnabled: false,
//           headerShown: true,
//           headerStyle: {
//             backgroundColor: AppStyles.headerColor,
//           },
//           headerTintColor: AppStyles.headerTextColor,
//           headerLeft: props => {
//             return (
//               <HeaderBackButton
//                 {...props}
//                 onPress={() => {
//                   navigation.goBack();
//                 }}
//               />
//             );
//           },
//           headerRight: props => {
//             return <DeletedNoteHeaderButtonsContainer />;
//           },
//           title: t('DeletedNote_screenTitle'),
//           headerStatusBarHeight: 0,
//         })}
//       />
//     </DrawerStack.Navigator>
//   );
//
//   return (
//     <SafeAreaProvider>
//       <NavigationContainer ref={navigationRef} onReady={navigationReadyHandler}>
//         {drawerStack}
//       </NavigationContainer>
//     </SafeAreaProvider>
//   );
// };
//
// export default React.memo(AppNavigation);
