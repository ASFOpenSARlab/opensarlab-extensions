import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { requestAPI } from './handler';

import toastr from 'toastr';

/**
 * Initialization data for the opensarlab_notifications extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'opensarlab_notifications:plugin',
  description: 'Endpoint for various notifications',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension opensarlab_notifications is activated!');

    let toastrLink = document.createElement('link')
    toastrLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css'
    toastrLink.rel = 'stylesheet'
    document.head.appendChild(toastrLink)

    toastr.options = {
      "closeButton": true,
      "newestOnTop": true,
      "progressBar": true,
      "positionClass": "toast-bottom-right",
      "preventDuplicates": false,
      "onclick": undefined,
      "showDuration": 30,
      "hideDuration": 1,
      "timeOut": 0,
      "extendedTimeOut": 0,
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
  };

  requestAPI<any>('calendar')
    .then(notes => {
      console.log(notes);
      notes['data'].forEach( function (entry: any) {
          (toastr as any)[entry.type](entry.message, entry.title)
          }
      )
    })
    .catch(reason => {
      console.error(`${reason}`);
    });

  requestAPI<any>('storage')
    .then(notes => {
      console.log(notes);
      notes['data'].forEach( function (entry: any) {
          (toastr as any)[entry.type](entry.message, entry.title)
          }
      )
    })
    .catch(reason => {
      console.error(`${reason}`);
    });

  }
}

export default plugin;
