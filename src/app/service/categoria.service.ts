import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Categoria {
  id: number;
  nomeCategoria: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private apiUrl = 'http://localhost:8080/productsPublico/categorias';


  constructor(private http: HttpClient) {}

  listar(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.apiUrl}`);
  }

  criar(nomeCategoria: string) {
    return this.http.post(this.apiUrl, { nomeCategoria });
  }

  atualizar(id: number, nomeCategoria: string) {
    return this.http.put(`${this.apiUrl}/${id}`, { nomeCategoria });
  }

  deletar(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
