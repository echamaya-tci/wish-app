import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {DeseosService} from '../../services/deseos.service';
import {Lista} from '../../models/lista.model';
import {Router} from '@angular/router';
import {AlertController, IonList} from '@ionic/angular';

@Component({
    selector: 'app-listas',
    templateUrl: './listas.component.html',
    styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {
    @ViewChild(IonList) listaComponent: IonList;
    @Input() terminada = true;

    constructor(public deseosService: DeseosService,
                private router: Router,
                private alertController: AlertController) {
    }

    ngOnInit() {
    }

    listaSeleccionada(lista: Lista) {
        if (this.terminada) {
            this.router.navigate([`/tabs/tab2/agregar/${lista.id}`]);
        } else {
            this.router.navigate([`/tabs/tab1/agregar/${lista.id}`]);
        }
    }

    borrar(lista: Lista) {
        this.deseosService.borrarLista(lista);
    }

    async editar(lista: Lista) {
        const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Editar lista',
            inputs: [
                {
                    name: 'titulo',
                    type: 'text',
                    value: lista.titulo,
                    placeholder: 'Ingrese nombre de la lista'
                }
            ],
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: () => this.listaComponent.closeSlidingItems()
                },
                {
                    text: 'Editar',
                    handler: (data) => {
                        if (data.titulo.length === 0) {
                            return;
                        }
                        lista.titulo = data.titulo;
                        this.deseosService.guardarStorage();
                        this.listaComponent.closeSlidingItems();
                    }
                }
            ]
        });

        await alert.present();
    }

}
