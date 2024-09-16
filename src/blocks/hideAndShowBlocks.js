/**
* Hides and shows the toggle paragraphs or the default content.
* If the toggle status is closed, the added value to the hidden attribute
* in the container paragraph is 'true', otherwise is 'false'.
*
* @param {number} index - toggle index
*/

export default function hideAndShowBlocks(foreignKey = this.wrapper.id, value = this.data.status) {
  const children = document.querySelectorAll(
    `div[foreignKey="${foreignKey}"]`,
  );
  const { length } = children;

  if (length > 0) {
    children.forEach((child) => {
      child.hidden = value === 'closed';

      // Check if this child is a toggle and hide his children too
      const toggles = child.querySelectorAll('.toggle-block__selector');
      const isToggle = toggles.length > 0;
      if (isToggle) {
        const childValue = value === 'closed' ? value : child.getAttribute('status');
        hideAndShowBlocks(toggles[0].getAttribute('id'), childValue);
      }
    });
  } else if (foreignKey === this.wrapper.id) {
    const { lastChild } = this.wrapper;
    lastChild.classList.toggle('toggle-block__hidden', value);
  }
}
