// src/app/home/home.page.ts
import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonButtons,
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  // IonButtons -> container dos botoes de navegacao no header.
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, RouterLink],
})
export class HomePage {
  constructor() {}
}
