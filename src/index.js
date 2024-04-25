import './index.css';
import { v4 as uuidv4 } from 'uuid';
import toggleIcon from '../assets/toggleIcon.svg';

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
      icon: toggleIcon,
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
   * Notify core that the read-only mode is supported
   *
   * @returns {boolean}
   */
  static get isReadOnlySupported() {
    return true;
  }

  /**
   * Render tool`s main Element and fill it with saved data
   *
   * @param {{data: object, api: object}}
   * data - Previously saved data
   * api - Editor.js API
   * readOnly - read-only mode status
   */
  constructor({
    data, api, readOnly, config,
  }) {
    this.data = {
      text: data.text || '',
      status: data.status || 'open',
      fk: data.fk || `fk-${uuidv4()}`,
      items: data.items || 0,
      nested: data.nested || false,
    };
    this.itemsId = [];
    this.api = api;
    const {
      toolbar: {
        close,
      },
      blocks: {
        getCurrentBlockIndex,
        getBlockByIndex,
        getBlocksCount,
        move,
      },
    } = this.api;
    this.close = close;
    this.getCurrentBlockIndex = getCurrentBlockIndex;
    this.getBlocksCount = getBlocksCount;
    this.getBlockByIndex = getBlockByIndex;
    this.move = move;
    this.wrapper = undefined;
    this.readOnly = readOnly || false;
    this.placeholder = config?.placeholder ?? 'Toggle';
    this.defaultContent = config?.defaultContent ?? 'Empty toggle. Click or drop blocks inside.';
    this.nestedMarginLeft = 39;
    this.itemsMarginLeft = 39;
    this.addListeners();
    this.addSupportForUndoAndRedoActions();
    this.addSupportForDragAndDropActions();
    this.addSupportForCopyAndPasteAction();
  }

  /**
   * Returns true if the div element is a toggle child, otherwise, returns false
   * @param {HTMLDivElement} holder
   * @returns {boolean}
   */
  isAToggleItem(holder) {
    return holder.classList.contains('toggle-block__item');
  }

  /**
   * Returns true if the div element is a toggle root, otherwise, returns false
   * @param {HTMLDivElement} holder
   * @returns {boolean}
   */
  isAToggleRoot(holder) {
    return holder.classList.contains('toggle-block__selector') || Boolean(holder.querySelector('.toggle-block__selector'));
  }

  /**
   * First it gets the toggle index.
   *
   * After checks the toggle status, if this is 'closed' then open it.
   *
   * After inserts a new block after the toggle index and the a method
   * is called to add the required properties to the new block.
   * gets the focus.
   *
   * @param {KeyboardEvent} e - key up event
   */
  createParagraphFromToggleRoot(e) {
    if (e.code === 'Enter') {
      const currentPosition = document.getSelection().focusOffset;
      const originalIndex = this.api.blocks.getCurrentBlockIndex();
      const block = this.api.blocks.getBlockByIndex(originalIndex);
      const { holder } = block;
      const blockCover = holder.firstChild;
      const blockContent = blockCover.firstChild;
      const content = blockContent.children[1].innerHTML;

      const breakLine = content.indexOf('<br>');
      const end = breakLine === -1 ? content.length : breakLine;

      if (this.data.status === 'closed') {
        this.resolveToggleAction();
        this.hideAndShowBlocks();
      }

      const newText = content.slice(end + 4, currentPosition.focusOffset);
      blockContent.children[1].innerHTML = content.slice(currentPosition.focusOffset, end);

      this.api.blocks.insert('paragraph', { text: newText }, {}, originalIndex + 1, 1);
      this.setAttributesToNewBlock();
    }
  }

  /**
   * Calls the method to add the required properties to the new block.
   */
  createParagraphFromIt() {
    this.setAttributesToNewBlock();
  }

  /**
   * Gets the index of the new block, then assigns the required properties,
   * and finally sends the focus.
   */
  setAttributesToNewBlock(entryIndex = null, foreignKey = this.wrapper.id, block = null) {
    const index = entryIndex === null ? this.api.blocks.getCurrentBlockIndex() : entryIndex;
    const newBlock = block || this.api.blocks.getBlockByIndex(index);
    const { holder: newHolder } = newBlock;

    const setMarginLeft = () => {
      if (this.data.nested) {
        const toggleSelector = this.wrapper.closest('.ce-block');
        const styles = getComputedStyle(toggleSelector);
        const { marginLeft } = styles;
        this.itemsMarginLeft = this.data.items === 0
          ? (parseFloat(marginLeft) + this.nestedMarginLeft) : this.itemsMarginLeft;

        newHolder.style.marginLeft = `${this.itemsMarginLeft}px`;
      }
    };

    setTimeout(setMarginLeft, 2);

    const id = uuidv4();
    if (!this.itemsId.includes(newBlock.id)) {
      this.itemsId.splice(index - 1, 0, newBlock.id);
    }

    const { holder } = newBlock;
    const content = holder.firstChild;
    const item = content.firstChild;

    holder.setAttribute('foreignKey', foreignKey);
    holder.setAttribute('id', id);

    setTimeout(() => holder.classList.add('toggle-block__item'));

    if (!this.readOnly) {
      holder.onkeydown = this.setEventsToNestedBlock.bind(this);
      item.focus();
    }
  }

  /**
   * Sets the events to be listened through the holder
   * in a nested block.
   *
   * @param {KeyboardEvent} e - key down event
   */
  setEventsToNestedBlock(e) {
    if (e.code === 'Enter') {
      setTimeout(() => this.createParagraphFromIt());
    } else {
      const indexBlock = this.getCurrentBlockIndex();
      const nestedBlock = this.getBlockByIndex(indexBlock);
      const { holder } = nestedBlock;

      if (e.code === 'Tab' && e.shiftKey) {
        this.extractBlock(indexBlock);
      }
      if (e.code === 'Backspace') {
        const cursorPosition = document.getSelection().focusOffset;
        this.removeBlock(holder, nestedBlock.id, cursorPosition);
      }
    }
  }

  /**
   * When a nested block is removed, the 'items' attribute
   * is updated, subtracting from it an unit.
   * @param {string} id - block identifier
   */
  removeBlock(holder, id, cursorPosition) {
    if (cursorPosition === 0) {
      const position = this.itemsId.indexOf(id);
      this.itemsId.splice(position, 1);
    }
  }

  /**
   * Removes all properties of a nested block.
   *
   * @param {number} destiny - block position
   */
  removeAttributesFromNewBlock(destiny) {
    const newBlock = this.api.blocks.getBlockByIndex(destiny);
    const { holder } = newBlock;

    if (!this.itemsId.includes(newBlock.id)) {
      const i = this.itemsId.indexOf(newBlock.id);
      this.itemsId.splice(i, 1);
    }

    holder.removeAttribute('foreignKey');
    holder.removeAttribute('id');
    holder.onkeydown = {};
    holder.onkeyup = {};
    holder.classList.remove('toggle-block__item');
    holder.style.removeProperty('margin-left');
  }

  /**
   * Creates a toggle block view without paragraphs
   * and sets the default content.
   */
  createToggle() {
    this.wrapper = document.createElement('div');
    console.log('Creating toggle...', this.wrapper);
    this.wrapper.classList.add('toggle-block__selector');
    this.wrapper.id = this.data.fk;

    const icon = document.createElement('span');
    const input = document.createElement('div');
    const defaultContent = document.createElement('div');

    icon.classList.add('toggle-block__icon');
    icon.innerHTML = toggleIcon;

    input.classList.add('toggle-block__input');
    input.setAttribute('contentEditable', !this.readOnly);
    input.innerHTML = this.data.text || '';

    if (this.data.nested) {
      setTimeout(() => {
        console.log('It is nested!');
        const parentElement = this.wrapper.closest('.ce-block');
        const { previousSibling: previousItem } = parentElement;
        console.log('parentElement: ', parentElement);
        console.log('previousSibling: ', previousItem);
        const foreignKey = previousItem.getAttribute('foreignKey');
        console.log('foreignKey: ', foreignKey);
        parentElement.setAttribute('foreignKey', foreignKey);

        const styles = getComputedStyle(previousItem);
        const { marginLeft } = styles;
        parentElement.style.marginLeft = marginLeft;
      }, 2000);
    }

    // Events
    if (!this.readOnly) {
      // Events to create other blocks and destroy the toggle
      input.addEventListener('keyup', this.createParagraphFromToggleRoot.bind(this));
      input.addEventListener('keydown', this.removeToggle.bind(this));

      // Sets the focus at the end of the text when a nested block is deleted with the backspace key
      input.addEventListener('focusin', () => this.setFocusToggleRootAtTheEnd());

      // Establishes the placeholder for the toggle root when it's empty
      input.addEventListener('keyup', this.setPlaceHolder.bind(this));
      input.setAttribute('placeholder', this.placeholder);

      // Calculates the number of toggle items
      input.addEventListener('focus', this.setDefaultContent.bind(this));
      input.addEventListener('focusout', this.setDefaultContent.bind(this));

      // Event to add a block when the default content is clicked
      defaultContent.addEventListener('click', this.clickInDefaultContent.bind(this));

      input.addEventListener('focus', this.setNestedBlockAttributes.bind(this));
    }

    defaultContent.classList.add('toggle-block__content-default', 'toggle-block__hidden');
    defaultContent.innerHTML = this.defaultContent;

    this.wrapper.appendChild(icon);
    this.wrapper.appendChild(input);
    this.wrapper.appendChild(defaultContent);
  }

  /**
   * Sets the focus at the end of the toggle root when
   * a nested block is deleted through the backspace key.
   */
  setFocusToggleRootAtTheEnd() {
    const toggle = document.activeElement;
    const selection = window.getSelection();
    const range = document.createRange();

    selection.removeAllRanges();
    range.selectNodeContents(toggle);
    range.collapse(false);
    selection.addRange(range);
    toggle.focus();
  }

  /**
   * Adds the actions to do when the default content is clicked.
   */
  clickInDefaultContent() {
    this.api.blocks.insert();
    this.setAttributesToNewBlock();
    this.setDefaultContent();
  }

  /**
   * Sets the default content. If the toggle has no other blocks inside it,
   * so sets the 'block__hidden tag' in the default content,
   * otherwise it removes it.
   */
  setDefaultContent() {
    const children = document.querySelectorAll(`div[foreignKey="${this.wrapper.id}"]`);
    const { firstChild, lastChild } = this.wrapper;
    const { status } = this.data;
    const value = (children.length > 0 || status === 'closed');

    lastChild.classList.toggle('toggle-block__hidden', value);
    firstChild.style.color = (children.length === 0) ? 'gray' : 'black';
  }

  /**
   * Deletes the toggle structure and converts the main text and the nested blocks
   * in regular blocks.
   *
   * @param {KeyboardEvent} e - key down event
   */
  removeToggle(e) {
    if (e.code === 'Backspace') {
      const { children } = this.wrapper;
      const content = children[1].innerHTML;

      const cursorPosition = document.getSelection();

      if (cursorPosition.focusOffset === 0) {
        const index = this.api.blocks.getCurrentBlockIndex();
        const breakLine = content.indexOf('<br>');
        const end = breakLine === -1 ? content.length : breakLine;
        const blocks = document.querySelectorAll(`div[foreignKey="${this.wrapper.id}"]`);

        for (let i = 1; i < blocks.length + 1; i += 1) {
          this.removeAttributesFromNewBlock(index + i);
        }

        this.api.blocks.delete(index);
        this.api.blocks.insert('paragraph', { text: content.slice(0, end) }, {}, index, 1);
        this.api.caret.setToBlock(index);
      }
    }
  }

  /**
  * Returns the toggle's root index, given the index of one of its children
  *
  * @param {number} entryIndex - block index
  * @param {String} fk - The block's foreign key
  * @returns {number} The Toggle's root index
  */
  findToggleRootIndex(entryIndex, fk) {
    const block = this.getBlockByIndex(entryIndex);
    const { holder } = block;

    if (this.isAToggleRoot(holder)) {
      const id = holder.querySelector('.toggle-block__selector').getAttribute('id');
      if (fk === id) {
        return entryIndex;
      }
    }
    if (entryIndex - 1 >= 0) {
      return this.findToggleRootIndex(entryIndex - 1, fk);
    }
    return -1;
  }

  /**
   * Extracts a nested block from a toggle
   * with 'shift + tab' combination
   *
   * @param {number} entryIndex - Block's index that will be extracted
   */
  extractBlock(entryIndex) {
    const block = this.getBlockByIndex(entryIndex);
    const { holder } = block;

    if (this.isAToggleItem(holder)) {
      const fk = holder.getAttribute('foreignKey');
      const parentIndex = this.findToggleRootIndex(entryIndex, fk);
      if (parentIndex >= 0) {
        const items = this.getDescendantsNumber(fk);
        const destiny = parentIndex + items;

        if (items > 1) { this.api.blocks.move(destiny, entryIndex); }

        setTimeout(() => this.removeAttributesFromNewBlock(destiny), 200);
      }
    }
    this.api.caret.setToBlock(entryIndex);
    this.api.toolbar.close();
  }

  /**
   * If the toggle root is empty and the key event received is 'backspace'
   * or 'enter', its content is cleared so that the visible placeholder
   * is set through the css.
   *
   * @param {KeyboardEvent} e - key up event
   */
  setPlaceHolder(e) {
    if (e.code === 'Backspace' || e.code === 'Enter') {
      const { children } = this.wrapper;
      const { length } = children[1].textContent;

      if (length === 0) children[1].textContent = '';
    }
  }

  /**
   * Renders Tool's view.
   * First renders the toggle root, and immediately
   * renders its items as new blocks under the root.
   *
   * @returns {HTMLDivElement}
   */
  render() {
    this.createToggle();

    const index = this.api.blocks.getCurrentBlockIndex();
    const block = this.api.blocks.getBlockByIndex(index) || {};
    const { holder } = block;

    if (holder && this.isPartOfAToggle(holder)) {
      const foreignKey = holder.getAttribute('foreignKey');
      const styles = getComputedStyle(holder);
      const { marginLeft } = styles;
      setTimeout(() => {
        const nestedBlock = this.api.blocks.getBlockByIndex(index);
        const { holder: nestedHolder } = nestedBlock;
        const id = uuidv4();
        nestedHolder.classList.add('toggle-block__item');
        nestedHolder.setAttribute('foreignKey', foreignKey);
        nestedHolder.setAttribute('id', id);

        this.itemsMarginLeft = parseFloat(marginLeft);
        nestedHolder.style.marginLeft = `${this.itemsMarginLeft}px`;
        this.data.nested = true;
      }, 1);
    }

    // Renders the nested blocks after the toggle root is rendered
    setTimeout(() => this.renderItems());

    // Adds initial transition for the icon
    setTimeout(() => this.setInitialTransition());

    return this.wrapper;
  }

  /**
   * Adds the initial status for the icon, and establishes
   * the delay for the transition displayed when the icon
   * is clicked.
   */
  setInitialTransition() {
    const { status } = this.data;
    const icon = this.wrapper.firstChild;
    const svg = icon.firstChild;
    svg.style.transition = '0.1s';
    svg.style.transform = `rotate(${status === 'closed' ? 0 : 90}deg)`;
  }

  /**
   * Renders the items view and assigns the properties required to look
   * like a block inside the toggle.
   */
  renderItems() {
    const blocksInEditor = this.api.blocks.getBlocksCount();
    const icon = this.wrapper.firstChild;
    let toggleRoot;

    if (this.readOnly) {
      const redactor = document.getElementsByClassName('codex-editor__redactor')[0];
      const { children } = redactor;
      const { length } = children;

      for (let i = 0; i < length; i += 1) {
        const blockCover = children[i].firstChild;
        const blockContainer = blockCover.firstChild;
        const { id } = blockContainer;

        if (id === this.wrapper.id) {
          toggleRoot = i;
          break;
        }
      }
    } else {
      const toggle = this.wrapper.children[1];
      let currentBlock = {};
      let index = this.api.blocks.getCurrentBlockIndex();
      const delta = (index === blocksInEditor - 1) ? -1 : 1;

      while (currentBlock[1] !== toggle) {
        toggleRoot = index;
        const block = this.api.blocks.getBlockByIndex(toggleRoot);
        if (!block) break;
        const { holder } = block;
        const blockCover = holder.firstChild;
        const blockContent = blockCover.firstChild;
        currentBlock = blockContent.children;

        index += delta;
      }
    }

    if (toggleRoot + this.data.items < blocksInEditor) {
      for (let i = toggleRoot + 1, j = 0; i <= toggleRoot + this.data.items; i += 1) {
        const block = this.api.blocks.getBlockByIndex(i);
        const { holder } = block;
        const cover = holder.firstChild;
        const content = cover.firstChild;

        if (!this.isPartOfAToggle(content)) {
          this.setAttributesToNewBlock(i);
          j += 1;
        } else {
          this.data.items = j;
          break;
        }
      }
    } else {
      this.data.items = 0;
    }

    icon.addEventListener('click', () => {
      this.resolveToggleAction();
      setTimeout(() => {
        this.hideAndShowBlocks();
      });
    });

    this.hideAndShowBlocks();
  }

  /**
   * Converts the toggle status to its opposite.
   * If the toggle status is open, then now will be closed and
   * the icon will reset to rotation. Otherwise, will be open
   * and the icon will be rotated 90 degrees to the left.
   *
   * @returns {string} icon - toggle icon
   */
  resolveToggleAction() {
    const icon = this.wrapper.firstChild;
    const svg = icon.firstChild;

    if (this.data.status === 'closed') {
      this.data.status = 'open';
      svg.style.transform = 'rotate(90deg)';
    } else {
      this.data.status = 'closed';
      svg.style.transform = 'rotate(0deg)';
    }

    const toggleBlock = this.api.blocks.getBlockByIndex(this.api.blocks.getCurrentBlockIndex());
    toggleBlock.holder.setAttribute('status', this.data.status);
  }

  /**
   * Hides and shows the toggle paragraphs or the default content.
   * If the toggle status is closed, the added value to the hidden attribute
   * in the container paragraph is 'true', otherwise is 'false'.
   *
   * @param {number} index - toggle index
   */
  hideAndShowBlocks(foreignKey = this.wrapper.id, value = this.data.status) {
    const children = document.querySelectorAll(`div[foreignKey="${foreignKey}"]`);
    const { length } = children;

    if (length > 0) {
      children.forEach((child) => {
        child.hidden = value === 'closed';

        // Check if this child is a toggle and hide his children too
        const toggles = child.querySelectorAll('.toggle-block__selector');
        const isToggle = toggles.length > 0;
        if (isToggle) {
          const childValue = value === 'closed' ? value : child.getAttribute('status');
          this.hideAndShowBlocks(toggles[0].getAttribute('id'), childValue);
        }
      });
    } else if (foreignKey === this.wrapper.id) {
      const { lastChild } = this.wrapper;
      lastChild.classList.toggle('toggle-block__hidden', value);
    }
  }

  /**
   * Extracts Tool's data from the view
   * @param {HTMLDivElement} blockContent - Toggle tools rendered view
   * @returns {ToggleBlockData} - saved data
   */
  save(blockContent) {
    const id = blockContent.getAttribute('id');
    const { children } = blockContent;
    const caption = children[1].innerHTML;
    const blocks = document.querySelectorAll(`div[foreignKey="${id}"]`);
    this.data.fk = id;

    return Object.assign(this.data, {
      text: caption,
      items: blocks.length,
    });
  }

  /**
   * Return the number of blocks inside the root Toggle
   * @param {string} fk - The id of the root Toggle
   */
  getDescendantsNumber(fk) {
    let counter = 0;
    const listChildren = document.querySelectorAll(`div[foreignKey="${fk}"]`);
    listChildren.forEach((child) => {
      // Evaluate if the child is a toggle
      if (child.hasAttribute('status')) {
        const childId = child.querySelector('.toggle-block__selector').getAttribute('id');
        counter += this.getDescendantsNumber(childId);
      }
      counter += 1;
    });
    return counter;
  }

  /**
   * Highlight the blocks that belongs to the Toggle
   * @param {string} fk - The id of the root Toggle
   */
  highlightToggleItems(fk) {
    const listChildren = document.querySelectorAll(`div[foreignKey="${fk}"]`);
    listChildren.forEach((child) => {
      child.classList.add('ce-block--selected');
      // Evaluate if the child is a toggle, then highlight also its children
      if (child.hasAttribute('status')) {
        const childId = child.querySelector('.toggle-block__selector').getAttribute('id');
        this.highlightToggleItems(childId);
      }
    });
  }

  /**
   * Adds events for the move up, move down and delete options in the toolbar
   */
  renderSettings() {
    const settingsBar = document.getElementsByClassName('ce-settings');
    const optionsContainer = settingsBar[0];

    setTimeout(() => {
      const options = optionsContainer.lastChild;
      const toggleIndex = this.api.blocks.getCurrentBlockIndex();
      this.highlightToggleItems(this.wrapper.id);

      const moveUpElement = options.querySelector('[data-item-name="move-up"]')
        || options.getElementsByClassName('ce-tune-move-up')[0];
      const moveDownElement = options.querySelector('[data-item-name="move-down"]')
        || options.getElementsByClassName('ce-tune-move-down')[0];
      const deleteElement = options.querySelector('[data-item-name="delete"]')
        || options.getElementsByClassName('ce-settings__button--delete')[0];

      this.addEventsMoveButtons(moveDownElement, 0, toggleIndex);
      this.addEventsMoveButtons(moveUpElement, 1, toggleIndex);
      this.addEventDeleteButton(deleteElement, toggleIndex);
    });

    return document.createElement('div');
  }

  /**
   * Add listener to move button.
   * @param {HTMLDivElement} moveElement
   * @param {number} movement // 0: Move down || 1: Move up
   * @param {number} toggleIndex
   */
  addEventsMoveButtons(moveElement, movement, toggleIndex) {
    if (!moveElement) return;
    moveElement.addEventListener('click', () => {
      this.moveToggle(toggleIndex, movement);
    });
  }

  /**
   * Add listener to delete button.
   * @param {HTMLDivElement} deleteElement
   * @param {number} toggleIndex
   */
  addEventDeleteButton(deleteElement, toggleIndex) {
    if (!deleteElement) return;

    deleteElement.addEventListener('click', () => {
      const classesList = deleteElement.classList;
      const classes = Object.values(classesList);

      if (classes.indexOf('clicked-to-destroy-toggle') === -1) {
        deleteElement.classList.add('clicked-to-destroy-toggle');
      } else {
        this.removeFullToggle(toggleIndex);
      }
    });
  }

  /**
   * Move the Toggle with all its children and nested toggles.
   * Index of the root toggle before it is moved by editorjs core.
   * @param {number} toggleInitialIndex
   * @param {number} direction // 0: Move down || 1: Move up
   */
  moveToggle(toggleInitialIndex, direction) {
    if (!this.readOnly) {
      this.close();
      const currentToggleIndex = this.getCurrentBlockIndex();
      const descendants = this.getDescendantsNumber(this.wrapper.id);
      const blocks = this.getBlocksCount();
      const toggleEndIndex = toggleInitialIndex + descendants;

      // Move back the root of the Toggle to its initial position
      this.move(toggleInitialIndex, currentToggleIndex);

      if (toggleInitialIndex >= 0 && toggleEndIndex <= (blocks - 1)) {
        if (direction === 0) {
          this.moveDown(toggleInitialIndex, toggleEndIndex);
        } else {
          this.moveUp(toggleInitialIndex, toggleEndIndex);
        }
      }
    }
  }

  /**
   * Move down the whole current toggle to the next corresponding position
   * @param {number} toggleInitialIndex // index of the root of the current toggle
   * @param {number} toggleEndIndex // index of the last child of the current toggle
   */
  moveDown(toggleInitialIndex, toggleEndIndex) {
    const blockAfterToggleIndex = toggleEndIndex + 1;
    const blockAfterToggle = this.getBlockByIndex(blockAfterToggleIndex);
    const { holder } = blockAfterToggle;

    this.move(toggleInitialIndex, blockAfterToggleIndex);

    // Evaluate if the block is a toggle to move its children
    if (blockAfterToggle.name === 'toggle') {
      const id = holder.querySelector('.toggle-block__selector').getAttribute('id');
      const children = this.getDescendantsNumber(id);
      this.moveDescendants(children, toggleInitialIndex + 1, blockAfterToggleIndex + 1, 0);
    }
  }

  /**
   * Move up the whole current toggle to the next corresponding position
   * @param {number} toggleInitialIndex // index of the root of the current toggle
   * @param {number} toggleEndIndex // index of the last child of the current toggle
   */
  moveUp(toggleInitialIndex, toggleEndIndex) {
    const blockBeforeToggleIndex = toggleInitialIndex - 1;
    const blockBeforeToggle = this.getBlockByIndex(blockBeforeToggleIndex);
    if (blockBeforeToggle.name === 'toggle') {
      return;
    }
    const { holder } = blockBeforeToggle;
    // Evaluate if the block is an item of a toggle to move the whole parent toggle
    if (holder.hasAttribute('foreignKey')) {
      const currentToggle = this.getBlockByIndex(toggleInitialIndex).holder;
      const currentToggleFk = currentToggle.getAttribute('foreignKey');
      const fk = holder.getAttribute('foreignKey');
      if (fk !== currentToggleFk) {
        const parentBlockIdx = this.findIndexOfParentBlock(currentToggleFk, fk, toggleInitialIndex);
        const parentBlock = this.getBlockByIndex(parentBlockIdx).holder;
        const id = parentBlock.querySelector('.toggle-block__selector').getAttribute('id');
        const children = this.getDescendantsNumber(id);
        this.move(toggleEndIndex, parentBlockIdx);
        this.moveDescendants(children, toggleEndIndex, parentBlockIdx, 1);
        return;
      }
    }
    this.move(toggleEndIndex, blockBeforeToggleIndex);
  }

  /**
   * Returns the index of the root of the toggle which is at the same level of the toggle that it
   * is expected to be moved
   *
   * fk of the toggle that is going to be moved
   * @param {string} currentToggleFk
   * @param {string} blockFk // fk of block which is above of the current toggle root
   * @param {number} toggleInitialIndex // index of the root of the current toggle root
   * @returns
   */
  findIndexOfParentBlock(currentToggleFk, blockFk, toggleInitialIndex) {
    const NestedToggleChildren = this.getDescendantsNumber(blockFk);
    const parentBlockIndex = toggleInitialIndex - (NestedToggleChildren + 1);
    const parentBlock = this.getBlockByIndex(parentBlockIndex).holder;
    if (parentBlock.hasAttribute('foreignKey')) {
      const parentBlockFk = parentBlock.getAttribute('foreignKey');
      if (parentBlockFk !== currentToggleFk) {
        const beforeBlock = this.getBlockByIndex(parentBlockIndex - 1).holder;
        if (beforeBlock.hasAttribute('foreignKey')) {
          const fk = beforeBlock.getAttribute('foreignKey');
          if (fk !== parentBlockFk) {
            return this.findIndexOfParentBlock(currentToggleFk, fk, parentBlockIndex);
          }
        }
      }
    }
    return parentBlockIndex;
  }

  /**
   * Move all the children of the toggle that is being moved
   * @param {number} children // Number of children of the current toggle
   * @param {number} finalIndex // index to calculate where children are going to be moved
   * @param {number} parentInitialIndex // index to calculate where the children are
   * @param {number} direction // 0: to move from top to bottom || 1: to move from bottom to the top
   */
  moveDescendants(children, finalIndex, parentInitialIndex, direction) {
    let childrenCurrentPosition = parentInitialIndex;
    let childrenFinalPosition = finalIndex;
    while (children) {
      this.move(childrenFinalPosition, childrenCurrentPosition);
      if (direction === 0) {
        childrenCurrentPosition += 1;
        childrenFinalPosition += 1;
      }
      children -= 1;
    }
  }

  /**
   * Removes a toggle root and its nested blocks.
   *
   * @param {number} toggleIndex - toggle index
   */
  removeFullToggle(toggleIndex) {
    const children = document.querySelectorAll(`div[foreignKey="${this.wrapper.id}"]`);
    const { length } = children;

    for (let i = toggleIndex; i < toggleIndex + length; i += 1) {
      setTimeout(() => this.api.blocks.delete(toggleIndex));
    }
  }

  /**
   * Adds the required listeners to call the toggle shortcuts
   * on the editor.
   */
  addListeners() {
    if (!this.readOnly) {
      const redactor = document.activeElement;
      redactor.addEventListener('keyup', (e) => {
        const blockContainer = document.activeElement;
        const currentBlock = this.getCurrentBlockIndex();
        const { holder: currentBlockContainer } = this.getBlockByIndex(currentBlock);

        if (e.code === 'Space') {
          this.createToggleWithShortcut(blockContainer);
        } else if (currentBlock > 0 && !this.isPartOfAToggle(currentBlockContainer) && e.code === 'Tab') {
          this.nestBlock(currentBlockContainer);
        }
      });
    }
  }

  /**
   * Adds mutation observer to restore the item attributes
   * when the undo action is executed and they're lost.
   */
  addSupportForUndoAndRedoActions() {
    if (!this.readOnly) {
      const target = document.querySelector('div.codex-editor__redactor');

      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList') {
            setTimeout(this.restoreItemAttributes.bind(this, mutation));
          }
        });
      });

      const config = { attributes: true, childList: true, characterData: true };

      observer.observe(target, config);
    }
  }

  getIndex = (target) => Array.from(target.parentNode.children).indexOf(target);

  /**
   * Checks if target is a child of a toggle
   * @param {string} parentID id of the parent element
   * @param {string} targetFK foreign key of the target element
   * @returns {boolean}
   */
  isChild = (parentID, targetFK) => {
    if (!parentID || !targetFK) return false; // No parent or no target
    if (parentID === targetFK) return true; // Direct child of the toggle

    return [...document.querySelectorAll(`div[foreignKey="${parentID}"]`)]
      .some((child) => {
        const toggle = child.querySelector('.toggle-block__selector');
        if (!toggle) return false;
        return this.isChild(toggle.getAttribute('id'), targetFK);
      });
  };

  /**
   * Adds drop listener to move the childs item
   * when the drag and drop action is executed.
   */
  addSupportForDragAndDropActions() {
    if (!this.readOnly) {
      if (this.wrapper === undefined) {
        setTimeout(() => this.addSupportForDragAndDropActions(), 250);
        return;
      }

      // Set status in attribute to a proper hide and show
      const wrapperElement = document.querySelector(`#${this.wrapper.id}`);
      if (wrapperElement) {
        const toggleBlock = document.querySelector(`#${this.wrapper.id}`).parentNode?.parentNode;
        toggleBlock.setAttribute('status', this.data.status);
      }

      const settingsButton = document.querySelector('.ce-toolbar__settings-btn');
      settingsButton.setAttribute('draggable', 'true');
      settingsButton.addEventListener('dragstart', () => {
        this.startBlock = this.api.blocks.getCurrentBlockIndex();
        this.nameDragged = this.api.blocks.getBlockByIndex(this.startBlock).name;
        this.holderDragged = this.api.blocks.getBlockByIndex(this.startBlock).holder;
      });

      document.addEventListener('drop', (event) => {
        // Get the position when item was dropped
        const { target } = event;
        if (document.contains(target)) {
          const dropTarget = target.classList.contains('ce-block') ? target : target.closest('.ce-block');
          if (dropTarget && dropTarget !== this.holderDragged) {
            let endBlock = this.getIndex(dropTarget);

            // Control the toggle's children will be positioned down of the parent
            endBlock = this.startBlock < endBlock ? endBlock + 1 : endBlock;

            // Check if the item dropped is another toggle
            const isTargetAToggle = dropTarget.querySelectorAll('.toggle-block__selector').length > 0
              || dropTarget.getAttribute('foreignKey') !== null;

            setTimeout(() => {
              // Verify if the item dropped is the toggle
              if (this.nameDragged === 'toggle') {
                // Verify if the toggle dropped is the same of this eventListener
                const currentToggleDropped = this.holderDragged.querySelector(`#${this.wrapper.id}`);

                if (currentToggleDropped) {
                  // Check if the toggle dropped was not dropped in its children
                  if (!this.isChild(currentToggleDropped.getAttribute('id'), dropTarget.getAttribute('foreignKey'))) {
                    // If is a toggle we have to add the attributes to make it a part of the toggle
                    this.assignToggleItemAttributes(isTargetAToggle, dropTarget);
                    this.moveChildren(endBlock);
                  } else {
                    // If we are dropping in the toggle children,
                    // we have to move the toggle in the original position
                    if (this.startBlock === endBlock) {
                      this.api.blocks.move(this.startBlock + 1, endBlock);
                    } else {
                      this.api.blocks.move(this.startBlock, endBlock);
                    }

                    // And remove the attributes
                    if (!isTargetAToggle) {
                      const newToggleIndex = this.getIndex(this.holderDragged);
                      this.removeAttributesFromNewBlock(newToggleIndex);
                    }
                  }
                }
              } else if (this.nameDragged) {
                // Add the dropped item as an element of the toggle
                this.assignToggleItemAttributes(isTargetAToggle, dropTarget);
              }

              // If we are dropping out of a toggle we have to remove the attributes
              if (!isTargetAToggle) {
                const newToggleIndex = this.getIndex(this.holderDragged);
                this.removeAttributesFromNewBlock(newToggleIndex);
              }
            });
          }
        }
      });
    }
  }

  assignToggleItemAttributes(isTargetAToggle, dropTarget) {
    if (isTargetAToggle) {
      const foreignKey = dropTarget.getAttribute('foreignKey')
        ?? dropTarget.querySelector('.toggle-block__selector').getAttribute('id');

      const newToggleIndex = this.getIndex(this.holderDragged);
      this.setAttributesToNewBlock(newToggleIndex, foreignKey);
    }
  }

  moveChildren(endBlock, fk = this.wrapper.id) {
    // Get the children of the dropped toggle
    let children = document.querySelectorAll(`div[foreignKey="${fk}"]`);

    // Move all the children to the parent position
    children = this.startBlock >= endBlock ? [...children].reverse() : children;
    children.forEach((child) => {
      const childIndex = this.getIndex(child);
      this.api.blocks.move(endBlock, childIndex);

      // If this child is a toggle we have to move his children too
      const toggles = child.querySelectorAll('.toggle-block__selector');
      const isToggle = toggles.length > 0;
      if (isToggle) {
        const toggleIndex = this.getIndex(child);
        const fix = this.startBlock < endBlock ? 0 : 1;
        toggles.forEach((toggle) => this.moveChildren(toggleIndex + fix, toggle.getAttribute('id')));

        const dif = Math.abs(endBlock - toggleIndex);
        endBlock = this.startBlock < endBlock ? endBlock + dif : endBlock - dif;
      }
    });
  }

  /**
   * Restores the item attributes to nested blocks.
   *
   * @param {HTMLDivElement} mutation - Html element removed or inserted
   */
  restoreItemAttributes(mutation) {
    if (this.wrapper !== undefined) {
      const index = this.api.blocks.getCurrentBlockIndex();
      const block = this.api.blocks.getBlockByIndex(index);
      const { holder } = block;
      const currentBlockValidation = !this.isPartOfAToggle(holder);
      const { length: toggleItemsCount } = this.itemsId;
      const { length: existingToggleItemsCount } = document.querySelectorAll(`div[foreignKey="${this.data.fk}"]`);

      if (this.itemsId.includes(block.id) && currentBlockValidation) {
        this.setAttributesToNewBlock(index);
      } else if (
        mutation.addedNodes[0]
        && mutation?.previousSibling
        && this.isPartOfAToggle(mutation.previousSibling)
        && !this.isPartOfAToggle(mutation.addedNodes[0])
        && toggleItemsCount > existingToggleItemsCount
      ) {
        const { id: addedBlockId } = mutation.addedNodes[0];
        const addedBlock = this.api.blocks.getById(addedBlockId);
        this.setAttributesToNewBlock(null, this.wrapper.id, addedBlock);
        this.itemsId[index] = block.id;
      }
    }
  }

  /**
   * Creates a toggle through the '>' char and the 'Space' key
   */
  createToggleWithShortcut(blockContainer) {
    const content = blockContainer.textContent;

    if ((content[0] === '>') && !this.isPartOfAToggle(blockContainer)) {
      const blockCaller = this.api.blocks.getCurrentBlockIndex();

      this.api.blocks.insert('toggle', { text: content.slice(2) }, this.api, blockCaller, true);
      this.api.blocks.delete(blockCaller + 1);
      this.api.caret.setToBlock(blockCaller);
    }
  }

  /**
   * Nests a block inside a toggle through the 'Tab' key
   */
  nestBlock(blockContainer) {
    const previousBlock = blockContainer.previousElementSibling;
    const previousCover = previousBlock.firstChild;
    const previousContainer = previousCover.firstChild;

    if (this.isPartOfAToggle(previousContainer) || this.isPartOfAToggle(previousBlock)) {
      const foreignId = previousBlock.getAttribute('foreignKey');
      const toggleId = previousContainer.getAttribute('id');
      const foreignKey = foreignId || toggleId;

      blockContainer.setAttribute('will-be-a-nested-block', true);

      const toggleRoot = document.getElementById(foreignKey);
      toggleRoot.children[1].focus();
    }
  }

  /**
  * Sets the required attributes to convert an external block
  * of the toggle into a block inside the toggle.
   */
  setNestedBlockAttributes() {
    const blockIndex = this.api.blocks.getCurrentBlockIndex();
    const block = this.api.blocks.getBlockByIndex(blockIndex);
    const { holder } = block;
    const willBeABlock = holder.getAttribute('will-be-a-nested-block');

    if (willBeABlock) {
      holder.removeAttribute('will-be-a-nested-block');
      this.setAttributesToNewBlock(blockIndex);
      this.api.toolbar.close();
    }
  }

  /**
   * Validates if a block contains one of the classes to be
   * part of a toggle. If It has it returns 'true' (It's part
   * of a toggle), otherwise returns 'false' (It's another
   * type of block)
   *
   * @param {HTMLDivElement} block - Block to be validated
   * @returns {boolean}
   */
  isPartOfAToggle(block) {
    const classes = Array.from(block.classList);
    const classNamesToCheck = ['toggle-block__item', 'toggle-block__input', 'toggle-block__selector'];
    const isToggleChild = classNamesToCheck.some(
      (className) => block.getElementsByClassName(className).length !== 0,
    );
    const isToggle = classNamesToCheck.some((className) => classes.includes(className));

    return isToggle || isToggleChild;
  }

  /**
   * Adds mutation observer to reset the toggle ids
   * when a toggle is copied and pasted.
   */
  addSupportForCopyAndPasteAction() {
    if (!this.readOnly) {
      const target = document.querySelector('div.codex-editor__redactor');

      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList') {
            setTimeout(this.resetIdToCopiedBlock.bind(this, mutation));
          }
        });
      });

      const config = { attributes: true, childList: true, characterData: true };

      observer.observe(target, config);
    }
  }

  /**
   * Reset the toggle ids to ensure toggles with unique id.
   */
  resetIdToCopiedBlock() {
    if (this.wrapper !== undefined) {
      const index = this.api.blocks.getCurrentBlockIndex();
      const { holder } = this.api.blocks.getBlockByIndex(index);

      if (this.isPartOfAToggle(holder)) {
        const foreignKey = holder.getAttribute('foreignKey');
        const toggleRoot = document.querySelectorAll(`#${foreignKey}`);

        if (toggleRoot.length > 1) {
          const parentBlock = this.findToggleRootIndex(index, foreignKey);
          const id = uuidv4();

          for (let i = parentBlock; i <= index; i += 1) {
            const currentBlock = this.api.blocks.getBlockByIndex(i);
            const { holder: currentBlockHolder } = currentBlock;
            if (i === parentBlock) {
              const externalCover = currentBlockHolder.firstChild;
              const toggleCover = externalCover.firstChild;
              toggleCover.setAttribute('id', `fk-${id}`);
            } else {
              currentBlockHolder.setAttribute('foreignKey', `fk-${id}`);
            }
          }
        }
      }
    }
  }
}
