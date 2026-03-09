import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { NavbarAdministradorComponent } from "../../../../shared/navbar-administrador/navbar-administrador";
import { EstoqueService, EstoqueRequest } from '../../../../service/estoque.service';
import { ProdutoService, Produto } from '../../../../service/produto.service';
import { LojaService, Loja } from '../../../../service/loja.service';

@Component({
  selector: 'app-add-produto-estoque-loja',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NavbarAdministradorComponent
  ],
  templateUrl: './add-produto-estoque-loja.html',
  styleUrls: ['./add-produto-estoque-loja.css']
})
export class AddProdutoEstoqueLoja implements OnInit {

  produtos: Produto[] = [];
  lojas: Loja[] = [];

  produtoSelecionado?: Produto;

  lojasSelecionadas: Loja[] = [];

  quantidade = 0;
  precoVenda = 0;

  loading = false;

  constructor(
    private produtoService: ProdutoService,
    private lojaService: LojaService,
    private estoqueService: EstoqueService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.carregarProdutos();
    this.carregarLojas();
  }

  carregarProdutos() {
    this.produtoService.listar().subscribe({
      next: (produtos) => {
        this.produtos = produtos;
        this.cdr.detectChanges();
      }
    });
  }

  carregarLojas() {
    this.lojaService.listar().subscribe({
      next: (lojas) => {
        this.lojas = lojas;
        this.cdr.detectChanges();
      }
    });
  }

  selecionarProduto(produto: Produto) {
    this.produtoSelecionado = produto;
  }

  toggleLoja(loja: Loja) {

    const index = this.lojasSelecionadas.findIndex(l => l.id === loja.id);

    if (index >= 0) {
      this.lojasSelecionadas.splice(index, 1);
    } else {
      this.lojasSelecionadas.push(loja);
    }
  }

  lojaSelecionada(loja: Loja) {
    return this.lojasSelecionadas.some(l => l.id === loja.id);
  }

  salvar() {

    if (!this.produtoSelecionado) {
      alert("Selecione um produto");
      return;
    }

    if (this.lojasSelecionadas.length === 0) {
      alert("Selecione pelo menos uma loja");
      return;
    }

    this.loading = true;

    const requests = this.lojasSelecionadas.map(loja => {

      const data: EstoqueRequest = {
        produtoId: this.produtoSelecionado!.id,
        lojaId: loja.id!,
        quantidade: this.quantidade,
        precoVenda: this.precoVenda
      };

      return this.estoqueService.salvar(data).toPromise();

    });

    Promise.all(requests)
      .then(() => {

        alert("Produto adicionado nas lojas!");

        this.quantidade = 0;
        this.precoVenda = 0;
        this.lojasSelecionadas = [];
        this.produtoSelecionado = undefined;

      })
      .finally(() => {
        this.loading = false;
      });
  }

}