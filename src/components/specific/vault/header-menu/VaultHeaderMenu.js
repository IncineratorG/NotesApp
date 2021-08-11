import React from 'react';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import useTranslation from '../../../../utils/common/localization';
import VaultHeaderMenuItem from './item/VaultHeaderMenuItem';

const VaultHeaderMenu = ({visible, onChangePassword, onExit, onClose}) => {
  const {t} = useTranslation();

  const changePasswordOption = (
    <VaultHeaderMenuItem
      text={t('VaultHeaderMenu_changeVaultPasswordOption')}
    />
  );
  const exitOption = (
    <VaultHeaderMenuItem text={t('VaultHeaderMenu_exitVaultOption')} />
  );

  return (
    <Menu opened={visible} onBackdropPress={onClose}>
      <MenuTrigger text="" />
      <MenuOptions>
        <MenuOption
          children={changePasswordOption}
          onSelect={onChangePassword}
        />
        <MenuOption children={exitOption} onSelect={onExit} />
      </MenuOptions>
    </Menu>
  );
};

export default React.memo(VaultHeaderMenu);
