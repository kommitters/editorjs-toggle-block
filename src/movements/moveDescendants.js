/**
   * Move all the children of the toggle that is being moved
   * @param {number} children // Number of children of the current toggle
   * @param {number} finalIndex // index to calculate where children are going to be moved
   * @param {number} parentInitialIndex // index to calculate where the children are
   * @param {number} direction // 0: to move from top to bottom || 1: to move from bottom to the top
   */
export default function moveDescendants(children, finalIndex, parentInitialIndex, direction) {
  let childrenCurrentPosition = parentInitialIndex;
  let childrenFinalPosition = finalIndex;
  while (children) {
    this.move(childrenFinalPosition, childrenCurrentPosition);
    if (direction === 0) {
      childrenCurrentPosition += 1;
      childrenFinalPosition += 1;
    }
    children -= 1;
  }
}
