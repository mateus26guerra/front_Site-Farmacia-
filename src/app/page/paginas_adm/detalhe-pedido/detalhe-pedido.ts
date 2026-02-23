import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidosService, Pedido } from '../../../service/pedidos.service';
import { SidebarComponent } from "../../../shared/sidebar/sidebar.component";
import { NavbarAdministradorComponent } from "../../../shared/navbar-administrador/navbar-administrador";

@Component({
  selector: 'app-detalhe-pedido',
  standalone: true,
  imports: [CommonModule, SidebarComponent, NavbarAdministradorComponent],
  templateUrl: './detalhe-pedido.html',
  styleUrl: './detalhe-pedido.css'
})
export class DetalhePedido implements OnInit {

  pedido!: Pedido;

  constructor(
    private route: ActivatedRoute,
    private service: PedidosService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.service.listar().subscribe(lista => {
      const encontrado = lista.find(p => p.id === id);

      if (encontrado) {
        this.pedido = encontrado;
        this.cdr.detectChanges();
      } else {
        this.router.navigate(['/pedidos']);
      }
    });
  }

  voltar() {
    this.router.navigate(['/pedidos']);
  }

  falarWhatsApp() {
    const numero = this.pedido.telefone.replace(/\D/g, '');
    const mensagem = `Olá ${this.pedido.cliente}, seu pedido #${this.pedido.id} está sendo processado!`;
    window.open(`https://wa.me/55${numero}?text=${encodeURIComponent(mensagem)}`, '_blank');
  }

  calcularTotal(): number {
    return this.pedido.itens.reduce((total, item) => {
      return total + (item.preco * item.quantidade);
    }, 0);
  }

  gerarPDF() {
    this.service.geraPdf(this.pedido.id).subscribe((blob: Blob) => {

      const fileURL = window.URL.createObjectURL(blob);
      const link = document.createElement('a');

      link.href = fileURL;
      link.download = `pedido-${this.pedido.id}.pdf`;
      link.click();

      window.URL.revokeObjectURL(fileURL);
    });
  }

}