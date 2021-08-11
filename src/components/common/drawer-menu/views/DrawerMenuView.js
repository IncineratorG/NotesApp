import React, {useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {Drawer, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import useTranslation from '../../../../utils/common/localization';
import DrawerNoteCategoryItem from './drawer-note-category-item/DrawerNoteCategoryItem';
import UnlockingVaultDialog from '../../unlocking-vault-dialog/UnlockingVaultDialog';
import CreateVaultPasswordDialog from '../../create-vault-password-dialog/CreateVaultPasswordDialog';
import ResetVaultPasswordDialog from '../../reset-vault-password-dialog/ResetVaultPasswordDialog';

const DrawerMenuView = props => {
  const {t} = useTranslation();

  const {
    model: {
      data: {
        categoriesList,
        selectedCategoryId,
        notesOrderingAvailable,
        unlockingVaultDialogVisible,
        createVaultPasswordDialogVisible,
        resetVaultPasswordDialogVisible,
        vaultPassword,
      },
    },
  } = props;
  const {
    controller: {
      backupItemPressHandler,
      settingsItemPressHandler,
      aboutItemPressHandler,
      remindersItemPressHandler,
      recycleBinItemPressHandler,
      notesOrderingItemPressHandler,
      allNotesPressHandler,
      categoryPressHandler,
      editCategoryPressHandler,
      vaultPressHandler,
      unlockingVaultDialogCancelHandler,
      unlockingVaultDialogResetPasswordHandler,
      unlockingVaultDialogCorrectPasswordEnteredHandler,
      createVaultPasswordDialogCancelHandler,
      createVaultPasswordDialogPasswordSetHandler,
      resetVaultPasswordDialogCancelHandler,
      resetVaultPasswordDialogResetHandler,
    },
  } = props;

  const unlockingVaultDialog = (
    <UnlockingVaultDialog
      visible={unlockingVaultDialogVisible}
      resetPasswordOptionEnabled={true}
      password={vaultPassword}
      onCorrectPasswordEntered={
        unlockingVaultDialogCorrectPasswordEnteredHandler
      }
      onResetPasswordPress={unlockingVaultDialogResetPasswordHandler}
      onCancelPress={unlockingVaultDialogCancelHandler}
    />
  );

  const createVaultPasswordDialog = (
    <CreateVaultPasswordDialog
      visible={createVaultPasswordDialogVisible}
      onNewPasswordSet={createVaultPasswordDialogPasswordSetHandler}
      onCancelPress={createVaultPasswordDialogCancelHandler}
    />
  );

  const resetVaultPasswordDialog = (
    <ResetVaultPasswordDialog
      visible={resetVaultPasswordDialogVisible}
      onResetPress={resetVaultPasswordDialogResetHandler}
      onCancelPress={resetVaultPasswordDialogCancelHandler}
    />
  );

  const categoriesItemsComponent = useMemo(
    () =>
      categoriesList.map(category => {
        return (
          <DrawerNoteCategoryItem
            key={category.id.toString()}
            category={category}
            selected={category.id === selectedCategoryId}
            onPress={categoryPressHandler}
          />
        );
      }),
    [categoriesList, selectedCategoryId, categoryPressHandler],
  );

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
        {unlockingVaultDialog}
        {createVaultPasswordDialog}
        {resetVaultPasswordDialog}
        <View style={styles.appNameTextContainer}>
          <Text style={styles.appNameText}>{t('DrawerMenu_appName')}</Text>
        </View>
        <Drawer.Section>
          <Drawer.Item
            icon={({color, size}) => (
              <Icon name="library-books" color={color} size={size} />
            )}
            label={t('DrawerMenu_allNotesCategory')}
            active={selectedCategoryId < 0}
            onPress={allNotesPressHandler}
          />
        </Drawer.Section>
        <Drawer.Section title={t('DrawerMenu_sectionCategoriesTitle')}>
          {categoriesItemsComponent}
          <View style={{height: 10}} />
          <Drawer.Item
            icon={({color, size}) => (
              <Icon name="edit" color={color} size={size} />
            )}
            label={t('DrawerMenu_editCategoryItem')}
            onPress={editCategoryPressHandler}
          />
        </Drawer.Section>
        <Drawer.Section>
          <Drawer.Item
            icon={({color, size}) => (
              <MaterialCommunityIcon
                name="safe-square-outline"
                color={color}
                size={size}
              />
              //<Icon name="lock" color={color} size={size} />
            )}
            label={t('DrawerMenu_Vault')}
            onPress={vaultPressHandler}
          />
          <Drawer.Item
            icon={({color, size}) => (
              <Icon name="backup" color={color} size={size} />
            )}
            label={t('DrawerMenu_backupItem')}
            onPress={backupItemPressHandler}
          />
          <Drawer.Item
            style={{opacity: notesOrderingAvailable ? 1.0 : 0.4}}
            icon={({color, size}) => (
              <Icon name="low-priority" color={color} size={size} />
            )}
            label={t('DrawerMenu_notesOrdering')}
            onPress={
              notesOrderingAvailable ? notesOrderingItemPressHandler : null
            }
          />
          <Drawer.Item
            icon={({color, size}) => (
              <Icon name="delete" color={color} size={size} />
            )}
            label={t('DrawerMenu_recycleBinItem')}
            onPress={recycleBinItemPressHandler}
          />
        </Drawer.Section>
        <Drawer.Section>
          <Drawer.Item
            icon={({color, size}) => (
              <Icon name="settings" color={color} size={size} />
            )}
            label={t('DrawerMenu_settingsItem')}
            onPress={settingsItemPressHandler}
          />
          <Drawer.Item
            icon={({color, size}) => (
              <Icon name="help" color={color} size={size} />
            )}
            label={t('DrawerMenu_aboutItem')}
            onPress={aboutItemPressHandler}
          />
        </Drawer.Section>
      </View>
    </DrawerContentScrollView>
  );
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

export default React.memo(DrawerMenuView);

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
//           active={selectedCategoryId < 0}
//           onPress={allNotesPressHandler}
//         />
//       </Drawer.Section>
//       <Drawer.Section title={t('DrawerMenu_sectionCategoriesTitle')}>
//         {categoriesItemsComponent}
//         <View style={{height: 10}} />
//         <Drawer.Item
//           icon={({color, size}) => (
//             <Icon name="edit" color={color} size={size} />
//           )}
//           label={t('DrawerMenu_editCategoryItem')}
//           onPress={editCategoryPressHandler}
//         />
//       </Drawer.Section>
//       <Drawer.Section>
//         <Drawer.Item
//           icon={({color, size}) => (
//             <Icon name="notifications" color={color} size={size} />
//           )}
//           label={t('DrawerMenu_remindersItem')}
//           onPress={remindersItemPressHandler}
//         />
//         <Drawer.Item
//           icon={({color, size}) => (
//             <Icon name="delete" color={color} size={size} />
//           )}
//           label={t('DrawerMenu_recycleBinItem')}
//           onPress={recycleBinItemPressHandler}
//         />
//       </Drawer.Section>
//       <Drawer.Section>
//         <Drawer.Item
//           icon={({color, size}) => (
//             <Icon name="backup" color={color} size={size} />
//           )}
//           label={t('DrawerMenu_backupItem')}
//           onPress={backupItemPressHandler}
//         />
//         <Drawer.Item
//           icon={({color, size}) => (
//             <Icon name="settings" color={color} size={size} />
//           )}
//           label={t('DrawerMenu_settingsItem')}
//           onPress={settingsItemPressHandler}
//         />
//         <Drawer.Item
//           icon={({color, size}) => (
//             <Icon name="help" color={color} size={size} />
//           )}
//           label={t('DrawerMenu_aboutItem')}
//           onPress={aboutItemPressHandler}
//         />
//       </Drawer.Section>
//     </View>
//   </DrawerContentScrollView>
// );
