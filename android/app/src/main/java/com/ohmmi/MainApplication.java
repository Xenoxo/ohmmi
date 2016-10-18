package com.ohmmi;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import com.zmxv.RNSound.RNSoundPackage; // for playing sound
// import com.marcshilling.idletimer.IdleTimerPackage; // for timer delay
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage; //for push notification

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new RNSoundPackage(), // for sound
          new ReactNativePushNotificationPackage()
          // new IdleTimerPackage()
      );
    }
  };



  @Override
  public ReactNativeHost getReactNativeHost() {
      return mReactNativeHost;
  }
}
