import './index.css';
import toggleIconPrimary from '../assets/toggleIcon.svg';

export default class ToggleBlock {
  static get toolbox() {
    return {
      title: 'Toggle',
      icon: toggleIconPrimary,
    };
  }
}
