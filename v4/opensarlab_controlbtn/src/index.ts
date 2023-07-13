import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { 
  ToolbarButton,
  DOMUtils 
} from '@jupyterlab/apputils';

const plugin: JupyterFrontEndPlugin<void> = {
  id: 'opensarlab-topbar-serverbtn',
  autoStart: true,
  activate: (
    app: JupyterFrontEnd
  ) => {
    
    let rank = 1110;
    
    const serverBtn = new ToolbarButton({
      className: 'hub-server-button',
      label: 'Shutdown and Logout Page',
      onClick: () => {
        window.location.href = '/hub/home';
      },
      tooltip: 'Hub Control Panel: A place to stop the server and logout'
    });
    serverBtn.id = DOMUtils.createDomID();

    app.shell.add(serverBtn, 'top', {rank:rank});
  }
};

export default plugin;
