import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { PartialJSONObject } from '@lumino/coreutils';

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
  
    let plugin_settings = {
      'gifcap_btn': {
        'enabled': true,
        'rank': 1025
      },
      'profile_label': {
        'enabled': true,
        'rank': 1050
      },
      'doc_link': {
        'enabled': true,
        'rank': 1100
      },
      'controlbtn': {
        'enabled': true,
        'rank': 1110
      },
      'oslnotify': {
        'enabled': true,
        'note_types': 'storage,calendar'
      },
    }

    function loadSetting(settings: ISettingRegistry.ISettings): void {

      let gifcap_btn_settings = settings.get('gifcap_btn').composite as PartialJSONObject;
      plugin_settings['gifcap_btn'].enabled = gifcap_btn_settings['enabled'] as boolean;
      plugin_settings['gifcap_btn'].rank = gifcap_btn_settings['rank'] as number;

      let profile_label_settings = settings.get('profile_label').composite as PartialJSONObject;
      plugin_settings['profile_label'].enabled = profile_label_settings['enabled'] as boolean;
      plugin_settings['profile_label'].rank = profile_label_settings['rank'] as number;

      let doc_link_settings = settings.get('doc_link').composite as PartialJSONObject;
      plugin_settings['doc_link'].enabled = doc_link_settings['enabled'] as boolean;
      plugin_settings['doc_link'].rank = doc_link_settings['rank'] as number;

      let controlbtn_settings = settings.get('controlbtn').composite as PartialJSONObject;
      plugin_settings['controlbtn'].enabled = controlbtn_settings['enabled'] as boolean;
      plugin_settings['controlbtn'].rank = controlbtn_settings['rank'] as number;

      let oslnotify_settings = settings.get('oslnotify').composite as PartialJSONObject;
      plugin_settings['oslnotify'].enabled = oslnotify_settings['enabled'] as boolean;
      plugin_settings['oslnotify'].note_types = oslnotify_settings['note_types'] as string;

      gifcap_btn(app, plugin_settings['gifcap_btn'].enabled, plugin_settings['gifcap_btn'].rank);
    }

    // Wait for the application to be restored and
    // for the settings for this plugin to be loaded
    if(settingRegistry) {
      Promise.all([
            app.restored, 
            settingRegistry.load(plugin.id)
        ])
        .then(([, setting]) => {
          // Read the settings
          loadSetting(setting);

          // Listen for your plugin setting changes using Signal
          setting.changed.connect(loadSetting);
        });
    }

    gifcap_btn(app, plugin_settings['gifcap_btn'].enabled, plugin_settings['gifcap_btn'].rank);
    profile_label(app, plugin_settings['profile_label'].enabled, plugin_settings['profile_label'].rank);
    doc_link(app, plugin_settings['doc_link'].enabled, plugin_settings['doc_link'].rank);
    controlbtn(app, plugin_settings['controlbtn'].enabled, plugin_settings['controlbtn'].rank);
    oslnotify(app, plugin_settings['oslnotify'].enabled, plugin_settings['oslnotify'].note_types);

    console.log('JupyterLab extension opensarlab_frontend is fully operational!');
  }
};

export default plugin;
