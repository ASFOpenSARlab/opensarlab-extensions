import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

/**
 * Initialization data for the opensarlab_doc_link extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'opensarlab_doc_link:plugin',
  description: 'A JupyterLab extension.',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension opensarlab_doc_link is activated!');
  }
};

export default plugin;
