import React, {useCallback, useEffect, useState} from 'react';
import {View, Image, TouchableNativeFeedback, StyleSheet} from 'react-native';
import Services from '../../../../../services/Services';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {SystemEventsHandler} from '../../../../../utils/common/system-events-handler/SystemEventsHandler';

const NoteImageItem = ({noteId, imageId, onPress, onRemove}) => {
  const [imageBase64Data, setImageBase64Data] = useState(null);

  const imagePressHandler = useCallback(() => {
    if (onPress) {
      onPress({imageId});
    }
  }, [imageId, onPress]);

  const removeImagePressHandler = useCallback(() => {
    if (onRemove) {
      onRemove({noteId, imageId});
    }
  }, [noteId, imageId, onRemove]);

  useEffect(() => {
    const loadImage = async () => {
      const imageData = await Services.services().notesService.getNoteImage({
        noteId,
        imageId,
      });

      setImageBase64Data(imageData);
    };

    loadImage();
  }, [noteId, imageId]);

  return (
    <TouchableNativeFeedback onPress={imagePressHandler}>
      <View style={styles.mainContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            // source={{uri: 'data:image/jpg;base64,' + imageBase64Data}}
            source={{uri: imageBase64Data}}
          />
        </View>
        <TouchableNativeFeedback onPress={removeImagePressHandler}>
          <View style={styles.removeContainer}>
            <Icon name="clear" size={24} color={'#E0E0E0'} />
          </View>
        </TouchableNativeFeedback>
      </View>
    </TouchableNativeFeedback>
  );
  // return (
  //   <TouchableNativeFeedback onPress={imagePressHandler}>
  //     <View style={styles.mainContainer}>
  //       <View style={styles.imageContainer}>
  //         <Image
  //           style={styles.image}
  //           // source={{uri: 'data:image/jpg;base64,' + imageBase64Data}}
  //           source={{uri: imageBase64Data}}
  //         />
  //       </View>
  //       <TouchableNativeFeedback onPress={removeImagePressHandler}>
  //         <View style={styles.removeContainer}>
  //           <Icon name="highlight-off" size={24} color={'#E0E0E0'} />
  //         </View>
  //       </TouchableNativeFeedback>
  //     </View>
  //   </TouchableNativeFeedback>
  // );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    // resizeMode: 'stretch',
    // resizeMode: 'contain',
  },
  removeContainer: {
    width: 25,
    height: 25,
    position: 'absolute',
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#21212166',
    // borderRadius: 15,
  },
});

export default React.memo(NoteImageItem);
