import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { BaseProvider } from '../base/base';
import * as firebase from 'firebase/app';
import { Artefato } from '../../models/artefato';

/*
  Generated class for the ArtefatoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ArtefatoProvider extends BaseProvider {
  uuid: string; 

  constructor(
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
  ) {
    super();
    this.listenAuthState();    
   }
   private listenAuthState(): void {
    this.afAuth
      .authState
      .subscribe((authUser: firebase.User) => {
        if (authUser) {
          this.uuid = authUser.uid;   
        }
      });
  }

  create(artefato: Artefato, tipo: string): Promise<void> {
    let id = this.createPushId();
    artefato.id = id;
    return this.db.object(`/artefato/${this.uuid}/${artefato.idVersao}/${tipo}/${id}`)            
      .set(artefato)
      .catch(this.handlePromiseError);
  }

  createPushId():string{
    return this.db.createPushId()
  }  

  get(idVersao:string, tipo: string):AngularFireList<Artefato>{
    return this.db.list(`/artefato/${this.uuid}/${idVersao}/${tipo}/`)
  }

}
