/**
   * Adds events for the move up, move down and delete options in the toolbar
   */
export default function renderSettings() {
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
