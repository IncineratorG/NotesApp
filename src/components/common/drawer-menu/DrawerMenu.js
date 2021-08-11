import React from 'react';
import {StyleSheet} from 'react-native';
import DrawerMenuView from './views/DrawerMenuView';
import useDrawerMenuModel from './models/useDrawerMenuModel';
import useDrawerMenuController from './controllers/useDrawerMenuController';

const DrawerMenu = props => {
  // return (
  //   <DrawerContentScrollView {...props}>
  //     <View style={styles.drawerContent}>
  //       <View style={styles.userInfoSection}>
  //         <Avatar.Image
  //           source={{
  //             uri:
  //               'https://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg',
  //           }}
  //           size={50}
  //         />
  //         <Title style={styles.title}>Dawid Urbaniak</Title>
  //         <Caption style={styles.caption}>@trensik</Caption>
  //         <View style={styles.row}>
  //           <View style={styles.section}>
  //             <Paragraph style={[styles.paragraph, styles.caption]}>
  //               202
  //             </Paragraph>
  //             <Caption style={styles.caption}>Following</Caption>
  //           </View>
  //           <View style={styles.section}>
  //             <Paragraph style={[styles.paragraph, styles.caption]}>
  //               159
  //             </Paragraph>
  //             <Caption style={styles.caption}>Followers</Caption>
  //           </View>
  //         </View>
  //       </View>
  //       <Drawer.Section style={styles.drawerSection}>
  //         <DrawerItem
  //           icon={({color, size}) => (
  //             <Icon name="account-outline" color={color} size={size} />
  //           )}
  //           label="Profile"
  //           onPress={() => {}}
  //         />
  //         <DrawerItem
  //           icon={({color, size}) => (
  //             <Icon name="tune" color={color} size={size} />
  //           )}
  //           label="Preferences"
  //           onPress={() => {}}
  //         />
  //         <DrawerItem
  //           icon={({color, size}) => (
  //             <Icon name="bookmark-outline" color={color} size={size} />
  //           )}
  //           label="Bookmarks"
  //           onPress={() => {}}
  //         />
  //       </Drawer.Section>
  //       <Drawer.Section title="Preferences">
  //         <TouchableRipple onPress={() => {}}>
  //           <View style={styles.preference}>
  //             <Text>Dark Theme</Text>
  //             <View pointerEvents="none">
  //               <Switch value={false} />
  //             </View>
  //           </View>
  //         </TouchableRipple>
  //         <TouchableRipple onPress={() => {}}>
  //           <View style={styles.preference}>
  //             <Text>RTL</Text>
  //             <View pointerEvents="none">
  //               <Switch value={false} />
  //             </View>
  //           </View>
  //         </TouchableRipple>
  //       </Drawer.Section>
  //     </View>
  //   </DrawerContentScrollView>
  // );

  const model = useDrawerMenuModel(props);
  const controller = useDrawerMenuController(model);

  return <DrawerMenuView {...props} model={model} controller={controller} />;

  // const {t} = useTranslation();
  //
  // return (
  //   <DrawerContentScrollView {...props}>
  //     <View style={styles.drawerContent}>
  //       <View style={styles.appNameTextContainer}>
  //         <Text style={styles.appNameText}>{t('DrawerMenu_appName')}</Text>
  //       </View>
  //       <Drawer.Section>
  //         <Drawer.Item
  //           icon={({color, size}) => (
  //             <Icon name="library-books" color={color} size={size} />
  //           )}
  //           label={t('DrawerMenu_allNotesCategory')}
  //           onPress={() => {}}
  //         />
  //       </Drawer.Section>
  //       <Drawer.Section title={t('DrawerMenu_sectionCategoriesTitle')}>
  //         <Drawer.Item icon="star" label="First Category" />
  //         <Drawer.Item icon="star" label="First Category" />
  //         <Drawer.Item icon="star" label="First Category" />
  //       </Drawer.Section>
  //       <Drawer.Section>
  //         <Drawer.Item
  //           icon={({color, size}) => (
  //             <Icon name="notifications" color={color} size={size} />
  //           )}
  //           label={t('DrawerMenu_remindersItem')}
  //         />
  //         <Drawer.Item
  //           icon={({color, size}) => (
  //             <Icon name="delete" color={color} size={size} />
  //           )}
  //           label={t('DrawerMenu_recycleBinItem')}
  //         />
  //       </Drawer.Section>
  //       <Drawer.Section>
  //         <Drawer.Item
  //           icon={({color, size}) => (
  //             <Icon name="backup" color={color} size={size} />
  //           )}
  //           label={t('DrawerMenu_backupItem')}
  //         />
  //         <Drawer.Item
  //           icon={({color, size}) => (
  //             <Icon name="settings" color={color} size={size} />
  //           )}
  //           label={t('DrawerMenu_settingsItem')}
  //         />
  //         <Drawer.Item
  //           icon={({color, size}) => (
  //             <Icon name="help" color={color} size={size} />
  //           )}
  //           label={t('DrawerMenu_aboutItem')}
  //         />
  //       </Drawer.Section>
  //     </View>
  //   </DrawerContentScrollView>
  // );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  appNameTextContainer: {
    height: 50,
    justifyContent: 'center',
    paddingLeft: 14,
    paddingRight: 10,
  },
  appNameText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  drawerSection: {},
});

// const styles = StyleSheet.create({
//   drawerContent: {
//     flex: 1,
//   },
//   userInfoSection: {
//     paddingLeft: 20,
//   },
//   title: {
//     marginTop: 20,
//     fontWeight: 'bold',
//   },
//   caption: {
//     fontSize: 14,
//     lineHeight: 14,
//   },
//   row: {
//     marginTop: 20,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   section: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginRight: 15,
//   },
//   paragraph: {
//     fontWeight: 'bold',
//     marginRight: 3,
//   },
//   drawerSection: {
//     marginTop: 15,
//   },
//   preference: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//   },
// });

export default React.memo(DrawerMenu);

// import React from 'react';
// import {View, StyleSheet} from 'react-native';
// import {DrawerItem, DrawerContentScrollView} from '@react-navigation/drawer';
// import {
//   useTheme,
//   Avatar,
//   Title,
//   Caption,
//   Paragraph,
//   Drawer,
//   Text,
//   TouchableRipple,
//   Switch,
// } from 'react-native-paper';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
//
// const DrawerMenu = props => {
//   return (
//     <DrawerContentScrollView {...props}>
//       <View style={styles.drawerContent}>
//         <View style={styles.userInfoSection}>
//           <Avatar.Image
//             source={{
//               uri:
//                 'https://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg',
//             }}
//             size={50}
//           />
//           <Title style={styles.title}>Dawid Urbaniak</Title>
//           <Caption style={styles.caption}>@trensik</Caption>
//           <View style={styles.row}>
//             <View style={styles.section}>
//               <Paragraph style={[styles.paragraph, styles.caption]}>
//                 202
//               </Paragraph>
//               <Caption style={styles.caption}>Following</Caption>
//             </View>
//             <View style={styles.section}>
//               <Paragraph style={[styles.paragraph, styles.caption]}>
//                 159
//               </Paragraph>
//               <Caption style={styles.caption}>Followers</Caption>
//             </View>
//           </View>
//         </View>
//         <Drawer.Section style={styles.drawerSection}>
//           <DrawerItem
//             icon={({color, size}) => (
//               <Icon name="account-outline" color={color} size={size} />
//             )}
//             label="Profile"
//             onPress={() => {}}
//           />
//           <DrawerItem
//             icon={({color, size}) => (
//               <Icon name="tune" color={color} size={size} />
//             )}
//             label="Preferences"
//             onPress={() => {}}
//           />
//           <DrawerItem
//             icon={({color, size}) => (
//               <Icon name="bookmark-outline" color={color} size={size} />
//             )}
//             label="Bookmarks"
//             onPress={() => {}}
//           />
//         </Drawer.Section>
//         <Drawer.Section title="Preferences">
//           <TouchableRipple onPress={() => {}}>
//             <View style={styles.preference}>
//               <Text>Dark Theme</Text>
//               <View pointerEvents="none">
//                 <Switch value={false} />
//               </View>
//             </View>
//           </TouchableRipple>
//           <TouchableRipple onPress={() => {}}>
//             <View style={styles.preference}>
//               <Text>RTL</Text>
//               <View pointerEvents="none">
//                 <Switch value={false} />
//               </View>
//             </View>
//           </TouchableRipple>
//         </Drawer.Section>
//       </View>
//     </DrawerContentScrollView>
//   );
//   // return (
//   //   <DrawerContentScrollView {...props}>
//   //     <View style={styles.drawerContent}>
//   //       <View style={styles.userInfoSection}>
//   //         <Avatar.Image
//   //           source={{
//   //             uri:
//   //               'https://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg',
//   //           }}
//   //           size={50}
//   //         />
//   //         <Title style={styles.title}>Dawid Urbaniak</Title>
//   //         <Caption style={styles.caption}>@trensik</Caption>
//   //         <View style={styles.row}>
//   //           <View style={styles.section}>
//   //             <Paragraph style={[styles.paragraph, styles.caption]}>
//   //               202
//   //             </Paragraph>
//   //             <Caption style={styles.caption}>Following</Caption>
//   //           </View>
//   //           <View style={styles.section}>
//   //             <Paragraph style={[styles.paragraph, styles.caption]}>
//   //               159
//   //             </Paragraph>
//   //             <Caption style={styles.caption}>Followers</Caption>
//   //           </View>
//   //         </View>
//   //       </View>
//   //       <Drawer.Section style={styles.drawerSection}>
//   //         <DrawerItem
//   //           icon={({color, size}) => (
//   //             <MaterialCommunityIcons
//   //               name="account-outline"
//   //               color={color}
//   //               size={size}
//   //             />
//   //           )}
//   //           label="Profile"
//   //           onPress={() => {}}
//   //         />
//   //         <DrawerItem
//   //           icon={({color, size}) => (
//   //             <MaterialCommunityIcons name="tune" color={color} size={size} />
//   //           )}
//   //           label="Preferences"
//   //           onPress={() => {}}
//   //         />
//   //         <DrawerItem
//   //           icon={({color, size}) => (
//   //             <MaterialCommunityIcons
//   //               name="bookmark-outline"
//   //               color={color}
//   //               size={size}
//   //             />
//   //           )}
//   //           label="Bookmarks"
//   //           onPress={() => {}}
//   //         />
//   //       </Drawer.Section>
//   //       <Drawer.Section title="Preferences">
//   //         <TouchableRipple onPress={() => {}}>
//   //           <View style={styles.preference}>
//   //             <Text>Dark Theme</Text>
//   //             <View pointerEvents="none">
//   //               <Switch value={false} />
//   //             </View>
//   //           </View>
//   //         </TouchableRipple>
//   //         <TouchableRipple onPress={() => {}}>
//   //           <View style={styles.preference}>
//   //             <Text>RTL</Text>
//   //             <View pointerEvents="none">
//   //               <Switch value={false} />
//   //             </View>
//   //           </View>
//   //         </TouchableRipple>
//   //       </Drawer.Section>
//   //     </View>
//   //   </DrawerContentScrollView>
//   // );
// };
//
// const styles = StyleSheet.create({
//   drawerContent: {
//     flex: 1,
//   },
//   userInfoSection: {
//     paddingLeft: 20,
//   },
//   title: {
//     marginTop: 20,
//     fontWeight: 'bold',
//   },
//   caption: {
//     fontSize: 14,
//     lineHeight: 14,
//   },
//   row: {
//     marginTop: 20,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   section: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginRight: 15,
//   },
//   paragraph: {
//     fontWeight: 'bold',
//     marginRight: 3,
//   },
//   drawerSection: {
//     marginTop: 15,
//   },
//   preference: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//   },
// });
//
// export default React.memo(DrawerMenu);
//
// // import React from 'react';
// // import {View, StyleSheet} from 'react-native';
// // import {
// //   DrawerContentScrollView,
// //   DrawerItemList,
// //   DrawerItem,
// //   DrawerView,
// // } from '@react-navigation/drawer';
// // import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
// // import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
// //
// // const DrawerMenu = props => {
// //   const insets = useSafeAreaInsets();
// //
// //   return (
// //     <DrawerContentScrollView
// //       contentContainerStyle={{
// //         paddingTop: insets.top,
// //         paddingBottom: insets.bottom,
// //       }}
// //       {...props}>
// //       <View style={{height: 300, backgroundColor: 'green'}} />
// //       <View style={{height: 300, backgroundColor: 'yellow'}} />
// //       <View style={{height: 300, backgroundColor: 'cyan'}} />
// //       <View style={{height: 300, backgroundColor: 'purple'}} />
// //     </DrawerContentScrollView>
// //   );
// // };
// //
// // export default React.memo(DrawerMenu);
//
// // import React from 'react';
// // import {
// //   DrawerContentScrollView,
// //   DrawerItemList,
// //   DrawerItem,
// // } from '@react-navigation/drawer';
// // import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
// //
// // const Drawer = props => {
// //   return (
// //     <DrawerContentScrollView {...props}>
// //       <DrawerItem
// //         label="Help"
// //         onPress={() => SystemEventsHandler.onInfo({info: 'PRESS'})}
// //       />
// //       <DrawerItemList {...props} />
// //     </DrawerContentScrollView>
// //   );
// // };
// //
// // export default React.memo(Drawer);
