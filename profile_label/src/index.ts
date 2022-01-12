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

const link_extension: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-topbar-doclink',
  autoStart: true,
  requires: [ITopBar],
  activate: async (app: JupyterFrontEnd, topBar: ITopBar) => {

    let data = null;
    try {
        data = await requestAPI<any>('profile-label');
        console.log(data);
    } catch (reason) {
        console.error(`Error on GET /jlab-ext-example/profile-label.\n${reason}`);
    }

    const profileLabelWidget = new ProfileLabelWidget();
    profileLabelWidget.span.innerText = data['data'];
    topBar.addItem('profile_label', profileLabelWidget);
  },
};

export default link_extension;





// /**
//  * Initialization data for the profile-label extension.
//  */
// const plugin: JupyterFrontEndPlugin<void> = {
//   id: 'profile-label:plugin',
//   autoStart: true,
//   activate: (app: JupyterFrontEnd) => {
//     console.log('JupyterLab extension profile-label is activated!');
//
//     requestAPI<any>('get_example')
//       .then(data => {
//         console.log(data);
//       })
//       .catch(reason => {
//         console.error(
//           `The profile_label server extension appears to be missing.\n${reason}`
//         );
//       });
//   }
// };
//
// export default plugin;
