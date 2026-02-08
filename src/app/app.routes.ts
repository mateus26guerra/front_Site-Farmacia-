import { Routes } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { ProductListComponent } from './page/product/product-list.component';
import { authGuard } from './core/guards/auth-guard';
import { TelaInicial } from './page/tela-inicial/tela-inicial';
import { adminGuard } from './core/guards/admin.guard';
import { AdminUsersComponent } from './page/admin-users/admin-users';
import { publicGuard } from './core/public.guard';


export const routes: Routes = [
  { path: '', component: TelaInicial , canActivate: [publicGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'products', component: ProductListComponent, canActivate: [authGuard] },

  { path: 'AddUsuario', component: AdminUsersComponent, canActivate: [adminGuard] },

  { path: '**', redirectTo: '' }
];
