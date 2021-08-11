const ImagesCache = () => {
  const limit = 10;
  let currentIndex = -1;
  let imagesData = Array.from(Array(limit), () => {
    return {imageId: null, imageData: null};
  });

  const set = ({imageId, imageData}) => {
    ++currentIndex;
    if (currentIndex === limit) {
      currentIndex = 0;
    }

    imagesData[currentIndex] = {imageId, imageData};
  };

  const get = imageId => {
    for (let i = 0; i < imagesData.length; ++i) {
      if (imagesData[i].imageId === imageId) {
        return imagesData[i].imageData;
      }
    }
    return null;
  };

  return {
    set,
    get,
  };
};

export default ImagesCache;
