import React, {useCallback} from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import useTranslation from '../../../../../utils/common/localization';
import {SystemEventsHandler} from '../../../../../utils/common/system-events-handler/SystemEventsHandler';

const EditableCategoriesListItem = ({
  category,
  onDragMarkerPress,
  onCategoryPress,
  onRemovePress,
}) => {
  const {t} = useTranslation();

  const categoryPressHandler = useCallback(() => {
    onCategoryPress({category});
  }, [category, onCategoryPress]);

  const deleteCategoryPressHandler = useCallback(() => {
    onRemovePress({category});
  }, [category, onRemovePress]);

  const deleteIconComponent = (
    <TouchableWithoutFeedback onPress={deleteCategoryPressHandler}>
      <View style={styles.deleteIconContainer}>
        <Icon name="clear" size={20} color={'grey'} />
      </View>
    </TouchableWithoutFeedback>
  );
  const defaultTextComponent = (
    <View style={styles.defaultTextContainer}>
      <Text style={styles.defaultText}>
        {t('EditableCategoriesListItem_byDefault')}
      </Text>
    </View>
  );

  const tailComponent = category.isDefault
    ? defaultTextComponent
    : deleteIconComponent;

  return (
    <TouchableNativeFeedback onPress={categoryPressHandler}>
      <View style={styles.mainContainer}>
        <TouchableWithoutFeedback
          delayLongPress={100}
          onLongPress={onDragMarkerPress}>
          <View style={styles.dragIconContainer}>
            <Icon name="drag-indicator" size={20} color={'grey'} />
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.categoryColorContainer}>
          <View
            style={[styles.categoryColor, {backgroundColor: category.color}]}
          />
        </View>
        <View style={styles.categoryNameContainer}>
          <Text
            style={styles.categoryName}
            numberOfLines={1}
            ellipsizeMode={'tail'}>
            {category.translation_mark
              ? t(category.translation_mark)
              : category.name}
          </Text>
        </View>
        {tailComponent}
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: 50,
    backgroundColor: 'white',
    flexDirection: 'row',
    elevation: 4,
  },
  dragIconContainer: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryColorContainer: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryColor: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  categoryNameContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  categoryName: {
    fontSize: 16,
  },
  deleteIconContainer: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  defaultTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 4,
    paddingRight: 14,
  },
  defaultText: {
    fontWeight: 'bold',
    fontSize: 13,
  },
});

export default React.memo(EditableCategoriesListItem);
