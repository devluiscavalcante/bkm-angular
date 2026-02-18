import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface BackupRecord {
  id: string;
  timestamp: Date;
  status: 'success' | 'error';
  sources: string[];
  destinations: string[];
  totalSize?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BackupService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {
  }

  loadHistory() {
    console.log('BackupService: Sistema de histórico inicializado.');
  }

  startBackup(sources: string[], destinations: string[]): Observable<any> {
    const payload = {sources, destinations};
    return this.http.post<any>(`${this.apiUrl}/backup`, payload);
  }

  getHistory(): Observable<BackupRecord[]> {
    return this.http.get<BackupRecord[]>(`${this.apiUrl}/history`);
  }

}
