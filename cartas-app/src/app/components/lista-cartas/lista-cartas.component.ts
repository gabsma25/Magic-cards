// src/app/components/lista-cartas/lista-cartas.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Carta } from '../../services/cartas.service';

interface SimboloMana {
  texto: string;
  classe: string;
}

@Component({
  selector: 'app-lista-cartas',
  templateUrl: './lista-cartas.component.html',
  styleUrls: ['./lista-cartas.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class ListaCartasComponent {
  @Input() carta!: Carta;

  // Eventos disparados para a pagina pai tratar (editar/excluir).
  @Output() editar = new EventEmitter<Carta>();
  @Output() excluir = new EventEmitter<Carta>();

  get simbolosMana(): SimboloMana[] {
    if (!this.carta?.custo_mana) {
      return [];
    }
    const partes = this.carta.custo_mana.match(/\{([^}]+)\}/g) ?? [];
    return partes.map((p) => {
      const valor = p.replace(/[{}]/g, '');
      return { texto: valor, classe: this.classePorSimbolo(valor) };
    });
  }

  private classePorSimbolo(valor: string): string {
    switch (valor.toUpperCase()) {
      case 'W': return 'mana-w';
      case 'U': return 'mana-u';
      case 'B': return 'mana-b';
      case 'R': return 'mana-r';
      case 'G': return 'mana-g';
      case 'C': return 'mana-c';
      default:  return 'mana-generico';
    }
  }

  get classeIdentidade(): string {
    const cores = this.simbolosMana
      .map((s) => s.classe)
      .filter((c) => c !== 'mana-generico' && c !== 'mana-c');
    return cores.length ? `id-${cores[0].split('-')[1]}` : 'id-incolor';
  }
}
