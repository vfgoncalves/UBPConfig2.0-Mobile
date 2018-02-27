import { HttpClient } from '@angular/common/http';
import { CadastroPage } from './../pages/cadastro/cadastro';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { LoginPage } from '../pages/login/login';
import { BaseProvider } from '../providers/base/base';
import { AuthProvider } from '../providers/auth/auth';
import { UserProvider } from '../providers/user/user';

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
    ListPage,
    LoginPage,
    CadastroPage
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
    ListPage,
    LoginPage,
    CadastroPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthProvider,
    UserProvider
  ]
})
export class AppModule { }
