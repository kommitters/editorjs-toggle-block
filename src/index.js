import './index.css';
import toggleIcon from '../assets/toggleIcon.svg';

// Toggle Imports
import {
  isAToggleItem,
  isAToggleRoot,
  setFocusToggleRootAtTheEnd,
  resolveToggleAction,
  assignToggleItemAttributes,
  findToggleRootIndex,
  highlightToggleItems,
  isPartOfAToggle,
  addEventsMoveButtons,
  moveToggle,
  removeFullToggle,
} from './toggle/actions';
import toggleBlockConstructor from './toggle/toggleBlockConstructor';
import createParagraphFromToggleRoot from './toggle/createParagraphFromToggleRoot';

// Block Imports
import setAttributesToNewBlock from './blocks/setAttributesToNewBlock';
// eslint-disable-next-line import/no-duplicates
import findIndexOfParentBlock from './blocks/findIndexOfParentBlock';
// eslint-disable-next-line import/no-duplicates
import extractBlock from './blocks/extractBlock';
import hideAndShowBlocks from './blocks/hideAndShowBlocks';
import {
  removeBlock,
  removeAttributesFromNewBlock,
} from './blocks/removeBlockAndAttributes';
import resetIdToCopiedBlock from './blocks/resetIdToCopiedBlock';
import save from './blocks/save';

// Movements Imports
import moveChildren from './movements/moveChildren';
import isChild from './movements/isChild';
import moveDescendants from './movements/moveDescendants';
import moveDown from './movements/moveDown';
import moveUp from './movements/moveUp';

// Nest Imports
import nestBlock from './nest/nestBlock';
import setEventsToNestedBlock from './nest/setEventsToNestedBlock';
import setNestedBlockAttributes from './nest/setNestedBlockAttributes';

// Render Imports
import render from './render/render';
import renderItems from './render/renderItems';
import renderSettings from './render/renderSettings';

import {
  addEventDeleteButton,
  addListeners,
  addSupportForCopyAndPasteAction,
  clickInDefaultContent,
  getDescendantsNumber,
  restoreItemAttributes,
  setInitialTransition,
  enableLineBreaks,
  readOnlySupported,
  setPlaceHolder,
} from './actions/actions';

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
  static get toolbox() {
    return {
      title: 'Toggle',
      icon: toggleIcon,
    };
  }

  static enableLineBreaks = enableLineBreaks;

  static readOnlySupported = readOnlySupported;

  constructor(options) {
    toggleBlockConstructor.call(this, options);
  }

  isAToggleItem(holder) {
    return isAToggleItem(holder);
  }

  isAToggleRoot(holder) {
    return isAToggleRoot(holder);
  }

  createParagraphFromToggleRoot(e) {
    return createParagraphFromToggleRoot.call(this, e);
  }

  createParagraphFromIt() {
    return this.setAttributesToNewBlock();
  }

  setAttributesToNewBlock(
    entryIndex = null,
    foreignKey = this.wrapper.id,
    block = null,
  ) {
    return setAttributesToNewBlock.call(this, entryIndex, foreignKey, block);
  }

  setEventsToNestedBlock(e) {
    return setEventsToNestedBlock.call(this, e);
  }

  removeBlock(holder, id, cursorPosition) {
    return removeBlock.call(this, holder, id, cursorPosition);
  }

  removeAttributesFromNewBlock(destiny) {
    return removeAttributesFromNewBlock.call(this, destiny);
  }

  /**
   * Creates a toggle block view without paragraphs
   * and sets the default content.
   */
  createToggle() {
    this.wrapper = document.createElement('div');
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

    // Events
    if (!this.readOnly) {
      // Events to create other blocks and destroy the toggle
      input.addEventListener(
        'keyup',
        this.createParagraphFromToggleRoot.bind(this),
      );
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
      defaultContent.addEventListener(
        'click',
        this.clickInDefaultContent.bind(this),
      );

      input.addEventListener('focus', this.setNestedBlockAttributes.bind(this));
    }

    defaultContent.classList.add(
      'toggle-block__content-default',
      'toggle-block__hidden',
    );
    defaultContent.innerHTML = this.defaultContent;

    this.wrapper.appendChild(icon);
    this.wrapper.appendChild(input);
    this.wrapper.appendChild(defaultContent);
  }

  setFocusToggleRootAtTheEnd() {
    return setFocusToggleRootAtTheEnd.call(this);
  }

  /**
   * Adds the actions to do when the default content is clicked.
   */
  clickInDefaultContent() {
    return clickInDefaultContent.call(this);
  }

  /**
   * Sets the default content. If the toggle has no other blocks inside it,
   * so sets the 'block__hidden tag' in the default content,
   * otherwise it removes it.
   */
  setDefaultContent() {
    const children = document.querySelectorAll(
      `div[foreignKey="${this.wrapper.id}"]`,
    );
    const { firstChild, lastChild } = this.wrapper;
    const { status } = this.data;
    const value = children.length > 0 || status === 'closed';

    lastChild.classList.toggle('toggle-block__hidden', value);
    firstChild.style.color = children.length === 0 ? 'gray' : 'black';
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
        const blocks = document.querySelectorAll(
          `div[foreignKey="${this.wrapper.id}"]`,
        );

        for (let i = 1; i < blocks.length + 1; i += 1) {
          this.removeAttributesFromNewBlock(index + i);
        }

        this.api.blocks.delete(index);
        this.api.blocks.insert(
          'paragraph',
          { text: content.slice(0, end) },
          {},
          index,
          1,
        );
        this.api.caret.setToBlock(index);
      }
    }
  }

  findToggleRootIndex(entryIndex, fk) {
    return findToggleRootIndex.call(this, entryIndex, fk);
  }

  extractBlock(entryIndex) {
    return extractBlock.call(this, entryIndex);
  }

  setPlaceHolder(e) {
    return setPlaceHolder.call(this, e);
  }

  render() {
    return render.call(this);
  }

  setInitialTransition() {
    return setInitialTransition.call(this);
  }

  renderItems() {
    return renderItems.call(this);
  }

  resolveToggleAction() {
    return resolveToggleAction.call(this);
  }

  hideAndShowBlocks(foreignKey = this.wrapper.id, value = this.data.status) {
    return hideAndShowBlocks.call(this, foreignKey, value);
  }

  save(blockContent) {
    return save.call(this, blockContent);
  }

  getDescendantsNumber(fk) {
    return getDescendantsNumber.call(this, fk);
  }

  highlightToggleItems(fk) {
    return highlightToggleItems.call(this, fk);
  }

  renderSettings() {
    return renderSettings.call(this);
  }

  addEventsMoveButtons(moveElement, movement, toggleIndex) {
    return addEventsMoveButtons.call(this, moveElement, movement, toggleIndex);
  }

  addEventDeleteButton(deleteElement, toggleIndex) {
    addEventDeleteButton.call(this, deleteElement, toggleIndex);
  }

  moveToggle(toggleInitialIndex, direction) {
    moveToggle.call(this, toggleInitialIndex, direction);
  }

  moveDown(toggleInitialIndex, toggleEndIndex) {
    return moveDown.call(this, toggleInitialIndex, toggleEndIndex);
  }

  moveUp(toggleInitialIndex, toggleEndIndex) {
    return moveUp.call(this, toggleInitialIndex, toggleEndIndex);
  }

  findIndexOfParentBlock(currentToggleFk, blockFk, toggleInitialIndex) {
    return findIndexOfParentBlock.call(
      this,
      currentToggleFk,
      blockFk,
      toggleInitialIndex,
    );
  }

  moveDescendants(children, finalIndex, parentInitialIndex, direction) {
    moveDescendants.call(
      this,
      children,
      finalIndex,
      parentInitialIndex,
      direction,
    );
  }

  removeFullToggle(toggleIndex) {
    removeFullToggle.call(this, toggleIndex);
  }

  addListeners() {
    addListeners.call(this);
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

  isChild(parentID, targetFK) {
    return isChild.call(this, parentID, targetFK);
  }

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
      const toggleBlock = document.querySelector(`#${this.wrapper.id}`)
        .parentNode.parentNode;
      toggleBlock.setAttribute('status', this.data.status);

      const settingsButton = document.querySelector(
        '.ce-toolbar__settings-btn',
      );
      settingsButton.setAttribute('draggable', 'true');
      settingsButton.addEventListener('dragstart', () => {
        this.startBlock = this.api.blocks.getCurrentBlockIndex();
        this.nameDragged = this.api.blocks.getBlockByIndex(
          this.startBlock,
        ).name;
        this.holderDragged = this.api.blocks.getBlockByIndex(
          this.startBlock,
        ).holder;
      });

      document.addEventListener('drop', (event) => {
        // Get the position when item was dropped
        const { target } = event;
        if (document.contains(target)) {
          const dropTarget = target.classList.contains('ce-block')
            ? target
            : target.closest('.ce-block');
          if (dropTarget && dropTarget !== this.holderDragged) {
            let endBlock = this.getIndex(dropTarget);

            // Control the toggle's children will be positioned down of the parent
            endBlock = this.startBlock < endBlock ? endBlock + 1 : endBlock;

            // Check if the item dropped is another toggle
            const isTargetAToggle = dropTarget.querySelectorAll('.toggle-block__selector').length
                > 0 || dropTarget.getAttribute('foreignKey') !== null;

            setTimeout(() => {
              // Verify if the item dropped is the toggle
              if (this.nameDragged === 'toggle') {
                // Verify if the toggle dropped is the same of this eventListener
                const currentToggleDropped = this.holderDragged.querySelector(
                  `#${this.wrapper.id}`,
                );

                if (currentToggleDropped) {
                  // Check if the toggle dropped was not dropped in its children
                  if (
                    !this.isChild(
                      currentToggleDropped.getAttribute('id'),
                      dropTarget.getAttribute('foreignKey'),
                    )
                  ) {
                    // If is a toggle we have to add the attributes to make it a part of the toggle
                    this.assignToggleItemAttributes(
                      isTargetAToggle,
                      dropTarget,
                    );
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
    assignToggleItemAttributes.call(this, isTargetAToggle, dropTarget);
  }

  moveChildren(endBlock, fk = this.wrapper.id) {
    moveChildren.call(this, endBlock, fk);
  }

  restoreItemAttributes(mutation) {
    restoreItemAttributes.call(this, mutation);
  }

  /**
   * Creates a toggle through the '>' char and the 'Space' key
   */
  createToggleWithShortcut(blockContainer) {
    const content = blockContainer.textContent;

    if (content[0] === '>' && !this.isPartOfAToggle(blockContainer)) {
      const blockCaller = this.api.blocks.getCurrentBlockIndex();

      this.api.blocks.insert(
        'toggle',
        { text: content.slice(2) },
        this.api,
        blockCaller,
        true,
      );
      this.api.blocks.delete(blockCaller + 1);
      this.api.caret.setToBlock(blockCaller);
    }
  }

  nestBlock(blockContainer) {
    nestBlock.call(this, blockContainer);
  }

  setNestedBlockAttributes() {
    setNestedBlockAttributes.call(this);
  }

  isPartOfAToggle(block) {
    return isPartOfAToggle.call(this, block);
  }

  /**
   * Adds mutation observer to reset the toggle ids
   * when a toggle is copied and pasted.
   */
  addSupportForCopyAndPasteAction() {
    addSupportForCopyAndPasteAction.call(this);
  }

  resetIdToCopiedBlock() {
    resetIdToCopiedBlock.call(this);
  }
}
