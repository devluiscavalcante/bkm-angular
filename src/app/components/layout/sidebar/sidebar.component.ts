import { Component, EventEmitter, Output, Input } from '@angular/core';
import { LucideAngularModule, Database, FileText, Settings, FolderTree, Play, History, List } from 'lucide-angular';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [LucideAngularModule], // CommonModule removido pois @for é nativo
  template: `
    <aside class="w-56 border-r border-gray-200 p-6 flex flex-col h-full">
      <nav class="flex-1 space-y-0.5">

        @for (item of menuItems; track item.id) {
          <button
            type="button"
            (click)="onSelect.emit(item.id)"
            [class]="'w-full text-left px-2 py-1.5 rounded text-sm flex items-center space-x-2 '"
            [class.bg-gray-100]="activeSection === item.id"
            [class.text-gray-900]="activeSection === item.id"
            [class.text-gray-600]="activeSection !== item.id"
            [class.hover:text-gray-900]="activeSection !== item.id"
          >
            <lucide-icon [name]="item.icon" class="w-4 h-4"></lucide-icon>
            <span>{{ item.title }}</span>
          </button>
        }

      </nav>
    </aside>
  `
})
export class SidebarComponent {
  @Input() activeSection = 'inicio';
  @Output() onSelect = new EventEmitter<string>();

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
