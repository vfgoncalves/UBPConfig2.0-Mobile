import { CadastroSistemaPage } from './../cadastro-sistema/cadastro-sistema';
import { Sistema } from './../../models/sistema';
import { Component } from '@angular/core';
import { NavController, MenuController, LoadingController,Loading } from 'ionic-angular';
import { SistemaProvider } from '../../providers/sistema/sistema';
import { Observable } from 'rxjs';
import { VersoesPage } from '../versoes/versoes';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  sistemas: Observable<Sistema[]>;

  constructor(
    public navCtrl: NavController,
    public sisService: SistemaProvider,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController
  ) {

  }

  ionViewDidLoad() {
    let loading: Loading = this.showLoading();
    this.menuCtrl.swipeEnable(true);
    this.sistemas = this.sisService.getAll().valueChanges();
    this.sistemas.subscribe(r=>{
      loading.dismiss();
    })
  }

  addSis() {
    this.navCtrl.push(CadastroSistemaPage);
  }

  openVersion(sistema: Sistema) {
    this.navCtrl.push(VersoesPage, { sistema: sistema });
  }

  private showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: 'Buscando sistemas...'
    });

    loading.present();

    return loading;
  }


}
