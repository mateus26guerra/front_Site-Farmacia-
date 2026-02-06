import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule], // 👈 ADICIONA CommonModule
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  
  isOpen = false; // 👈 CONTROLE DA SIDEBAR

  showLogoutModal = false;
  closing = false;
  constructor(public authService: AuthService) {} // 👈 PUBLIC para usar no template

  logout() {
    this.authService.logout();
    location.href = '/'; // 👈 vai pra home (lista pública)
  }

    abrirLogout() {
    this.showLogoutModal = true;
  }

    cancelarLogout() {
    this.closing = true;

    setTimeout(() => {
      this.showLogoutModal = false;
      this.closing = false;
    }, 250);
  }


confirmarLogout() {
  this.closing = true;

  setTimeout(() => {
    this.authService.logout();
    this.showLogoutModal = false;
    this.closing = false;
    location.href = '/';
  }, 250);
}

}