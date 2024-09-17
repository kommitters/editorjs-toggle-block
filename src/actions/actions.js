import removeFullToggle from '../toggle/removeFullToggle';
/**
 * Add listener to delete button.
 * @param {HTMLDivElement} deleteElement
 * @param {number} toggleIndex
 */

export function addEventDeleteButton(deleteElement, toggleIndex) {
  if (!deleteElement) return;

  deleteElement.addEventListener('click', () => {
    const classesList = deleteElement.classList;
    const classes = Object.values(classesList);

    if (classes.indexOf('clicked-to-destroy-toggle') === -1) {
      deleteElement.classList.add('clicked-to-destroy-toggle');
    } else {
      removeFullToggle(toggleIndex);
    }
  });
}

/**
 * Adds the required listeners to call the toggle shortcuts
 * on the editor.
 */
export function addListeners() {
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

/**
 * Adds mutation observer to reset the toggle ids
 * when a toggle is copied and pasted.
 */

export function addSupportForCopyAndPasteAction() {
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

/**
 * Adds the actions to do when the default content is clicked.
 */
export function clickInDefaultContent() {
  this.api.blocks.insert();
  this.setAttributesToNewBlock();
  this.setDefaultContent();
}

/**
 * Return the number of blocks inside the root Toggle
 * @param {string} fk - The id of the root Toggle
 */

export function getDescendantsNumber(fk) {
  let counter = 0;
  const listChildren = document.querySelectorAll(`div[foreignKey="${fk}"]`);
  listChildren.forEach((child) => {
    // Evaluate if the child is a toggle
    if (child.hasAttribute('status')) {
      const childId = child
        .querySelector('.toggle-block__selector')
        .getAttribute('id');
      counter += this.getDescendantsNumber(childId);
    }
    counter += 1;
  });
  return counter;
}

/**
   * Restores the item attributes to nested blocks.
   *
   * @param {HTMLDivElement} mutation - Html element removed or inserted
   */

export function restoreItemAttributes(mutation) {
  if (this.wrapper !== undefined) {
    const index = this.api.blocks.getCurrentBlockIndex();
    const block = this.api.blocks.getBlockByIndex(index);
    const { holder } = block;
    const currentBlockValidation = !this.isPartOfAToggle(holder);
    const { length: toggleItemsCount } = this.itemsId;
    const { length: existingToggleItemsCount } = document.querySelectorAll(
      `div[foreignKey="${this.data.fk}"]`,
    );

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
 * Sets the default content. If the toggle has no other blocks inside it,
 * so sets the 'block__hidden tag' in the default content,
 * otherwise it removes it.
 */

export function setDefaultContent() {
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
 * Adds the initial status for the icon, and establishes
 * the delay for the transition displayed when the icon
 * is clicked.
 */

export function setInitialTransition() {
  const { status } = this.data;
  const icon = this.wrapper.firstChild;
  const svg = icon.firstChild;
  svg.style.transition = '0.1s';
  svg.style.transform = `rotate(${status === 'closed' ? 0 : 90}deg)`;
}

/**
 * If the toggle root is empty and the key event received is 'backspace'
 * or 'enter', its content is cleared so that the visible placeholder
 * is set through the css.
 *
 * @param {KeyboardEvent} e - key up event
 */

export function setPlaceHolder(e) {
  if (e.code === 'Backspace' || e.code === 'Enter') {
    const { children } = this.wrapper;
    const { length } = children[1].textContent;

    if (length === 0) children[1].textContent = '';
  }
}

/**
 * Icon and title for displaying at the Toolbox
 * @returns {{title: string, icon: string}}
 */
export function toolbox() {
  return {
    title: 'Toggle',
    icon: 'toggleIcon',

  };
}

/**
 * Disables the creation of new EditorJS blocks by pressing
 * 'enter' when in a toggle block.
 */
export function enableLineBreaks() {
  return true;
}

/**
 * Notify core that the read-only mode is supported
 *
 * @returns {boolean}
 */
export function readOnlySupported() {
  return true;
}
