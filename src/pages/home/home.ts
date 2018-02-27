import { Sistema } from './../../models/sistema';
import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { SistemaProvider } from '../../providers/sistema/sistema';
import { Observable } from 'rxjs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  sistemas: Observable<Sistema[]>;

  constructor(
    public navCtrl: NavController,
    public sisService: SistemaProvider,
    public menuCtrl: MenuController
  ) {

  }

  ionViewDidLoad() {
    this.menuCtrl.swipeEnable(true);
    this.sistemas = this.sisService.getAll().valueChanges();
  }    

}
