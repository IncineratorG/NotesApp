package com.post.notes.modules.modules_common.data_types.activity_result_callback;


import java.util.HashMap;
import java.util.Map;

public class ModuleActivityResultCallbacks {
    private Map<Integer, ActivityResultCallback> mActivityResultCallbacks;

    public ModuleActivityResultCallbacks() {
        mActivityResultCallbacks = new HashMap<>();
    }

    public void set(int resultCode, ActivityResultCallback callback) {
        mActivityResultCallbacks.put(resultCode, callback);
    }

    public ActivityResultCallback getAndRemove(int resultCode) {
        ActivityResultCallback callback = mActivityResultCallbacks.get(resultCode);
        mActivityResultCallbacks.remove(resultCode);
        return callback;
    }
}
