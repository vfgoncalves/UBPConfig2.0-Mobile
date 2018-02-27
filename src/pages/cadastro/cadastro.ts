import { HomePage } from './../home/home';
import { User } from './../../models/user';
import { AuthProvider } from './../../providers/auth/auth';
import { UserProvider } from './../../providers/user/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Loading, IonicPage, NavController, NavParams, LoadingController, AlertController, MenuController } from 'ionic-angular';
import * as firebase from 'firebase/app';

/**
 * Generated class for the CadastroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

  cadastroForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public userService: UserProvider, 
    public authService: AuthProvider,
    public menuCtrl: MenuController
  ) {
    let emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    let pwdRegex = /^(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z])(?=.*[A-Z]).{8,}$/i;
    let usuRegex = /^[-\w\.\$@\*\!]{8,30}$/i;

    this.cadastroForm = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      usuario: ['', Validators.compose([Validators.required, Validators.pattern(usuRegex)])],
      email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
      senha: ['', Validators.compose([Validators.required, Validators.pattern(pwdRegex)])],
    });
  }

  ionViewDidLoad() {
    this.menuCtrl.swipeEnable(false);
  }

  onSubmit(): void {

    let loading: Loading = this.showLoading();
    let formUser = this.cadastroForm.value;

    this.authService
      .createAuthUser({ email: formUser.email, password: formUser.senha })
      .then((authUser: firebase.User) => {
        let uuid: string = authUser.uid;
        let user: User = new User(formUser.nome, formUser.usuario, formUser.email);

        //Grava dados do usuário no banco
        this.userService.create(user, uuid)
          .then(() => {
            //Usuário criado com sucesso
            this.navCtrl.setRoot(HomePage);
            loading.dismiss();
          })
          .catch((error: any) => {
            loading.dismiss();
            this.showAlert(error);
          }) 

      })
      .catch((error: any) => {
        loading.dismiss();
        this.showAlert(error);
      })
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
