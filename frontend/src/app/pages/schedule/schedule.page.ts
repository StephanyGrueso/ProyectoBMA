import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [CommonModule, IonicModule], // 👈 para *ngIf, *ngFor e Ionic
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {
  loading = true;
  error: string | null = null;
  schedules: string[] = [];

  ngOnInit() {
    setTimeout(() => {
      this.loading = false;
      this.schedules = ['Lunes 8:00 AM', 'Miércoles 10:00 AM', 'Viernes 7:00 AM'];
    }, 1500);
  }
}

