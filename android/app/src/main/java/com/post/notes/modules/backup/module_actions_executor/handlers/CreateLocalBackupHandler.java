package com.post.notes.modules.backup.module_actions_executor.handlers;


import android.content.ContentResolver;
import android.content.ContentValues;
import android.content.Context;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Environment;
import android.provider.MediaStore;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;
import com.post.notes.modules.modules_common.data_types.js_action_handler.JSActionHandler;

import java.io.File;
import java.io.IOException;
import java.io.OutputStream;

public class CreateLocalBackupHandler implements JSActionHandler {
    @Override
    public void handle(ReactApplicationContext context, ReadableMap action, Promise result) {
        Log.d("tag", "CreateLocalBackupHandler->handle()");

//        File file = Environment.getExternalStorageDirectory();
//        Log.d("tag", file.getAbsolutePath());

//        File[] files = context.getExternalFilesDirs(null);
//        assert file != null;
//        Log.d("tag", "PATH: " + file.getAbsolutePath());

        File file = context.getFilesDir();
        assert file != null;
        Log.d("tag", "PATH: " + file.getAbsolutePath());

        result.resolve(true);
    }

    public Uri saveBitmap(@NonNull final Context context, @NonNull final Bitmap bitmap,
                          @NonNull final Bitmap.CompressFormat format,
                          @NonNull final String mimeType,
                          @NonNull final String displayName) throws IOException {

        final ContentValues values = new ContentValues();
        values.put(MediaStore.MediaColumns.DISPLAY_NAME, displayName);
        values.put(MediaStore.MediaColumns.MIME_TYPE, mimeType);
        values.put(MediaStore.MediaColumns.RELATIVE_PATH, Environment.DIRECTORY_DCIM);

        final ContentResolver resolver = context.getContentResolver();
        Uri uri = null;

        try {
            final Uri contentUri = MediaStore.Images.Media.EXTERNAL_CONTENT_URI;
            uri = resolver.insert(contentUri, values);

            if (uri == null)
                throw new IOException("Failed to create new MediaStore record.");

            try (final OutputStream stream = resolver.openOutputStream(uri)) {
                if (stream == null)
                    throw new IOException("Failed to open output stream.");

                if (!bitmap.compress(format, 95, stream))
                    throw new IOException("Failed to save bitmap.");
            }

            return uri;
        }
        catch (IOException e) {

            if (uri != null) {
                // Don't leave an orphan entry in the MediaStore
                resolver.delete(uri, null, null);
            }

            throw e;
        }
    }
}
