import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  LucideAngularModule,
  Database,
  FileText,
  Settings,
  FolderTree,
  Play,
  History,
  List,
  Menu,
  X,
  Shield,
  Github
} from 'lucide-angular';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-100 z-[60] px-6 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <div class="bg-gray-900 p-1.5 rounded-lg text-white shadow-sm">
          <lucide-icon [name]="shieldIcon" class="w-4 h-4"></lucide-icon>
        </div>
        <span class="font-bold tracking-tighter text-gray-900 italic">BKM</span>
      </div>

      <button (click)="toggleMenu()" class="p-2 text-gray-600 active:scale-95 transition-transform">
        <lucide-icon [name]="isMenuOpen() ? closeIcon : menuIcon" class="w-6 h-6"></lucide-icon>
      </button>
    </nav>

    @if (isMenuOpen()) {
      <div (click)="closeMenu()"
           class="lg:hidden fixed inset-0 bg-black/5 backdrop-blur-[2px] z-40 animate-in fade-in duration-300">
      </div>
    }

    <aside
      [class.translate-x-0]="isMenuOpen()"
      [class.-translate-x-full]="!isMenuOpen()"
      class="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-100 z-50 transition-transform duration-300
             lg:translate-x-0 lg:static lg:w-56 lg:h-screen flex flex-col pt-20 lg:pt-8"
    >
      <div class="hidden lg:flex items-center gap-3 px-8 mb-10">
        <div class="bg-gray-900 p-2 rounded-xl text-white shadow-lg">
          <lucide-icon [name]="shieldIcon" class="w-5 h-5"></lucide-icon>
        </div>
        <h1 class="text-xl font-bold tracking-tighter italic text-gray-900">BKM</h1>
      </div>

      <nav class="flex-1 px-4 space-y-1">
        @for (item of menuItems; track item.id) {
          <a
            [routerLink]="['/' + item.id]"
            (click)="closeMenu()"
            routerLinkActive="bg-gray-900 text-white shadow-md"
            [routerLinkActiveOptions]="{ exact: true }"
            class="w-full text-left px-4 py-2.5 rounded-xl text-sm flex items-center space-x-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all group"
          >
            <lucide-icon [name]="item.icon" class="w-4 h-4"></lucide-icon>
            <span class="font-medium">{{ item.title }}</span>
          </a>
        }
      </nav>

      <div class="p-6 border-t border-gray-50 mt-auto">
        <a href="https://github.com/devluiscavalcante/backup-manager" target="_blank"
           class="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl hover:bg-gray-900 hover:text-white transition-all group">
          <lucide-icon [name]="githubIcon" class="w-4 h-4"></lucide-icon>
          <div class="flex flex-col overflow-hidden">
            <span class="text-[10px] font-bold truncate">BKM Repository</span>
            <span class="text-[9px] opacity-60 uppercase tracking-tighter">Open Source</span>
          </div>
        </a>
        <p class="mt-4 text-[9px] text-gray-300 text-center font-bold tracking-widest uppercase">v1.2.0 stable</p>
      </div>
    </aside>
  `
})
export class SidebarComponent {
  readonly menuIcon = Menu;
  readonly closeIcon = X;
  readonly shieldIcon = Shield;
  readonly githubIcon = Github;

  isMenuOpen = signal(false);

  readonly menuItems = [
    { id: 'inicio', title: 'Home', icon: Database },
    { id: 'sobre', title: 'About', icon: FileText },
    { id: 'especificacoes', title: 'Specs', icon: Settings },
    { id: 'estrutura', title: 'Structure', icon: FolderTree },
    { id: 'backup', title: 'Backup', icon: Play },
    { id: 'historico', title: 'History', icon: History },
    { id: 'logs', title: 'Logs', icon: List }
  ];

  toggleMenu() { this.isMenuOpen.update(v => !v); }
  closeMenu() { this.isMenuOpen.set(false); }
}
