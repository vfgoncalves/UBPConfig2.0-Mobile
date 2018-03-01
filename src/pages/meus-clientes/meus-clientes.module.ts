import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MeusClientesPage } from './meus-clientes';

@NgModule({
  declarations: [
    MeusClientesPage,
  ],
  imports: [
    IonicPageModule.forChild(MeusClientesPage),
  ],
})
export class MeusClientesPageModule {}
