import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableNativeFeedback,
  StyleSheet,
} from 'react-native';
import {Dialog, Button, Portal} from 'react-native-paper';
import useTranslation from '../../../../utils/common/localization';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ColorPicker from '../color-picker/ColorPicker';

const CreateCategoryDialog = ({
  visible,
  defaultColor,
  onOkPress,
  onCancelPress,
}) => {
  const {t} = useTranslation();

  const [categoryName, setCategoryName] = useState('');
  const [categoryColor, setCategoryColor] = useState('white');
  const [defaultCategory, setDefaultCategory] = useState(false);
  const [colorPickerVisible, setColorPickerVisible] = useState(false);

  const okPressHandler = useCallback(() => {
    onOkPress({
      name: categoryName,
      color: categoryColor,
      isDefault: defaultCategory,
    });

    setCategoryName('');
    setCategoryColor(defaultColor);
    setDefaultCategory(false);
  }, [categoryName, categoryColor, defaultCategory, defaultColor, onOkPress]);

  const colorPressHandler = useCallback(() => {
    setColorPickerVisible(true);
  }, []);

  const defaultCategoryPressHandler = useCallback(() => {
    setDefaultCategory(prev => !prev);
  }, []);

  const changeCategoryNameHandler = useCallback(text => {
    setCategoryName(text);
  }, []);

  const colorPickerCancelHandler = useCallback(() => {
    setColorPickerVisible(false);
  }, []);

  const colorPickerColorSelectedHandler = useCallback(({color}) => {
    setCategoryColor(color);
    setColorPickerVisible(false);
  }, []);

  const checkboxUncheckedIconComponent = (
    <Icon name="check-box-outline-blank" size={24} color={'grey'} />
  );
  const checkboxCheckedIconComponent = (
    <Icon name="check-box" size={24} color={'#018786'} />
  );

  const colorPickerComponent = (
    <ColorPicker
      visible={colorPickerVisible}
      currentColor={categoryColor}
      onColorSelected={colorPickerColorSelectedHandler}
      onCancel={colorPickerCancelHandler}
    />
  );

  useEffect(() => {
    setCategoryColor(defaultColor);
  }, [defaultColor]);

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onCancelPress}>
        <Dialog.Title>{t('CreateCategoryDialog_title')}</Dialog.Title>
        <Dialog.Content>
          <View style={styles.mainContainer}>
            <View style={styles.categoryNameContainer}>
              <TextInput
                style={{fontSize: 18, color: '#000000'}}
                defaultValue={categoryName}
                // value={categoryName}
                // autoCorrect={false}
                onChangeText={changeCategoryNameHandler}
              />
            </View>
            <View style={styles.underline} />
            <TouchableNativeFeedback onPress={colorPressHandler}>
              <View style={styles.categoryColorContainer}>
                <View style={styles.colorContainer}>
                  <View
                    style={[
                      styles.categoryColor,
                      {backgroundColor: categoryColor},
                    ]}
                  />
                </View>
                <View style={styles.colorTitleContainer}>
                  <Text style={styles.categoryColorTitle}>
                    {t('CreateCategoryDialog_colorTitle')}
                  </Text>
                </View>
                <View style={styles.colorIconContainer}>
                  <Icon name="arrow-drop-down" size={24} color={'black'} />
                </View>
              </View>
            </TouchableNativeFeedback>
            <View style={styles.underline} />
            <TouchableNativeFeedback onPress={defaultCategoryPressHandler}>
              <View style={styles.defaultCheckmarkContainer}>
                <View style={styles.checkmarkContainer}>
                  {defaultCategory
                    ? checkboxCheckedIconComponent
                    : checkboxUncheckedIconComponent}
                </View>
                <View style={styles.checmarkTextContainer}>
                  <Text style={styles.checmarkText}>
                    {t('CreateCategoryDialog_defaultCheckmarkText')}
                  </Text>
                </View>
              </View>
            </TouchableNativeFeedback>
            <View style={styles.underline} />
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={okPressHandler}>
            {t('CreateCategoryDialog_okButton')}
          </Button>
          <Button onPress={onCancelPress}>
            {t('CreateCategoryDialog_cancelButton')}
          </Button>
        </Dialog.Actions>
      </Dialog>
      {colorPickerComponent}
    </Portal>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    minHeight: 150,
  },
  underline: {
    height: 1,
    backgroundColor: 'black',
  },
  categoryNameContainer: {
    minHeight: 50,
  },
  categoryName: {
    fontSize: 18,
  },
  categoryColorContainer: {
    minHeight: 50,
    flexDirection: 'row',
  },
  colorContainer: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryColor: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'red',
  },
  colorTitleContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  categoryColorTitle: {
    fontSize: 16,
  },
  colorIconContainer: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  defaultCheckmarkContainer: {
    height: 50,
    flexDirection: 'row',
  },
  checkmarkContainer: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checmarkTextContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  checmarkText: {
    fontSize: 16,
  },
});

export default React.memo(CreateCategoryDialog);
