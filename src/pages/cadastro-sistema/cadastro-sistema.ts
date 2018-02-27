import { SistemaProvider } from './../../providers/sistema/sistema';
import { Sistema } from './../../models/sistema';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/**
 * Generated class for the CadastroSistemaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro-sistema',
  templateUrl: 'cadastro-sistema.html',
})
export class CadastroSistemaPage {
  cadastroForm: FormGroup;
  sistema: Sistema = null;
  constructor(
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public sisService: SistemaProvider
  ) {
    this.cadastroForm = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      descricao: ['', [Validators.required, Validators.minLength(3)]],      
    });
  }

  ionViewDidLoad() {
  }

  onSubmit(): void {
    let loading: Loading = this.showLoading();
    let formUser = this.cadastroForm.value;    
    this.sistema = new Sistema(formUser.nome, formUser.descricao, null);
    this.sisService.create(this.sistema).then(() => {
      loading.dismiss();
      this.showAlert("Sistema cadastrado com sucesso!");      
    })
      .catch(() => {
        this.showAlert("Erro ao cadastrar sistema! Tente novamente");
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
