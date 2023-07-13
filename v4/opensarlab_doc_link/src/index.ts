import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin,
} from '@jupyterlab/application';

import { 
  DOMUtils 
} from '@jupyterlab/apputils';

import { Widget } from '@lumino/widgets';

class DocsAnchorWidget extends Widget {
  constructor() {
    super();

    this.hyperlink = document.createElement('a');
    this.hyperlink.text = 'OpenSARlab Docs';
    this.hyperlink.href = 'https://opensarlab-docs.asf.alaska.edu/user-guides/how_to_run_a_notebook/';
    this.hyperlink.target = 'blank';
    this.addClass('docs-anchor-widget');

    this.node.appendChild(this.hyperlink);
  }

  readonly hyperlink: HTMLAnchorElement;
}

const extension: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-topbar-doclink',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    
    let rank = 1100;

    const docLinkWidget = new DocsAnchorWidget();
    docLinkWidget.id = DOMUtils.createDomID();
    app.shell.add(docLinkWidget, 'top', {rank:rank});

  }
};

export default extension;
