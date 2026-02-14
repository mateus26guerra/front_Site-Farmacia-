import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { forkJoin } from 'rxjs';

import { ProductService } from '../../../service/product.service';
import { NavbarAdministradorComponent } from "../../../shared/navbar-administrador/navbar-administrador";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-tela-de-add-produto',
  standalone: true,
  imports: [
    FormsModule,
    NgFor,
    NavbarAdministradorComponent,
    RouterModule
  ],
  templateUrl: './tela-de-add-produto.html',
  styleUrl: './tela-de-add-produto.css',
})
export class TelaDeAddProduto {

  name!: string;
  valor!: number;
  desconto!: number;
  imagemUrl!: string;
  categoriaId!: number;
  quantidadeEmEstoque!: number;

  variacoes: string[] = [''];

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  // 🔎 Validação
  private validarCampos(): boolean {

    if (
      !this.name ||
      !this.valor ||
      this.valor <= 0 ||
      this.categoriaId == null ||
      this.quantidadeEmEstoque == null
    ) {
      Swal.fire({
        title: 'Campos obrigatórios!',
        text: 'Preencha todos os campos obrigatórios antes de salvar.',
        icon: 'warning',
        confirmButtonColor: '#2563eb'
      });
      return false;
    }

    const variacaoVazia = this.variacoes.some(v => !v || v.trim() === '');

    if (variacaoVazia) {
      Swal.fire({
        title: 'Variação inválida!',
        text: 'Nenhuma variação pode estar vazia.',
        icon: 'warning',
        confirmButtonColor: '#2563eb'
      });
      return false;
    }

    return true;
  }

  // 🔁 TrackBy para não quebrar input
  trackByIndex(index: number): number {
    return index;
  }

  adicionarVariacao() {
    this.variacoes.push('');
  }

  removerVariacao(index: number) {
    this.variacoes.splice(index, 1);
  }

  // 💾 Salvar produto
  salvar() {

    if (!this.validarCampos()) {
      return;
    }

    const requests = this.variacoes.map(variacao => {

      const produto = {
        name: this.name,
        valor: this.valor,
        desconto: this.desconto,
        variacao: variacao,
        imagemUrl: this.imagemUrl,
        categoriaId: this.categoriaId,
        quantidadeEmEstoque: this.quantidadeEmEstoque
      };

      return this.productService.addProduct(produto);
    });

    forkJoin(requests).subscribe({
      next: () => {
        Swal.fire({
          title: 'Produto criado!',
          text: 'Os produtos foram cadastrados com sucesso.',
          icon: 'success',
          confirmButtonColor: '#2563eb'
        }).then(() => {
          this.router.navigate(['/products']);
        });
      },
      error: () => {
        Swal.fire({
          title: 'Erro!',
          text: 'Algo deu errado ao salvar.',
          icon: 'error',
          confirmButtonColor: '#dc2626'
        });
      }
    });
  }
}
