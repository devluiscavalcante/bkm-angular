import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, Zap, Shield, Package, LucideIconData } from 'lucide-angular';
import { AboutComponent } from '../about/about.component';
import { SpecsComponent } from '../specs/specs.component';
import { StructureComponent } from '../structure/structure.component';

interface Feature {
  icon: LucideIconData;
  label: string;
  desc: string;
  css: string;
}

@Component({
  selector: 'app-initial',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, FormsModule, RouterModule, AboutComponent,
  SpecsComponent, StructureComponent],
  templateUrl: './initial.component.html'
})
export class InitialComponent {
  readonly features: Feature[] = [
    { icon: Zap, label: 'Fast', desc: 'Incremental backups', css: 'text-amber-500' },
    { icon: Shield, label: 'Secure', desc: 'Integrity check', css: 'text-blue-500' },
    { icon: Package, label: 'Flexible', desc: 'Multi-destination', css: 'text-emerald-500' }
  ];

  readonly titlePrefix = "Your infrastructure";
  readonly titleHighlight = "protected and automated.";

  getGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  }
}
