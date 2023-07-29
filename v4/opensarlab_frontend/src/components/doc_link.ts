import {
    JupyterFrontEnd,
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
        this.addClass('opensarlab-doc-link-widget');
        this.addClass('opensarlab-widget');

        this.node.appendChild(this.hyperlink);
    }

    readonly hyperlink: HTMLAnchorElement;
}
  
export function main(
    app: JupyterFrontEnd, 
    rank: number
    ) {

      const docLinkWidget = new DocsAnchorWidget();
      docLinkWidget.id = DOMUtils.createDomID();
      app.shell.add(docLinkWidget, 'top', {rank:rank});
  
    };