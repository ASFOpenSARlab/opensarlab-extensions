import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { ISettingRegistry } from '@jupyterlab/settingregistry';

import { main as controlbtn } from './components/controlbtn';
import { main as doc_link } from './components/doc_link';
import { main as profile_label } from './components/profile_label'
import { main as oslnotify } from './components/oslnotify';
import { main as gifcap_btn } from './components/gifcap_btn';

/**
 * Initialization data for the opensarlab_frontend extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'opensarlab_frontend:plugin',
  description: 'A JupyterLab extension.',
  autoStart: true,
  optional: [ISettingRegistry],
  activate: (app: JupyterFrontEnd, settingRegistry: ISettingRegistry | null) => {
    console.log('JupyterLab extension opensarlab_frontend is activated!');

    let my_settings = null;

    if (settingRegistry) {
      settingRegistry
        .load(plugin.id)
        .then(settings => {
          console.log('opensarlab_frontend settings loaded:', settings.composite);
          my_settings = settings;
        })
        .catch(reason => {
          console.error('Failed to load settings for opensarlab_frontend.', reason);
        });
    }

    // second arg is rank on topbar
    gifcap_btn(app, 1025)
    profile_label(app, 1050);
    doc_link(app, 1100);
    controlbtn(app, 1110);

    oslnotify(app, 'storage,calendar');

  }
};

export default plugin;
