import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BaseProvider } from '../base/base';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider extends BaseProvider {

  constructor(
    public afAuth: AngularFireAuth,
  ) {
    super();
  }
  public isLogged(): Observable<firebase.User> {
    return this.afAuth.authState      
  }

  createAuthUser(user: { email: string, password: string }): Promise<firebase.User> {
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .catch(this.handlePromiseError);
  }

  loginWithGoogle(): Promise<any>{
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  getAuthState(): any {
    return this.afAuth.authState;
  }

  singOut(): Promise<firebase.User> {
    return this.afAuth.auth.signOut().catch(this.handlePromiseError);
  }

  signIn(email: string, password: string): Promise<firebase.User> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .catch(this.handlePromiseError);
  }

}
