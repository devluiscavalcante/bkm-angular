import { Component, OnInit, computed, signal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Search, Download, AlertCircle, Info, CheckCircle2, XCircle, FileText, RefreshCw, Terminal } from 'lucide-angular';
import { LogsService, Log } from '../../core/services/logs.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-log',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, FormsModule],
  templateUrl: './logs.component.html'
})
export class LogsComponent implements OnInit, OnDestroy {

  readonly terminalIcon = Terminal; readonly searchIcon = Search; readonly refreshIcon = RefreshCw;
  readonly downloadIcon = Download; readonly infoIcon = Info; readonly successIcon = CheckCircle2;
  readonly errorIcon = XCircle; readonly warningIcon = AlertCircle; readonly fileIcon = FileText;

  logs = signal<Log[]>([]);
  filter = signal<string>('all');
  search = signal<string>('');
  isLoading = signal<boolean>(true);
  error = signal<string | null>(null);
  private intervalId: any;

  filteredLogs = computed(() => {
    const currentLogs = this.logs();
    const currentFilter = this.filter();
    const searchTerm = this.search().toLowerCase();

    return currentLogs.filter(log => {
      const matchesFilter = currentFilter === 'all' || log.level === currentFilter;
      const matchesSearch = log.message.toLowerCase().includes(searchTerm) ||
        log.source.toLowerCase().includes(searchTerm);
      return matchesFilter && matchesSearch;
    });
  });

  constructor(private logsService: LogsService) {}

  ngOnInit() {
    this.loadLogs();
    this.intervalId = setInterval(() => this.loadLogs(), 10000); // Polling de 10s
  }

  ngOnDestroy() {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  async loadLogs() {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      const data = await firstValueFrom(this.logsService.getLogs());
      this.logs.set(data);
    } catch (err) {
      this.error.set('Failed to load logs');
    } finally {
      this.isLoading.set(false);
    }
  }

  getLevelColor(level: string): string {
    switch (level) {
      case 'success': return 'bg-green-100 text-green-800 border-green-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'error': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  }
}
