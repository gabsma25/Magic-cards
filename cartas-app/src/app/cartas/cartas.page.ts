// src/app/cartas/cartas.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { CartasService, Carta } from '../services/cartas.service';
import { ListaCartasComponent } from '../components/lista-cartas/lista-cartas.component';

@Component({
  selector: 'app-cartas',
  templateUrl: './cartas.page.html',
  styleUrls: ['./cartas.page.scss'],
  standalone: true,
  // RouterLink adicionado para os links de navegacao no header.
  imports: [CommonModule, IonicModule, RouterLink, ListaCartasComponent],
})
export class CartasPage implements OnInit {
  cartas: Carta[] = [];
  erro = '';

  constructor(private cartasService: CartasService) {}

  ngOnInit() {
    this.cartasService.listarCartas().subscribe({
      next: (data) => (this.cartas = data),
      error: (err) => {
        console.error(err);
        this.erro =
          'Falha ao carregar cartas! A API está online? (cd backend && node server-api.js)';
      },
    });
  }
}
