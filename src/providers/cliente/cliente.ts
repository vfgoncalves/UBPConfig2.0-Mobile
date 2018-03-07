import { Cliente } from './../../models/cliente';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { BaseProvider } from '../base/base';
import * as firebase from 'firebase/app';

/*
  Generated class for the ClienteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ClienteProvider extends BaseProvider {
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

  create(cli: Cliente): Promise<void> {
    let id = this.createPushId();
    cli.id = id;
    return this.db.object(`/clientes/${this.uuid}/${id}`)            
      .set(cli)
      .catch(this.handlePromiseError);
  }
  getAll():AngularFireList<Cliente>{
    return this.db.list(`/clientes/${this.uuid}`)
  }

  createPushId():string{
    return this.db.createPushId()
  } 

  delete(cli: Cliente): Promise<void> {
    return this.db.object(`/clientes/${this.uuid}/${cli.id}`).remove()
      .catch(this.handlePromiseError);
  }
}
