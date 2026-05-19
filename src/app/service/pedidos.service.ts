import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ItemPedido {
  produtoId: number;
  nomeProduto: string;
  variacao: string;
  imagemUrl: string;
  categoria: string;
  preco: number;
  quantidade: number;
}

export interface Pedido {

  id: number;
  criado: string;

  cliente: string;
  telefone: string;

  endereco: string;
  bairro: string;
  complemento: string;

  formaDePagamento: string;

  statusDoPedido: string;
  cep: string;

  itens: ItemPedido[];

  observacao?: string;
  totalProdutos?: number;
  valorFrete?: number;
  totalComFrete?: number;
  freteGratis?: boolean;
  tipoEntrega?: string;
}

@Injectable({
  providedIn: 'root',
})
export class PedidosService {

  private api =
    `${environment.apiUrl}/pedidos`;

  constructor(
    private http: HttpClient
  ) {}

  listar():
    Observable<Pedido[]> {

    return this.http.get<
      Pedido[]
    >(this.api);
  }

  geraPdf(
    id: number
  ) {

    return this.http.get(
      `${this.api}/${id}/pdf`,
      {
        responseType:
          'blob'
      }
    );
  }

  atualizarStatus(
    id: number,
    status: string
  ) {

    return this.http.patch(
      `${this.api}/${id}/status`,
      { status }
    );
  }
}