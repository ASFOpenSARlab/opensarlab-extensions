import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { main as controlbtn } from './components/controlbtn';
import { main as doc_link } from './components/doc_link';
import { main as profile_label } from './components/profile_label'
import { main as oslnotify } from './components/oslnotify';

/**
 * Initialization data for the opensarlab_frontend extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'opensarlab_frontend:plugin',
  description: 'A JupyterLab extension.',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension opensarlab_frontend is activated!');

    // second arg is rank on topbar
    profile_label(app, 1050);
    doc_link(app, 1100);
    controlbtn(app, 1110);

    oslnotify(app, 'storage,calendar');
  }
};

export default plugin;
