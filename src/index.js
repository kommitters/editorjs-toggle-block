import './index.css';
import toggleIconPrimary from '../assets/toggleIcon.svg';
import toggleIconSecundary from '../assets/toggleIconSecundary.svg';
import insertParagraphIcon from '../assets/insertParagraphIcon.svg';
import removeParagraphIcon from '../assets/removeParagraphIcon.svg';

export default class ToggleBlock {
  static get toolbox() {
    return {
      title: 'Toggle',
      icon: toggleIconPrimary,
    };
  }

  constructor({ data }) {
    this.data = {
      text: data.text || '',
      status: data.status || 'closed',
      items: data.items || [],
    };

    this.wrapper = undefined;
  }

  onKeyDown(e) {
    const paragraph = document.getElementById(this);

    if (e.code === 'Backspace' && paragraph.innerHTML.length === 0) {
      paragraph.remove();
    }
  }

  render() {
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('toggle-block__selector');

    const icon = document.createElement('span');
    icon.classList.add('toggle-block__icon');
    icon.innerHTML = this.data.status === 'closed' ? toggleIconPrimary : toggleIconSecundary;

    icon.addEventListener('click', () => {
      icon.innerHTML = this._resolveToggleAction();
      this._hideAndShowParagraphs();
    });

    const input = document.createElement('div');

    input.classList.add('toggle-block__input');
    input.contentEditable = true;
    input.innerHTML = this.data.text || '';

    this.wrapper.appendChild(icon);
    this.wrapper.appendChild(input);

    this.data.items.forEach((item) => {
      this._renderParagraph(item);
    });

    return this.wrapper;
  }

  save(blockContent) {
    const caption = blockContent.querySelector('div');
    const paragraphs = blockContent.querySelectorAll('.toggle-block__paragraph');
    const items = [];

    paragraphs.forEach((item) => items.push(item.innerHTML));

    return Object.assign(this.data, {
      text: caption.innerHTML,
      items: [...items],
    });
  }

  validate(savedData) {
    let validItems = false;

    for (let i = 0; i < savedData.items.length; i += 1) {
      if (savedData.items[i].trim()) {
        validItems = true;
        break;
      }
    }

    if (validItems || savedData.text.trim()) {
      return true;
    }
    return false;
  }

  renderSettings() {
    const settings = [
      {
        name: 'insertParagraph',
        icon: insertParagraphIcon,
      },
      {
        name: 'removeParagraph',
        icon: removeParagraphIcon,
      },
    ];
    const wrapper = document.createElement('div');

    settings.forEach((tune) => {
      const button = document.createElement('div');

      button.classList.add('cdx-settings-button');
      button.innerHTML = tune.icon;

      button.addEventListener('click', () => {
        if (tune.name === 'insertParagraph') {
          this.insertParagraph();
        } else {
          this.removeParagraph();
        }
      });

      wrapper.appendChild(button);
    });

    return wrapper;
  }

  _renderParagraph(paragraph = '') {
    const currenStatus = this.data.status;

    this.insertParagraph(paragraph);

    if (currenStatus !== this.data.status) {
      this.wrapper.firstChild.innerHTML = this._resolveToggleAction();
      this._hideAndShowParagraphs();
    }
  }

  insertParagraph(text = '') {
    if (this.data.status === 'closed') {
      this.wrapper.firstChild.innerHTML = this._resolveToggleAction();
      this._hideAndShowParagraphs();
    }

    const paragraph = document.createElement('div');

    paragraph.classList.add('toggle-block__paragraph');
    paragraph.setAttribute('id', crypto.randomUUID());
    paragraph.addEventListener('keydown', this.onKeyDown.bind(paragraph.id));
    paragraph.contentEditable = true;
    paragraph.innerHTML = text || '';

    this.wrapper.appendChild(paragraph);
  }

  removeParagraph() {
    const paragraph = this.wrapper.lastChild;
    if (paragraph.classList.value === 'toggle-block__paragraph') {
      paragraph.remove();
    }
  }

  _resolveToggleAction() {
    let icon = toggleIconPrimary;

    if (this.data.status === 'closed') {
      icon = toggleIconSecundary;
      this.data.status = 'open';
    } else {
      this.data.status = 'closed';
    }

    return icon;
  }

  _hideAndShowParagraphs() {
    if (this.data.status === 'closed') {
      for (let i = 2; i < this.wrapper.children.length; i += 1) {
        this.wrapper.children[i].setAttribute('hidden', true);
      }
    } else {
      for (let i = 2; i < this.wrapper.children.length; i += 1) {
        this.wrapper.children[i].removeAttribute('hidden');
      }
    }
  }
}
