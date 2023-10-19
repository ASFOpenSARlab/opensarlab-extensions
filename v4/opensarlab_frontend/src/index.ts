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
  
    // Wait for the application to be restored and
    // for the settings for this plugin to be loaded
    if(!settingRegistry) {
      console.log("Settings not found. opensarlab_frontend cannot be established.")
      return; 
    }

    Promise.all([
          app.restored, 
          settingRegistry.load(plugin.id)
      ])
      .then(([, settings]) => {

        async function loadSettings(allSettings: ISettingRegistry.ISettings): Promise<void> {
          await gifcap_btn(app, allSettings);
          await profile_label(app, allSettings);
          await doc_link(app, allSettings);
          await controlbtn(app, allSettings);
          await oslnotify(app, allSettings);
        }

        // Read the settings
        loadSettings(settings);

        // Listen for your plugin setting changes using Signal
        settings.changed.connect(loadSettings);

        console.log("JupyterLab extension opensarlab_frontend is fully operational!");
      });
  }
};

export default plugin;
