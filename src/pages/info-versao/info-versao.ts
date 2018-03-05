import { UploadTask, UploadTaskSnapshot } from '@firebase/storage-types';
import { VersaoProvider } from './../../providers/versao/versao';
import { Versao } from './../../models/versao';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, Loading } from 'ionic-angular';

/**
 * Generated class for the InfoVersaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-info-versao',
  templateUrl: 'info-versao.html',
})
export class InfoVersaoPage {
  versao: Versao;
  status: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,    
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public versaoService: VersaoProvider
  ) {
    this.versao = this.navParams.get("versao");
  }

  ionViewDidLoad() {    
    this.getStatus();
  }
  getStatus() {
    if (this.versao.versaLiberada) {
      this.status = "Liberada"
    } else {
      this.status = "Não liberada"
    }
  }

  uploadExec(executavel){    
    let loading: Loading = this.showLoading();
    this.versaoService.uploadExec(executavel.target.files[0], this.versao.id).then((r: UploadTaskSnapshot)=>{      
      loading.dismiss();
      this.showAlert("Executável carregado com sucesso");
    }).catch(err =>{
      loading.dismiss();
      this.showAlert("Erro ao carregar o executável, tente novamente!");
    });    
  }

  uploadScript(script){
    let loading: Loading = this.showLoading();
    this.versaoService.uploadExec(script.target.files[0], this.versao.id).then((r: UploadTaskSnapshot)=>{      
      loading.dismiss();
      this.showAlert("Script carregado com sucesso");
    }).catch(err =>{
      loading.dismiss();
      this.showAlert("Erro ao carregar o script, tente novamente!");
    });    
  }
  
  uploadDocumento(documento){    
    let loading: Loading = this.showLoading();
    this.versaoService.uploadExec(documento.target.files[0], this.versao.id).then((r: UploadTaskSnapshot)=>{      
      loading.dismiss();
      this.showAlert("Documento carregado com sucesso");
    }).catch(err =>{
      loading.dismiss();
      this.showAlert("Erro ao carregar o documento, tente novamente!");
    });    
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
