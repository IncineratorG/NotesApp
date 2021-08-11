import React, {useState, useCallback, useEffect} from 'react';
import {View, StyleSheet, Modal, TouchableNativeFeedback} from 'react-native';
import {ImageViewer} from 'react-native-image-zoom-viewer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {SystemEventsHandler} from '../../../../utils/common/system-events-handler/SystemEventsHandler';
import Services from '../../../../services/Services';

const ImageViewerModal = ({
  visible,
  noteId,
  images,
  initialIndex,
  onRemove,
  onClose,
}) => {
  const [imagesData, setImagesData] = useState([]);
  const [viewerInitialIndex, setViewerInitialIndex] = useState(0);

  const arrowBackHandler = useCallback(() => {
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  const requestCloseHandler = useCallback(() => {
    if (onClose) {
      onClose();
      setImagesData([]);
    }
  }, [onClose]);

  const onShowHandler = useCallback(() => {}, []);

  const onRemoveImageHandler = useCallback(
    imageIndex => {
      if (onRemove) {
        onRemove(imagesData[imageIndex].imageId);
      }
    },
    [imagesData, onRemove],
  );

  const changeImageHandler = useCallback(
    async index => {
      SystemEventsHandler.onInfo({info: 'CHANGE_IMAGE'});

      const prevImageIndex = index - 1;
      const nextImageIndex = index + 1;
      let needLoadPrevImageData = false;
      let needLoadNextImageData = false;

      if (prevImageIndex >= 0 && !imagesData[prevImageIndex].url) {
        needLoadPrevImageData = true;
      }
      if (
        nextImageIndex < imagesData.length &&
        !imagesData[nextImageIndex].url
      ) {
        needLoadNextImageData = true;
      }

      if (!needLoadPrevImageData && !needLoadNextImageData) {
        return;
      }

      const updatedImagesData = [...imagesData];
      if (needLoadPrevImageData) {
        updatedImagesData[
          prevImageIndex
        ].url = await Services.services().notesService.getNoteImage({
          noteId,
          imageId: updatedImagesData[prevImageIndex].imageId,
        });
      }
      if (needLoadNextImageData) {
        updatedImagesData[
          nextImageIndex
        ].url = await Services.services().notesService.getNoteImage({
          noteId,
          imageId: updatedImagesData[nextImageIndex].imageId,
        });
      }

      setImagesData(updatedImagesData);
    },
    [imagesData, noteId],
  );

  useEffect(() => {
    setImagesData(images);
    setViewerInitialIndex(initialIndex);
  }, [images, initialIndex]);

  return (
    <Modal
      visible={visible}
      transparent={false}
      onShow={onShowHandler}
      onRequestClose={requestCloseHandler}>
      <ImageViewer
        imageUrls={imagesData}
        onCancel={onClose}
        useNativeDriver={false}
        index={viewerInitialIndex}
        enablePreload={false}
        onChange={changeImageHandler}
        renderHeader={currentIndex => {
          const removeImageHandler = () => {
            onRemoveImageHandler(currentIndex);
          };

          return (
            <View style={styles.mainContainer}>
              <TouchableNativeFeedback onPress={arrowBackHandler}>
                <View style={styles.arrowBackContainer}>
                  <Icon name="arrow-back" size={26} color={'#ffffff'} />
                </View>
              </TouchableNativeFeedback>
              <View style={styles.freeSpace} />
              <TouchableNativeFeedback onPress={removeImageHandler}>
                <View style={styles.removeImageContainer}>
                  <Icon name="delete" size={26} color={'#ffffff'} />
                </View>
              </TouchableNativeFeedback>
            </View>
          );
        }}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: 50,
    alignSelf: 'stretch',
    flexDirection: 'row',
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
  removeImageContainer: {
    height: 50,
    width: 50,
    backgroundColor: '#00000066',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default React.memo(ImageViewerModal);
