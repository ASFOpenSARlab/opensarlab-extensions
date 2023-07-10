import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin,
} from '@jupyterlab/application';

import { ToolbarButton, IToolbarWidgetRegistry} from '@jupyterlab/apputils';

const plugin: JupyterFrontEndPlugin<void> = {
  id: 'opensarlab-topbar-serverbtn',
  autoStart: true,
  requires: [IToolbarWidgetRegistry],
  activate: (
    app: JupyterFrontEnd,
    toolbarRegistry: IToolbarWidgetRegistry
  ) => {

    console.log("Hello!!!!")
    const serverBtn = new ToolbarButton({
      className: 'hub-server-button',
      label: 'Shutdown and Logout Page',
      onClick: () => {
        window.location.href = '/hub/home';
      },
      tooltip: 'Hub Control Panel: A place to stop the server and logout'
    });

    app.activatePlugin('@jupyterlab/application-extension:top-bar')
    //app.shell.add(serverBtn, 'top')

    serverBtn
    //toolbarRegistry.addFactory('TopBar', 'server-btn', () => serverBtn);
  }
};

export default plugin;
