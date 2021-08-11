import React from 'react';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import useTranslation from '../../../../utils/common/localization';
import BackupHeaderMenuItem from './item/BackupHeaderMenuItem';

const BackupHeaderMenu = ({
  visible,
  isLoggedIn,
  onRefresh,
  onLogIn,
  onLogOut,
  onClose,
}) => {
  const {t} = useTranslation();

  const logInOptionComponent = (
    <BackupHeaderMenuItem text={t('BackupHeaderMenu_logInOption')} />
  );

  const logOutOptionComponent = (
    <BackupHeaderMenuItem text={t('BackupHeaderMenu_logOutOption')} />
  );

  return (
    <Menu opened={visible} onBackdropPress={onClose}>
      <MenuTrigger text="" />
      <MenuOptions>
        <MenuOption
          children={
            <BackupHeaderMenuItem text={t('BackupHeaderMenu_refreshOption')} />
          }
          onSelect={onRefresh}
        />
        <MenuOption
          children={isLoggedIn ? logOutOptionComponent : logInOptionComponent}
          onSelect={isLoggedIn ? onLogOut : onLogIn}
        />
      </MenuOptions>
    </Menu>
  );
};

export default React.memo(BackupHeaderMenu);
