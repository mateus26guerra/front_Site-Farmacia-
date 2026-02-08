import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';

declare const lucide: any;

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit, AfterViewChecked {
  
  showLogoutModal = false;
  closing = false;
  showMenu = false;
  activeCategory = '';

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.initIcons();
  }

  ngAfterViewChecked() {
    this.initIcons();
  }

  initIcons() {
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  setActive(category: string) {
    this.activeCategory = category;
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
    setTimeout(() => this.initIcons(), 50);
  }

 abrirLogout() {
  this.showLogoutModal = true;
  console.log('Modal aberto:', this.showLogoutModal); 
  setTimeout(() => this.initIcons(), 50);
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