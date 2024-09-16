import toggleInitialIndex from '../index';

/**
 * Move the Toggle with all its children and nested toggles.
 * Index of the root toggle before it is moved by editorjs core.
 * @param {number} toggleInitialIndex
 * @param {number} direction // 0: Move down || 1: Move up
 */
export default function moveToggle(direction) {
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
