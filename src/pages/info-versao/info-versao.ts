import { Artefato } from './../../models/artefato';
import { UploadTaskSnapshot } from '@firebase/storage-types';
import { VersaoProvider } from './../../providers/versao/versao';
import { Versao } from './../../models/versao';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, Loading } from 'ionic-angular';
import { ArtefatoProvider } from '../../providers/artefato/artefato';
import { Observable } from 'rxjs';

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
  fileUploads: any[];

  executaveis: Observable<Artefato[]>;
  scripts: Observable<Artefato[]>;
  documentos: Observable<Artefato[]>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public versaoService: VersaoProvider,
    public artefatoService: ArtefatoProvider
  ) {
    this.versao = this.navParams.get("versao");
  }

  ionViewDidLoad() {
    this.getStatus();

    //lista de executáveis carregados
    this.executaveis = this.artefatoService.get(this.versao.id, "executavel").valueChanges();
    this.scripts = this.artefatoService.get(this.versao.id, "script").valueChanges();
    this.documentos = this.artefatoService.get(this.versao.id, "documento").valueChanges();   
  }
  getStatus() {
    if (this.versao.versaLiberada) {
      this.status = "Liberada"
    } else {
      this.status = "Não liberada"
    }
  }

  uploadExec(executavel) {
    let loading: Loading = this.showLoading();
    this.versaoService.uploadExec(executavel.target.files[0], this.versao.id).then((r: UploadTaskSnapshot) => {
      this.cadastrarArtefato(r, "executavel", loading);
    }).catch(err => {
      loading.dismiss();
      this.showAlert("Erro ao carregar o executável, tente novamente!");
    });
  }

  uploadScript(script) {
    let loading: Loading = this.showLoading();
    this.versaoService.uploadExec(script.target.files[0], this.versao.id).then((r: UploadTaskSnapshot) => {
      this.cadastrarArtefato(r, "script", loading);
    }).catch(err => {
      loading.dismiss();
      this.showAlert("Erro ao carregar o script, tente novamente!");
    });
  }

  uploadDocumento(documento) {
    let loading: Loading = this.showLoading();
    this.versaoService.uploadExec(documento.target.files[0], this.versao.id).then((r: UploadTaskSnapshot) => {
      this.cadastrarArtefato(r, "documento", loading);
    }).catch(err => {
      loading.dismiss();
      this.showAlert("Erro ao carregar o documento, tente novamente!");
    });
  }

  cadastrarArtefato(r: UploadTaskSnapshot, tipo: string, loading: Loading) {
    let artefato: Artefato = new Artefato(null, this.versao.id, r.metadata.name, r.metadata.downloadURLs[0])

    this.artefatoService.create(artefato, tipo).then(() => {
      loading.dismiss();
      this.showAlert("Artefato carregado com sucesso");
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
