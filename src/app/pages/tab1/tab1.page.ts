import {Component} from '@angular/core';
import {DeseosService} from '../../services/deseos.service';
import {Router} from '@angular/router';
import {AlertController} from '@ionic/angular';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

    constructor(private deseosService: DeseosService,
                private router: Router,
                private alertController: AlertController) {
    }

    async agregarLista() {
        const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Nueva lista',
            inputs: [
                {
                    name: 'titulo',
                    type: 'text',
                    placeholder: 'Ingrese nombre de la lista'
                }
            ],
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel'
                },
                {
                    text: 'Crear',
                    handler: (data) => {
                        if (data.titulo.length === 0) {
                            return;
                        }
                        const listaId = this.deseosService.crearLista(data.titulo);
                        this.router.navigate([`/tabs/tab1/agregar/${listaId}`]);
                    }
                }
            ]
        });

        await alert.present();
    }
}
