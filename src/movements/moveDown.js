/**
   * Move down the whole current toggle to the next corresponding position
   * @param {number} toggleInitialIndex // index of the root of the current toggle
   * @param {number} toggleEndIndex // index of the last child of the current toggle
   */
export default function moveDown(toggleInitialIndex, toggleEndIndex) {
  const blockAfterToggleIndex = toggleEndIndex + 1;
  const blockAfterToggle = this.getBlockByIndex(blockAfterToggleIndex);
  const { holder } = blockAfterToggle;

  this.move(toggleInitialIndex, blockAfterToggleIndex);

  // Evaluate if the block is a toggle to move its children
  if (blockAfterToggle.name === 'toggle') {
    const id = holder
      .querySelector('.toggle-block__selector')
      .getAttribute('id');
    const children = this.getDescendantsNumber(id);
    this.moveDescendants(
      children,
      toggleInitialIndex + 1,
      blockAfterToggleIndex + 1,
      0,
    );
  }
}
