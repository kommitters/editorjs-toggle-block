import { v4 as uuidv4 } from 'uuid';

/**
 * Sets the HTML structure to support EditorJS.

 * Result:
 * ```
 * <div id="editorjs">
 *   <div class="codex-editor">
 *     <div class="codex-editor__redactor">
 *     </div>
 *   </div>
 * </div>
 * ```
 */
export function startDocument() {
  document.body.innerHTML = '';
  const editorRedactor = document.createElement('div');
  editorRedactor.classList.add('codex-editor__redactor');

  const codexEditor = document.createElement('div');
  codexEditor.classList.add('codex-editor');
  codexEditor.appendChild(editorRedactor);

  const editorJS = document.createElement('div');
  editorJS.setAttribute('id', 'editorjs');
  editorJS.appendChild(codexEditor);

  document.body.appendChild(editorJS);
}

export function getHiddenAttribute(redactor) {
  const children = redactor.querySelectorAll('div[hidden=""]');
  const defaultContent = redactor.querySelectorAll('div.toggle-block__hidden');
  return (children.length + defaultContent.length) - 1;
}

export function createNestedBlock(toggleBlock, data) {
  const newBlock = document.createElement('div');
  newBlock.classList.add('ce-block', 'toggle-block__item');
  newBlock.setAttribute('foreignKey', toggleBlock.wrapper.id);
  newBlock.setAttribute('id', uuidv4());

  if (toggleBlock.data.status === 'closed') {
    newBlock.hidden = true;
  }

  const content = document.createElement('div');
  content.classList.add('ce-block__content');

  const paragraph = document.createElement('div');
  paragraph.classList.add('ce-paragraph', 'cdx-block');
  paragraph.contentEditable = true;
  paragraph.textContent = data.text;

  content.appendChild(paragraph);
  newBlock.appendChild(content);

  return newBlock;
}

export function createToggleRoot(toggleBlock) {
  const toggleRoot = toggleBlock.render();

  const content = document.createElement('div');
  content.classList.add('ce-block__content');

  content.appendChild(toggleRoot);

  const parentBlock = document.createElement('div');
  parentBlock.classList.add('ce-block');

  parentBlock.setAttribute('status', toggleBlock.data.status);

  parentBlock.appendChild(content);

  return parentBlock;
}

export function generateFullToggle(toggleBlock, data) {
  const answer = [];
  let newBlock;
  const parentBlock = createToggleRoot(toggleBlock);

  answer.push(parentBlock);

  for (let i = 1; i < data.length; i += 1) {
    newBlock = createNestedBlock(toggleBlock, data[i].data);
    toggleBlock.itemsId.push(`12${i}id`);
    answer.push(newBlock);
  }

  return answer;
}

export function changeToggleStatus(toggleBlock, redactor, status) {
  toggleBlock.data.status = status;
  const [toggleRoot, ...toggleBlockItems] = Array.from(redactor.children);
  toggleRoot.setAttribute('status', status);
  toggleBlockItems.forEach((item) => { item.hidden = status === 'closed'; });
}

export function destroyFullToggle(redactor, toggleIndex, blocks) {
  // Destroys the toggle root
  const toggleRoot = redactor.children[toggleIndex];
  toggleRoot.remove();

  // Destroys each block inside the toggle
  for (let i = toggleIndex; i < toggleIndex + blocks; i += 1) {
    const currentBlock = redactor.children[toggleIndex];
    currentBlock.remove();
  }
}

export function createDefaultBlock(data) {
  const newBlock = document.createElement('div');
  newBlock.classList.add('ce-block');

  const content = document.createElement('div');
  content.classList.add('ce-block__content');

  const paragraph = document.createElement('div');
  paragraph.classList.add('ce-paragraph', 'cdx-block');
  paragraph.contentEditable = true;
  paragraph.textContent = data.text;

  content.appendChild(paragraph);
  newBlock.appendChild(content);

  return newBlock;
}

export function extractionBlock(toggleBlock, redactor, toggleIndex) {
  const currentBlock = redactor.children[toggleIndex];
  const extractedBlock = createDefaultBlock(currentBlock.textContent);

  currentBlock.remove();
  redactor.appendChild(extractedBlock);
}

export function createToggle(e, editor, toggleBlock) {
  if (e.key === 'Space') {
    const blockContainer = document.activeElement;
    const content = blockContainer.textContent;

    if (content.includes('>')) {
      const invocatorBlock = editor.blocks.getCurrentBlockIndex(0);
      const toggleRoot = createToggleRoot(toggleBlock);

      editor.blocks.insert(toggleRoot);
      editor.blocks.delete(invocatorBlock);
    }
  }
}

export function getEditorElements() {
  const { body } = document;
  const mainContainer = body.children[0];
  const editorContainer = mainContainer.children[0];
  const redactor = editorContainer.children[0];
  const ceBlock = redactor.children[0];
  const ceContainer = ceBlock.children[0];
  const toggle = ceContainer.children[0];

  const classes = toggle.classList;

  return classes;
}

function isPartOfAToggle(block) {
  const classes = Array.from(block.classList);
  const answer = classes.includes('toggle-block__item') || (classes.includes('toggle-block__input') || classes.includes('toggle-block__selector'));

  return answer;
}

export function nestBlock(e) {
  if (e.key === 'Tab') {
    const { body } = document;
    const mainContainer = body.children[0];
    const editorContainer = mainContainer.children[0];
    const redactor = editorContainer.children[0];
    const [toggle, block] = redactor.children;

    if (isPartOfAToggle(toggle)) {
      const cover = block.firstChild;
      const content = cover.firstChild;

      block.setAttribute('foreignKey', toggle.id);
      block.setAttribute('id', uuidv4());

      content.classList.add('toggle-block__item');
    }
  }
}

export function resetIdToCopiedBlock(redactor, lastCopiedBlock, index, childrenNumber) {
  const foreignKey = lastCopiedBlock.getAttribute('foreignKey');
  const toggleRoot = document.querySelectorAll(`#${foreignKey}`);

  if (toggleRoot.length > 1) {
    const parentBlock = index - childrenNumber;
    const id = uuidv4();
    const blocks = redactor.children;

    for (let i = parentBlock; i < index; i += 1) {
      const currentBlock = blocks[i];
      if (i === parentBlock) {
        const externalCover = currentBlock.firstChild;
        const toggleCover = externalCover.firstChild;
        toggleCover.setAttribute('id', `fk-${id}`);
      } else {
        currentBlock.setAttribute('foreignKey', `fk-${id}`);
      }
    }
  }
}
