/**
   * Nests a block inside a toggle through the 'Tab' key
   */
export default function nestBlock(blockContainer) {
  const previousBlock = blockContainer.previousElementSibling;
  const previousCover = previousBlock.firstChild;
  const previousContainer = previousCover.firstChild;

  if (
    this.isPartOfAToggle(previousContainer)
      || this.isPartOfAToggle(previousBlock)
  ) {
    const foreignId = previousBlock.getAttribute('foreignKey');
    const toggleId = previousContainer.getAttribute('id');
    const foreignKey = foreignId || toggleId;

    blockContainer.setAttribute('will-be-a-nested-block', true);

    const toggleRoot = document.getElementById(foreignKey);
    toggleRoot.children[1].focus();
  }
}
