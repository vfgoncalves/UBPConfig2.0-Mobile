import { Versao } from './../../models/versao';
import { Observable } from 'rxjs';
import { CadastroVersaoPage } from './../cadastro-versao/cadastro-versao';
import { Sistema } from './../../models/sistema';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VersaoProvider } from '../../providers/versao/versao';
import { InfoVersaoPage } from '../info-versao/info-versao';

/**
 * Generated class for the VersoesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-versoes',
  templateUrl: 'versoes.html',
})
export class VersoesPage {
  sistema: Sistema;
  versoes: Observable<Versao[]>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public verService: VersaoProvider
  ) {

  }

  ionViewDidLoad() {
    this.sistema = this.navParams.get("sistema");
    this.versoes = this.verService.getAll(this.sistema.id).valueChanges();    
  }

  addVersao(){
    this.navCtrl.push(CadastroVersaoPage, {sistema: this.sistema});
  }

  getStatus(versao: Versao):string{
    if(versao.versaLiberada){
      return "Liberada"
    }else{
      return "Não Liberada"
    }    
  }
  openVersion(versao: Versao){
    this.navCtrl.push(InfoVersaoPage,{versao: versao})
  }

}
