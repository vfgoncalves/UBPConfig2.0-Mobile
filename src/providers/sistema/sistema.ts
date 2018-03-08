import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { BaseProvider } from '../base/base';
import * as firebase from 'firebase/app';
import { Sistema } from '../../models/sistema';

/*
  Generated class for the SistemaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SistemaProvider extends BaseProvider {
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

  create(sis: Sistema): Promise<void> {
    let id = this.createPushId();
    sis.id = id;
    return this.db.object(`/sistema/${this.uuid}/${id}`)            
      .set(sis)
      .catch(this.handlePromiseError);
  }

  delete(id: string): Promise<void> {
    return this.db.object(`/sistema/${this.uuid}/${id}`)            
      .remove()
      .catch(this.handlePromiseError);
  }

  createPushId():string{
    return this.db.createPushId()
  }  

  getAll():AngularFireList<Sistema>{
    return this.db.list(`/sistema/${this.uuid}`)
  }

}
