import { Component } from '@angular/core';

/**
 * Generated class for the UserinfoComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'userinfo',
  templateUrl: 'userinfo.html'
})
export class UserinfoComponent {

  username: string = null;
  userphoto: string = null;

  constructor() {
    this.username = localStorage.getItem("username");
    this.userphoto = localStorage.getItem("userphoto");
    console.log("COMPONENT INCIADO")
  }

}
