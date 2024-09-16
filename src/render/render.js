/**
   * Renders Tool's view.
   * First renders the toggle root, and immediately
   * renders its items as new blocks under the root.
   *
   * @returns {HTMLDivElement}
   */
export default function render() {
  this.createToggle();

  // Renders the nested blocks after the toggle root is rendered
  setTimeout(() => this.renderItems());

  // Adds initial transition for the icon
  setTimeout(() => this.setInitialTransition());

  return this.wrapper;
}
