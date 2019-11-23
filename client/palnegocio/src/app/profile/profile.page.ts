import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UserInterface } from '../interfaces/users';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private menu: MenuController, private auth: AuthService, private router: Router) {
    this.user = this.auth.getUser();

  }
  user: UserInterface;
  ngOnInit() {

  }

  cerrarSesion() {
    this.auth.logoutUser();
    this.router.navigate([""]);
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }



}
