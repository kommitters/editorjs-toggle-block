
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

export default function findIndexOfParentBlock(currentToggleFk, blockFk, toggleInitialIndex) {
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
            return this.findIndexOfParentBlock(
              currentToggleFk,
              fk,
              parentBlockIndex,
            );
          }
        }
      }
    }
    return parentBlockIndex;
  }
  