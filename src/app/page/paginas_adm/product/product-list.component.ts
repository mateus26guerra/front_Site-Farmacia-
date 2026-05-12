import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EstoqueService, Estoque } from '../../../service/estoque.service';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { NavbarAdministradorComponent } from '../../../shared/navbar-administrador/navbar-administrador';
import { RouterModule } from '@angular/router';
import { ProductService, Product } from '../../../service/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SidebarComponent,
    NavbarAdministradorComponent,
    RouterModule
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product.css'
})
export class ProductListComponent implements OnInit {

  produtos: Estoque[] = [];
  produtosFiltrados: Estoque[] = [];

  lojas: any[] = [];

  lojaSelecionada: number | null = null;

  modo: 'estoque' | 'produtos' = 'estoque';

  alterados: Set<number> = new Set();

  todosProdutos: Product[] = [];

  mostrarListaProdutos = false;

  constructor(
    private estoqueService: EstoqueService,
    private produtoService: ProductService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.carregarDados();
  }

  carregarDados() {

    this.estoqueService.listar().subscribe((res: Estoque[]) => {

      this.produtos = res;
      this.produtosFiltrados = res;

      const mapa = new Map<number, any>();

      res.forEach(e => {

        if (!mapa.has(e.lojaId)) {
          mapa.set(e.lojaId, {
            id: e.lojaId,
            nome: e.nomeLoja
          });
        }

      });

      this.lojas = Array.from(mapa.values());

      this.cdr.detectChanges();
    });
  }

  mostrarTudo() {

    this.modo = 'estoque';

    this.produtosFiltrados = this.produtos;
    this.lojaSelecionada = null;

    this.cdr.detectChanges();
  }

  mostrarTodosProdutos() {

    this.produtoService.loadProducts();

    this.produtoService.products$
      .subscribe((res: Product[]) => {

        this.todosProdutos = res;
        this.modo = 'produtos';

        this.cdr.detectChanges();
      });
  }

  selecionarLoja(event: any) {

    const lojaId = Number(event.target.value);

    this.lojaSelecionada = lojaId;

    if (!lojaId) {
      this.produtosFiltrados = this.produtos;
      this.cdr.detectChanges();
      return;
    }

    this.produtosFiltrados =
      this.produtos.filter(p => p.lojaId === lojaId);

    this.cdr.detectChanges();
  }

  aumentarEstoque(p: Estoque) {
    p.quantidade++;
    this.alterados.add(p.id);
  }

  diminuirEstoque(p: Estoque) {
    if (p.quantidade > 0) {
      p.quantidade--;
      this.alterados.add(p.id);
    }
  }

  estoqueAlterado(p: Estoque) {
    return this.alterados.has(p.id);
  }

  atualizarEstoque(p: Estoque) {

    this.estoqueService.salvar({
      produtoId: p.produtoId,
      lojaID: p.lojaId,
      quantidade: p.quantidade,
      precoVenda: p.valorFinal
    }).subscribe(() => {

      this.alterados.delete(p.id);

      this.cdr.detectChanges();
    });
  }
}