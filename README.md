# Chess

Welcome to the repository of my android chess game which is made with React native. You can download the app from [Google Play](https://play.google.com/store/apps/details?id=com.voyacode.chess).

This app is very heavily based on chess game I made for my website with Angular. If you want to know more about how the game mechanics or the AI (of my own design) work, check the [repository of the original version](https://github.com/Voya100/VoyaCode/tree/master/app/projects/chess).

# App structure

All the main game logic is contained in [game/](https://github.com/Voya100/ReactNativeChess/tree/master/app/game), [pieces/](https://github.com/Voya100/ReactNativeChess/tree/master/app/pieces) and [players/](https://github.com/Voya100/ReactNativeChess/tree/master/app/players) directories (inside app directory). These are nearly identical to the original version made with Angular.

[store/](https://github.com/Voya100/ReactNativeChess/tree/master/app/stores) directory contains all Reflux stores, which contain data about the game the views need to render their contents and settings/statistics.

[i18n/](https://github.com/Voya100/ReactNativeChess/tree/master/app/i18n) directory contains all localisation files. The app has been made so that it is easy to add new languages if needed. At the moment only English and Finnish are supported.

[components/](https://github.com/Voya100/ReactNativeChess/tree/master/app/components) directory contains all code that relates to rendering of the app and user interactions. Most of the React Native code can be found here.

# Feedback

If you have any issues with the app or have suggestions on how to improve it, feel free to leave feedback in the issues.

- Voya
