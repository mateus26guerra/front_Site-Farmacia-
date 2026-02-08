import { Routes } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { ProductListComponent } from './page/product/product-list.component';
import { authGuard } from './core/guards/auth-guard';
import { TelaInicial } from './page/tela-inicial/tela-inicial';
import { adminGuard } from './core/guards/admin.guard';
import { AdminUsersComponent } from './page/admin-users/admin-users';
import { publicGuard } from './core/public.guard';
import { TelaDeAddProduto } from './page/tela-de-add-produto/tela-de-add-produto';


export const routes: Routes = [
  { path: '', component: TelaInicial , canActivate: [publicGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'products', component: ProductListComponent, canActivate: [authGuard] },

  { path: 'AddUsuario', component: AdminUsersComponent, canActivate: [adminGuard] },
  {path: 'addProduto', component: TelaDeAddProduto, canActivate: [adminGuard]},

  { path: '**', redirectTo: '' }
];
