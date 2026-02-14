import { Routes } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { ProductListComponent } from './page/paginas_adm/product/product-list.component';
import { authGuard } from './core/guards/auth-guard';
import { TelaInicial } from './page/tela-inicial/tela-inicial';
import { adminGuard } from './core/guards/admin.guard';
import { AdminUsersComponent } from './page/paginas_adm/admin-users/admin-users';
import { publicGuard } from './core/public.guard';
import { TelaDeAddProduto } from './page/paginas_adm/tela-de-add-produto/tela-de-add-produto';
import { CestaDeCompras } from './page/fazerPedido/cesta-de-compras/cesta-de-compras';
import { DadoClientes } from './page/fazerPedido/dado-clientes/dado-clientes';


export const routes: Routes = [
  { path: '', component: TelaInicial , canActivate: [publicGuard] },
  { path: 'login', component: LoginComponent, canActivate: [publicGuard] },
  { path: 'cestar', component: CestaDeCompras, canActivate:[publicGuard]},
  { path: 'dados', component: DadoClientes, canActivate:[publicGuard]},

  { path: 'products', component: ProductListComponent, canActivate: [authGuard] },
  { path: 'AddUsuario', component: AdminUsersComponent, canActivate: [adminGuard] },
  {path: 'addProduto', component: TelaDeAddProduto, canActivate: [adminGuard]},

  { path: '**', redirectTo: '' }
];
