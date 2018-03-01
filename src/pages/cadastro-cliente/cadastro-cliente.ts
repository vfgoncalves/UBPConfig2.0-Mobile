import { ClienteProvider } from './../../providers/cliente/cliente';
import { Cliente } from './../../models/cliente';
import { Observable } from 'rxjs';
import { SistemaProvider } from './../../providers/sistema/sistema';
import { Sistema } from './../../models/sistema';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';

/**
 * Generated class for the CadastroClientePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro-cliente',
  templateUrl: 'cadastro-cliente.html',
})
export class CadastroClientePage {
  cadastroForm: FormGroup;
  sistemas: Observable<Sistema[]>;
  cliente: Cliente;

  constructor(
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public sisService: SistemaProvider,
    public cliService: ClienteProvider
  ) {
    let emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.cadastroForm = this.formBuilder.group({
      nome: ['', [Validators.required]],
      email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],     
      sistemas: ['', [Validators.required]]
    });
  }

  ionViewDidLoad() {
    this.sistemas = this.sisService.getAll().valueChanges();
  }

  onSubmit(){
    let loading: Loading = this.showLoading();
    let formUser = this.cadastroForm.value;    
    this.cliente = new Cliente(null,formUser.nome, formUser.email, formUser.sistemas);
    this.cliService.create(this.cliente).then(() => {
      loading.dismiss();
      this.showAlert("Cliente cadastrado com sucesso!");      
    })
      .catch(() => {
        this.showAlert("Erro ao cadastrar cliente! Tente novamente");
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
