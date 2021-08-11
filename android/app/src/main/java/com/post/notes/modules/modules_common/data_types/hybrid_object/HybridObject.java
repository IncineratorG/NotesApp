package com.post.notes.modules.modules_common.data_types.hybrid_object;


import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

public interface HybridObject {
    WritableMap toWritableMap();
    WritableArray toWritableArray();
    String stringify();
    boolean isEmpty();
}
