import './index.css';
import toggleIconPrimary from '../assets/toggleIcon.svg';
import toggleIconSecundary from '../assets/toggleIconSecundary.svg';

/**
 * ToggleBlock for the Editor.js
 * Creates a toggle and paragraphs can be saved in it.
 * Requires no server-side uploader.
 *
 * @typedef {object} ToggleBlockData
 * @description Tool's input and output data format
 * @property {string} text - toggle text
 * @property {string} status - toggle status
 * @property {array} items - toggle paragraphs
 */

export default class ToggleBlock {
  /**
   * Icon and title for displaying at the Toolbox
   * @returns {{tittle: string, icon: string}}
   */
  static get toolbox() {
    return {
      title: 'Toggle',
      icon: toggleIconPrimary,
    };
  }

  /**
   * Disables the creation of new editorjs blocks by pressing
   * 'enter' when in a toggle block.
   */
  static get enableLineBreaks() {
    return true;
  }

  /**
   * Render tool`s main Element and fill it with saved data
   *
   * @param {{data: object, api: object}}
   * data - Previously saved data
   * api - Editor.js API
   */
  constructor({ data, api }) {
    this.data = {
      text: data.text || '',
      status: data.status || 'closed',
      items: data.items || [],
    };
    this.api = api;
    this.wrapper = undefined;
  }

  _createToggle() {
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('toggle-block__selector');

    const icon = document.createElement('span');
    icon.classList.add('toggle-block__icon');
    icon.innerHTML = this.data.status === 'closed' ? toggleIconPrimary : toggleIconSecundary;

    // icon.addEventListener('click', () => {
    //   icon.innerHTML = this._resolveToggleAction();
    //   this._hideAndShowParagraphs();
    // });

    const input = document.createElement('div');

    input.classList.add('toggle-block__input');
    input.contentEditable = true;
    // input.addEventListener('keydown', this.createParagraphFromToggleRoot.bind(this));
    input.innerHTML = this.data.text || '';

    this.wrapper.appendChild(icon);
    this.wrapper.appendChild(input);
  }

  render() {
    this._createToggle();
    setTimeout(this.renderItems.bind(this));
    return this.wrapper;
  }

  renderItems() {
    let index = this.api.blocks.getCurrentBlockIndex() + 1;
    this.data.items.forEach((block) => {
      const { type, data } = block;
      this.api.blocks.insert(type, data, {}, index += 1, true);
      this.api.blocks.getBlockByIndex(index).holder.firstChild.firstChild.classList.add('toggle-block__item');
      this.api.blocks.getBlockByIndex(index).holder.firstChild.firstChild.setAttribute('id', crypto.randomUUID());
    });
  }
}
