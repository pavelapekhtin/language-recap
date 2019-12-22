'use babel';

import LanguageRecapView from './language-recap-view';
import { CompositeDisposable } from 'atom';

export default {

  languageRecapView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.languageRecapView = new LanguageRecapView(state.languageRecapViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.languageRecapView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'language-recap:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.languageRecapView.destroy();
  },

  serialize() {
    return {
      languageRecapViewState: this.languageRecapView.serialize()
    };
  },

  toggle() {
    console.log('LanguageRecap was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
