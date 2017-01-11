# Ballot Marker

[![CircleCI](https://circleci.com/gh/sashafklein/ballot-marker.svg?style=svg)](https://circleci.com/gh/sashafklein/ballot-marker)

This repo was built off a clone of the [react-native-redux-starter-kit](https://github.com/LeoLeBras/react-native-redux-starter-kit). For more info on the structure and tools included, check out that site and [the original docs](docs/original.md) stored in this repo.

Briefly, this is a ReactNative app, which is written in JavaScript (ES6) and compiled into native iOS and Android. It uses Redux for storing state information, and Mocha and Chai for testing. Unlike the above starter app, this app does *not* have type checking.

Additional docs on the following topics have been broken out in the `docs` directory:

- [Testing](docs/testing.md)
- [Style patterns](docs/styling.md)
- [Redux patterns](docs/redux.md)

## Getting started

```
yarn install // or `npm install` - install dependencies
react-native run-ios // run ios simulator
```

# App Structure

### General notes

I removed aliasing, (ie `import @bundle` type of non-relative imports), which were in the starter kit, because they were breaking tests. I might add them back later.

Like any React Native app, this app is broken into `src`, `ios`, and `android` directories. The JavaScript code is by and large contained within `src`. It compiles into native code in the `ios` and `android` directories.

Within `src`, the app structure is a mix of the "fractal" structure of the starter kit and a more lightweight structure more appropriate to the lightweight nature of the app.

## Src Folders

### Bundle

Main pages can be found in the `src/bundles` directory. Each sub-folder is for a full page ("scene"). Generally, these directories are flat, with the `index.js` file containing the page component, but more complex components may be broken into multiple pieces and files.

> Every component folder should be flat *except for* the test folder, `__specs__`, which contains tests specific to that component and its helper functions. Tests are described in greater detail below.

Component-specific helpers should stay within the specific `src/bundles/` directory. Generalizable helpers belong in `shared/utils`.

> To generate a skeleton "bundle", with associated specs, run `ruby makeBundle.rb ComponentName`. This will take care of boilerplate component scaffolding.

### Core

The `src/core` directory contains basic app setup. The `index.js` file contains the root app nodes, and the `scenes.js` file defines routing for the app.

### Shared

The `src/shared` directory contains functionality common to the whole app, including basic components (like Buttons) and global styles (layout, text, etc).

### Store

The `src/store` directory contains functionality related to the global redux store. Specific reducers are located under `src/store/modules` and combined in the `src/store/reducers.js` file. Actions can be found in `src/store/actions.js`.

### Other

- Static data files (JSON, XML, etc) are stored in the `src/data` directory.
- The `src/config` and `src/api` directories are currently empty.