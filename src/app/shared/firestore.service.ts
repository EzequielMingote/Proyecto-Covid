import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Comentario } from './interfaces/Comentario';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private angularFirestore: AngularFirestore) {}

  agregarComentario(mensaje: Comentario) {
    let id = this.angularFirestore.createId();
    this.angularFirestore.collection('Mensajes').doc(id).set({
      mensaje: mensaje.mensaje,
      idUsuario: mensaje.idUsuario,
      nombreUsuario: mensaje.nombreUsuario,
      apellidoUsuario: mensaje.apellidoUsuario,
      paisUsuario: mensaje.paisUsuario,
      fechaDePublicacion: mensaje.fechaDePublicacion,
      id: id,
    });
  }

  async getComentarios() {
    return await this.angularFirestore.collection('Mensajes', ref => ref.orderBy('fechaDePublicacion')).get().toPromise();
  }

  borrarComentario(mensaje: Comentario, userId?: string) {
    this.angularFirestore.collection('Mensajes').doc(mensaje.id).delete();
    /* if(mensaje.idUsuario == userId){
      this.angularFirestore.collection('Mensaje').doc(mensaje.id).delete();
    } */
  }
}
