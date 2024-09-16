export default function moveChildren(endBlock, fk = this.wrapper.id) {
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
      toggles.forEach((toggle) => moveChildren(toggleIndex + fix, toggle.getAttribute('id')));

      const dif = Math.abs(endBlock - toggleIndex);
      endBlock = this.startBlock < endBlock ? endBlock + dif : endBlock - dif;
    }
  });
}
