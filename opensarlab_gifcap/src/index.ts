import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

/**
 * Initialization data for the opensarlab_gifcap extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'opensarlab_gifcap:plugin',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension opensarlab_gifcap is activated!');
  }
};

export default plugin;
