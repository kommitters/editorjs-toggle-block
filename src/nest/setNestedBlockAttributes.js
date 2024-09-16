/**
   * Sets the required attributes to convert an external block
   * of the toggle into a block inside the toggle.
   */
export default function setNestedBlockAttributes() {
  const blockIndex = this.api.blocks.getCurrentBlockIndex();
  const block = this.api.blocks.getBlockByIndex(blockIndex);
  const { holder } = block;
  const willBeABlock = holder.getAttribute('will-be-a-nested-block');

  if (willBeABlock) {
    holder.removeAttribute('will-be-a-nested-block');
    this.setAttributesToNewBlock(blockIndex);
    this.api.toolbar.close();
  }
}
