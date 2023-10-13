import {
    JupyterFrontEnd
} from '@jupyterlab/application';
  
import {
    DOMUtils 
} from '@jupyterlab/apputils';
  
import { Widget } from '@lumino/widgets';
  
import { requestAPI } from './handler';
  
  
class OpensarlabProfileLabelWidget extends Widget {
    constructor() {
        super();
  
        this.span = document.createElement('span');
        this.addClass('opensarlab-profile-label-widget');
        this.addClass('opensarlab-widget');
        this.node.appendChild(this.span);
    }
  
    readonly span: HTMLSpanElement;
}
  
export async function main(
    app: JupyterFrontEnd,
    enabled: boolean,
    rank: number
) {
    if(enabled) {
        let data = null;
        try {
            data = await requestAPI<any>('opensarlab-profile-label');
            console.log(data);
        } catch (reason) {
            console.error(
                `Error on GET /opensarlab-frontend/opensarlab-profile-label.\n${reason}`
            );
        }
    
        const opensarlabProfileLabelWidget = new OpensarlabProfileLabelWidget();
        opensarlabProfileLabelWidget.id = DOMUtils.createDomID();
        opensarlabProfileLabelWidget.span.innerText = data['data'];
    
        app.shell.add(opensarlabProfileLabelWidget, 'top', {rank:rank});

        console.log('JupyterLab extension opensarlab-frontend:profile_label is activated!');
    
    } else {

        console.log('JupyterLab extension opensarlab-frontend:profile_label is not activated!');
    }
};
  