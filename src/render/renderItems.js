/**
   * Renders the items view and assigns the properties required to look
   * like a block inside the toggle.
   */
export default function renderItems() {
  const blocksInEditor = this.api.blocks.getBlocksCount();
  const icon = this.wrapper.firstChild;
  let toggleRoot;

  if (this.readOnly) {
    const redactor = document.getElementsByClassName(
      'codex-editor__redactor',
    )[0];
    const { children } = redactor;
    const { length } = children;

    for (let i = 0; i < length; i += 1) {
      const blockCover = children[i].firstChild;
      const blockContainer = blockCover.firstChild;
      const { id } = blockContainer;

      if (id === this.wrapper.id) {
        toggleRoot = i;
        break;
      }
    }
  } else {
    const toggle = this.wrapper.children[1];
    let currentBlock = {};
    let index = this.api.blocks.getCurrentBlockIndex();
    const delta = index === blocksInEditor - 1 ? -1 : 1;

    while (currentBlock[1] !== toggle) {
      toggleRoot = index;
      const block = this.api.blocks.getBlockByIndex(toggleRoot);
      if (!block) break;
      const { holder } = block;
      const blockCover = holder.firstChild;
      const blockContent = blockCover.firstChild;
      currentBlock = blockContent.children;

      index += delta;
    }
  }

  if (toggleRoot + this.data.items < blocksInEditor) {
    for (
      let i = toggleRoot + 1, j = 0;
      i <= toggleRoot + this.data.items;
      i += 1
    ) {
      const block = this.api.blocks.getBlockByIndex(i);
      const { holder } = block;
      const cover = holder.firstChild;
      const content = cover.firstChild;

      if (!this.isPartOfAToggle(content)) {
        this.setAttributesToNewBlock(i);
        j += 1;
      } else {
        this.data.items = j;
        break;
      }
    }
  } else {
    this.data.items = 0;
  }

  icon.addEventListener('click', () => {
    this.resolveToggleAction();
    setTimeout(() => {
      this.hideAndShowBlocks();
    });
  });

  this.hideAndShowBlocks();
}
