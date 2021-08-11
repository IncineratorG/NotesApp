import React from 'react';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import RecycleBinHeaderMenuItem from './item/RecycleBinHeaderMenuItem';
import useTranslation from '../../../../utils/common/localization';

const RecycleBinHeaderMenu = ({
  visible,
  clearAllOptionAvailable,
  onClearAll,
  onClose,
}) => {
  const {t} = useTranslation();

  const clearAllOptionComponent = (
    <RecycleBinHeaderMenuItem text={t('RecycleBinHeaderMenu_clearAllOption')} />
  );

  return (
    <Menu opened={visible} onBackdropPress={onClose}>
      <MenuTrigger text="" />
      <MenuOptions>
        <MenuOption
          disableTouchable={!clearAllOptionAvailable}
          children={clearAllOptionComponent}
          onSelect={onClearAll}
        />
      </MenuOptions>
    </Menu>
  );
};

export default React.memo(RecycleBinHeaderMenu);
