import ToggleBlock from '../src';
import createToggleBlock from './fixtures/toggle';
import editor from './fixtures/editor';
import data from './fixtures/toolData';
import {
  getHiddenAttribute, generateFullToggle, createNestedBlock, destroyFullToggle,
  extractionBlock, createDefaultBlock, createToggle, getEditorElements, nestBlock,
  createToggleRoot, changeToggleStatus, startDocument, resetIdToCopiedBlock,
} from './testHelpers';

describe('ToggleBlock', () => {
  let toggleBlock;
  let redactor;

  beforeEach(() => {
    startDocument();
    redactor = document.querySelector('div.codex-editor__redactor');
    toggleBlock = createToggleBlock(data[0]);
    toggleBlock.data.status = 'closed';
    toggleBlock.data.items = 3;
  });

  describe('validates toggle components', () => {
    let toggle;

    beforeEach(() => {
      toggle = toggleBlock.render();
    });

    it('validates toggle class', () => {
      expect(toggle).toHaveClass('toggle-block__selector');
    });

    it('validates toggle input', () => {
      const input = toggle.querySelector('div');
      expect(input).toHaveClass('toggle-block__input');
    });

    it('validates toggle icon', () => {
      const icon = toggle.querySelector('span');
      expect(icon).toHaveClass('toggle-block__icon');
    });
  });

  describe('When the Toggle has three paragraphs', () => {
    beforeEach(() => {
      const blocks = generateFullToggle(toggleBlock, data);
      blocks.forEach((block) => {
        redactor.appendChild(block);
      });
    });

    describe('validates the render method', () => {
      let hiddenAttributes;

      beforeEach(() => {
        hiddenAttributes = 0;
      });

      it('when Toggle status is closed', () => {
        const children = redactor.querySelectorAll(`div[foreignKey="${toggleBlock.wrapper.id}"]`).length;

        hiddenAttributes = getHiddenAttribute(redactor, toggleBlock);

        expect(toggleBlock.data.items).toEqual(children);
        expect(hiddenAttributes).toEqual(children);
      });

      it('when Toggle status is open', () => {
        changeToggleStatus(toggleBlock, redactor, 'open');

        expect(toggleBlock.data.status).toEqual('open');
        expect(toggleBlock.data.items.length).not.toEqual(0);
        expect(hiddenAttributes).toEqual(0);
      });
    });

    describe('validates paragraph deletion from itself', () => {
      it('when the current paragraph is the first', () => {
        const currentParagraph = redactor.children[1];
        redactor.removeChild(currentParagraph);

        expect(currentParagraph).not.toEqual(redactor.children[1]);
      });

      it('when the current paragraph is the last', () => {
        const currentParagraph = redactor.lastChild;
        redactor.removeChild(currentParagraph);

        expect(currentParagraph).not.toEqual(redactor.lastChild);
      });
    });

    describe('validates paragraph insertion from another', () => {
      it('when the current paragraph is the first', () => {
        const currentParagraph = redactor.children[1];
        const next = currentParagraph.nextSibling;
        const paragraph = createNestedBlock(toggleBlock, { text: 'Inserted paragraph' });

        redactor.insertBefore(paragraph, next);

        expect(next).not.toEqual(redactor.children[2]);
        expect(currentParagraph.nextSibling.textContent).toEqual('Inserted paragraph');
      });

      it('when the current paragraph is the last', () => {
        const lastParagraph = redactor.lastChild;
        const last = lastParagraph.nextSibling;
        const paragraph = createNestedBlock(toggleBlock, { text: 'Last inserted paragraph' });

        redactor.appendChild(paragraph);

        expect(lastParagraph).not.toEqual(redactor.lastChild);
        expect(last).toBe(null);
        expect(redactor.lastChild.textContent).toEqual('Last inserted paragraph');
      });
    });

    describe('validates paragraph insertion from the toggle root', () => {
      it('inserts the paragraph to the Toggle', () => {
        const firstChild = redactor.children[1];
        const paragraph = createNestedBlock(toggleBlock, { text: 'New paragraph' });

        redactor.insertBefore(paragraph, firstChild);

        expect(firstChild).not.toEqual(redactor.children[1]);
        expect(redactor.children[1].textContent).toEqual('New paragraph');
      });
    });

    describe('isAToggleItem', () => {
      it('when the block belongs to a toggle', () => {
        const { id } = toggleBlock.wrapper;
        const children = redactor.querySelectorAll(`div[foreignKey="${id}"]`);
        children.forEach((child) => {
          expect(toggleBlock.isAToggleItem(child)).toBe(true);
        });
      });

      it('when then block does not belong to a toggle', () => {
        const block = createDefaultBlock({ text: 'Outside Toggle' });
        expect(toggleBlock.isAToggleItem(block)).toBe(false);
      });
    });

    describe('isAToggleRoot', () => {
      it('when the block is a toggle root', () => {
        const { wrapper } = toggleBlock;
        expect(toggleBlock.isAToggleRoot(wrapper)).toBe(true);
      });

      it('when the block is not a toggle root', () => {
        const { id } = toggleBlock.wrapper;
        const children = redactor.querySelectorAll(`div[foreignKey="${id}"]`);
        children.forEach((child) => {
          expect(toggleBlock.isAToggleRoot(child)).toBe(false);
        });
      });
    });

    describe('findToggleRootIndex', () => {
      it('returns the toggle root index', () => {
        const { id } = toggleBlock.wrapper;
        expect(toggleBlock.findToggleRootIndex(2, id)).toBe(0);
      });
    });

    describe('extractBlock', () => {
      it('extracts a child from the toggle', () => {
        const { id } = toggleBlock.wrapper;
        const children = redactor.querySelectorAll(`div[foreignKey="${id}"]`).length;
        toggleBlock.extractBlock(1);
        const currentChildren = redactor.querySelectorAll(`div[foreignKey="${id}"]`).length;
        setTimeout(() => {
          expect(currentChildren).toBe(children - 1);
        }, 200);
      });
    });

    describe('validates complete toggle removal', () => {
      it('when the toggle has the first position in the document', () => {
        const children = redactor.children.length - 1;
        destroyFullToggle(redactor, 0, children);
        expect(redactor.children.length).toBe(0);
      });

      it('when the toggle is not the first element in the document', () => {
        // Insert new toggle in the document
        const newToggle = generateFullToggle(toggleBlock, data);
        newToggle.forEach((block) => redactor.appendChild(block));
        const children = newToggle.length - 1;
        destroyFullToggle(redactor, 4, children);
        expect(redactor.children.length).toBe(4);
      });
    });

    describe('extraction block', () => {
      it('Extract the first block into the toggle', () => {
        const children = document.querySelectorAll(`div[foreignKey="${toggleBlock.wrapper.id}"]`);
        extractionBlock(toggleBlock, redactor, 1);

        expect(redactor.children.length).toBe(4);
        expect(children.length).toBe(3);
      });
    });

    describe('validates the getDescendantsNumber method', () => {
      it('returns the number of children', () => {
        toggleBlock.render();
        const { id } = toggleBlock.wrapper;
        const numberOfChildren = toggleBlock.getDescendantsNumber(id);
        expect(numberOfChildren).toBe(toggleBlock.data.items);
      });
    });

    describe('validates the highlightToggleItems method', () => {
      it("Adds the ce-block--selected class to the toggle's children", () => {
        toggleBlock.render();
        const { id } = toggleBlock.wrapper;
        toggleBlock.highlightToggleItems(id);
        const children = redactor.querySelectorAll(`div[foreignKey="${id}"]`);
        children.forEach((child) => {
          expect(child.classList.contains('ce-block--selected')).toBe(true);
        });
      });
    });
  });

  describe('When the toggle is empty', () => {
    describe('validates paragraph insertion from the toggle root', () => {
      beforeEach(() => {
        toggleBlock.data.items = 0;
        const block = createToggleRoot(toggleBlock);
        redactor.appendChild(block);
      });

      it('inserts the paragraph to the Toggle', () => {
        const paragraph = createNestedBlock(toggleBlock, { text: 'Last inserted paragraph' });
        redactor.appendChild(paragraph);

        expect(redactor.children[1]).toEqual(redactor.lastChild);
        expect(redactor.lastChild.textContent).toEqual('Last inserted paragraph');
      });
    });
  });

  describe('When Toggle is read-only mode', () => {
    let toggleBlockReadyOnly;

    it('when is enable', () => {
      toggleBlockReadyOnly = new ToggleBlock({ data, api: editor, readOnly: true });
      toggleBlockReadyOnly.render();

      const { children } = toggleBlockReadyOnly.wrapper;
      const contentEditable = children[1].getAttribute('contentEditable');

      expect(contentEditable).toBe('false');
    });

    it('when is disabled', () => {
      toggleBlock = new ToggleBlock({ data, api: editor, readOnly: false });
      toggleBlock.render();

      const { children } = toggleBlock.wrapper;
      const contentEditable = children[1].getAttribute('contentEditable');

      expect(contentEditable).toBe('true');
    });
  });

  describe('validates shortcut to create a toggle', () => {
    let keyboardEvent;

    beforeEach(() => {
      keyboardEvent = new KeyboardEvent('keyup', {
        key: 'Space',
      });
    });

    it('when the block has the required data', () => {
      const block = createDefaultBlock({ text: '>' });
      editor.blocks.insert(block);

      block.addEventListener('keyup', (e) => {
        createToggle(e, editor, toggleBlock);
      });

      block.dispatchEvent(keyboardEvent);

      const classes = getEditorElements();

      expect(classes[0]).toBe('toggle-block__selector');
      expect(redactor.children.length).toBe(1);
    });

    it('when the block has not the required data', () => {
      const block = createDefaultBlock({ text: '' });
      editor.blocks.insert(block);

      block.addEventListener('keyup', (e) => {
        createToggle(e, editor, toggleBlock);
      });

      block.dispatchEvent(keyboardEvent);

      const classes = getEditorElements();

      expect(classes[0]).not.toBe('toggle-block__selector');
      expect(redactor.children.length).toBe(1);
    });
  });

  describe('validates shortcut to nest a block inside a toggle', () => {
    let keyboardEvent;

    beforeEach(() => {
      keyboardEvent = new KeyboardEvent('keyup', {
        key: 'Tab',
      });
    });

    it('when the block is next to a toggle block', () => {
      const block = createDefaultBlock({ text: 'Block to be nested' });
      editor.blocks.insert(toggleBlock.render());
      editor.blocks.insert(block);

      block.addEventListener('keyup', (e) => {
        nestBlock(e, toggleBlock);
      });

      block.dispatchEvent(keyboardEvent);

      const cover = block.firstChild;
      const content = cover.firstChild;
      const classes = Array.from(content.classList);
      const foreignId = block.getAttribute('foreignKey');
      const { id } = toggleBlock.wrapper;

      expect(classes.includes('toggle-block__item')).toBe(true);
      expect(foreignId).toEqual(id);
    });

    it('when toggle block is not before the block', () => {
      const firstBlock = createDefaultBlock({ text: 'Block to be nested' });
      const block = createDefaultBlock({ text: 'Block to be nested' });
      editor.blocks.insert(firstBlock);
      editor.blocks.insert(block);

      block.addEventListener('keyup', (e) => {
        nestBlock(e, toggleBlock);
      });

      block.dispatchEvent(keyboardEvent);

      const cover = block.firstChild;
      const content = cover.firstChild;
      const classes = Array.from(content.classList);
      const foreignId = block.getAttribute('foreignKey');

      expect(classes.includes('toggle-block__item')).toBe(false);
      expect(foreignId).toBeNull();
    });
  });

  describe('validates the config', () => {
    let myToggleBlock;

    it('when the config is not provided', () => {
      const DEFAULT_CONFIG = {
        placeholder: 'Toggle',
        defaultContent: 'Empty toggle. Click or drop blocks inside.',
      };

      myToggleBlock = new ToggleBlock({ data, api: editor });
      myToggleBlock.render();

      const { placeholder, defaultContent, wrapper } = myToggleBlock;

      const placeholderFromQuery = wrapper.querySelector('.toggle-block__input').getAttribute('placeholder');
      const defaultContentFromQuery = wrapper.querySelector('.toggle-block__content-default.toggle-block__hidden').textContent;

      expect(placeholder).toBe(DEFAULT_CONFIG.placeholder);
      expect(defaultContent).toBe(DEFAULT_CONFIG.defaultContent);

      expect(placeholderFromQuery).toBe(DEFAULT_CONFIG.placeholder);
      expect(defaultContentFromQuery).toBe(DEFAULT_CONFIG.defaultContent);
    });

    it('when the config is provided', () => {
      const config = {
        placeholder: 'My placeholder',
        defaultContent: 'My default content',
      };

      myToggleBlock = new ToggleBlock({ data, api: editor, config });
      myToggleBlock.render();

      const { placeholder, defaultContent, wrapper } = myToggleBlock;

      const placeholderFromQuery = wrapper.querySelector('.toggle-block__input').getAttribute('placeholder');
      const defaultContentFromQuery = wrapper.querySelector('.toggle-block__content-default.toggle-block__hidden').textContent;

      expect(placeholder).toBe(config.placeholder);
      expect(defaultContent).toBe(config.defaultContent);

      expect(placeholderFromQuery).toBe(config.placeholder);
      expect(defaultContentFromQuery).toBe(config.defaultContent);
    });
  });

  describe('When a toggle and its nested blocks are copied and pasted', () => {
    beforeEach(() => {
      const blocks = generateFullToggle(toggleBlock, data);
      blocks.forEach((block) => {
        redactor.appendChild(block);
      });
    });

    it('resets the duplicated ids from a toggle with 3 paragraphs', () => {
      const { children: originalChildren } = redactor;
      const childrenNumber = originalChildren.length;

      redactor.innerHTML += redactor.innerHTML;

      const { children: modifiedChildren } = redactor;
      const lastCopiedBlock = redactor.lastChild;
      const index = modifiedChildren.length;

      resetIdToCopiedBlock(redactor, lastCopiedBlock, index, childrenNumber);

      for (let i = 0; i < childrenNumber; i += 1) {
        const originalBlock = originalChildren[i];
        const copiedBlock = modifiedChildren[i + childrenNumber];

        if (i === 0) {
          const externalCover = [originalBlock.firstChild, copiedBlock.firstChild];
          const toggleCover = [externalCover[0].firstChild, externalCover[1].firstChild];

          expect(toggleCover[0].getAttribute('id')).not.toEqual(toggleCover[1].getAttribute('id'));
        } else {
          expect(originalBlock.getAttribute('foreignKey')).not.toEqual(copiedBlock.getAttribute('foreignKey'));
        }

        expect(originalBlock.textContent).toEqual(copiedBlock.textContent);
      }
    });
  });
});
