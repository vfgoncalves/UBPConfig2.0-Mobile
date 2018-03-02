import { Versao } from './../../models/versao';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
    public navParams: NavParams
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

}
