import { User } from './../../models/user';
import { UserProvider } from './../../providers/user/user';
import { HomePage } from './../home/home';
import { AuthProvider } from './../../providers/auth/auth';
import { CadastroPage } from './../cadastro/cadastro';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonicPage, NavController, NavParams, Loading, LoadingController, MenuController, Events } from 'ionic-angular';
import * as firebase from 'firebase/app';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {


  signinForm: FormGroup;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public authService: AuthProvider,
    public menuCtrl: MenuController,
    public userService: UserProvider,
    public events: Events
  ) {
    let emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    this.signinForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
      password: ['', [Validators.required]],
      manterconectado: [false],
    });
  }

  ionViewDidLoad() {
    let user = localStorage.getItem("useremail");
    let senha = localStorage.getItem("userpassword");
    this.menuCtrl.swipeEnable(false);    
    if (user !== null && senha !==null){
      this.efetuarLogin(user, senha);
    }
    
  }

  onSubmit(): void {
    if (this.signinForm.value.manterconectado) {
      this.armazenarUsuario(this.signinForm.value.email, this.signinForm.value.password);
    } else {
      localStorage.removeItem("useremail");
      localStorage.removeItem("userpassword");
    }
    
    this.efetuarLogin(this.signinForm.value.email, this.signinForm.value.password);
  }

  armazenarUsuario(email: string, senha: string) {
    localStorage.setItem("useremail", email);
    localStorage.setItem("userpassword", senha);
  }

  efetuarLogin(email: string, senha: string) {
    let loading: Loading = this.showLoading();
    this.authService.signIn(email, senha)
      .then((user: firebase.User) => {
        //usuário autenticado
        this.navCtrl.setRoot(HomePage);
        loading.dismiss();
      })
      .catch((error: any) => {
        //erro na autenticação
        loading.dismiss();
        this.showAlert(error);
      })
  }

  onSignup(): void {
    this.navCtrl.push(CadastroPage);
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

  loginUser() {
    this.authService.loginWithGoogle().then(data => {
      let user: User = new User(data["user"]["displayName"], data["user"]["email"], data["user"]["email"], data["user"]["photoURL"]);
      this.userService.create(user, data["user"]["G"]).then(r => {
        this.navCtrl.setRoot(HomePage);
      })
    })
  }

}
