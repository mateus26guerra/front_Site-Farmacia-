// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { HttpClient } from '@angular/common/http';
// import { CartService } from '../../../service/cart.service';
// import { Router } from '@angular/router';
// import { Navbar } from "../../../shared/navbar/navbar";
// import Swal from 'sweetalert2';
// import { NavbarFinalizarPedido } from "../../../shared/navbar-finalizar-pedido/navbar-finalizar-pedido";

// @Component({
//   selector: 'app-finalizar-pedido',
//   standalone: true,
//   imports: [CommonModule, FormsModule, NavbarFinalizarPedido],
//   templateUrl: './finalizar-pedido.html',
//   styleUrl: './finalizar-pedido.css'
// })
// export class FinalizarPedido {

//   cliente = '';
//   telefone = '';
//   endereco = '';
//   bairro = '';
//   complemento = '';
//   formaDePagamento = '';
//   bairros = ['madalena','prato','cordeiro','bongi','torre','derby'];
//   formas = ['pix','dinheiro','cartao'];
//   observacao = '';
//   constructor(
//     private cartService: CartService,
//     private http: HttpClient,
//     private router: Router
//   ) {}


// finalizar() {

//   const itens = this.cartService.items.map(item => ({
//     produtoId: item.product.id,
//     quantidade: item.quantidade
//   }));

//   const pedido = {
//     cliente: this.cliente,
//     telefone: this.telefone,
//     endereco: this.endereco,
//     bairro: this.bairro,
//     complemento: this.complemento,
//     formaDePagamento: this.formaDePagamento,
//     tipoEntrega: history.state?.tipoEntrega || 'ENTREGA',
//     observacao: this.observacao,
//     itens: itens
//   };

//   this.http.post('http://localhost:8080/productsPublico/pedidos', pedido)
//     .subscribe({
//       next: () => {

//         Swal.fire({
//           title: 'Pedido realizado com sucesso! 🚀',
//           text: 'Aguarde atualização no WhatsApp.',
//           icon: 'success',
//           confirmButtonColor: '#16a34a'
//         }).then(() => {
//           this.cartService.clear();
//           this.router.navigate(['/']);
//         });

//       },
//       error: () => {
//         Swal.fire({
//           title: 'Erro ao enviar pedido!',
//           text: 'Tente novamente.',
//           icon: 'error',
//           confirmButtonColor: '#dc2626'
//         });
//       }
//     });
// }

// }
