import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BackupTask, LogEntry } from '../models/backup.model';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BackupService {
  private readonly API_URL = 'http://localhost:8080/api';

  history = signal<BackupTask[]>([]);
  logs = signal<LogEntry[]>([]);

  constructor(private http: HttpClient) {}

  loadHistory() {
    this.http.get<any[]>(`${this.API_URL}/backup/history`).pipe(
      map(data => data.map((task, index) => this.mapTask(task, index)))
    ).subscribe(tasks => this.history.set(tasks));
  }

  startBackup(sources: string[], destinations: string[]) {
    return this.http.post<any>(`${this.API_URL}/backup/start`, {
      sources,
      destination: destinations
    });
  }

  private mapTask(task: any, index: number): BackupTask {
    return {
      id: index + 1,
      name: `Backup: ${task.sourcePath} → ${task.destinationPath}`,
      date: task.startedAt ? new Date(task.startedAt).toLocaleString() : 'N/A',
      size: task.totalSizeMB ? `${(task.totalSizeMB / 1024).toFixed(2)} GB` : '0 GB',
      status: this.mapStatus(task.status),
      files: task.fileCount || 0,
      duration: task.duration || '0m',
      source: task.sourcePath,
      destination: task.destinationPath
    };
  }

  private mapStatus(status: string): BackupTask['status'] {
    const maps: Record<string, BackupTask['status']> = {
      'EM_ANDAMENTO': 'in_progress',
      'PAUSADO': 'paused',
      'CONCLUIDO': 'completed',
      'CANCELADO': 'cancelled',
      'FALHA': 'failed'
    };
    return maps[status] || 'unknown';
  }
}
