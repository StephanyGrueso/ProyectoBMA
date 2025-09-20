import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email = '';
  password = '';
  message = '';

  login() {
    if (this.email && this.password) {
      this.message = 'Sesión iniciada (simulado)';
    } else {
      this.message = 'Por favor, completa todos los campos.';
    }
  }
}

