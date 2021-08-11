package com.post.notes.widget.utils.color_inverter;


public class ColorInverter {
    private static final double DEFAULT_THRESHOLD = Math.sqrt(1.05 * 0.05) - 0.05;

    public static String invert(String hexColor, String hexBlack, String hexWhite) {
        int[] rgbArray = hexToRgbArray(hexColor);

        invertToBW(rgbArray, hexBlack, hexWhite);

        return invertToBW(rgbArray, hexBlack, hexWhite);
    }

    private static int[] hexToRgbArray(String hexColor) {
        if (hexColor.startsWith("#")) {
            hexColor = hexColor.substring(1);
        }

        int[] rgbArray = new int[3];

        rgbArray[0] = Integer.parseInt(hexColor.substring(0, 2), 16);
        rgbArray[1] = Integer.parseInt(hexColor.substring(2, 4), 16);
        rgbArray[2] = Integer.parseInt(hexColor.substring(4, 6), 16);

        return rgbArray;
    }

    private static String invertToBW(int[] color, String hexBlack, String hexWhite) {
        if (getLuminance(color) > DEFAULT_THRESHOLD) {
            return hexBlack;
        } else {
            return hexWhite;
        }
    }

    private static double getLuminance(int[] color) {
        double[] a = new double[3];
        double x = 0.0;

        for (int i = 0; i < color.length; ++i) {
            x = (double) color[i] / 255;
            a[i] = x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
        }

        return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
    }
}
