import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin,
} from '@jupyterlab/application';

import { IStatusBar } from '@jupyterlab/statusbar';

import { Widget } from '@lumino/widgets';

class DocsAnchorWidget extends Widget {
  constructor() {
    super();

    this.hyperlink = document.createElement('a');
    this.hyperlink.text = 'OpenSARlab Docs';
    this.hyperlink.href = 'https://opensarlab-docs.asf.alaska.edu';
    this.hyperlink.target = 'blank';
    this.addClass('docs-anchor-widget');

    this.node.appendChild(this.hyperlink);
  }

  readonly hyperlink: HTMLAnchorElement;
}

/**
 * @param app
 * @param statusbar
 */
function activate(app: JupyterFrontEnd, statusbar: IStatusBar) {
  const statusWidget = new DocsAnchorWidget();
  statusbar.registerStatusItem('hello', {
    align: 'left',
    item: statusWidget,
    rank: 5
  });
}

const extension: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab_doclink',
  autoStart: true,
  requires: [IStatusBar],
  activate: activate
};

export default extension;

