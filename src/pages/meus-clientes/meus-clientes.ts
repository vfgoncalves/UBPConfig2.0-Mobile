import { Cliente } from './../../models/cliente';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, Loading } from 'ionic-angular';
import { ClienteProvider } from '../../providers/cliente/cliente';
import { Observable } from 'rxjs';

/**
 * Generated class for the MeusClientesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-meus-clientes',
  templateUrl: 'meus-clientes.html',
})
export class MeusClientesPage {
  clientes: Observable<Cliente[]>;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cliService: ClienteProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {
  }

  ionViewDidLoad() {
    this.buscarClientes();
  }

  apagarCliente(cliente: Cliente){
    let loading:Loading = this.showLoading();
    this.cliService.delete(cliente).then(r=>{
      loading.dismiss();
      this.showAlert("Cliente deletado com sucesso")
    })
  }

  buscarClientes(){
    this.clientes = this.cliService.getAll().valueChanges();
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
