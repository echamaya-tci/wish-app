import {Component, OnInit} from '@angular/core';
import {DeseosService} from '../../services/deseos.service';
import {ActivatedRoute} from '@angular/router';
import {Lista} from '../../models/lista.model';
import {ListaItem} from '../../models/lista-item.model';

@Component({
    selector: 'app-agregar',
    templateUrl: './agregar.page.html',
    styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {
    lista: Lista;
    nombreItem = '';

    constructor(private deseosServices: DeseosService,
                private activatedRoute: ActivatedRoute) {
        const listaId = this.activatedRoute.snapshot.paramMap.get('listaId');
        this.lista = this.deseosServices.obtenerLista(listaId);
    }

    ngOnInit() {
    }

    agregarItem() {
        if (this.nombreItem.length === 0) {
            return;
        }
        const nuevoItem = new ListaItem(this.nombreItem);
        this.lista.items.push(nuevoItem);
        this.nombreItem = '';

        this.deseosServices.guardarStorage();
    }

    cambioCheck(item: ListaItem) {
        const pendientes = this.lista.items.filter(item => !item.completado).length;

        if (pendientes === 0) {
            this.lista.terminadaEn = new Date();
            this.lista.terminada = true;
        } else {
            this.lista.terminadaEn = null;
            this.lista.terminada = false;
        }

        this.deseosServices.guardarStorage();
    }

    borrar(index: number) {
        console.log('presiono')
        console.log(index);
        this.lista.items.splice(index, 1);
        this.deseosServices.guardarStorage();
    }

    drag(event) {
        console.log(event);
    }

}
