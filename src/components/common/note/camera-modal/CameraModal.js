import React, {useState, useCallback, useEffect} from 'react';
import {View, StyleSheet, Modal, TouchableNativeFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import Camera from './camera/Camera';
import CameraPhotoPreview from './camera-photo-preview/CameraPhotoPreview';

const CameraModal = ({visible, imageQuality, onPhotoAccepted, onClose}) => {
  const [
    photoPreviewComponentVisible,
    setPhotoPreviewComponentVisible,
  ] = useState(false);
  const [base64PhotoPreview, setBase64PhotoPreview] = useState(null);

  const requestCloseHandler = useCallback(() => {}, []);

  const arrowBackHandler = useCallback(() => {
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  const cameraImageTakenHandler = useCallback(({base64}) => {
    SystemEventsHandler.onInfo({
      info: 'CameraModal->cameraImageTakenHandler(): ' + base64.length,
    });

    const type = 'image/jpg';
    const typedBase64 = 'data:' + type + ';base64,' + base64;

    setBase64PhotoPreview(typedBase64);
    setPhotoPreviewComponentVisible(true);
  }, []);

  const cameraPhotoPreviewImageAcceptedHandler = useCallback(() => {
    onPhotoAccepted({typedBase64Image: base64PhotoPreview});
  }, [base64PhotoPreview, onPhotoAccepted]);

  const cameraPhotoPreviewImageRejectedHandler = useCallback(() => {
    setPhotoPreviewComponentVisible(false);
  }, []);

  const cameraComponent = (
    <Camera
      imageQuality={imageQuality}
      onImageTaken={cameraImageTakenHandler}
    />
  );
  const cameraPhotoPreviewComponent = (
    <CameraPhotoPreview
      base64Image={base64PhotoPreview}
      onPhotoAccepted={cameraPhotoPreviewImageAcceptedHandler}
      onPhotoRejected={cameraPhotoPreviewImageRejectedHandler}
    />
  );

  const contentComponent = photoPreviewComponentVisible
    ? cameraPhotoPreviewComponent
    : cameraComponent;

  useEffect(() => {
    if (!visible) {
      setPhotoPreviewComponentVisible(false);
      setBase64PhotoPreview(null);
    }
  }, [visible]);

  return (
    <Modal visible={visible} onRequestClose={requestCloseHandler}>
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <TouchableNativeFeedback onPress={arrowBackHandler}>
            <View style={styles.arrowBackContainer}>
              <Icon name="arrow-back" size={26} color={'#ffffff'} />
            </View>
          </TouchableNativeFeedback>
          <View style={styles.freeSpace} />
        </View>
        <View style={styles.contentContainer}>{contentComponent}</View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignSelf: 'stretch',
  },
  headerContainer: {
    height: 50,
    alignSelf: 'stretch',
    flexDirection: 'row',
    backgroundColor: 'black',
  },
  arrowBackContainer: {
    height: 50,
    width: 50,
    backgroundColor: '#00000066',
    alignItems: 'center',
    justifyContent: 'center',
  },
  freeSpace: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
});

export default React.memo(CameraModal);
