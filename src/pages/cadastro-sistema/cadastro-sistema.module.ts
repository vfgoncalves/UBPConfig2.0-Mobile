import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroSistemaPage } from './cadastro-sistema';

@NgModule({
  declarations: [
    CadastroSistemaPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastroSistemaPage),
  ],
})
export class CadastroSistemaPageModule {}
