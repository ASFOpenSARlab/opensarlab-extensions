import {
  JupyterFrontEnd
} from '@jupyterlab/application';

import { 
  ToolbarButton,
  DOMUtils 
} from '@jupyterlab/apputils';

export function main( 
    app: JupyterFrontEnd, 
    rank: number
  ) {

    const serverBtn = new ToolbarButton({
      className: 'opensarlab-controlbtn',
      label: 'Shutdown and Logout Page',
      onClick: () => {
        window.location.href = '/hub/home';
      },
      tooltip: 'Hub Control Panel: A place to stop the server and logout'
    });
    serverBtn.id = DOMUtils.createDomID();
    serverBtn.addClass('opensarlab-widget')

    app.shell.add(serverBtn, 'top', {rank:rank});
      
  }
