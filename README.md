# Chess

Welcome to the repository of my android chess game which is made with React native. You can download the app from [Google Play](https://play.google.com/store/apps/details?id=com.voyacode.chess).

This app is very heavily based on [chess game](https://voyacode.com/projects/chess) I made for my website with Angular. If you want to know more about how the game mechanics or the AI (of my own design) work, check the [repository of the original version](https://github.com/Voya100/VoyaCode/tree/master/src/app/projects/chess).

# App structure

All the main game logic is contained in [game/](https://github.com/Voya100/ReactNativeChess/tree/master/app/game) directory. The game logic code is nearly identical to the original version made with Angular.

[stores/](https://github.com/Voya100/ReactNativeChess/tree/master/app/stores) directory contains all Reflux stores, which contain data about the game the views need to render their contents. Views are updated when the data in stores is updated. Settings and statistics are stored on mobile device, and they are loaded when the app starts.

[i18n/](https://github.com/Voya100/ReactNativeChess/tree/master/app/i18n) directory contains all localisation files. The app has been made so that it is easy to add new languages if needed. At the moment only English and Finnish are supported.

[components/](https://github.com/Voya100/ReactNativeChess/tree/master/app/components) directory contains all code that relates to rendering of the app and user interactions. Most of the React Native code can be found here.

# iOS support

At the moment only Android version of the app exists. The app code should in theory also work with iOS (possibly after small fixes/additions), but I lack the equipment to build, test or release iOS apps. This is unlikely to change in the near future. The [browser version](https://www.voyacode.com/projects/chess), however, scales to mobile devices, so you can use that to try the game on iOS, if you so desire.

# How to run

To run the app, you need to have ANDROID_HOME environment variable set to Android SDK location. Android SDK is installed along with Android studio. Some instructions on this can be found from [React Native documentation](https://reactnative.dev/docs/environment-setup), although all steps may not fully apply with this version of React Native being quite old at the time of writing this (2021).

You will also need to install node dependencies with `npm install`. Latest tested node version is 12.7.0.

Connect an Android device with USB, enable developer settings and configure it to allow USB debug mode. If done correctly, Android should prompt for permissions on the first time.

Launch the app in developer mode with `npm run dev`. It will run the build and launch it on the phone. If there is another version of the app (e.g. from Google Play), you will need to uninstall it first.
The app dependencies are quite old, so it may warn that the app might not work properly on newer devices.

# Feedback

If you have any issues with the app or have suggestions on how to improve it, feel free to leave feedback in the issues.

- Voya
