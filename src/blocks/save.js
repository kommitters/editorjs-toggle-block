/**
   * Extracts Tool's data from the view
   * @param {HTMLDivElement} blockContent - Toggle tools rendered view
   * @returns {ToggleBlockData} - saved data
   */
export default function save(blockContent) {
  const id = blockContent.getAttribute('id');
  const { children } = blockContent;
  const caption = children[1].innerHTML;
  const blocks = document.querySelectorAll(`div[foreignKey="${id}"]`);
  this.data.fk = id;

  return Object.assign(this.data, {
    text: caption,
    items: blocks.length,
  });
}
