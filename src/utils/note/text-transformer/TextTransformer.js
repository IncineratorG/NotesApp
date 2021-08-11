import {SystemEventsHandler} from '../../common/system-events-handler/SystemEventsHandler';

const TextTransformer = () => {
  // let currentDateTimestamp = Date.now();
  let itemIdCounter = 1;
  const CHECKED_ITEM_PREFIX = '*(';
  const CHECKED_ITEM_POSTFIX = ')';
  const CHECKED_ITEM_PREFIX_LENGTH = CHECKED_ITEM_PREFIX.length;
  const CHECKED_ITEM_POSTFIX_LENGTH = CHECKED_ITEM_POSTFIX.length;

  const isTextChecked = ({text}) => {
    return (
      text.startsWith(CHECKED_ITEM_PREFIX) &&
      text.endsWith(CHECKED_ITEM_POSTFIX)
    );
  };

  const makeTextChecked = ({text}) => {
    return CHECKED_ITEM_PREFIX + text + CHECKED_ITEM_POSTFIX;
  };

  const makeTextUnchecked = ({text}) => {
    return text.slice(
      CHECKED_ITEM_PREFIX_LENGTH,
      text.length - CHECKED_ITEM_POSTFIX_LENGTH,
    );
  };

  const toList = ({text}) => {
    return text.split('\n').map((value, index) => {
      return {
        // id: ++currentDateTimestamp,
        id: String(++itemIdCounter),
        text: value,
      };
    });
  };

  const toText = ({listData}) => {
    const lastItemIndex = listData.length - 1;
    let resultText = '';
    listData.forEach((textData, index) => {
      if (index === lastItemIndex) {
        resultText = resultText + textData.text;
      } else {
        resultText = resultText + textData.text + '\n';
      }
    });
    return resultText;
  };

  const toUncheckedText = ({text}) => {
    const textArray = text.split('\n').map(value => {
      if (isTextChecked({text: value})) {
        return makeTextUnchecked({text: value});
      }
      return value;
    });

    let resultText = '';
    textArray.forEach((value, index) => {
      if (index === textArray.length) {
        resultText = resultText + value;
      } else {
        resultText = resultText + value + '\n';
      }
    });

    return resultText;
  };

  const updateListDataItem = ({oldListData, updatedListItem}) => {
    return oldListData.map(item => {
      if (item.id === updatedListItem.id) {
        return {
          id: updatedListItem.id,
          text: isTextChecked({text: item.text})
            ? makeTextChecked({text: updatedListItem.text})
            : updatedListItem.text,
        };
      }
      return item;
    });
  };

  const removeListDataItem = ({oldListData, itemId}) => {
    let updatedListData = oldListData.filter(item => item.id !== itemId);
    if (updatedListData.length <= 0) {
      updatedListData.push({id: String(++itemIdCounter), text: ''});
    }

    return updatedListData;
  };

  const moveCheckedItemsToBottom = ({listData}) => {
    const uncheckedItems = [];
    const checkedItems = [];
    for (let i = 0; i < listData.length; ++i) {
      if (isTextChecked({text: listData[i].text})) {
        checkedItems.push(listData[i]);
      } else {
        uncheckedItems.push(listData[i]);
      }
    }

    return uncheckedItems.concat(checkedItems);
  };

  const changeListDataItemCheckmark = ({
    oldListData,
    itemId,
    moveCheckedToBottom,
  }) => {
    const updatedListData = oldListData.map(item => {
      if (item.id === itemId) {
        return {
          id: item.id,
          text: isTextChecked({text: item.text})
            ? makeTextUnchecked({text: item.text})
            : makeTextChecked({text: item.text}),
        };
      }
      return item;
    });

    if (moveCheckedToBottom) {
      return moveCheckedItemsToBottom({listData: updatedListData});
    } else {
      return updatedListData;
    }
  };

  const addNewListDataItem = ({oldListData, previousItemId}) => {
    let previousItemIndex = -1;
    for (let i = 0; i < oldListData.length; ++i) {
      if (oldListData[i].id === previousItemId) {
        previousItemIndex = i;
        // oldListData[i].text = oldListData[i].text.slice(0, -1);
        break;
      }
    }

    if (previousItemIndex < 0) {
      return oldListData;
    } else {
      const previousItemChecked = isTextChecked({
        text: oldListData[previousItemIndex].text,
      });

      oldListData.splice(previousItemIndex + 1, 0, {
        // id: ++currentDateTimestamp,
        id: String(++itemIdCounter),
        text: previousItemChecked ? makeTextChecked({text: ''}) : '',
        forceFocus: true,
      });
      return [...oldListData];
    }
  };

  const sortListDataItemsAlphabetically = ({
    oldListData,
    moveCheckedToBottom,
  }) => {
    oldListData.sort((li1, li2) => {
      return li1.text
        .trim()
        .toLowerCase()
        .localeCompare(li2.text.trim().toLowerCase());
    });

    if (!moveCheckedToBottom) {
      return oldListData;
    } else {
      return moveCheckedItemsToBottom({listData: oldListData});
    }
  };

  const removeCheckedItems = ({oldListData}) => {
    let updatedListData = oldListData.filter(
      item => !isTextChecked({text: item.text}),
    );
    if (updatedListData.length <= 0) {
      updatedListData.push({id: String(++itemIdCounter), text: ''});
    }

    return updatedListData;
  };

  const uncheckAllItems = ({oldListData}) => {
    return oldListData.map(item => {
      return {
        ...item,
        text: isTextChecked({text: item.text})
          ? makeTextUnchecked({text: item.text})
          : item.text,
      };
    });
  };

  return {
    toList,
    toText,
    toUncheckedText,
    sortListDataItemsAlphabetically,
    moveCheckedItemsToBottom,
    removeCheckedItems,
    uncheckAllItems,
    updateListDataItem,
    removeListDataItem,
    changeListDataItemCheckmark,
    isTextChecked,
    makeTextChecked,
    makeTextUnchecked,
    addNewListDataItem,
  };
};

export default TextTransformer();

// import {SystemEventsHandler} from '../../common/system-events-handler/SystemEventsHandler';
//
// const TextTransformer = () => {
//   let currentDateTimestamp = Date.now();
//   let itemIdCounter = 1;
//   const CHECKED_ITEM_PREFIX = '*(';
//   const CHECKED_ITEM_POSTFIX = ')';
//   const CHECKED_ITEM_PREFIX_LENGTH = CHECKED_ITEM_PREFIX.length;
//   const CHECKED_ITEM_POSTFIX_LENGTH = CHECKED_ITEM_POSTFIX.length;
//
//   const isTextChecked = ({text}) => {
//     return (
//       text.startsWith(CHECKED_ITEM_PREFIX) &&
//       text.endsWith(CHECKED_ITEM_POSTFIX)
//     );
//   };
//
//   const makeTextChecked = ({text}) => {
//     return CHECKED_ITEM_PREFIX + text + CHECKED_ITEM_POSTFIX;
//   };
//
//   const makeTextUnchecked = ({text}) => {
//     return text.slice(
//       CHECKED_ITEM_PREFIX_LENGTH,
//       text.length - CHECKED_ITEM_POSTFIX_LENGTH,
//     );
//   };
//
//   const toList = ({text}) => {
//     return text.split('\n').map((value, index) => {
//       return {
//         id: ++currentDateTimestamp,
//         // id: String(++itemIdCounter),
//         text: value,
//       };
//     });
//   };
//
//   const toText = ({listData}) => {
//     const lastItemIndex = listData.length - 1;
//     let resultText = '';
//     listData.forEach((textData, index) => {
//       if (index === lastItemIndex) {
//         resultText = resultText + textData.text;
//       } else {
//         resultText = resultText + textData.text + '\n';
//       }
//     });
//     return resultText;
//   };
//
//   const updateListDataItem = ({oldListData, updatedListItem}) => {
//     return oldListData.map(item => {
//       if (item.id === updatedListItem.id) {
//         return {
//           id: updatedListItem.id,
//           text: isTextChecked({text: item.text})
//             ? makeTextChecked({text: updatedListItem.text})
//             : updatedListItem.text,
//         };
//       }
//       return item;
//     });
//   };
//
//   const removeListDataItem = ({oldListData, itemId}) => {
//     return oldListData.filter(value => value.id !== itemId);
//   };
//
//   const moveCheckedItemsToBottom = ({listData}) => {
//     const uncheckedItems = [];
//     const checkedItems = [];
//     for (let i = 0; i < listData.length; ++i) {
//       if (isTextChecked({text: listData[i].text})) {
//         checkedItems.push(listData[i]);
//       } else {
//         uncheckedItems.push(listData[i]);
//       }
//     }
//
//     return uncheckedItems.concat(checkedItems);
//   };
//
//   const changeListDataItemCheckmark = ({
//     oldListData,
//     itemId,
//     moveCheckedToBottom,
//   }) => {
//     const updatedListData = oldListData.map(item => {
//       if (item.id === itemId) {
//         return {
//           id: item.id,
//           text: isTextChecked({text: item.text})
//             ? makeTextUnchecked({text: item.text})
//             : makeTextChecked({text: item.text}),
//         };
//       }
//       return item;
//     });
//
//     if (moveCheckedToBottom) {
//       return moveCheckedItemsToBottom({listData: updatedListData});
//     } else {
//       return updatedListData;
//     }
//   };
//
//   const addNewListDataItem = ({oldListData, previousItemId}) => {
//     let previousItemIndex = -1;
//     for (let i = 0; i < oldListData.length; ++i) {
//       if (oldListData[i].id === previousItemId) {
//         previousItemIndex = i;
//         // oldListData[i].text = oldListData[i].text.slice(0, -1);
//         break;
//       }
//     }
//
//     if (previousItemIndex < 0) {
//       return oldListData;
//     } else {
//       const previousItemChecked = isTextChecked({
//         text: oldListData[previousItemIndex].text,
//       });
//
//       oldListData.splice(previousItemIndex + 1, 0, {
//         id: ++currentDateTimestamp,
//         text: previousItemChecked ? makeTextChecked({text: ''}) : '',
//         forceFocus: true,
//       });
//       return [...oldListData];
//     }
//   };
//
//   const sortListDataItemsAlphabetically = ({
//     oldListData,
//     moveCheckedToBottom,
//   }) => {
//     oldListData.sort((li1, li2) => {
//       return li1.text.toLowerCase().localeCompare(li2.text.toLowerCase());
//     });
//
//     if (!moveCheckedToBottom) {
//       return oldListData;
//     } else {
//       return moveCheckedItemsToBottom({listData: oldListData});
//     }
//   };
//
//   const removeCheckedItems = ({oldListData}) => {
//     return oldListData.filter(item => !isTextChecked({text: item.text}));
//   };
//
//   const uncheckAllItems = ({oldListData}) => {
//     return oldListData.map(item => {
//       return {
//         ...item,
//         text: isTextChecked({text: item.text})
//           ? makeTextUnchecked({text: item.text})
//           : item.text,
//       };
//     });
//   };
//
//   return {
//     toList,
//     toText,
//     sortListDataItemsAlphabetically,
//     moveCheckedItemsToBottom,
//     removeCheckedItems,
//     uncheckAllItems,
//     updateListDataItem,
//     removeListDataItem,
//     changeListDataItemCheckmark,
//     isTextChecked,
//     makeTextChecked,
//     makeTextUnchecked,
//     addNewListDataItem,
//   };
// };
//
// export default TextTransformer();
