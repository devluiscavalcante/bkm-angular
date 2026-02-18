import { Component } from '@angular/core';
import { LucideAngularModule, Zap, Shield, Package } from 'lucide-angular';

@Component({
  selector: 'app-initial',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './initial.component.html'
})

export class InitialComponent {
  readonly zap = Zap;
  readonly shield = Shield;
  readonly pkg = Package;
}
