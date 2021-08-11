package com.post.notes;

import android.os.Bundle;

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
//    super.onCreate(null);

//    if (savedInstanceState != null) {
//      savedInstanceState.remove("android:support:fragments");
//      savedInstanceState.remove("android:fragments");
//    }
//    super.onCreate(savedInstanceState);
  }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "Notes";
  }
}
