// src/app/components/lista-cartas/lista-cartas.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Carta } from '../../services/cartas.service';

// Representa um simbolo de mana ja "traduzido" para exibicao.
interface SimboloMana {
  texto: string;   // o que aparece dentro do circulo: "U", "B", "R", "1", "X"...
  classe: string;  // classe CSS que define a cor do circulo
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

  // Quebra a string "{1}{U}{B}{R}" numa lista de simbolos para o template.
  get simbolosMana(): SimboloMana[] {
    if (!this.carta?.custo_mana) {
      return [];
    }
    // Captura tudo que esta entre chaves: {1}, {U}, {X}, etc.
    const partes = this.carta.custo_mana.match(/\{([^}]+)\}/g) ?? [];
    return partes.map((p) => {
      const valor = p.replace(/[{}]/g, ''); // remove as chaves -> "U", "1", "X"
      return { texto: valor, classe: this.classePorSimbolo(valor) };
    });
  }

  // Mapeia o simbolo para a classe de cor.
  private classePorSimbolo(valor: string): string {
    switch (valor.toUpperCase()) {
      case 'W': return 'mana-w'; // branco
      case 'U': return 'mana-u'; // azul
      case 'B': return 'mana-b'; // preto
      case 'R': return 'mana-r'; // vermelho
      case 'G': return 'mana-g'; // verde
      case 'C': return 'mana-c'; // incolor
      default:  return 'mana-generico'; // numeros, X, etc.
    }
  }

  // Define a "cor de identidade" da carta para a borda lateral do card,
  // priorizando a primeira cor colorida encontrada no custo.
  get classeIdentidade(): string {
    const cores = this.simbolosMana
      .map((s) => s.classe)
      .filter((c) => c !== 'mana-generico' && c !== 'mana-c');
    return cores.length ? `id-${cores[0].split('-')[1]}` : 'id-incolor';
  }
}