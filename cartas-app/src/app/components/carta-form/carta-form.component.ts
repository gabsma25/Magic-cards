// src/app/components/carta-form/carta-form.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { Carta, CartaInput } from '../../services/cartas.service';

@Component({
  selector: 'app-carta-form',
  templateUrl: './carta-form.component.html',
  styleUrls: ['./carta-form.component.scss'],
  standalone: true,
  // FormsModule -> habilita [(ngModel)] nos campos do formulario.
  imports: [CommonModule, FormsModule, IonicModule],
})
export class CartaFormComponent implements OnInit {
  // Se vier uma carta, o modal esta em modo EDICAO; senao, modo CRIACAO.
  @Input() carta?: Carta;

  // Modelo do formulario (campos editaveis).
  form: CartaInput = {
    nome: '',
    tipo: '',
    conteudo: '',
    custo_mana: '',
    valor_mana: 0,
    preco: 0,
  };

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    // Em modo edicao, preenche o formulario com os dados existentes.
    if (this.carta) {
      this.form = {
        nome: this.carta.nome,
        tipo: this.carta.tipo,
        conteudo: this.carta.conteudo,
        custo_mana: this.carta.custo_mana,
        valor_mana: this.carta.valor_mana,
        preco: this.carta.preco,
      };
    }
  }

  get tituloModal(): string {
    return this.carta ? 'Editar carta' : 'Nova carta';
  }

  // Fecha o modal devolvendo os dados para a pagina decidir criar/atualizar.
  salvar() {
    if (!this.form.nome.trim() || !this.form.tipo.trim()) {
      return; // validacao minima
    }
    this.modalCtrl.dismiss(this.form, 'salvar');
  }

  // Fecha sem salvar.
  cancelar() {
    this.modalCtrl.dismiss(null, 'cancelar');
  }
}
