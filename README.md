# Ballot Marker

This repo was built off a clone of the [react-native-redux-starter-kit](https://github.com/LeoLeBras/react-native-redux-starter-kit). For more info on the structure and tools includes, check out that site and [the original docs][docs/original.md] stored in this repo.

Additional docs will be added on the following topics:

- [Testing](docs/testing.md)
- [Style patterns](docs/styles.md)
- [Redux patterns](docs/redux.md)

## App Structure

### General notes

Throughout the app, there are `package.json` files that contain only one key -- `"name"` -- and a value like `"@shared"`. These files essentially create shortcuts for importing, which allow for importing of files in the `shared` directory without reference to the location of the `shared` or the current directory. In other words, this will import the `base.js` file in the `src/shared` directory from anywhere (given a correct `package.json`):

```
import '@shared/base';
```

Like any React Native app, this app is broken into `src`, `ios`, and `android` directories. The JavaScript code is by and large contained within `src`. It compiles into native code in the `ios` and `android` directories.

Within `src`, the app structure is a mix of the "fractal" structure of the starter kit and a more lightweight structure more appropriate to the lightweight nature of the app.

### Bundle

Main pages can be found in the `src/bundles` directory. Each sub-folder is for a full page ("scene"). Generally, these directories are flat, with the `index.js` file containing the page component, but more complex components may be broken into multiple pieces and files.

> Every component folder should be flat *except for* the test folder, `__specs__`, which contains tests specific to that component and its helper functions. Tests are described in greater detail below.

Component-specific helpers should stay within the specific `src/bundles/` directory. Generalizable helpers belong in `shared/utils`.

### Core

The `src/core` directory contains basic app setup. The `index.js` file contains the root app nodes, and the `scenes.js` file defines routing for the app.

### Shared

The `src/shared` directory contains functionality common to the whole app, including basic components (like Buttons) and global styles (layout, text, etc).

### Store

The `src/store` directory contains functionality related to the global redux store. Specific reducers are located under `src/store/modules` and combined in the `src/store/reducers.js` file. Actions can be found in `src/store/actions.js`.

### Other

- Static data files (JSON, XML, etc) are stored in the `src/data` directory.
- The `src/config` and `src/api` directories are currently empty.