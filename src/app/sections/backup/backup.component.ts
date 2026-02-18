import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Plus, Trash2, Play, Folder } from 'lucide-angular';
import { BackupService } from '../../core/services/backup.service';

@Component({
  selector: 'app-backup',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './backup.component.html'
})
export class BackupComponent {

  readonly plusIcon = Plus;
  readonly trashIcon = Trash2;
  readonly playIcon = Play;
  readonly folderIcon = Folder;

  sources = signal<string[]>([]);
  destinations = signal<string[]>([]);

  newSource = '';
  newDestination = '';

  isBackingUp = signal(false);
  progress = signal(0);
  currentStatus = signal('');

  canStart = computed(() =>
    this.sources().length > 0 &&
    this.destinations().length > 0 &&
    !this.isBackingUp()
  );

  constructor(private backupService: BackupService) {}

  addSource() {
    if (this.newSource.trim()) {
      this.sources.update(s => [...s, this.newSource.trim()]);
      this.newSource = '';
    }
  }

  addDestination() {
    if (this.newDestination.trim()) {
      this.destinations.update(d => [...d, this.newDestination.trim()]);
      this.newDestination = '';
    }
  }

  removeSource(index: number) {
    this.sources.update(s => s.filter((_, i) => i !== index));
  }

  removeDestination(index: number) {
    this.destinations.update(d => d.filter((_, i) => i !== index));
  }

  startBackup() {
    if (!this.canStart()) return;

    this.isBackingUp.set(true);
    this.progress.set(10);
    this.currentStatus.set('Iniciando processo de cópia...');

    this.backupService.startBackup(this.sources(), this.destinations())
      .subscribe({
        next: (res) => {
          this.progress.set(100);
          this.currentStatus.set('Backup finalizado com sucesso!');

          setTimeout(() => {
            this.isBackingUp.set(false);
            this.progress.set(0);
            this.currentStatus.set('');
          }, 3000);
        },
        error: (err) => {
          this.isBackingUp.set(false);
          this.currentStatus.set('Erro ao executar backup.');
          console.error(err);
        }
      });
  }
}
