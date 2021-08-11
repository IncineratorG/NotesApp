import React, {useCallback, useRef, useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {RNCamera} from 'react-native-camera';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {SystemEventsHandler} from '../../../../../utils/common/system-events-handler/SystemEventsHandler';
import NoteImageQuality from '../../../../../data/common/note-image-quality/NoteImageQuality';

const Camera = ({imageQuality, onImageTaken}) => {
  const cameraRef = useRef(null);

  const [useRearCamera, setUseRearCamera] = useState(true);
  const [flashMode, setFlashMode] = useState('off');

  const switchCameraTypePressHandler = useCallback(() => {
    setUseRearCamera(prev => !prev);
  }, []);

  const changeFlashModePressHandler = useCallback(() => {
    setFlashMode(prev => {
      if (prev === 'off') {
        return 'on';
      } else if (prev === 'on') {
        return 'auto';
      } else {
        return 'off';
      }
    });
  }, []);

  const takePhotoPressHandler = useCallback(async () => {
    const imageQualityValue = NoteImageQuality.toQualityValue(imageQuality);

    SystemEventsHandler.onInfo({
      info: 'Camera->takePhotoPressHandler(): ' + imageQualityValue,
    });

    const options = {
      quality: imageQualityValue,
      base64: true,
      doNotSave: true,
    };

    const {
      width,
      height,
      uri,
      base64,
      exif,
      pictureOrientation,
      deviceOrientation,
    } = await cameraRef.current.takePictureAsync(options);

    SystemEventsHandler.onInfo({
      info:
        'Camera->takePhotoPressHandler(): ' +
        width +
        ' - ' +
        height +
        ' - ' +
        uri +
        ' - ' +
        pictureOrientation +
        ' - ' +
        deviceOrientation +
        ' - ' +
        exif +
        ' : ' +
        base64.length,
    });

    if (onImageTaken) {
      onImageTaken({base64});
    }
  }, [imageQuality, onImageTaken]);

  const camera = (
    <RNCamera
      ref={cameraRef}
      style={styles.camera}
      captureAudio={false}
      type={
        useRearCamera
          ? RNCamera.Constants.Type.back
          : RNCamera.Constants.Type.front
      }
      flashMode={
        flashMode === 'on'
          ? RNCamera.Constants.FlashMode.on
          : flashMode === 'off'
          ? RNCamera.Constants.FlashMode.off
          : RNCamera.Constants.FlashMode.auto
      }
      androidCameraPermissionOptions={{
        title: 'Permission to use camera',
        message: 'We need your permission to use your camera',
        buttonPositive: 'Ok',
        buttonNegative: 'Cancel',
      }}
    />
  );

  const changeCameraTypeButton = (
    <TouchableOpacity onPress={switchCameraTypePressHandler}>
      <View style={styles.changeCameraTypeButton}>
        <Icon name="flip-camera-ios" size={24} color={'white'} />
      </View>
    </TouchableOpacity>
  );

  const takePictureButton = (
    <TouchableOpacity onPress={takePhotoPressHandler}>
      <View style={styles.takePictureButton}>
        <View style={styles.takePictureButtonIconContainer}>
          <Icon name="photo-camera" size={32} color={'white'} />
        </View>
      </View>
    </TouchableOpacity>
  );

  const changeFlashModeButton = (
    <TouchableOpacity onPress={changeFlashModePressHandler}>
      <View style={styles.changeFlashModeButton}>
        <Icon
          name={
            flashMode === 'off'
              ? 'flash-off'
              : flashMode === 'on'
              ? 'flash-on'
              : 'flash-auto'
          }
          size={24}
          color={'white'}
        />
      </View>
    </TouchableOpacity>
  );

  const buttons = (
    <View style={styles.buttonsContainer}>
      {changeCameraTypeButton}
      <View style={styles.freeSpace} />
      {takePictureButton}
      <View style={styles.freeSpace} />
      {changeFlashModeButton}
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      {camera}
      {buttons}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  freeSpace: {
    flex: 1,
  },
  buttonsContainer: {
    position: 'absolute',
    height: 50,
    left: 0,
    right: 0,
    bottom: 0,
    marginBottom: 40,
    alignItems: 'center',
    flexDirection: 'row',
  },
  takePictureButton: {
    width: 75,
    height: 75,
    backgroundColor: 'red',
    borderRadius: 38,
    borderWidth: 2,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  takePictureButtonIconContainer: {
    width: 70,
    height: 70,
    backgroundColor: 'red',
    borderRadius: 38,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  changeCameraTypeButton: {
    width: 50,
    height: 50,
    borderRadius: 38,
    borderWidth: 1,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 30,
  },
  changeFlashModeButton: {
    width: 50,
    height: 50,
    borderRadius: 38,
    borderWidth: 1,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 30,
  },
});

export default React.memo(Camera);
