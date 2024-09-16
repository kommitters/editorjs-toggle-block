/**
   * Sets the events to be listened through the holder
   * in a nested block.
   *
   * @param {KeyboardEvent} e - key down event
   */
export default function setEventsToNestedBlock(e) {
  if (e.code === 'Enter') {
    setTimeout(() => this.createParagraphFromIt());
  } else {
    const indexBlock = this.getCurrentBlockIndex();
    const nestedBlock = this.getBlockByIndex(indexBlock);
    const { holder } = nestedBlock;

    if (e.code === 'Tab' && e.shiftKey) {
      this.extractBlock(indexBlock);
    }
    if (e.code === 'Backspace') {
      const cursorPosition = document.getSelection().focusOffset;
      this.removeBlock(holder, nestedBlock.id, cursorPosition);
    }
  }
}
