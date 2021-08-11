import React, {useCallback, useEffect, useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {Dialog, Button, Portal} from 'react-native-paper';
import useTranslation from '../../../../utils/common/localization';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import ColorPickerItem from './item/ColorPickerItem';

const ColorPicker = ({visible, currentColor, onColorSelected, onCancel}) => {
  const {t} = useTranslation();

  const [selectedColor, setSelectedColor] = useState('white');

  const colors = useSelector(store => store.categories.categoriesColors.colors);

  const selectPressHandler = useCallback(() => {
    onColorSelected({color: selectedColor});
  }, [selectedColor, onColorSelected]);

  const colorPressHandler = useCallback(({color}) => {
    setSelectedColor(color);
  }, []);

  useEffect(() => {
    setSelectedColor(currentColor);
  }, [currentColor]);

  // const onLayoutHandler = useCallback(event => {
  //   if (event && event.nativeEvent && event.nativeEvent.layout) {
  //     const {width, height} = event.nativeEvent.layout;
  //
  //     let columns = Math.floor(width / 50);
  //     setNumColumns(columns);
  //   }
  // }, []);

  const renderItem = useCallback(
    ({item}) => {
      return (
        <ColorPickerItem
          color={item}
          isSelected={item === selectedColor}
          onPress={colorPressHandler}
        />
      );
    },
    [selectedColor, colorPressHandler],
  );

  const keyExtractor = useCallback(item => {
    return item.toString();
  }, []);

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onCancel}>
        <Dialog.Title>{t('ColorPicker_title')}</Dialog.Title>
        <Dialog.Content>
          <View
            // onLayout={onLayoutHandler}
            style={styles.mainContainer}>
            <FlatList
              data={colors}
              numColumns={5}
              showsVerticalScrollIndicator={false}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
            />
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={selectPressHandler}>
            {t('ColorPicker_selectButton')}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default React.memo(ColorPicker);

// import React, {useCallback, useEffect, useState} from 'react';
// import {View, StyleSheet} from 'react-native';
// import {useSelector} from 'react-redux';
// import {Dialog, Button, Portal} from 'react-native-paper';
// import useTranslation from '../../../../utils/common/localization';
// import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
// import ColorPickerItem from './item/ColorPickerItem';
//
// const ColorPicker = ({visible, currentColor, onColorSelected, onCancel}) => {
//   const {t} = useTranslation();
//
//   const [selectedColor, setSelectedColor] = useState('white');
//
//   const colors = useSelector(store => store.categories.categoriesColors.colors);
//
//   const selectPressHandler = useCallback(() => {
//     onColorSelected({color: selectedColor});
//   }, [selectedColor, onColorSelected]);
//
//   const colorPressHandler = useCallback(({color}) => {
//     setSelectedColor(color);
//   }, []);
//
//   const colorComponents = colors.map(color => {
//     return (
//       <ColorPickerItem
//         key={color.toString()}
//         color={color}
//         isSelected={color === selectedColor}
//         onPress={colorPressHandler}
//       />
//     );
//   });
//
//   useEffect(() => {
//     setSelectedColor(currentColor);
//   }, [currentColor]);
//
//   return (
//     <Portal>
//       <Dialog visible={visible} onDismiss={onCancel}>
//         <Dialog.Title>{t('ColorPicker_title')}</Dialog.Title>
//         <Dialog.Content>
//           <View style={styles.mainContainer}>{colorComponents}</View>
//         </Dialog.Content>
//         <Dialog.Actions>
//           <Button onPress={selectPressHandler}>
//             {t('ColorPicker_selectButton')}
//           </Button>
//         </Dialog.Actions>
//       </Dialog>
//     </Portal>
//   );
// };
//
// const styles = StyleSheet.create({
//   mainContainer: {
//     height: 250,
//     flexWrap: 'wrap',
//     alignContent: 'space-around',
//   },
//   rowContainer: {
//     height: 50,
//     backgroundColor: 'grey',
//   },
// });
//
// export default React.memo(ColorPicker);
