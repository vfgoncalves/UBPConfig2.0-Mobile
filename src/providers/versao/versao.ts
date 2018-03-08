import { Observable } from 'rxjs';
import { Versao } from './../../models/versao';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { BaseProvider } from '../base/base';
import { FirebaseApp } from "angularfire2";
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { UploadTask } from '@firebase/storage-types';

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
    public afAuth: AngularFireAuth,
    public firebaseApp: FirebaseApp    
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

  delete(idSis: string): Promise<void> {
    return this.db.object(`/versao/${this.uuid}/${idSis}`).remove()
      .catch(this.handlePromiseError);
  }

  deleteVersao(idSis: string,idVer: string): Promise<void> {
    return this.db.object(`/versao/${this.uuid}/${idSis}/${idVer}`).remove()
      .catch(this.handlePromiseError);
  }

  createPushId(): string {
    return this.db.createPushId()
  }

  getAll(idSis: string): AngularFireList<Versao> {
    return this.db.list(`/versao/${this.uuid}/${idSis}`)
  }

  uploadExec(executavel, idversao: string): UploadTask {
    return this.firebaseApp
      .storage()
      .ref()
      .child(`/executavel/${this.uuid}/${idversao}/${executavel.name}`)
      .put(executavel);
  }

  getExecutaveis(idversao: string): Observable<any> {   
    return this.db.list(`/executavel/${this.uuid}/${idversao}/`).valueChanges()
  }

  uploadScript(script, idversao: string): UploadTask {
    return this.firebaseApp
      .storage()
      .ref()
      .child(`/script/${this.uuid}/${idversao}/${script.name}`)
      .put(script);
  }

  uploadDocumento(documento, idversao: string): UploadTask {
    return this.firebaseApp
      .storage()
      .ref()
      .child(`/documento/${this.uuid}/${idversao}/${documento.name}`)
      .put(documento);
  }
}
