import { Cliente } from './../../models/cliente';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
    public cliService: ClienteProvider
  ) {
  }

  ionViewDidLoad() {
    this.clientes = this.cliService.getAll().valueChanges();
  }

}
