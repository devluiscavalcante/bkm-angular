import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/layout/header/header.component';
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';
import { BackupService } from './core/services/backup.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent, SidebarComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {

  activeSection = signal<string>('inicio');

  constructor(private backupService: BackupService) {}

  ngOnInit() {
    this.backupService.loadHistory();
  }

  changeSection(sectionId: string) {
    this.activeSection.set(sectionId);
  }
}
