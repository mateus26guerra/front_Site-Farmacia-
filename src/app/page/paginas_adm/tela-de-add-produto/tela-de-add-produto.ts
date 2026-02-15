import { Component, OnInit, ViewEncapsulation, HostListener, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { forkJoin } from 'rxjs';

import { ProductService } from '../../../service/product.service';
import { NavbarAdministradorComponent } from '../../../shared/navbar-administrador/navbar-administrador';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-tela-de-add-produto',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    NavbarAdministradorComponent,
    RouterModule
  ],
  templateUrl: './tela-de-add-produto.html',
  styleUrl: './tela-de-add-produto.css',
})
export class TelaDeAddProduto implements OnInit {

  name!: string;
  valor!: number;
  desconto: number = 0;
  imagemUrl!: string;
  categorias: string[] = [];
  categoriaSelecionada: string = '';
  quantidadeEmEstoque!: number;
  variacoes: string[] = [''];

  // ── Dropdown state ──────────────────────────────────
  dropdownAberto = false;

  constructor(
    private productService: ProductService,
    private router: Router,
    private elementRef: ElementRef   // para detectar click fora
  ) {}

  ngOnInit() {
    this.productService.getCategorias().subscribe({
      next: cats => this.categorias = cats,
      error: () => {
        Swal.fire({
          title: 'Erro ao carregar categorias',
          text: 'Verifique se a API está rodando.',
          icon: 'error',
          confirmButtonColor: '#dc2626'
        });
      }
    });
  }

  // ── Dropdown methods ────────────────────────────────

  toggleDropdown() {
    this.dropdownAberto = !this.dropdownAberto;
  }

  fecharDropdown() {
    this.dropdownAberto = false;
  }

  selecionarCategoria(cat: string) {
    this.categoriaSelecionada = cat;
    this.dropdownAberto = false;
  }

  // Fecha ao clicar fora do componente
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.dropdownAberto = false;
    }
  }

  // Fecha com ESC
  @HostListener('document:keydown.escape')
  onEscape() {
    this.dropdownAberto = false;
  }

  // ── Form ────────────────────────────────────────────

  trackByIndex(index: number): number {
    return index;
  }

  adicionarVariacao() {
    this.variacoes.push('');
  }

  removerVariacao(index: number) {
    if (this.variacoes.length > 1) {
      this.variacoes.splice(index, 1);
    }
  }

  private validarCampos(): boolean {
    if (
      !this.name?.trim() ||
      !this.valor ||
      this.valor <= 0 ||
      !this.categoriaSelecionada ||
      this.quantidadeEmEstoque == null
    ) {
      Swal.fire({
        title: 'Campos obrigatórios!',
        text: 'Preencha todos os campos obrigatórios.',
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

  salvar() {
    if (!this.validarCampos()) return;

    const requests = this.variacoes.map(variacao =>
      this.productService.addProduct({
        name: this.name.trim(),
        valor: this.valor,
        desconto: this.desconto ?? 0,
        variacao: variacao.trim(),
        imagemUrl: this.imagemUrl?.trim() ?? '',
        categoriaNome: this.categoriaSelecionada,
        quantidadeEmEstoque: this.quantidadeEmEstoque
      })
    );

    forkJoin(requests).subscribe({
      next: () => {
        Swal.fire({
          title: 'Produto criado!',
          text: 'Os produtos foram cadastrados com sucesso.',
          icon: 'success',
          confirmButtonColor: '#2563eb'
        }).then(() => this.router.navigate(['/products']));
      },
      error: () => {
        Swal.fire({
          title: 'Erro!',
          text: 'Erro ao salvar produto.',
          icon: 'error',
          confirmButtonColor: '#dc2626'
        });
      }
    });
  }
}