import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CameraPhotoPreview = ({
  base64Image,
  onPhotoAccepted,
  onPhotoRejected,
}) => {
  const positiveButton = (
    <TouchableOpacity onPress={onPhotoAccepted}>
      <View style={styles.positiveButtonContainer}>
        <Icon name="done" size={48} color={'green'} />
      </View>
    </TouchableOpacity>
  );

  const negativeButton = (
    <TouchableOpacity onPress={onPhotoRejected}>
      <View style={styles.negativeButtonContainer}>
        <Icon name="close" size={48} color={'red'} />
      </View>
    </TouchableOpacity>
  );

  const image = (
    <View style={styles.imageContainer}>
      <Image style={styles.image} source={{uri: base64Image}} />
    </View>
  );

  const buttons = (
    <View style={styles.buttonsContainer}>
      {negativeButton}
      <View style={styles.freeSpace} />
      {positiveButton}
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      {image}
      {buttons}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  buttonsContainer: {
    position: 'absolute',
    height: 100,
    left: 0,
    right: 0,
    bottom: 0,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  positiveButtonContainer: {
    height: 75,
    width: 75,
    backgroundColor: 'white',
    marginRight: 40,
    borderRadius: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  freeSpace: {
    flex: 1,
    backgroundColor: 'white',
  },
  negativeButtonContainer: {
    height: 75,
    width: 75,
    backgroundColor: 'white',
    marginLeft: 40,
    borderRadius: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default React.memo(CameraPhotoPreview);
