import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PedidosService, Pedido } from '../../../service/pedidos.service';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { NavbarAdministradorComponent } from '../../../shared/navbar-administrador/navbar-administrador';
import { Router } from '@angular/router';

// Extendemos a interface Pedido localmente para campos extras de UI
interface PedidoUI extends Pedido {
  status: string;
  total: number;
  selecionado?: boolean;
}

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent, NavbarAdministradorComponent],
  templateUrl: './pedidos.html',
  styleUrl: './pedidos.css',
})
export class Pedidos implements OnInit {

  pedidos: PedidoUI[] = [];
  pedidosFiltrados: PedidoUI[] = [];
  pedidosPaginados: PedidoUI[] = [];

  busca = '';
  filtroAtivo = 'todos';

  // Paginação
  paginaAtual = 1;
  itensPorPagina = 10;
  totalPaginas = 1;
  paginas: number[] = [];

  contadores = {
    novosHoje: 0,
    pendentes: 0,
    emTransito: 0,
    finalizados: 0,
  };

  get inicioRegistro(): number {
    return this.pedidosFiltrados.length === 0 ? 0 : (this.paginaAtual - 1) * this.itensPorPagina + 1;
  }

  get fimRegistro(): number {
    return Math.min(this.paginaAtual * this.itensPorPagina, this.pedidosFiltrados.length);
  }

  constructor(private service: PedidosService,
  private router: Router) {}

  ngOnInit() {
    this.service.listar().subscribe(res => {
      // Mapeia e adiciona campos de UI (status e total podem vir do backend ou serem derivados)
      this.pedidos = res.map(p => ({
        ...p,
        status: (p as any).status ?? 'Pendente',
        total: (p as any).total ?? 0,
        selecionado: false,
      }));
      this.calcularContadores();
      this.aplicarFiltros();
    });
  }

  calcularContadores() {
    const hoje = new Date().toDateString();
    this.contadores.novosHoje = this.pedidos.filter(p => new Date(p.criado).toDateString() === hoje).length;
    this.contadores.pendentes = this.pedidos.filter(p => p.status === 'Pendente' || p.status === 'Em processamento').length;
    this.contadores.emTransito = this.pedidos.filter(p => p.status === 'Em trânsito').length;
    this.contadores.finalizados = this.pedidos.filter(p => p.status === 'Entregue').length;
  }

  filtrar(status: string) {
    this.filtroAtivo = status;
    this.paginaAtual = 1;
    this.aplicarFiltros();
  }

  onBuscaChange() {
    this.paginaAtual = 1;
    this.aplicarFiltros();
  }

  aplicarFiltros() {
    let lista = [...this.pedidos];

    // Filtro por status (card)
    if (this.filtroAtivo !== 'todos') {
      lista = lista.filter(p => p.status === this.filtroAtivo);
    }

    // Filtro por busca
    if (this.busca.trim()) {
      const termo = this.busca.toLowerCase();
      lista = lista.filter(p =>
        p.cliente.toLowerCase().includes(termo) ||
        String(p.id).includes(termo)
      );
    }

    this.pedidosFiltrados = lista;
    this.totalPaginas = Math.max(1, Math.ceil(lista.length / this.itensPorPagina));

    if (this.paginaAtual > this.totalPaginas) {
      this.paginaAtual = 1;
    }

    this.gerarPaginas();
    this.atualizarPaginados();
  }

  atualizarPaginados() {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    this.pedidosPaginados = this.pedidosFiltrados.slice(inicio, inicio + this.itensPorPagina);
  }

  irParaPagina(pagina: number) {
    if (pagina < 1 || pagina > this.totalPaginas) return;
    this.paginaAtual = pagina;
    this.gerarPaginas();
    this.atualizarPaginados();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  gerarPaginas() {
    const total = this.totalPaginas;
    const atual = this.paginaAtual;
    const paginas: number[] = [];

    if (total <= 7) {
      for (let i = 1; i <= total; i++) paginas.push(i);
    } else {
      paginas.push(1);
      if (atual > 3) paginas.push(-1); // ellipsis

      const inicio = Math.max(2, atual - 1);
      const fim = Math.min(total - 1, atual + 1);
      for (let i = inicio; i <= fim; i++) paginas.push(i);

      if (atual < total - 2) paginas.push(-1); // ellipsis
      paginas.push(total);
    }

    this.paginas = paginas;
  }

  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      'Pendente': 'status-pendente',
      'Em processamento': 'status-processando',
      'Em trânsito': 'status-enviado',
      'Entregue': 'status-entregue',
      'Cancelado': 'status-cancelado',
    };
    return map[status] ?? 'status-pendente';
  }

  atualizarStatus(pedido: PedidoUI) {
    // Aqui você chama o service para salvar no backend:
    // this.service.atualizarStatus(pedido.id, pedido.status).subscribe();
    this.calcularContadores();
    console.log(`Pedido #${pedido.id} atualizado para: ${pedido.status}`);
  }

  selecionarTodos(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.pedidosPaginados.forEach(p => p.selecionado = checked);
  }

  exportarRelatorio() {
    // Implementar exportação CSV/PDF
    console.log('Exportando relatório...');
  }

 verDetalhes(pedido: PedidoUI) {
  this.router.navigate(['/pedidos', pedido.id]);
}

  imprimir(pedido: PedidoUI) {
    window.print();
  }
}