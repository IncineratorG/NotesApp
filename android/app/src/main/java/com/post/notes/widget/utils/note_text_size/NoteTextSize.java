package com.post.notes.widget.utils.note_text_size;


public class NoteTextSize {
    private static final String TINY = "tiny";
    private static final String SMALL = "small";
    private static final String NORMAL = "normal";
    private static final String LARGE = "large";
    private static final String HUGE = "huge";

    public static int toFontSize(String type) {
        switch (type) {
            case (TINY): {
                return 14;
            }

            case (SMALL): {
                return 16;
            }

            case (NORMAL): {
                return 20;
            }

            case (LARGE): {
                return 24;
            }

            case (HUGE): {
                return 28;
            }

            default: {
                return 20;
            }
        }
    }
}
