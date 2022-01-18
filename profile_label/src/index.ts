import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { ITopBar } from 'jupyterlab-topbar';
import { Widget } from '@lumino/widgets';

import { requestAPI } from './handler';

class ProfileLabelWidget extends Widget {
  constructor() {
    super();

    this.span = document.createElement('span');
    this.addClass('profile-label-widget');
    this.node.appendChild(this.span);
  }

  readonly span: HTMLSpanElement;
}

const profile_label_extension: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-topbar-profile-label',
  autoStart: true,
  requires: [ITopBar],
  activate: async (app: JupyterFrontEnd, topBar: ITopBar) => {
    let data = null;
    try {
      data = await requestAPI<any>('profile-label');
      console.log(data);
    } catch (reason) {
      console.error(`Error on GET /profile-label/profile-label.\n${reason}`);
    }

    const profileLabelWidget = new ProfileLabelWidget();
    profileLabelWidget.span.innerText = data['data'];
    topBar.addItem('profile_label', profileLabelWidget);
  }
};

export default profile_label_extension;
