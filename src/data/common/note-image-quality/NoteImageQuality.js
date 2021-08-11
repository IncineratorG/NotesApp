const NoteImageQuality = {
  ORIGINAL: 'original',
  GOOD: 'good',
  AVERAGE: 'average',
  LOW: 'low',
  VERY_LOW: 'very_low',
  toImageSize: type => {
    let sizeObject = {width: 0, height: 0};

    switch (type) {
      case NoteImageQuality.ORIGINAL: {
        // sizeObject.width = 19200;
        // sizeObject.height = 10800;
        // break;
      }

      case NoteImageQuality.GOOD: {
        // sizeObject.width = 2560;
        // sizeObject.height = 1440;
        // break;
      }

      case NoteImageQuality.AVERAGE: {
        sizeObject.width = 1920;
        sizeObject.height = 1080;
        break;
      }

      case NoteImageQuality.LOW: {
        sizeObject.width = 1280;
        sizeObject.height = 720;
        break;
      }

      case NoteImageQuality.VERY_LOW: {
        sizeObject.width = 640;
        sizeObject.height = 480;
        break;
      }

      default: {
        sizeObject.width = 1920;
        sizeObject.height = 1080;
      }
    }

    return sizeObject;
  },
  toQualityValue: type => {
    let value = 0.8;

    switch (type) {
      case NoteImageQuality.ORIGINAL: {
        value = 1.0;
        break;
      }

      case NoteImageQuality.GOOD: {
        value = 0.9;
        break;
      }

      case NoteImageQuality.AVERAGE: {
        value = 0.7;
        break;
      }

      case NoteImageQuality.LOW: {
        value = 0.4;
        break;
      }

      case NoteImageQuality.VERY_LOW: {
        value = 0.2;
        break;
      }

      default: {
        value = 0.8;
      }
    }

    return value;
  },
};

export default NoteImageQuality;

// const NoteImageQuality = {
//   ORIGINAL: 'original',
//   GOOD: 'good',
//   AVERAGE: 'average',
//   LOW: 'low',
//   VERY_LOW: 'very_low',
//   toImageSize: type => {
//     let sizeObject = {width: 0, height: 0};
//
//     switch (type) {
//       case NoteImageQuality.ORIGINAL: {
//         sizeObject.width = 19200;
//         sizeObject.height = 10800;
//         break;
//       }
//
//       case NoteImageQuality.GOOD: {
//         sizeObject.width = 2560;
//         sizeObject.height = 1440;
//         break;
//       }
//
//       case NoteImageQuality.AVERAGE: {
//         sizeObject.width = 1920;
//         sizeObject.height = 1080;
//         break;
//       }
//
//       case NoteImageQuality.LOW: {
//         sizeObject.width = 1280;
//         sizeObject.height = 720;
//         break;
//       }
//
//       case NoteImageQuality.VERY_LOW: {
//         sizeObject.width = 640;
//         sizeObject.height = 480;
//         break;
//       }
//
//       default: {
//         sizeObject.width = 1920;
//         sizeObject.height = 1080;
//       }
//     }
//
//     return sizeObject;
//   },
// };
//
// export default NoteImageQuality;
