import { v4 as uuidv4 } from 'uuid';

/**
   * Gets the index of the new block, then assigns the required properties,
   * and finally sends the focus.
   */

export default function setAttributesToNewBlock(
  entryIndex = null,
  foreignKey = this.wrapper.id,
  block = null,
) {
  const index = entryIndex === null ? this.api.blocks.getCurrentBlockIndex() : entryIndex;
  const newBlock = block || this.api.blocks.getBlockByIndex(index);

  const id = uuidv4();
  if (!this.itemsId.includes(newBlock.id)) {
    this.itemsId.splice(index - 1, 0, newBlock.id);
  }

  const { holder } = newBlock;
  const content = holder.firstChild;
  const item = content.firstChild;

  holder.setAttribute('foreignKey', foreignKey);
  holder.setAttribute('id', id);

  setTimeout(() => holder.classList.add('toggle-block__item'));

  if (!this.readOnly) {
    holder.onkeydown = this.setEventsToNestedBlock.bind(this);
    item.focus();
  }
}
