// /toggle/createParagraphFromToggleRoot.js
/**
 * First it gets the toggle index.
 *
 * After checks the toggle status, if this is 'closed' then open it.
 *
 * After inserts a new block after the toggle index and the a method
 * is called to add the required properties to the new block.
 * gets the focus.
 *
 * @param {KeyboardEvent} e - key up event
 */
export default function createParagraphFromToggleRoot(e) {
  if (e.code === 'Enter') {
    const currentPosition = document.getSelection().focusOffset;
    const originalIndex = this.api.blocks.getCurrentBlockIndex();
    const block = this.api.blocks.getBlockByIndex(originalIndex);
    const { holder } = block;
    const blockCover = holder.firstChild;
    const blockContent = blockCover.firstChild;
    const content = blockContent.children[1].innerHTML;

    const breakLine = content.indexOf('<br>');
    const end = breakLine === -1 ? content.length : breakLine;

    if (this.data.status === 'closed') {
      this.resolveToggleAction();
      this.hideAndShowBlocks();
    }

    const newText = content.slice(end + 4, currentPosition.focusOffset);
    blockContent.children[1].innerHTML = content.slice(
      currentPosition.focusOffset,
      end,
    );

    this.api.blocks.insert(
      'paragraph',
      { text: newText },
      {},
      originalIndex + 1,
      1,
    );
    this.setAttributesToNewBlock();
  }
}
