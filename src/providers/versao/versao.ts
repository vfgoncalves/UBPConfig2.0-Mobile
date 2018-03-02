import { Versao } from './../../models/versao';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { BaseProvider } from '../base/base';
import * as firebase from 'firebase/app';

/*
  Generated class for the VersaoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class VersaoProvider extends BaseProvider {
  uuid: string;
  constructor(
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth
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

  create(ver: Versao, idSis: string): Promise<void> {
    let id = this.createPushId();
    ver.id = id;
    return this.db.object(`/versao/${this.uuid}/${idSis}/${id}`)            
      .set(ver)
      .catch(this.handlePromiseError);
  }

  createPushId():string{
    return this.db.createPushId()
  }  

  getAll(idSis: string):AngularFireList<Versao>{
    return this.db.list(`/versao/${this.uuid}/${idSis}`)
  }

}
