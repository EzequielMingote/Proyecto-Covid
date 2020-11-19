import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FirestoreService } from '../shared/firestore.service';
import { Comentario } from '../shared/interfaces/Comentario';

@Component({
  selector: 'app-foro',
  templateUrl: './foro.component.html',
  styleUrls: ['./foro.component.scss']
})
export class ForoComponent implements OnInit {

  mensajeForm = new FormGroup({
    mensaje: new FormControl('', [
      Validators.required,
    ]),
  });

  public comentarios: Comentario[] = []
  public usuario;
  constructor(private firestoreSvc: FirestoreService) { }

  async ngOnInit(): Promise<void> {
    this.usuario = 'ingrese su usuario';
    await this.getComentarios();
  }

  agregarComentario(){
    const { mensaje } = this.mensajeForm.value;
    /* let comentario: Comentario = {
      mensaje: mensaje,
      idUsuario: this.usuario.idUsuario,
      nombreUsuario: this.usuario.nombreUsuario,
      apellidoUsuario: this.usuario.apellidoUsuario,
      paisUsuario: this.usuario.paisUsuario,
      fechaDePublicacion: Date.now(),
    } */
    let comentario: Comentario = {
      mensaje: mensaje,
      idUsuario: 'this.usuario.idUsuario',
      nombreUsuario: 'this.usuario.nombreUsuario',
      apellidoUsuario: 'this.usuario.apellidoUsuario',
      paisUsuario: 'this.usuario.paisUsuario',
      fechaDePublicacion: Date.now(),
    }
    this.firestoreSvc.agregarComentario(comentario);
    this.comentarios.push(comentario);
  }

  async getComentarios(){
    let query = await this.firestoreSvc.getComentarios();
    query.forEach((comentarioAux) => {
      let aux: any = comentarioAux.data();
      let comentario: Comentario = {
        mensaje: aux.mensaje,
        idUsuario: aux.idUsuario,
        nombreUsuario: aux.nombreUsuario,
        apellidoUsuario: aux.apellidoUsuario,
        paisUsuario: aux.paisUsuario,
        fechaDePublicacion: aux.fechaDePublicacion,
        id: aux.id,
      }
      this.comentarios.push(comentario);
      console.log(comentario)
    })
  }

  borrarComentario(comentario: Comentario){
    this.firestoreSvc.borrarComentario(comentario);
    let indice = this.comentarios.indexOf(comentario);
    this.comentarios.splice(indice);
  }

  getFecha(fecha: number){
    return new Date(fecha);
  }

}
