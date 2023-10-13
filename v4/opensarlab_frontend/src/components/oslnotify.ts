import {
    JupyterFrontEnd,
} from '@jupyterlab/application';

import { requestAPI } from './handler';
import toastr from 'toastr';

interface IButter {
    title: string;
    message: string;
    type: string;
    severity: Partial<number>;
}

interface IBread {
    options: object;
    data: Array<IButter>;
}

function makeToast(notes: IBread) {
    toastr.options = notes.options;
    notes.data.forEach((entry: any) => {
        (toastr as any)[entry.type](entry.message, entry.title);
    });
}

function notifications(types: string) {
    document.head.insertAdjacentHTML(
        'beforeend',
        "<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css'/>"
    );
    document.head.insertAdjacentHTML(
        'beforeend',
        '<style>#toast-container>div{opacity:1;}</style>'
    );

    requestAPI<any>(`opensarlab-oslnotify?type=${types}`)
        .then( (notes: IBread) => {
            makeToast(notes);
        })
        .catch( (reason: string) => {
            console.log(
                `Error on GET /opensarlab-frontend/opensarlab-oslnotify.\n${reason}`
            )
        });
  }

export function main(
    app: JupyterFrontEnd,
    enabled: boolean,
    note_type: string
) {
    if(enabled) {
        notifications('storage,calendar');
        console.log('JupyterLab extension opensarlab-frontend:oslnotify is activated!');
    
    } else {

        console.log('JupyterLab extension opensarlab-frontend:oslnotify is not activated!');
    }
}
  