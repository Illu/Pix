<p align="center">
  <img width="200" src="https://maximenory.com/pix/logo.png" />
</p>

# [Pix](https://apps.apple.com/app/pix-share-your-art/id1542611830?l=en)

[![iTunes App Store](https://img.shields.io/itunes/v/1542611830.svg?style=flat-square)](https://apps.apple.com/app/pix-share-your-art/id1542611830?l=en)
![license: MIT](https://img.shields.io/github/license/illu/pix?style=flat-square)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
![Build iOS](https://github.com/Illu/Pix/workflows/Build%20iOS/badge.svg?branch=main)

Pix is an online pixel art community where everyone can unleash their creativity on a 16x16 canvas, built with [React-Native](https://github.com/facebook/react-native) for iOS devices.


## Stack

[React-Native](https://github.com/facebook/react-native)

[React-Navigation](https://reactnavigation.org/)

[MobX](https://mobx.js.org/)

[TypeScript](https://www.typescriptlang.org/)

[Styled-Components](https://www.styled-components.com/)

## Preview

<p align="center">
  <img src="https://maximenory.com/pix/mockup.png" />
</p>

## Installation

If you want to test the app on a simulator running locally, follow these instructions:

First, you'll need to create or import a `config.ts` file in the `scr` folder, which should export the `firebaseConfig` object. Then create or import a `GoogleService-Info.plist` file in the `ios` folder.

```bash
$ cd pix

$ yarn

$ cd ios && pod install && cd ..

$ yarn build-ios

$ react-native run-ios
```

## Contribute

If you find a bug, feel free to open an issue or submit a pull request.

New ideas are always welcome, if you have an idea to change or add a feature, let me know by opening an issue or messaging me on [Twitter](https://twitter.com/MaximeNory).

## Licence

MIT License

See [LICENSE](LICENSE)
