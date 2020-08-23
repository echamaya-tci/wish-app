import {Injectable} from '@angular/core';
import {Lista} from '../models/lista.model';

@Injectable({
    providedIn: 'root'
})
export class DeseosService {

    listas: Lista[] = [];

    constructor() {
        this.cargarStorage();
    }

    crearLista(titulo: string) {
        const lista = new Lista(titulo);
        this.listas.push(lista);
        this.guardarStorage();
        return lista.id;
    }

    obtenerLista(listaId: number | string) {
        listaId = Number(listaId);
        return this.listas.find(lista => lista.id === listaId);
    }

    guardarStorage() {
        localStorage.setItem('data', JSON.stringify(this.listas));
    }

    cargarStorage() {
        if (localStorage.getItem('data')) {
            this.listas = JSON.parse(localStorage.getItem('data'));
        }
    }

    borrarLista(lista: Lista) {
        this.listas = this.listas.filter(listaData => listaData.id !== lista.id);
        this.guardarStorage();
    }
}
