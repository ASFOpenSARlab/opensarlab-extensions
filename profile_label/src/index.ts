import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { requestAPI } from './handler';

/**
 * Initialization data for the profile-label extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'profile-label:plugin',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension profile-label is activated!');

    requestAPI<any>('get_example')
      .then(data => {
        console.log(data);
      })
      .catch(reason => {
        console.error(
          `The profile_label server extension appears to be missing.\n${reason}`
        );
      });
  }
};

export default plugin;
