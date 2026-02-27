import { Component } from '@angular/core';
import { LojaService } from '../../../../service/loja.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarAdministradorComponent } from "../../../../shared/navbar-administrador/navbar-administrador";
import { SidebarComponent } from "../../../../shared/sidebar/sidebar.component";

@Component({
  selector: 'app-tela-de-add-loja',
  templateUrl: './tela-de-add-loja.html',
  styleUrl: './tela-de-add-loja.css',
  imports: [FormsModule, NavbarAdministradorComponent, SidebarComponent]
})
export class TelaDeAddLoja {

  nome = '';
  cep = '';
  cnpj = '';
  telefone = '';
  tipoAtendimento = '';
  imagemUrl = '';

  constructor(
    private lojaService: LojaService,
    private router: Router,
    private formsModule: FormsModule,
  ) {}

  salvar() {
    const novaLoja = {
      nome: this.nome,
      cep: this.cep,
      cnpj: this.cnpj,
      telefone: this.telefone,
      tipoAtendimento: this.tipoAtendimento,
      imagemUrl: this.imagemUrl
    };

    this.lojaService.criar(novaLoja).subscribe({
      next: () => {
        alert('Loja criada com sucesso!');
        this.router.navigate(['/lojas']);
      },
      error: (err) => {
        console.error(err);
        alert('Erro ao criar loja');
      }
    });
  }

    cancelar() {
    this.router.navigate(['/pedidos']);
  }

}