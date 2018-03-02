import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroVersaoPage } from './cadastro-versao';

@NgModule({
  declarations: [
    CadastroVersaoPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastroVersaoPage),
  ],
})
export class CadastroVersaoPageModule {}
