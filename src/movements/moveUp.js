/**
   * Move up the whole current toggle to the next corresponding position
   * @param {number} toggleInitialIndex // index of the root of the current toggle
   * @param {number} toggleEndIndex // index of the last child of the current toggle
   */
export default function moveUp(toggleInitialIndex, toggleEndIndex) {
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
      const parentBlockIdx = this.findIndexOfParentBlock(
        currentToggleFk,
        fk,
        toggleInitialIndex,
      );
      const parentBlock = this.getBlockByIndex(parentBlockIdx).holder;
      const id = parentBlock
        .querySelector('.toggle-block__selector')
        .getAttribute('id');
      const children = this.getDescendantsNumber(id);
      this.move(toggleEndIndex, parentBlockIdx);
      this.moveDescendants(children, toggleEndIndex, parentBlockIdx, 1);
      return;
    }
  }
  this.move(toggleEndIndex, blockBeforeToggleIndex);
}
