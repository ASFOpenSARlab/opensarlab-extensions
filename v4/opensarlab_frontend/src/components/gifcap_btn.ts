import {
    JupyterFrontEnd,
} from '@jupyterlab/application';

import { 
    ToolbarButton,
    DOMUtils 
} from '@jupyterlab/apputils';
  
export function main(
    app: JupyterFrontEnd, 
    rank: number
    ) {

      const gifcapBtn = new ToolbarButton({
        className: 'opensarlab-gitcap-btn',
        label: 'GIF Capture',
        onClick: () => {
            window.open('https://gifcap.dev', '_blank');
        },
        tooltip: 'Create and download screen capture GIFs'
      });
      gifcapBtn.id = DOMUtils.createDomID();
      gifcapBtn.addClass('opensarlab-widget')
  
      app.shell.add(gifcapBtn, 'top', {rank:rank});
  
    };