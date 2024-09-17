/**
   * Extracts a nested block from a toggle
   * with 'shift + tab' combination
   *
   * @param {number} entryIndex - Block's index that will be extracted
   */

export default function extractBlock(entryIndex) {
  const block = this.getBlockByIndex(entryIndex);
  const { holder } = block;

  if (this.isAToggleItem(holder)) {
    const fk = holder.getAttribute('foreignKey');
    const parentIndex = this.findToggleRootIndex(entryIndex, fk);
    if (parentIndex >= 0) {
      const items = this.getDescendantsNumber(fk);
      const destiny = parentIndex + items;

      if (items > 1) {
        this.api.blocks.move(destiny, entryIndex);
      }

      setTimeout(() => this.removeAttributesFromNewBlock(destiny), 200);
    }
  }
  this.api.caret.setToBlock(entryIndex);
  this.api.toolbar.close();
}
