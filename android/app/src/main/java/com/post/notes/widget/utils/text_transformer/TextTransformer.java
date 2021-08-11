package com.post.notes.widget.utils.text_transformer;


import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class TextTransformer {
    private static final String CHECKED_ITEM_PREFIX = "*(";
    private static final String CHECKED_ITEM_POSTFIX = ")";
    private static final String ITEMS_SEPARATOR = "\n";

    public static boolean isChecked(String item) {
        return item.startsWith(CHECKED_ITEM_PREFIX) && item.endsWith(CHECKED_ITEM_POSTFIX);
    }

    public static String makeItemUnchecked(String item) {
        return item.substring(
                CHECKED_ITEM_PREFIX.length(),
                item.length() - CHECKED_ITEM_POSTFIX.length()
        );
    }

    public static String makeItemChecked(String item) {
        return CHECKED_ITEM_PREFIX + item + CHECKED_ITEM_POSTFIX;
    }

    public static List<String> toList(String text, boolean moveCheckedToBottom) {
        String[] itemsArray = text.split(ITEMS_SEPARATOR, -1);

        List<String> itemsList;

        if (moveCheckedToBottom) {
            List<String> uncheckedItems = new ArrayList<>();
            List<String> checkedItems = new ArrayList<>();
            for (String s : itemsArray) {
                if (isChecked(s)) {
                    checkedItems.add(s);
                } else {
                    uncheckedItems.add(s);
                }
            }

            uncheckedItems.addAll(checkedItems);
            itemsList = uncheckedItems;
        } else {
            itemsList = new ArrayList<>();
            Collections.addAll(itemsList, itemsArray);
        }

        return itemsList;
    }

    public static String toText(List<String> itemsList) {
        StringBuilder stringBuilder = new StringBuilder();
        for (int i = 0; i < itemsList.size(); ++i) {
            if (i == itemsList.size() - 1) {
                stringBuilder.append(itemsList.get(i));
            } else {
                stringBuilder.append(itemsList.get(i)).append(ITEMS_SEPARATOR);
            }
        }

        return stringBuilder.toString();
    }

    public static String toUncheckedText(String text) {
        String[] textItemsArray = text.split(ITEMS_SEPARATOR, -1);

        for (int i = 0; i < textItemsArray.length; ++i) {
            if (isChecked(textItemsArray[i])) {
                textItemsArray[i] = makeItemUnchecked(textItemsArray[i]);
            }
        }

        StringBuilder stringBuilder = new StringBuilder();
        for (int i = 0; i < textItemsArray.length; ++i) {
            if (i == textItemsArray.length - 1) {
                stringBuilder.append(textItemsArray[i]);
            } else {
                stringBuilder.append(textItemsArray[i]).append(ITEMS_SEPARATOR);
            }
        }

        return stringBuilder.toString();
    }
}
