import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule], // 👈
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  email = '';
  password = '';
  message = '';

  register() {
    if (this.email && this.password) {
      this.message = 'Usuario registrado (simulado)';
    } else {
      this.message = 'Por favor, completa todos los campos.';
    }
  }
}
