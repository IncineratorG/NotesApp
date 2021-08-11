package com.post.notes.common.data.hybrid_objects.vault_notes_ids_list;


import android.util.Log;

import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.post.notes.modules.modules_common.data_types.hybrid_object.HybridObject;

import org.json.JSONArray;
import org.json.JSONException;

import java.util.HashSet;
import java.util.Set;

public class VaultNotesIdsList implements HybridObject {
    private Set<Long> idsSet;

    public VaultNotesIdsList() {
        idsSet = new HashSet<>();
    }

    public VaultNotesIdsList(String stringifiedVaultNotesIdsList) {
        idsSet = new HashSet<>();
        if (stringifiedVaultNotesIdsList != null) {
            try {
                JSONArray jsonArray = new JSONArray(stringifiedVaultNotesIdsList);
                for (int i = 0; i < jsonArray.length(); ++i) {
                    idsSet.add(jsonArray.getLong(i));
                }
            } catch (JSONException e) {
                Log.d("tag", "VaultNotesIdsList->ERROR: " + e.getMessage());
            }
        }
    }

    public boolean has(long id) {
        return idsSet.contains(id);
    }

    @Override
    public WritableMap toWritableMap() {
        return null;
    }

    @Override
    public WritableArray toWritableArray() {
        return null;
    }

    @Override
    public String stringify() {
        return null;
    }

    @Override
    public boolean isEmpty() {
        return false;
    }
}
