import React, {useCallback} from 'react';
import {View} from 'react-native';
import {Drawer} from 'react-native-paper';
import useTranslation from '../../../../../utils/common/localization';

const DrawerNoteCategoryItem = ({category, selected, onPress}) => {
  const {t} = useTranslation();

  const categoryPressHandler = useCallback(() => {
    onPress({category});
  }, [category, onPress]);

  return (
    <Drawer.Item
      icon={({color, size}) => (
        <View
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: category.color,
          }}
        />
      )}
      label={
        category.translation_mark ? t(category.translation_mark) : category.name
      }
      active={selected}
      onPress={categoryPressHandler}
    />
  );
};

export default React.memo(DrawerNoteCategoryItem);
