const NoteTextSize = {
  TINY: 'tiny',
  SMALL: 'small',
  NORMAL: 'normal',
  LARGE: 'large',
  HUGE: 'huge',
  toFontSize: type => {
    switch (type) {
      case NoteTextSize.TINY: {
        return 14;
      }

      case NoteTextSize.SMALL: {
        return 16;
      }

      case NoteTextSize.NORMAL: {
        return 20;
      }

      case NoteTextSize.LARGE: {
        return 24;
      }

      case NoteTextSize.HUGE: {
        return 28;
      }

      default: {
        return 20;
      }
    }
  },
};

export default NoteTextSize;

// const NoteTextSize = {
//   TINY: 'tiny',
//   SMALL: 'small',
//   NORMAL: 'normal',
//   LARGE: 'large',
//   HUGE: 'huge',
//   toFontSize: type => {
//     switch (type) {
//       case NoteTextSize.TINY: {
//         return 12;
//       }
//
//       case NoteTextSize.SMALL: {
//         return 16;
//       }
//
//       case NoteTextSize.NORMAL: {
//         return 18;
//       }
//
//       case NoteTextSize.LARGE: {
//         return 23;
//       }
//
//       case NoteTextSize.HUGE: {
//         return 26;
//       }
//
//       default: {
//         return 16;
//       }
//     }
//   },
// };
//
// export default NoteTextSize;
