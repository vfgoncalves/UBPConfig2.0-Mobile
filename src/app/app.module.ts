import { CadastroClientePage } from './../pages/cadastro-cliente/cadastro-cliente';
import { CadastroSistemaPage } from './../pages/cadastro-sistema/cadastro-sistema';
import { CadastroPage } from './../pages/cadastro/cadastro';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { LoginPage } from '../pages/login/login';
import { AuthProvider } from '../providers/auth/auth';
import { UserProvider } from '../providers/user/user';
import { SistemaProvider } from '../providers/sistema/sistema';
import { ClienteProvider } from '../providers/cliente/cliente';

export const firebaseConfig = {
  apiKey: "AIzaSyA0XbMc-o7DMfqSQ98sZaDkaNdxl6uHKwA",
  authDomain: "angularproject-9d1dd.firebaseapp.com",
  databaseURL: "https://angularproject-9d1dd.firebaseio.com",
  projectId: "angularproject-9d1dd",
  storageBucket: "angularproject-9d1dd.appspot.com",
  messagingSenderId: "128267153910"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    CadastroPage,
    CadastroSistemaPage,
    CadastroClientePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    CadastroPage,
    CadastroSistemaPage,
    CadastroClientePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthProvider,
    UserProvider,
    SistemaProvider,
    ClienteProvider
  ]
})
export class AppModule { }
