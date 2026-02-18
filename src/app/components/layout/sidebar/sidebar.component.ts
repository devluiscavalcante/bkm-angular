import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  LucideAngularModule,
  Database,
  FileText,
  Settings,
  FolderTree,
  Play,
  History,
  List
} from 'lucide-angular';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [LucideAngularModule, RouterLink, RouterLinkActive],
  template: `
    <aside class="w-56 border-r border-gray-200 p-6 flex flex-col h-full">
      <nav class="flex-1 space-y-0.5">

        @for (item of menuItems; track item.id) {
          <a
            [routerLink]="['/' + item.id]"
            routerLinkActive="bg-gray-100 text-gray-900"
            [routerLinkActiveOptions]="{ exact: true }"
            class="w-full text-left px-2 py-1.5 rounded text-sm flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer decoration-none"
          >
            <lucide-icon [name]="item.icon" class="w-4 h-4"></lucide-icon>
            <span>{{ item.title }}</span>
          </a>
        }

      </nav>
    </aside>
  `
})
export class SidebarComponent {
  readonly menuItems = [
    { id: 'inicio', title: 'Home', icon: Database },
    { id: 'sobre', title: 'About', icon: FileText },
    { id: 'especificacoes', title: 'Specs', icon: Settings },
    { id: 'estrutura', title: 'Structure', icon: FolderTree },
    { id: 'backup', title: 'Backup', icon: Play },
    { id: 'historico', title: 'History', icon: History },
    { id: 'logs', title: 'Logs', icon: List }
  ];
}
