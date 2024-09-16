import { v4 as uuidv4 } from 'uuid';
/**
 * Render tool`s main Element and fill it with saved data
 *
 * @param {{data: object, api: object}}
 * data - Previously saved data
 * api - Editor.js API
 * readOnly - read-only mode status
 */
export default function toggleBlockConstructor({
  data, api, readOnly, config,
}) {
  this.data = {
    text: data.text || '',
    status: data.status || 'open',
    fk: data.fk || `fk-${uuidv4()}`,
    items: data.items || 0,
  };
  this.itemsId = [];
  this.api = api;
  const {
    toolbar: {
      close,
    },
    blocks: {
      getCurrentBlockIndex,
      getBlockByIndex,
      getBlocksCount,
      move,
    },
  } = this.api;
  this.close = close;
  this.getCurrentBlockIndex = getCurrentBlockIndex;
  this.getBlocksCount = getBlocksCount;
  this.getBlockByIndex = getBlockByIndex;
  this.move = move;
  this.wrapper = undefined;
  this.readOnly = readOnly || false;
  this.placeholder = config?.placeholder ?? 'Toggle';
  this.defaultContent = config?.defaultContent ?? 'Empty toggle. Click or drop blocks inside.';
  this.addListeners();
  this.addSupportForUndoAndRedoActions();
  this.addSupportForDragAndDropActions();
  this.addSupportForCopyAndPasteAction();
}
