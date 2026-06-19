// src/app/services/cartas.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Modelo de uma carta (espelha as colunas da tabela no SQLite).
export interface Carta {
  id: number;
  nome: string;
  tipo: string;
  conteudo: string;
  custo_mana: string;   // string tipo "{1}{U}{B}{R}"
  valor_mana: number;   // valor numerico total (CMC)
  preco: number;
}

@Injectable({
  providedIn: 'root', // servico global
})
export class CartasService {
  // Endereco da API. No navegador (ionic serve), localhost funciona.
  // Em celular fisico, troque por http://SEU_IP_LOCAL:3005/...
  private apiUrl = 'http://localhost:3005/minha-api/cartas';

  constructor(private http: HttpClient) {}

  // GET de todas as cartas.
  listarCartas(): Observable<Carta[]> {
    return this.http.get<Carta[]>(this.apiUrl);
  }
}
