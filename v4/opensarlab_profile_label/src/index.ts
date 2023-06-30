import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { requestAPI } from './handler';

/**
 * Initialization data for the opensarlab_profile_label extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'opensarlab_profile_label:plugin',
  description: 'A JupyterLab extension.',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension opensarlab_profile_label is activated!');

    requestAPI<any>('get-example')
      .then(data => {
        console.log(data);
      })
      .catch(reason => {
        console.error(
          `The opensarlab_profile_label server extension appears to be missing.\n${reason}`
        );
      });
  }
};

export default plugin;
