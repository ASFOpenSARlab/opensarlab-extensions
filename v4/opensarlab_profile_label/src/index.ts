import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import {
  DOMUtils 
} from '@jupyterlab/apputils';

import { Widget } from '@lumino/widgets';

import { requestAPI } from './handler';


class OpensarlabProfileLabelWidget extends Widget {
  constructor() {
    super();

    this.span = document.createElement('span');
    this.addClass('opensarlab-profile-label-widget');
    this.node.appendChild(this.span);
  }

  readonly span: HTMLSpanElement;
}

const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-topbar-opensarlab-profile-label',
  autoStart: true,
  activate: async (app: JupyterFrontEnd) => {

    let rank = 1090;

    let data = null;
    try {
      data = await requestAPI<any>('opensarlab-profile-label');
      console.log(data);
    } catch (reason) {
      console.error(
        `Error on GET /opensarlab-profile-label/opensarlab-profile-label.\n${reason}`
      );
    }

    const opensarlabProfileLabelWidget = new OpensarlabProfileLabelWidget();
    opensarlabProfileLabelWidget.id = DOMUtils.createDomID();
    opensarlabProfileLabelWidget.span.innerText = data['data'];

    app.shell.add(opensarlabProfileLabelWidget, 'top', {rank:rank});
  }
};

export default plugin;
