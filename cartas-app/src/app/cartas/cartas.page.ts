// src/app/cartas/cartas.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController, AlertController, ToastController } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { CartasService, Carta } from '../services/cartas.service';
import { ListaCartasComponent } from '../components/lista-cartas/lista-cartas.component';
import { CartaFormComponent } from '../components/carta-form/carta-form.component';

@Component({
  selector: 'app-cartas',
  templateUrl: './cartas.page.html',
  styleUrls: ['./cartas.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterLink, ListaCartasComponent],
})
export class CartasPage implements OnInit {
  cartas: Carta[] = [];
  erro = '';

  constructor(
    private cartasService: CartasService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.carregar();
  }

  // READ — recarrega a lista a partir da API.
  carregar() {
    this.cartasService.listarCartas().subscribe({
      next: (data) => {
        this.cartas = data;
        this.erro = '';
      },
      error: (err) => {
        console.error(err);
        this.erro =
          'Falha ao carregar cartas! A API está online? (cd backend && node server-api.js)';
      },
    });
  }

  // CREATE — abre o modal vazio.
  async novaCarta() {
    const modal = await this.modalCtrl.create({
      component: CartaFormComponent,
    });
    await modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'salvar' && data) {
      this.cartasService.criarCarta(data).subscribe({
        next: () => {
          this.carregar();
          this.aviso('Carta criada!');
        },
        error: (e) => { console.error(e); this.aviso('Erro ao criar carta.'); },
      });
    }
  }

  // UPDATE — abre o modal preenchido com a carta.
  async editarCarta(carta: Carta) {
    const modal = await this.modalCtrl.create({
      component: CartaFormComponent,
      componentProps: { carta }, // passa a carta para o modal
    });
    await modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'salvar' && data) {
      this.cartasService.atualizarCarta(carta.id, data).subscribe({
        next: () => {
          this.carregar();
          this.aviso('Carta atualizada!');
        },
        error: (e) => { console.error(e); this.aviso('Erro ao atualizar carta.'); },
      });
    }
  }

  // DELETE — pede confirmacao antes de excluir.
  async excluirCarta(carta: Carta) {
    const alert = await this.alertCtrl.create({
      header: 'Excluir carta',
      message: `Remover "${carta.nome}" da coleção?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Excluir',
          role: 'destructive',
          handler: () => {
            this.cartasService.excluirCarta(carta.id).subscribe({
              next: () => {
                this.carregar();
                this.aviso('Carta excluída.');
              },
              error: (e) => { console.error(e); this.aviso('Erro ao excluir carta.'); },
            });
          },
        },
      ],
    });
    await alert.present();
  }

  private async aviso(msg: string) {
    const t = await this.toastCtrl.create({ message: msg, duration: 1600, position: 'bottom' });
    await t.present();
  }
}
