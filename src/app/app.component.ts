import { HomePage } from './../pages/home/home';
import { UserProvider } from './../providers/user/user';
import { MeusClientesPage } from './../pages/meus-clientes/meus-clientes';
import { CadastroClientePage } from './../pages/cadastro-cliente/cadastro-cliente';
import { AuthProvider } from './../providers/auth/auth';
import { CadastroSistemaPage } from './../pages/cadastro-sistema/cadastro-sistema';
import { LoginPage } from './../pages/login/login';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Loading, LoadingController, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase/app';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  pages: Array<{ title: string, component: any }>;


  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public authService: AuthProvider,
    public userService: UserProvider

  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Cadastro de Sistemas', component: CadastroSistemaPage },
      { title: 'Cadastro de Clientes', component: CadastroClientePage },
      { title: 'Lista de Clientes', component: MeusClientesPage },
      { title: 'Sair', component: null }
    ];
  }



  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    if (page.component) {
      // Reset the content nav to have just this page
      // we wouldn't want the back button to show in this scenario
      this.nav.setRoot(page.component);
    } else {
      let loading: Loading = this.showLoading();
      this.authService.singOut()
        .then((user: firebase.User) => {
          localStorage.removeItem("useremail");
          localStorage.removeItem("userpassword");
          loading.dismiss();
          this.nav.setRoot(LoginPage);
        }).catch((error: any) => {
          this.showAlert("Erro ao efetuar logout!")
        });
    }

  }

  private showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: 'Por favor, aguarde...'
    });

    loading.present();

    return loading;
  }

  private showAlert(message: string): void {
    this.alertCtrl.create({
      message: message,
      buttons: ['Ok']
    }).present();
  }
}
