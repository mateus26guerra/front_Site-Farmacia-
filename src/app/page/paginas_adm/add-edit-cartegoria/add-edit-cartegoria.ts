import { Component, OnInit } from '@angular/core';
import { NavbarAdministradorComponent } from "../../../shared/navbar-administrador/navbar-administrador";
import { CategoriaService, Categoria } from '../../../service/categoria.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-edit-cartegoria',
  standalone: true,
  imports: [NavbarAdministradorComponent, CommonModule, FormsModule],
  templateUrl: './add-edit-cartegoria.html',
  styleUrl: './add-edit-cartegoria.css',
})
export class AddEditCartegoria implements OnInit {

  categorias: Categoria[] = [];
  nomeCategoria: string = '';
  editandoId: number | null = null;

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit() {
    this.carregarCategorias();
  }

  carregarCategorias() {
    this.categoriaService.listar()
      .subscribe(data => this.categorias = data);
  }

  salvar() {
    if (!this.nomeCategoria.trim()) {
      Swal.fire('Erro', 'Digite o nome da categoria', 'warning');
      return;
    }

    if (this.editandoId) {
      this.categoriaService.atualizar(this.editandoId, this.nomeCategoria)
        .subscribe(() => {
          Swal.fire('Atualizado!', 'Categoria atualizada.', 'success');
          this.resetForm();
          this.carregarCategorias();
        });
    } else {
      this.categoriaService.criar(this.nomeCategoria)
        .subscribe(() => {
          Swal.fire('Criado!', 'Categoria criada.', 'success');
          this.resetForm();
          this.carregarCategorias();
        });
    }
  }

  editar(cat: Categoria) {
    this.nomeCategoria = cat.nomeCategoria;
    this.editandoId = cat.id;
  }

  deletar(id: number) {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Essa ação não pode ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, deletar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.categoriaService.deletar(id)
          .subscribe(() => {
            Swal.fire('Deletado!', 'Categoria removida.', 'success');
            this.carregarCategorias();
          });
      }
    });
  }

  resetForm() {
    this.nomeCategoria = '';
    this.editandoId = null;
  }
}
