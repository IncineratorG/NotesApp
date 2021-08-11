const SystemEventsHandler = (function () {
  let counter = 0;
  const infoVerbose = false;
  const errorVerbose = true;

  const onError = ({err}) => {
    if (errorVerbose) {
      console.log(err);
    }
  };

  const onInfo = ({info}) => {
    if (!infoVerbose) {
      return;
    }

    console.log(info);

    // if (info === 'RENDERED') {
    //   console.log(info + ' ' + ++this.#counter);
    // } else {
    //   console.log(info);
    // }
  };

  const onInfoDetailed = ({comp = '', func = '', info = ''}) => {
    if (!infoVerbose) {
      return;
    }

    if (func) {
      if (comp && comp !== '') {
        func = '->' + func;
      }
    }
    if (info) {
      info = '->' + info;
    } else {
      info = '';
    }

    console.log(comp + func + info);
  };

  return {
    onError,
    onInfo,
    onInfoDetailed,
  };
})();

export {SystemEventsHandler};

// export class SystemEventsHandler {
//   static #counter = 0;
//   static #infoVerbose = true;
//   static #errorVerbose = true;
//
//   static onError({err}) {
//     if (this.#errorVerbose) {
//       console.log(err);
//     }
//   }
//
//   static onInfo({info}) {
//     if (!this.#infoVerbose) {
//       return;
//     }
//
//     console.log(info);
//
//     // if (info === 'RENDERED') {
//     //   console.log(info + ' ' + ++this.#counter);
//     // } else {
//     //   console.log(info);
//     // }
//   }
//
//   static onInfoDetailed({comp = '', func = '', info = ''}) {
//     if (!this.#infoVerbose) {
//       return;
//     }
//
//     if (func) {
//       if (comp && comp !== '') {
//         func = '->' + func;
//       }
//     }
//     if (info) {
//       info = '->' + info;
//     } else {
//       info = '';
//     }
//
//     console.log(comp + func + info);
//   }
// }
