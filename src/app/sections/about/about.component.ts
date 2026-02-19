import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Info, Github, ExternalLink, Code2, ShieldCheck, Cpu, Layers, Server } from 'lucide-angular';

interface DocSection {
  title: string;
  icon: any;
  content: string[];
}

interface BackendCard {
  label: string;
  desc: string;
  tech: string;
}

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
  readonly serverIcon = Server;

  projectDocs = signal<DocSection[]>([
    {
      title: 'Project Purpose',
      icon: ShieldCheck,
      content: [
        'Automated file synchronization between local directories.',
        'Reliable data protection for Windows environments.',
        'Minimalist management through a modern web interface.'
      ]
    },
    {
      title: 'System Architecture',
      icon: Layers,
      content: [
        'Backend: Java 17+ with Spring Boot Ecosystem.',
        'Frontend: Angular 18 with Signals and Tailwind CSS.',
        'Integration: RESTful APIs with JSON communication.'
      ]
    },
    {
      title: 'Reliability',
      icon: Cpu,
      content: [
        'Real-time logging system for backup tracking.',
        'Transactional operations to ensure data consistency.',
        'Optimized I/O processing for file management.'
      ]
    }
  ]);

  backendArchitecture = signal<BackendCard[]>([
    {
      label: 'Service Layer (BO)',
      desc: 'The heart of BKM. It orchestrates complex backup tasks, manages path validations, and ensures thread safety during I/O operations.',
      tech: 'Spring Services'
    },
    {
      label: 'Persistence Layer',
      desc: 'Utilizes Spring Data JPA to manage ScheduledBackupEntity and history, persisting configurations and audit logs into a SQL database.',
      tech: 'Spring Data JPA / SQL'
    },
    {
      label: 'REST Controller',
      desc: 'Highly organized API layer that decouples frontend requests from business logic, providing standardized DTO responses.',
      tech: 'Spring Web'
    }
  ]);

  advancedFeatures = signal<BackendCard[]>([
    {
      label: 'Reactive Monitoring (SSE)',
      desc: 'Implemented via SseEmitter, the progress system streams live backup status from the backend to the UI without polling.',
      tech: 'SseEmitter / Progress'
    },
    {
      label: 'Dynamic Task Scheduling',
      desc: 'Allows for cron-based automation and one-time tasks, with full lifecycle control (pause, resume, and cancel) for active jobs.',
      tech: 'Dynamic Task Scheduler'
    },
    {
      label: 'Security & Integrity',
      desc: 'Strict path validation (validateSafePath) and disk space checks ensure backups run in secure environments with enough capacity.',
      tech: 'I/O Security Service'
    }
  ]);

  // Nova Seção baseada no LogController e SystemController
  observabilityFeatures = signal<BackendCard[]>([
    {
      label: 'Diagnostic Logging',
      desc: 'Exposes detailed execution logs through the LogController, allowing users to review warnings.log and audit backup session alerts.',
      tech: 'Java NIO / Logging'
    },
    {
      label: 'System Storage Stats',
      desc: 'The SystemController provides real-time information about Windows storage partitions, mapping disk health and available space.',
      tech: 'SystemStorageService'
    },
    {
      label: 'Context Awareness',
      desc: 'Integrates BackupContext to track the last destination of files, providing immediate access to relevant logs and session data.',
      tech: 'Infrastructure Context'
    }
  ]);

  projectMeta = signal({
    version: '1.2.0',
    author: 'Luis Cavalcante',
    githubUser: 'devluiscavalcante',
    repoBackendUrl: 'https://github.com/devluiscavalcante/backup-manager',
    repoFrontendUrl: 'https://github.com/devluiscavalcante/bkm-angular'
  });

  getYear(): number {
    return new Date().getFullYear();
  }
}
