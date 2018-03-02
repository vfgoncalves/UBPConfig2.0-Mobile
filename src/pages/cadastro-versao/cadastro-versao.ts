import { VersaoProvider } from './../../providers/versao/versao';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';
import { Versao } from '../../models/versao';
import { Sistema } from '../../models/sistema';

/**
 * Generated class for the CadastroVersaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro-versao',
  templateUrl: 'cadastro-versao.html',
})
export class CadastroVersaoPage {
  cadastroForm: FormGroup;
  versao: Versao = null;
  sistema: Sistema;

  constructor(
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public verService: VersaoProvider
  ) {
    this.sistema = this.navParams.get("sistema");

    this.cadastroForm = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      dataPrevista: ['', [Validators.required]],      
    });
  }

  ionViewDidLoad() {
  }

  onSubmit(): void {
    let loading: Loading = this.showLoading();
    let formUser = this.cadastroForm.value;
    this.versao = new Versao(null,formUser.nome, formUser.dataPrevista, false);
    this.verService.create(this.versao, this.sistema.id ).then(() => {
      loading.dismiss();
      this.showAlert("Versão cadastrada com sucesso!");
    })
      .catch(() => {
        this.showAlert("Erro ao cadastrar versão! Tente novamente");
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
