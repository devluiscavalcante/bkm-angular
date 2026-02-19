import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Info, Github, ExternalLink, Code2 } from 'lucide-angular';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './about.component.html'
})
export class AboutComponent {

  readonly infoIcon = Info;
  readonly githubIcon = Github;
  readonly linkIcon = ExternalLink;
  readonly codeIcon = Code2;

  projectInfo = signal({
    version: '1.2.0',
    author: 'Luis Cavalcante',
    description: 'BKM is a modern, lightweight backup management solution designed to provide safety and simplicity for your data synchronization needs.',
    techStack: ['Angular 18+', 'Tailwind CSS', 'Lucide Icons', 'Signals Architecture'],
    repoUrl: 'https://github.com/devluiscavalcante/bkm-angular'
  });
}
