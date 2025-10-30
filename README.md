# 🚨 URGENT: Maintenance Transition 🚨
This project is officially entering a period of passive maintenance and will no longer receive active development or major bug fixes from **kommit**.

We are fully committed to keeping this project alive within the open-source community! We believe in the value this project provides, and we are actively seeking new, passionate contributors to take over ownership.

## 🚀 Take Over This Project!
We need a reliable steward for the future development of this repository.

### Why Take Ownership?

**Full Control:** Gain administrative rights and full control over the project's direction.

**Visibility:** Showcase your expertise by leading an established open-source project.

**Impact:** Directly support the users who rely on this plugin.

### How to Request Ownership

To apply for project ownership, you must create an issue using our dedicated template:

1. Go to the [Issues](https://github.com/kommitters/editorjs-toggle-block/issues/new/choose) page
2. Select the **"Project Ownership / Maintainer Request"** template
3. Fill out all required sections completely
4. Submit the issue for review

**Important:** Ownership requests submitted through other channels (comments, pull requests, emails) will not be considered. Please use the official issue template to ensure your application is properly reviewed.

# EditorJS Toggle Block

![stability-alpha](https://img.shields.io/badge/stability-alpha-f4d03f.svg)
[![Coverage Status](https://coveralls.io/repos/github/kommitters/editorjs-toggle-block/badge.svg)](https://coveralls.io/github/kommitters/editorjs-toggle-block)
[![CII Best Practices](https://bestpractices.coreinfrastructure.org/projects/6454/badge)](https://bestpractices.coreinfrastructure.org/projects/6454)
[![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/kommitters/editorjs-toggle-block/badge)](https://api.securityscorecards.dev/projects/github.com/kommitters/editorjs-toggle-block)

Toggle block tool for [Editor.js](https://editorjs.io/)

![](assets/demo.gif)

## Installation

### Install via NPM

```shell
$ npm i --save-dev editorjs-toggle-block
```

Include module at your application

```js
import ToggleBlock from 'editorjs-toggle-block';
```

### Load from CDN

You can load a specific version of the package from [jsDelivr CDN](https://www.jsdelivr.com/package/npm/editorjs-toggle-block).

Require this script on a page with Editor.js.

```html
<script src="https://cdn.jsdelivr.net/npm/editorjs-toggle-block"></script>
```

## Usage

Add a new tool to the `tools` property of the Editor.js initial config.

```js
const editor = EditorJS({
  tools: {
    toggle: {
      class: ToggleBlock,
      inlineToolbar: true,
    },
  },
});
```

### Shortcuts

1. Type the `>` character followed by `Space` to create a new toggle.
2. Type `Shift` + `Tab` to extract a nested block.
3. Type `Tab` to insert an existing block into a toggle.

## Development

### Development mode

```shell
$ npm run build:dev
```

### Using the Playground

To test the functionality of the plugin, you can use the provided playground:

1. Navigate to the `playground` folder in the project directory.
2. Open the `index.html` file in your web browser.
3. Experiment the plugin's behavior.

### Production release

1. Create a production bundle
   ```shell
   $ npm run build
   ```
2. Commit `dist/bundle.js`

### Run tests

```shell
$ npm run test
```

## Code of conduct

We welcome everyone to contribute. Make sure you have read the [CODE_OF_CONDUCT][coc] before.

## Contributing

For information on how to contribute, please refer to our [CONTRIBUTING][contributing] guide.

## Changelog

Features and bug fixes are listed in the [CHANGELOG][changelog] file.

## License

This library is licensed under an MIT license. See [LICENSE][license] for details.

## Acknowledgements

Made with 💙 by [kommitters Open Source](https://kommit.co)

[license]: https://github.com/kommitters/editorjs-toggle-block/blob/main/LICENSE
[coc]: https://github.com/kommitters/editorjs-toggle-block/blob/main/CODE_OF_CONDUCT.md
[changelog]: https://github.com/kommitters/editorjs-toggle-block/blob/main/CHANGELOG.md
[contributing]: https://github.com/kommitters/editorjs-toggle-block/blob/main/CONTRIBUTING.md
