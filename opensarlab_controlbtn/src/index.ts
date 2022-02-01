import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin,
} from '@jupyterlab/application';

import { ITopBar } from 'jupyterlab-topbar';

import { ToolbarButton } from '@jupyterlab/apputils';

const plugin: JupyterFrontEndPlugin<void> = {
  id: 'opensarlab-topbar-serverbtn',
  autoStart: true,
  requires: [ITopBar],
  activate: (app: JupyterFrontEnd, topBar: ITopBar) => {

    const serverBtn = new ToolbarButton({
        className: 'hub-server-button',
        label: 'Hub Control Panel',
        onClick: () => {
            window.location.href = "/hub/home"
        },
        tooltip: 'A place to stop the server and logout',
    });

    topBar.addItem('server-btn', serverBtn);
  },
};

export default plugin;
