import resetIdToCopiedBlock from '../blocks/resetIdToCopiedBlock';
/**
 * Returns true if the div element is a toggle child, otherwise, returns false
 * @param {HTMLDivElement} holder
 * @returns {boolean}
 */
export function isAToggleItem(holder) {
  return holder.classList.contains('toggle-block__item');
}

/**
 * Returns true if the div element is a toggle root, otherwise, returns false
 * @param {HTMLDivElement} holder
 * @returns {boolean}
 */
export function isAToggleRoot(holder) {
  return (
    holder.classList.contains('toggle-block__selector')
    || Boolean(holder.querySelector('.toggle-block__selector'))
  );
}

/**
 * Sets the focus at the end of the toggle root when
 * a nested block is deleted through the backspace key.
 */
export function setFocusToggleRootAtTheEnd() {
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
 * Converts the toggle status to its opposite.
 * @returns {string} icon - toggle icon
 */
export function resolveToggleAction() {
  const icon = this.wrapper.firstChild;
  const svg = icon.firstChild;

  this.data.status = this.data.status === 'closed' ? 'open' : 'closed';
  svg.style.transform = this.data.status === 'open' ? 'rotate(90deg)' : 'rotate(0deg)';

  const toggleBlock = this.api.blocks.getBlockByIndex(
    this.api.blocks.getCurrentBlockIndex(),
  );
  toggleBlock.holder.setAttribute('status', this.data.status);
}

export function assignToggleItemAttributes(isTargetAToggle, dropTarget) {
  if (isTargetAToggle) {
    const foreignKey = dropTarget.getAttribute('foreignKey')
      || dropTarget.querySelector('.toggle-block__selector').getAttribute('id');
    const newToggleIndex = this.getIndex(this.holderDragged);
    this.setAttributesToNewBlock(newToggleIndex, foreignKey);
  }
}

/**
 * Returns the toggle's root index, given the index of one of its children
 * @param {number} entryIndex - block index
 * @param {String} fk - The block's foreign key
 * @returns {number} The Toggle's root index
 */
export function findToggleRootIndex(entryIndex, fk) {
  const block = this.getBlockByIndex(entryIndex);
  const { holder } = block;

  if (this.isAToggleRoot(holder)) {
    const id = holder
      .querySelector('.toggle-block__selector')
      .getAttribute('id');
    if (fk === id) return entryIndex;
  }
  return entryIndex - 1 >= 0
    ? this.findToggleRootIndex(entryIndex - 1, fk)
    : -1;
}

/**
 * Highlight the blocks that belong to the Toggle
 * @param {string} fk - The id of the root Toggle
 */
export function highlightToggleItems(fk) {
  const listChildren = document.querySelectorAll(`div[foreignKey="${fk}"]`);
  listChildren.forEach((child) => {
    child.classList.add('ce-block--selected');
    if (child.hasAttribute('status')) {
      const childId = child
        .querySelector('.toggle-block__selector')
        .getAttribute('id');
      this.highlightToggleItems(childId);
    }
  });
}

/**
 * Validates if a block contains one of the classes to be part of a toggle.
 * @param {HTMLDivElement} block - Block to be validated
 * @returns {boolean}
 */
export function isPartOfAToggle(block) {
  const classNamesToCheck = [
    'toggle-block__item',
    'toggle-block__input',
    'toggle-block__selector',
  ];
  const isToggleChild = classNamesToCheck.some(
    (className) => block.getElementsByClassName(className).length !== 0,
  );
  const isToggle = classNamesToCheck.some((className) => block.classList.contains(className));

  return isToggle || isToggleChild;
}

/**
 * Add listener to move button.
 * @param {HTMLDivElement} moveElement
 * @param {number} movement // 0: Move down || 1: Move up
 * @param {number} toggleIndex
 */
export function addEventsMoveButtons(moveElement, movement, toggleIndex) {
  if (!moveElement) return;
  moveElement.addEventListener('click', () => this.moveToggle(toggleIndex, movement));
}

/**
 * Move the toggle in the given direction.
 * @param {number} toggleInitialIndex
 * @param {number} direction
 */
export function moveToggle(toggleInitialIndex, direction) {
  if (!this.readOnly) {
    this.close();
    const currentToggleIndex = this.getCurrentBlockIndex();
    const descendants = this.getDescendantsNumber(this.wrapper.id);
    const blocks = this.getBlocksCount();
    const toggleEndIndex = toggleInitialIndex + descendants;

    this.move(toggleInitialIndex, currentToggleIndex);
    if (toggleInitialIndex >= 0 && toggleEndIndex <= blocks - 1) {
      // eslint-disable-next-line no-unused-expressions
      direction === 0
        ? this.moveDown(toggleInitialIndex, toggleEndIndex)
        : this.moveUp(toggleInitialIndex, toggleEndIndex);
    }
  }
}

/**
 * Delete the toggle and all its children.
 * @param {number} toggleIndex
 */
export function removeFullToggle(toggleIndex) {
  const children = document.querySelectorAll(
    `div[foreignKey="${this.wrapper.id}"]`,
  );
  const { length } = children;

  // eslint-disable-next-line no-plusplus
  for (let i = toggleIndex; i < toggleIndex + length; i++) {
    setTimeout(() => this.api.blocks.delete(toggleIndex));
  }
}

/**
 * Adds mutation observer to reset the toggle ids when a toggle is copied and pasted.
 */
export function addSupportForCopyAndPasteAction() {
  if (!this.readOnly) {
    const target = document.querySelector('div.codex-editor__redactor');
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          setTimeout(resetIdToCopiedBlock.bind(this, mutation));
        }
      });
    });

    observer.observe(target, {
      attributes: true,
      childList: true,
      characterData: true,
    });
  }
}
