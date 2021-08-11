import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import NoteImageItem from './item/NoteImageItem';
import NoteImageHasMoteItems from './item/NoteImageHasMoreItems';

const NoteImages = ({
  noteId,
  images,
  onImagePress,
  onMoreImagesPress,
  onImageRemovePress,
}) => {
  const [imagesComponents, setImagesComponents] = useState([]);

  const imagePressHandler = useCallback(
    ({imageId}) => {
      if (onImagePress) {
        onImagePress({imageId});
      }
    },
    [onImagePress],
  );

  const removeImagePressHandler = useCallback(
    // eslint-disable-next-line no-shadow
    ({noteId, imageId}) => {
      if (onImageRemovePress) {
        onImageRemovePress({noteId, imageId});
      }
    },
    [onImageRemovePress],
  );

  const onMoreImagesPressHandler = useCallback(() => {
    if (onMoreImagesPress) {
      onMoreImagesPress();
    }
  }, [onMoreImagesPress]);

  useEffect(() => {
    // SystemEventsHandler.onInfo({info: 'NotesImages->SIZE: ' + images.length});

    const tempImagesComponents = [];

    switch (images.length) {
      case 0: {
        break;
      }

      case 1: {
        tempImagesComponents.push(
          <NoteImageItem
            key={images[0]}
            noteId={noteId}
            imageId={images[0]}
            onPress={imagePressHandler}
            onRemove={removeImagePressHandler}
          />,
        );
        break;
      }

      case 2: {
        tempImagesComponents.push(
          <NoteImageItem
            key={images[0]}
            noteId={noteId}
            imageId={images[0]}
            onPress={imagePressHandler}
            onRemove={removeImagePressHandler}
          />,
        );
        tempImagesComponents.push(
          <NoteImageItem
            key={images[1]}
            noteId={noteId}
            imageId={images[1]}
            onPress={imagePressHandler}
            onRemove={removeImagePressHandler}
          />,
        );
        break;
      }

      case 3: {
        tempImagesComponents.push(
          <NoteImageItem
            key={images[0]}
            noteId={noteId}
            imageId={images[0]}
            onPress={imagePressHandler}
            onRemove={removeImagePressHandler}
          />,
        );
        tempImagesComponents.push(
          <NoteImageItem
            key={images[1]}
            noteId={noteId}
            imageId={images[1]}
            onPress={imagePressHandler}
            onRemove={removeImagePressHandler}
          />,
        );
        tempImagesComponents.push(
          <NoteImageItem
            key={images[2]}
            noteId={noteId}
            imageId={images[2]}
            onPress={imagePressHandler}
            onRemove={removeImagePressHandler}
          />,
        );
        break;
      }

      default: {
        const remainingItems = images.length - 2;

        tempImagesComponents.push(
          <NoteImageItem
            key={images[0]}
            noteId={noteId}
            imageId={images[0]}
            onPress={imagePressHandler}
            onRemove={removeImagePressHandler}
          />,
        );
        tempImagesComponents.push(
          <NoteImageItem
            key={images[1]}
            noteId={noteId}
            imageId={images[1]}
            onPress={imagePressHandler}
            onRemove={removeImagePressHandler}
          />,
        );
        tempImagesComponents.push(
          <NoteImageHasMoteItems
            key={'more_items'}
            remainingImagesCount={remainingItems}
            onPress={onMoreImagesPressHandler}
          />,
        );
        break;
      }
    }
    setImagesComponents(tempImagesComponents);
  }, [
    noteId,
    images,
    imagePressHandler,
    removeImagePressHandler,
    onMoreImagesPressHandler,
  ]);

  return <View style={styles.mainContainer}>{imagesComponents}</View>;
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'black',
    flexDirection: 'row',
  },
});

export default React.memo(NoteImages);
