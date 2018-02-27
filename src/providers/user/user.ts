import { User } from './../../models/user';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { BaseProvider } from '../base/base';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import * as firebase from 'firebase/app';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider extends BaseProvider {
  users: Observable<User[]>;
  currentUser: AngularFireObject<User>;
  userLogged: User;
  uuid: string; 

  constructor(
    public afAuth: AngularFireAuth,
    public db: AngularFireDatabase
  ) {
    super();
    this.listenAuthState();
  }

  private listenAuthState(): void {
    this.afAuth
      .authState
      .subscribe((authUser: firebase.User) => {
        if (authUser) {
          console.log('Auth state alterado!');          
          this.currentUser = this.db.object(`/users/${authUser.uid}`);
          this.uuid = authUser.uid;        
          this.setUsers(authUser.uid);
        }
      });
  }

  private setUsers(uidToExclude: string): void {
    this.users = this.mapListKeys<User>(
      this.db.list<User>(`/users`,
        (ref: firebase.database.Reference) => ref.orderByChild('name')
      )
    )
      .map((users: User[]) => {
        return users.filter((user: User) => user.$key !== uidToExclude);
      });
  }

  userExists(username: string): Observable<boolean> {
    return this.db.list(`/users`,
      (ref: firebase.database.Reference) => ref.orderByChild('name').equalTo(username)
    )
      .valueChanges()
      .map((users: User[]) => {
        return users.length > 0;
      });
  }

  create(user: User, uuid: string): Promise<void> {
    return this.db.object(`/users/${uuid}`)
      .set(user)
      .catch(this.handlePromiseError);
  }

  get(userId: string): AngularFireObject<User> {
    return this.db.object<User>(`/users/${userId}`);
  }

  getCurrentUser(): AngularFireObject<User>{
    return this.get(this.uuid);
  }

}
