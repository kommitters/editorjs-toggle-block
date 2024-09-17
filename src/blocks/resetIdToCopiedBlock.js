import { v4 as uuidv4 } from 'uuid';
/**
   * Reset the toggle ids to ensure toggles with unique id.
   */
export default function resetIdToCopiedBlock() {
  if (this.wrapper !== undefined) {
    const index = this.api.blocks.getCurrentBlockIndex();
    const { holder } = this.api.blocks.getBlockByIndex(index);

    if (this.isPartOfAToggle(holder)) {
      const foreignKey = holder.getAttribute('foreignKey');
      const toggleRoot = document.querySelectorAll(`#${foreignKey}`);

      if (toggleRoot.length > 1) {
        const parentBlock = this.findToggleRootIndex(index, foreignKey);
        const id = uuidv4();

        for (let i = parentBlock; i <= index; i += 1) {
          const currentBlock = this.api.blocks.getBlockByIndex(i);
          const { holder: currentBlockHolder } = currentBlock;
          if (i === parentBlock) {
            const externalCover = currentBlockHolder.firstChild;
            const toggleCover = externalCover.firstChild;
            toggleCover.setAttribute('id', `fk-${id}`);
          } else {
            currentBlockHolder.setAttribute('foreignKey', `fk-${id}`);
          }
        }
      }
    }
  }
}
