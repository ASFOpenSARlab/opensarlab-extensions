import {
  JupyterFrontEnd
} from '@jupyterlab/application';

import { 
  ToolbarButton,
  DOMUtils 
} from '@jupyterlab/apputils';

export function main( 
    app: JupyterFrontEnd,
    enabled: boolean,
    rank: number
  ) {

    if(enabled) {
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
      
      console.log('JupyterLab extension opensarlab-frontend:controlbtn is activated!');
    
    } else {

      console.log('JupyterLab extension opensarlab-frontend:controlbtn is not activated!');
    }
  }
