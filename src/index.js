import './index.css';
import toggleIconPrimary from '../assets/toggleIcon.svg';
import toggleIconSecondary from '../assets/toggleIconSecondary.svg';

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
   * Disables the creation of new EditorJS blocks by pressing
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

  /**
   * First checks the status of a toggle, if this is 'closed' then open it.
   *
   * After checks if a toggle has paragraphs, if so, insert a new one as the first
   * child and move the others to the end, otherwise just insert a new paragraph.
   *
   * @param {KeyboardEvent} e - key down event
   */
  createParagraphFromToggleRoot(e) {
    if (e.code === 'Enter') {
      const originalIndex = this.api.blocks.getCurrentBlockIndex();

      if (this.data.status === 'closed') {
        const children = document.querySelectorAll(`div[foreignKey="${this.wrapper.id}"]`);

        const icon = this.wrapper.firstChild;
        icon.innerHTML = this._resolveToggleAction();

        this._hideAndShowBlocks(originalIndex - 1, children.length);
      }

      const foreignKey = this.wrapper.id;
      const index = originalIndex + 1;
      const id = crypto.randomUUID();

      this.api.blocks.insert();

      const newBlock = this.api.blocks.getBlockByIndex(index);

      newBlock.holder.firstChild.firstChild.classList.add('toggle-block__item');
      newBlock.holder.setAttribute('foreignKey', foreignKey);
      newBlock.holder.setAttribute('id', id);
      document.getElementById(id).firstChild.firstChild.focus();
    }
  }

  createParagraphFromIt(e) {
    if (e.code === 'Enter') {
      const index = this.api.blocks.getCurrentBlockIndex();
      const newBlock = this.api.blocks.getBlockByIndex(index);
      const id = crypto.randomUUID();

      newBlock.holder.firstChild.firstChild.classList.add('toggle-block__item');
      newBlock.holder.setAttribute('foreignKey', this.wrapper.id);
      newBlock.holder.setAttribute('id', id);
      document.getElementById(id).firstChild.firstChild.focus();
    }
  }

  _createToggle() {
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('toggle-block__selector');
    this.wrapper.id = crypto.randomUUID();

    const icon = document.createElement('span');
    icon.classList.add('toggle-block__icon');
    icon.innerHTML = this.data.status === 'closed' ? toggleIconPrimary : toggleIconSecondary;

    const input = document.createElement('div');

    input.classList.add('toggle-block__input');
    input.contentEditable = true;
    input.addEventListener('keyup', this.createParagraphFromToggleRoot.bind(this));
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
    const originalIndex = this.api.blocks.getCurrentBlockIndex();
    const icon = this.wrapper.firstChild;
    const foreignKey = this.wrapper.id;
    const editorBlocks = this.api.blocks.getBlocksCount();
    let index = editorBlocks > 1 ? originalIndex + 1 : originalIndex;

    icon.addEventListener('click', () => {
      const children = document.querySelectorAll(`div[foreignKey="${this.wrapper.id}"]`);

      icon.innerHTML = this._resolveToggleAction();
      this._hideAndShowBlocksClicking(children.length);
    });

    this.data.items.forEach((block) => {
      const { type, data } = block;

      this.api.blocks.insert(type, data, {}, index += 1, true);

      const newBlock = this.api.blocks.getBlockByIndex(index);
      newBlock.holder.addEventListener('keydown', this.createParagraphFromIt.bind(this));
      newBlock.holder.firstChild.firstChild.classList.add('toggle-block__item');
      newBlock.holder.setAttribute('foreignKey', foreignKey);
      newBlock.holder.setAttribute('id', crypto.randomUUID());
    });

    if (editorBlocks > 1) {
      this._hideAndShowBlocks(originalIndex, this.data.items.length);
    } else {
      this._hideAndShowBlocks(originalIndex - 1, this.data.items.length);
    }
  }

  /**
   * Converts the toggle status to its opposite, including its icon.
   * If the toggle status is open, then now will be closed and its icon
   * will be the main. Otherwise, will be open and its icon will be the
   * Secondary.
   *
   * @returns {string} icon - toggle icon
   */
  _resolveToggleAction() {
    let icon = toggleIconPrimary;

    if (this.data.status === 'closed') {
      icon = toggleIconSecondary;
      this.data.status = 'open';
    } else {
      this.data.status = 'closed';
    }

    return icon;
  }

  _hideAndShowBlocks(index, items) {
    const toggleIndex = index + 1;

    this._iterateOnItems(items, toggleIndex);
  }

  _hideAndShowBlocksClicking(items) {
    const toggleIndex = this.api.blocks.getCurrentBlockIndex();

    this._iterateOnItems(items, toggleIndex);
  }

  _iterateOnItems(items, toggleIndex) {
    let index = toggleIndex;
    if (this.data.status === 'closed') {
      for (let i = 0; i < items; i += 1) {
        this.api.blocks.getBlockByIndex(index += 1).holder.setAttribute('hidden', true);
      }
    } else {
      for (let i = 0; i < items; i += 1) {
        this.api.blocks.getBlockByIndex(index += 1).holder.removeAttribute('hidden');
      }
    }
  }

  save(blockContent) {
    const caption = blockContent.textContent;
    const blocks = document.querySelectorAll(`div[foreignKey="${this.wrapper.id}"]`);

    const items = [];

    blocks.forEach((block) => {
      items.push({ type: 'paragraph', data: { text: block.textContent } });
    });

    return Object.assign(this.data, {
      text: caption,
      items: [...items],
    });
  }
}
