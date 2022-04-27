# EditorJS Toggle Block

Toggle block tool for [Editor.js](https://editorjs.io/)

![](assets/demo.gif)

![](assets/demo_with_other_blocks.gif)

## Installation

### Install via NPM

```shell
$ npm i --save-dev editorjs-toggle-block
```

Include module at your application

```js
import ToggleBlock from 'editorjs-toggle-block';
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

### Output data

| Field  | Type     | Description                                         |
| ------ | -------- | --------------------------------------------------- |
| text   | `string` | Main text                                           |
| status | `string` | Toggle status                                       |
| items  | `number` | Indicates the number of nested blocks in the toggle |

### Sample data

```js
{
    type: 'toggle',
    data: {
        text: 'Toggle A',
        status: 'open',
        items: 3,
    }
},

{
     type: 'paragraph',
     data: { text: 'A1' }
},

{
    type: 'paragraph',
    data: { text: 'A2' }
},

{
    type: 'paragraph',
    data: { text: 'A3' }
},

{
    type: 'toggle',
    data: {
        text: '',
        status: 'open',
        items: 0,
    }
},
{
    type: 'toggle',
    data: {
        text: 'It is empty',
        status: 'closed',
        items: 0,
    }
}
```

### Sample visualization

![](assets/first_sample.png)

![](assets/second_sample.png)

![](assets/third_sample.png)

### Shortcuts

On the editor you can:

1. Type the `>` character followed by `Space` to create a new toggle.
2. Type `Shift` + `Tab` to extract a nested block.
3. Type `Tab` to insert an existing block into a toggle.

## Development

### Development mode

```shell
$ npm run build:dev
```

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
