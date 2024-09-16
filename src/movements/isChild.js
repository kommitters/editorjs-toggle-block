/**
   * Checks if target is a child of a toggle
   * @param {string} parentID id of the parent element
   * @param {string} targetFK foreign key of the target element
   * @returns {boolean}
   */
export default function isChild(parentID, targetFK) {
  if (!parentID || !targetFK) return false; // No parent or no target
  if (parentID === targetFK) return true; // Direct child of the toggle

  return [...document.querySelectorAll(`div[foreignKey="${parentID}"]`)].some(
    (child) => {
      const toggle = child.querySelector('.toggle-block__selector');
      if (!toggle) return false;
      return this.isChild(toggle.getAttribute('id'), targetFK);
    },
  );
}
